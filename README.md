# Mobile Armour - Mobile Accessories & Repair Services

A modern e-commerce platform for mobile accessories and repair services built with Next.js 15, TypeScript, and MongoDB. Mobile Armour offers a comprehensive solution for customers looking to purchase mobile accessories and get their devices repaired.

## 🚀 Features

### 🛍️ E-commerce Platform
- **Product Catalog**: Browse and purchase mobile accessories across multiple categories
- **Category Filtering**: Filter products by Cases, Power Banks, Car Holders, Cables & Adapters, and Screen Protectors
- **Product Search & Filtering**: Advanced filtering system with category-based navigation
- **Shopping Cart**: Complete cart functionality for seamless shopping experience
- **Stripe Integration**: Secure payment processing with Stripe

### 🔧 Mobile Repair Services
- **Device Diagnostics**: Professional mobile and tablet repair services
- **Screen Repairs**: Cracked screen replacement for all major brands
- **Battery Replacement**: Battery repair and replacement services
- **Charging Port Fixes**: Repair services for charging port issues
- **Water Damage Recovery**: Water damage assessment and repair

### 🤖 AI-Powered Customer Support
- **OpenAI Chatbot**: Intelligent chatbot for customer inquiries
- **24/7 Support**: Round-the-clock customer assistance
- **Lead Collection**: Automated lead capture for repair bookings
- **WhatsApp Integration**: Direct redirect to WhatsApp for personalized support

### 📱 Modern Web Features
- **Responsive Design**: Mobile-first design that works on all devices
- **Image Carousel**: Interactive product galleries with Swiper.js
- **Toast Notifications**: Real-time user feedback with React Hot Toast
- **SEO Optimized**: Search engPine optimized with Next.js App Router
- **TypeScript**: Full type safety throughout the application

## 🛠️ Tech Stack

- **Frontend**: Next.js 15, React 19, TypeScript
- **Styling**: Bootstrap 5.3, Custom CSS
- **Database**: MongoDB with Mongoose ODM
- **Authentication**: NextAuth.js
- **Payments**: Stripe
- **AI Integration**: OpenAI API
- **Deployment**: Optimized for Vercel deployment
- **State Management**: React hooks and context
- **Image Optimization**: Next.js Image component

## 📦 Installation

1. **Clone the repository**
   ```bash
   git clone https://github.com/yourusername/mobile-armour-website.git
   cd mobile-armour-website
   ```

2. **Install dependencies**
   ```bash
   npm install
   # or
   yarn install
   # or
   pnpm install
   ```

3. **Environment Setup**
  

4. **Database Setup**
   ```bash
   # Make sure MongoDB is running locally or use a cloud MongoDB instance
   # The application will automatically create the required collections
   ```

5. **Run the development server**
   ```bash
   npm run dev
   # or
   yarn dev
   # or
   pnpm dev
   ```

6. **Open [http://localhost:3000](http://localhost:3000) in your browser**

## 🏗️ Project Structure

```
src/
├── app/                    # Next.js App Router pages
│   ├── api/               # API routes
│   │   ├── auth/          # Authentication endpoints
│   │   ├── bookings/      # Booking management
│   │   ├── chatbot/       # OpenAI chatbot integration
│   │   ├── orders/        # Order processing
│   │   ├── payments/      # Stripe payment integration
│   │   ├── products/      # Product CRUD operations
│   │   └── webhooks/      # Payment webhooks
│   ├── category/          # Category pages
│   ├── home1/             # Main homepage
│   └── products/          # Products listing page
├── components/            # Reusable React components
│   ├── sections/          # Page sections (hero, categories, etc.)
│   └── ui/               # UI components
├── data/                 # Static data (categories, hero content)
├── hooks/               # Custom React hooks
├── lib/                 # Utility libraries (database, validation)
├── models/              # MongoDB models
└── types/               # TypeScript type definitions
```

## 🎯 Key Components

### Product Categories
- **Cases**: Protective cases for mobile devices
- **Power Banks**: Portable charging solutions
- **Car Holders**: Vehicle mounting accessories
- **Cables & Adapters**: Charging and connectivity accessories
- **Screen Protectors**: Display protection solutions

### API Endpoints
- `GET/POST /api/products` - Product management
- `POST /api/chatbot` - AI chatbot interactions
- `POST /api/payments` - Payment processing
- `POST /api/bookings` - Repair booking system
- `POST /api/auth` - User authentication

## 🚀 Deployment

### Vercel (Recommended)
1. Connect your GitHub repository to Vercel
2. Add environment variables in Vercel dashboard
3. Deploy automatically on push

### Manual Deployment
```bash
# Build the application
npm run build

# Start production server
npm start
```

## 🤝 Contributing

1. Fork the repository
2. Create a feature branch (`git checkout -b feature/amazing-feature`)
3. Commit your changes (`git commit -m 'Add amazing feature'`)
4. Push to the branch (`git push origin feature/amazing-feature`)
5. Open a Pull Request

## 📄 License

This project is private and proprietary software.

## 🆘 Support

For support and inquiries, contact the development team or use the integrated chatbot for immediate assistance.

---

**Mobile Armour** - Your trusted partner for mobile accessories and repair services.
