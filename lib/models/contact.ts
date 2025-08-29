import { ObjectId } from 'mongodb';

export interface ContactMessage {
  _id?: ObjectId;
  name: string;
  email: string;
  subject?: string;
  message: string;
  timestamp: Date;
  ipAddress?: string;
  userAgent?: string;
  status: 'new' | 'read' | 'replied';
  emailSent: boolean;
  autoReplySent: boolean;
  createdAt: Date;
  updatedAt: Date;
}

export interface ContactFormInput {
  name: string;
  email: string;
  subject?: string;
  message: string;
}

// Validation schema for contact form
export const contactValidationRules = {
  name: {
    minLength: 2,
    maxLength: 100,
    required: true,
  },
  email: {
    required: true,
    pattern: /^[^\s@]+@[^\s@]+\.[^\s@]+$/,
  },
  subject: {
    maxLength: 200,
    required: false,
  },
  message: {
    minLength: 10,
    maxLength: 1000,
    required: true,
  },
};

// Helper function to create a new contact message document
export function createContactMessage(
  input: ContactFormInput,
  metadata: {
    ipAddress?: string;
    userAgent?: string;
  } = {}
): ContactMessage {
  const now = new Date();
  
  return {
    name: input.name.trim(),
    email: input.email.trim().toLowerCase(),
    subject: input.subject?.trim(),
    message: input.message.trim(),
    timestamp: now,
    ipAddress: metadata.ipAddress,
    userAgent: metadata.userAgent,
    status: 'new',
    emailSent: false,
    autoReplySent: false,
    createdAt: now,
    updatedAt: now,
  };
}

// Helper function to validate contact form input
export function validateContactInput(input: ContactFormInput): {
  isValid: boolean;
  errors: Record<string, string>;
} {
  const errors: Record<string, string> = {};

  // Validate name
  if (!input.name || input.name.trim().length < contactValidationRules.name.minLength) {
    errors.name = `Name must be at least ${contactValidationRules.name.minLength} characters`;
  }
  if (input.name && input.name.trim().length > contactValidationRules.name.maxLength) {
    errors.name = `Name must be less than ${contactValidationRules.name.maxLength} characters`;
  }

  // Validate email
  if (!input.email) {
    errors.email = 'Email is required';
  } else if (!contactValidationRules.email.pattern.test(input.email)) {
    errors.email = 'Please enter a valid email address';
  }

  // Validate subject (optional)
  if (input.subject && input.subject.trim().length > contactValidationRules.subject.maxLength) {
    errors.subject = `Subject must be less than ${contactValidationRules.subject.maxLength} characters`;
  }

  // Validate message
  if (!input.message || input.message.trim().length < contactValidationRules.message.minLength) {
    errors.message = `Message must be at least ${contactValidationRules.message.minLength} characters`;
  }
  if (input.message && input.message.trim().length > contactValidationRules.message.maxLength) {
    errors.message = `Message must be less than ${contactValidationRules.message.maxLength} characters`;
  }

  return {
    isValid: Object.keys(errors).length === 0,
    errors,
  };
}
