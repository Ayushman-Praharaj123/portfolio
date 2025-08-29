# Portfolio Setup Guide

## Environment Configuration

### 1. Database Setup (MongoDB)

You can use either a local MongoDB instance or MongoDB Atlas (cloud):

#### Option A: MongoDB Atlas (Recommended)
1. Go to [MongoDB Atlas](https://www.mongodb.com/atlas)
2. Create a free account and cluster
3. Get your connection string (it looks like: `mongodb+srv://username:password@cluster.mongodb.net/portfolio?retryWrites=true&w=majority`)
4. Replace the `MONGODB_URI` in your `.env` file

#### Option B: Local MongoDB
1. Install MongoDB locally
2. Start MongoDB service
3. Use: `mongodb://localhost:27017/portfolio`

### 2. Email Configuration (Gmail)

To receive contact form emails, you need to set up Gmail App Passwords:

1. **Enable 2-Factor Authentication** on your Gmail account
2. **Generate App Password**:
   - Go to Google Account settings
   - Security → 2-Step Verification → App passwords
   - Generate a new app password for "Mail"
   - Copy the 16-character password

3. **Update .env file**:
   ```env
   SMTP_USER=ayushmanpraharaj85@gmail.com
   SMTP_PASS=your-16-character-app-password
   ```

### 3. Environment Variables

Copy `.env.example` to `.env` and fill in your values:

```bash
cp .env.example .env
```

Required variables:
- `MONGODB_URI`: Your MongoDB connection string
- `SMTP_USER`: Your Gmail address
- `SMTP_PASS`: Your Gmail app password

## Installation

1. Install dependencies:
```bash
npm install
```

2. Run the development server:
```bash
npm run dev
```

## Contact Form Features

✅ **Database Storage**: All messages are saved to MongoDB
✅ **Email Notifications**: You receive emails at ayushmanpraharaj85@gmail.com
✅ **Auto-Reply**: Users get automatic confirmation emails
✅ **Rate Limiting**: Prevents spam (5 requests per minute)
✅ **Input Validation**: Comprehensive form validation
✅ **Security**: Input sanitization and XSS protection

## Database Schema

Contact messages are stored with the following structure:

```typescript
{
  _id: ObjectId,
  name: string,
  email: string,
  subject?: string,
  message: string,
  timestamp: Date,
  ipAddress?: string,
  userAgent?: string,
  status: 'new' | 'read' | 'replied',
  emailSent: boolean,
  autoReplySent: boolean,
  createdAt: Date,
  updatedAt: Date
}
```

## Testing

1. Fill out the contact form on your portfolio
2. Check your Gmail for the notification email
3. Check the sender's email for the auto-reply
4. Verify the message is saved in your MongoDB database

## Troubleshooting

### Email not sending?
- Verify Gmail app password is correct
- Check that 2FA is enabled on your Google account
- Ensure SMTP credentials are in `.env` file

### Database connection issues?
- Verify MongoDB URI is correct
- Check network connectivity
- For Atlas: ensure IP whitelist includes your IP

### Rate limiting issues?
- Wait 1 minute between test submissions
- Adjust rate limits in the API route if needed
