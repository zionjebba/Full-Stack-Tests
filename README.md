# 🌾 FarmDirect Marketplace

FarmDirect Marketplace is a comprehensive full-stack platform that connects farmers directly with buyers. The application features a modern React frontend with a robust Node.js backend, enabling seamless product management, user authentication, and direct communication between farmers and potential customers.

## 🚀 Project Overview

This marketplace application fulfills the requirements of creating a platform where:
- **Farmers** can register, manage their profiles, upload products with images, and handle customer inquiries
- **Buyers** can browse products, filter by categories, and send inquiries directly to farmers
- **Both user types** enjoy a responsive, modern interface with secure authentication

## ✨ Frontend Features

### 🎨 User Interface & Experience
- **Modern React Application** built with TypeScript and Vite
- **Responsive Design** using Tailwind CSS with mobile-first approach
- **Component-Based Architecture** with reusable UI components
- **Dark/Light Theme Support** with professional design system
- **Smooth Animations** and interactive elements using Lucide React icons

### 🔐 Authentication & Authorization
- **Dual Registration System** for farmers and buyers
- **JWT-Based Authentication** with automatic token management
- **Role-Based Access Control** with protected routes
- **Form Validation** using React Hook Form + Zod schemas
- **Remember Me Functionality** with localStorage/sessionStorage
- **Secure Password Handling** with show/hide toggle

### 🏠 Landing Page & Hero Section
- **Compelling Hero Section** with agricultural imagery
- **Social Proof Elements** showing customer statistics
- **Weather Widget Integration** for farming insights
- **Stats Overlay** displaying platform metrics
- **Call-to-Action Buttons** for user engagement

### 📦 Product Management
- **Product Grid Display** with filtering and search capabilities
- **Category-Based Filtering** for easy product discovery
- **Product Cards** with detailed information and imagery
- **Real-Time Search** functionality across products
- **Responsive Product Layout** adapting to screen sizes

### 👨‍🌾 Farmer Dashboard
- **Product Management Interface** for farmers
- **Product Creation Form** with image upload support
- **Inquiry Management System** to handle buyer questions
- **Dashboard Analytics** showing product and inquiry statistics
- **Intuitive Navigation** between different dashboard sections

### 💬 Communication System
- **Inquiry Modal** for buyers to contact farmers
- **Real-Time Notifications** using Sonner toast system
- **Email Integration** for inquiry notifications
- **Message Threading** for organized communications

### 🛠 Technical Frontend Features
- **React Query Integration** for efficient data fetching and caching
- **Context API** for global state management
- **TypeScript** for type safety and better development experience
- **Custom Hooks** for reusable logic
- **Error Boundary** handling for graceful error recovery
- **Loading States** and skeleton screens for better UX

## 🔧 Backend Features

### 🔐 Authentication & Security
- **JWT-Based Authentication** with secure token generation
- **Password Encryption** using bcrypt
- **Role-Based Authorization** middleware
- **HTTP Security Headers** via Helmet
- **CORS Configuration** with environment-based restrictions
- **Rate Limiting** to prevent API abuse

### 📊 Product Management
- **RESTful API** for product operations (CRUD)
- **Image Upload Support** using Multer middleware
- **Product Categorization** and filtering
- **Farmer-Only Product Creation** with role validation
- **Product Search and Pagination** capabilities

### 💌 Inquiry System
- **Product Inquiry API** for buyer-farmer communication
- **Email Notifications** for new inquiries
- **Inquiry History** and management
- **Farmer Dashboard Integration** for inquiry handling

### 📚 API Documentation
- **Swagger/OpenAPI Documentation** automatically generated
- **Interactive API Explorer** available at `/api-docs`
- **Comprehensive Endpoint Documentation** with examples
- **Request/Response Schema** definitions

## 🛠 Technologies & Libraries

### Frontend Stack
- **Framework:** React 19 + TypeScript
- **Build Tool:** Vite with HMR support
- **Styling:** Tailwind CSS + Tailwind Animate
- **UI Components:** Radix UI primitives
- **Form Handling:** React Hook Form + Zod validation
- **HTTP Client:** Axios with interceptors
- **State Management:** React Query + Context API
- **Routing:** React Router DOM v7
- **Icons:** Lucide React
- **Notifications:** Sonner (toast notifications)
- **Development:** ESLint, TypeScript ESLint, Prettier

### Backend Stack
- **Runtime:** Node.js with Express.js
- **Language:** TypeScript
- **Database:** MongoDB with Mongoose ODM
- **Authentication:** JWT + bcrypt
- **File Upload:** Multer middleware
- **Security:** Helmet, CORS, express-rate-limit
- **Logging:** Morgan
- **API Documentation:** Swagger (swagger-jsdoc, swagger-ui-express)

### Development & Deployment
- **Package Manager:** npm
- **Version Control:** Git
- **Environment Management:** dotenv
- **Code Quality:** ESLint + TypeScript
- **Build System:** TypeScript compiler + Vite

## 📁 Project Structure

```
agritech-marketplace/
├── client/                          # React Frontend Application
│   ├── src/
│   │   ├── components/             # Reusable UI Components
│   │   │   ├── auth/              # Authentication components
│   │   │   ├── farmer/            # Farmer-specific components
│   │   │   ├── hero/              # Landing page components
│   │   │   ├── layout/            # Layout components (Header, Navigation)
│   │   │   ├── sections/          # Page sections
│   │   │   └── ui/                # Base UI components (Button, Card, etc.)
│   │   ├── contexts/              # React Context providers
│   │   ├── hooks/                 # Custom React hooks
│   │   ├── services/              # API service layer
│   │   ├── types/                 # TypeScript type definitions
│   │   └── lib/                   # Utility functions
│   ├── public/                    # Static assets
│   └── package.json              # Frontend dependencies
│
├── server/                        # Node.js Backend API
│   ├── src/
│   │   ├── config/               # Application configuration
│   │   ├── controllers/          # Route controllers
│   │   ├── middlewares/          # Custom middleware
│   │   ├── models/               # Database models
│   │   ├── routes/               # API routes
│   │   ├── types/                # TypeScript definitions
│   │   └── utils/                # Utility functions
│   ├── uploads/                  # File upload directory
│   └── package.json             # Backend dependencies
│
└── README.md                     # Project documentation
```

## 🚀 Getting Started

### Prerequisites
- **Node.js** (v16 or higher)
- **npm** or **yarn**
- **MongoDB** (local installation or MongoDB Atlas)
- **Git** for version control

### 🔧 Installation

1. **Clone the repository:**
   ```bash
   git clone https://github.com/yourusername/agritech-marketplace.git
   cd agritech-marketplace
   ```

2. **Backend Setup:**
   ```bash
   cd server
   npm install
   
   # Create environment file
   cp .env.example .env
   ```

3. **Configure Backend Environment (.env):**
   ```env
   PORT=3000
   MONGO_URI=mongodb://localhost:27017/farmdirect
   JWT_SECRET=your_super_secure_jwt_secret_key_here
   NODE_ENV=development
   ```

4. **Frontend Setup:**
   ```bash
   cd ../client
   npm install
   ```

5. **Create uploads directory:**
   ```bash
   cd ../server
   mkdir uploads
   ```

### 🏃‍♂️ Running the Application

1. **Start the Backend Server:**
   ```bash
   cd server
   npm run dev
   ```
   The API will be available at `http://localhost:3000`

2. **Start the Frontend Development Server:**
   ```bash
   cd client
   npm run dev
   ```
   The application will be available at `http://localhost:5173`

3. **Access API Documentation:**
   Open `http://localhost:3000/api-docs` for interactive API documentation

## 📋 Requirements Fulfillment

### ✅ Core Requirements Met

1. **User Registration & Authentication**
   - ✅ Separate registration for farmers and buyers
   - ✅ Secure JWT-based authentication
   - ✅ Role-based access control
   - ✅ Protected routes and middleware

2. **Product Management**
   - ✅ Farmers can create, read, update products
   - ✅ Image upload functionality for products
   - ✅ Category-based organization
   - ✅ Search and filtering capabilities

3. **Marketplace Features**
   - ✅ Public product browsing for all users
   - ✅ Product details with farmer information
   - ✅ Responsive grid layout
   - ✅ Category filtering system

4. **Communication System**
   - ✅ Buyer inquiry system for products
   - ✅ Direct farmer-buyer communication
   - ✅ Inquiry management dashboard

5. **Technical Requirements**
   - ✅ RESTful API design
   - ✅ Database integration with MongoDB
   - ✅ Modern frontend with React + TypeScript
   - ✅ Responsive mobile-first design
   - ✅ Security best practices implemented

## 🔗 API Endpoints Overview

### Authentication
- `POST /api/auth/register` - User registration (farmer/buyer)
- `POST /api/auth/login` - User authentication

### Products
- `GET /api/products` - Retrieve all products with filtering
- `POST /api/products` - Create new product (farmers only, supports image upload)
- `GET /api/products/my-products` - Get current farmer's products

### Inquiries
- `POST /api/inquiries` - Create product inquiry
- `GET /api/inquiries/:productId` - Get inquiries for specific product
- `GET /api/inquiries/my-inquiries` - Get all inquiries for current farmer's products

## ⚠️ Known Issues & Areas for Improvement


### Missing Features (Documented but Not Implemented)
- Individual product endpoints (GET, PUT, DELETE `/api/products/:id`)
- Product update/delete functionality in farmer dashboard
- Product image display (frontend shows imageUrl but backend upload path may not match)


## 🔒 Security Features

- **JWT Authentication** with secure token handling
- **Password Hashing** using bcrypt
- **CORS Protection** with whitelist configuration
- **Rate Limiting** to prevent API abuse
- **HTTP Security Headers** via Helmet middleware
- **Input Validation** using Zod schemas
- **SQL Injection Prevention** through Mongoose ODM
- **File Upload Security** with type and size restrictions

## 🧪 Testing

Run the test suite for both frontend and backend:

```bash
# Backend tests
cd server
npm test

# Frontend tests
cd client
npm test
```

## 🚀 Deployment

### Production Build

1. **Build Frontend:**
   ```bash
   cd client
   npm run build
   ```

2. **Build Backend:**
   ```bash
   cd server
   npm run build
   ```

### Environment Variables for Production

Update your production `.env` file with:
```env
NODE_ENV=production
MONGO_URI=your_production_mongodb_uri
JWT_SECRET=your_production_jwt_secret
PORT=3000
```

## 🔮 Future Enhancements

### Technical Improvements
- **Microservices Architecture** for scalability
- **Redis Caching** for improved performance
- **Image Optimization** and CDN integration
- **Advanced Error Logging** with Winston/Pino
- **API Rate Limiting** per user basis
- **Automated Testing** with Jest and Cypress
- **CI/CD Pipeline** with GitHub Actions
- **Docker Containerization** for easy deployment

## 🤝 Contributing

1. Fork the repository
2. Create a feature branch: `git checkout -b feature/amazing-feature`
3. Commit changes: `git commit -m 'Add amazing feature'`
4. Push to branch: `git push origin feature/amazing-feature`
5. Open a Pull Request


## 🙏 Acknowledgments

- **React Team** for the excellent frontend framework
- **Express.js Community** for the robust backend framework
- **MongoDB** for the flexible database solution
- **Tailwind CSS** for the utility-first CSS framework
- **Radix UI** for accessible component primitives
- **Lucide React** for beautiful icons

---

**Built with ❤️ for connecting farmers and buyers directly.**