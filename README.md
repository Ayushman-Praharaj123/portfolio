# Ayushman Praharaj - Portfolio Website

A modern, responsive portfolio website built with Next.js 14, TypeScript, and Tailwind CSS. This portfolio showcases Ayushman Praharaj's skills as a Full Stack Developer specializing in MERN Stack technologies.

## 🚀 Features

- **Modern Design**: Clean, professional design with smooth animations
- **Responsive**: Mobile-first approach ensuring perfect display on all devices
- **Performance Optimized**: Built with Next.js 14 for optimal performance
- **Type Safe**: Full TypeScript implementation for better development experience
- **Accessible**: WCAG compliant with proper ARIA labels and keyboard navigation
- **SEO Optimized**: Proper meta tags and structured data for search engines
- **Contact Form**: Functional contact form with validation and API integration
- **Smooth Animations**: Framer Motion animations for enhanced user experience

## 🛠️ Tech Stack

- **Framework**: Next.js 14 (App Router)
- **Language**: TypeScript
- **Styling**: Tailwind CSS
- **UI Components**: Custom components with shadcn/ui patterns
- **Animations**: Framer Motion
- **Form Handling**: React Hook Form with Zod validation
- **Icons**: Lucide React
- **Deployment**: Vercel (recommended)

## 📋 Sections

1. **Hero Section**: Introduction with profile image and call-to-action
2. **Skills Section**: Technical skills organized by category with proficiency indicators
3. **Services Section**: Services offered with detailed descriptions
4. **Projects Section**: Featured projects with live demos and source code links
5. **Contact Section**: Contact form and social media links

## 🚀 Getting Started

### Prerequisites

- Node.js 18+
- npm, yarn, or pnpm

### Installation

1. Clone the repository:
```bash
git clone <repository-url>
cd portfolio_ayushman
```

2. Install dependencies:
```bash
npm install
# or
yarn install
# or
pnpm install
```

3. Start the development server:
```bash
npm run dev
# or
yarn dev
# or
pnpm dev
```

4. Open [http://localhost:3000](http://localhost:3000) in your browser

### Environment Setup

The application works out of the box without additional environment variables. However, for production deployment, you may want to configure:

- Email service integration for contact form
- Analytics tracking
- Error monitoring

## 📁 Project Structure

```
portfolio_ayushman/
├── app/                    # Next.js App Router
│   ├── api/               # API routes
│   │   └── contact/       # Contact form API
│   ├── globals.css        # Global styles
│   ├── layout.tsx         # Root layout
│   └── page.tsx          # Home page
├── components/            # React components
│   ├── ui/               # Reusable UI components
│   ├── contact-section.tsx
│   ├── hero-section.tsx
│   ├── navigation.tsx
│   ├── projects-section.tsx
│   ├── services-section.tsx
│   └── skills-section.tsx
├── lib/                  # Utility functions
│   └── utils.ts
├── types/                # TypeScript type definitions
│   └── index.ts
├── public/               # Static assets
│   ├── projects/         # Project images
│   └── ayushman.png     # Profile image
└── README.md
```

## 🎨 Customization

### Profile Information
Update personal information in the respective component files:
- `components/hero-section.tsx` - Name, title, and description
- `components/contact-section.tsx` - Contact information and social links
- `components/skills-section.tsx` - Technical skills and proficiency levels
- `components/projects-section.tsx` - Featured projects
- `components/services-section.tsx` - Services offered

### Styling
- Global styles: `app/globals.css`
- Component-specific styles: Tailwind classes in component files
- Color scheme: CSS custom properties in `globals.css`

### Images
- Replace `public/ayushman.png` with your profile image
- Add project screenshots to `public/projects/`
- Ensure images are optimized for web (WebP format recommended)

## 🚀 Deployment

### Vercel (Recommended)

1. Push your code to GitHub
2. Connect your repository to [Vercel](https://vercel.com)
3. Deploy with default settings

### Other Platforms

The application can be deployed to any platform that supports Next.js:
- Netlify
- AWS Amplify
- Railway
- DigitalOcean App Platform

## 📧 Contact Form

The contact form includes:
- Client-side validation with React Hook Form and Zod
- Server-side validation and sanitization
- Rate limiting protection
- CORS handling
- Error handling and user feedback

To integrate with an email service:
1. Update `app/api/contact/route.ts`
2. Add your preferred email service (SendGrid, Nodemailer, etc.)
3. Configure environment variables

## 🔧 Development

### Available Scripts

- `npm run dev` - Start development server
- `npm run build` - Build for production
- `npm run start` - Start production server
- `npm run lint` - Run ESLint

### Code Quality

The project includes:
- TypeScript for type safety
- ESLint for code linting
- Prettier configuration (recommended)
- Consistent code formatting

## 📱 Browser Support

- Chrome (latest)
- Firefox (latest)
- Safari (latest)
- Edge (latest)
- Mobile browsers (iOS Safari, Chrome Mobile)

## 🤝 Contributing

1. Fork the repository
2. Create a feature branch
3. Make your changes
4. Test thoroughly
5. Submit a pull request

## 📄 License

This project is open source and available under the [MIT License](LICENSE).

## 👤 Author

**Ayushman Praharaj**
- LinkedIn: [ayushman-praharaj-28985231b](https://www.linkedin.com/in/ayushman-praharaj-28985231b/)
- GitHub: [Ayushman-Praharaj123](https://github.com/Ayushman-Praharaj123)
- Email: ayushmanpraharaj85@gmail.com

---

Built with ❤️ using Next.js and TypeScript
