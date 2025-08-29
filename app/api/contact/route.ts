import { NextRequest, NextResponse } from "next/server";
import { z } from "zod";
import { getContactCollection } from "@/lib/mongodb";
import { sendContactNotification, sendAutoReply } from "@/lib/email";
import {
  createContactMessage,
  validateContactInput,
  type ContactFormInput
} from "@/lib/models/contact";

// Contact form validation schema
const contactSchema = z.object({
  name: z.string().min(2, "Name must be at least 2 characters").max(100, "Name is too long"),
  email: z.string().email("Please enter a valid email address"),
  subject: z.string().max(200, "Subject is too long").optional(),
  message: z.string().min(10, "Message must be at least 10 characters").max(1000, "Message is too long"),
});

// Rate limiting (simple in-memory store - in production, use Redis or similar)
const rateLimitMap = new Map<string, { count: number; lastReset: number }>();
const RATE_LIMIT_WINDOW = 60 * 1000; // 1 minute
const RATE_LIMIT_MAX_REQUESTS = 5; // 5 requests per minute

function getRateLimitKey(request: NextRequest): string {
  // In production, you might want to use a more sophisticated approach
  const forwarded = request.headers.get("x-forwarded-for");
  const ip = forwarded ? forwarded.split(",")[0] : "unknown";
  return ip;
}

function isRateLimited(key: string): boolean {
  const now = Date.now();
  const userLimit = rateLimitMap.get(key);

  if (!userLimit) {
    rateLimitMap.set(key, { count: 1, lastReset: now });
    return false;
  }

  if (now - userLimit.lastReset > RATE_LIMIT_WINDOW) {
    rateLimitMap.set(key, { count: 1, lastReset: now });
    return false;
  }

  if (userLimit.count >= RATE_LIMIT_MAX_REQUESTS) {
    return true;
  }

  userLimit.count++;
  return false;
}

function sanitizeInput(input: string): string {
  // Basic HTML sanitization - remove potentially dangerous characters
  return input
    .replace(/[<>]/g, "")
    .replace(/javascript:/gi, "")
    .replace(/on\w+=/gi, "")
    .trim();
}

export async function POST(request: NextRequest) {
  try {
    // Rate limiting
    const rateLimitKey = getRateLimitKey(request);
    if (isRateLimited(rateLimitKey)) {
      return NextResponse.json(
        { error: "Too many requests. Please try again later." },
        { status: 429 }
      );
    }

    // Parse and validate request body
    const body = await request.json();
    const validatedData = contactSchema.parse(body);

    // Additional validation using our custom validator
    const validation = validateContactInput(validatedData);
    if (!validation.isValid) {
      return NextResponse.json(
        {
          error: "Validation failed",
          details: Object.entries(validation.errors).map(([field, message]) => ({
            field,
            message
          }))
        },
        { status: 400 }
      );
    }

    // Sanitize inputs
    const sanitizedData: ContactFormInput = {
      name: sanitizeInput(validatedData.name),
      email: sanitizeInput(validatedData.email),
      subject: validatedData.subject ? sanitizeInput(validatedData.subject) : undefined,
      message: sanitizeInput(validatedData.message),
    };

    // Get client metadata
    const forwarded = request.headers.get("x-forwarded-for");
    const ipAddress = forwarded ? forwarded.split(",")[0] : "unknown";
    const userAgent = request.headers.get("user-agent") || "unknown";

    // Create contact message document
    const contactMessage = createContactMessage(sanitizedData, {
      ipAddress,
      userAgent,
    });

    // Save to database
    const contactCollection = await getContactCollection();
    const result = await contactCollection.insertOne(contactMessage);

    console.log("📧 New contact form submission saved to database:");
    console.log("ID:", result.insertedId);
    console.log("Name:", sanitizedData.name);
    console.log("Email:", sanitizedData.email);
    console.log("Subject:", sanitizedData.subject || "No subject");
    console.log("Timestamp:", contactMessage.timestamp.toISOString());
    console.log("---");

    // Send email notifications
    let emailSent = false;
    let autoReplySent = false;

    try {
      // Send notification email to you
      await sendContactNotification({
        ...sanitizedData,
        timestamp: contactMessage.timestamp,
      });
      emailSent = true;
      console.log("✅ Notification email sent successfully");
    } catch (emailError) {
      console.error("❌ Failed to send notification email:", emailError);
    }

    try {
      // Send auto-reply to user
      await sendAutoReply({
        ...sanitizedData,
        timestamp: contactMessage.timestamp,
      });
      autoReplySent = true;
      console.log("✅ Auto-reply email sent successfully");
    } catch (autoReplyError) {
      console.error("❌ Failed to send auto-reply email:", autoReplyError);
    }

    // Update the document with email status
    await contactCollection.updateOne(
      { _id: result.insertedId },
      {
        $set: {
          emailSent,
          autoReplySent,
          updatedAt: new Date()
        }
      }
    );

    return NextResponse.json(
      {
        message: "Message sent successfully! I'll get back to you soon.",
        success: true,
        id: result.insertedId
      },
      { status: 200 }
    );

  } catch (error) {
    console.error("Contact form error:", error);

    if (error instanceof z.ZodError) {
      return NextResponse.json(
        {
          error: "Validation failed",
          details: error.issues.map((err) => ({
            field: err.path.join("."),
            message: err.message
          }))
        },
        { status: 400 }
      );
    }

    return NextResponse.json(
      { error: "Internal server error. Please try again later." },
      { status: 500 }
    );
  }
}

// Handle unsupported methods
export async function GET() {
  return NextResponse.json(
    { error: "Method not allowed" },
    { status: 405 }
  );
}

export async function PUT() {
  return NextResponse.json(
    { error: "Method not allowed" },
    { status: 405 }
  );
}

export async function DELETE() {
  return NextResponse.json(
    { error: "Method not allowed" },
    { status: 405 }
  );
}
