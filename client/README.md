# FarmDirect Frontend

This is the React frontend application for the FarmDirect Marketplace platform.

## 🚀 Quick Start

```bash
# Install dependencies
npm install

# Start development server
npm run dev

# Build for production
npm run build

# Preview production build
npm run preview

# Run linter
npm run lint
```

## 🛠 Tech Stack

- **React 19** - Latest React with concurrent features
- **TypeScript** - Type-safe JavaScript
- **Vite** - Fast build tool and dev server
- **Tailwind CSS** - Utility-first CSS framework
- **Radix UI** - Accessible component primitives
- **React Hook Form** - Performant forms with validation
- **Zod** - TypeScript-first schema validation
- **React Query** - Data fetching and caching
- **React Router** - Client-side routing
- **Lucide React** - Beautiful icons
- **Sonner** - Toast notifications

## 📁 Project Structure

```
src/
├── components/          # Reusable UI components
│   ├── auth/           # Authentication components
│   ├── farmer/         # Farmer-specific components
│   ├── hero/           # Landing page components
│   ├── layout/         # Layout components
│   ├── sections/       # Page sections
│   └── ui/             # Base UI components
├── contexts/           # React Context providers
├── hooks/              # Custom React hooks
├── services/           # API service layer
├── types/              # TypeScript definitions
└── lib/                # Utility functions
```

## 🎨 Design System

The application uses a custom design system built on top of Tailwind CSS and Radix UI:

- **Colors**: Green-focused palette for agricultural theme
- **Typography**: Clean, readable fonts with proper hierarchy
- **Components**: Consistent, accessible components
- **Responsive**: Mobile-first design approach
- **Dark Theme**: Professional dark theme with high contrast

## 🔧 Development

### Environment Setup

The frontend connects to the backend API. Make sure the backend server is running on `http://localhost:3000` or update the API base URL in `src/services/api.ts`.

### Adding New Components

1. Create component in appropriate directory under `src/components/`
2. Export from `index.ts` if it should be publicly available
3. Add TypeScript interfaces in `src/types/index.ts` if needed
4. Follow existing patterns for styling and state management

### State Management

- **React Query** for server state (API data, caching)
- **React Context** for global app state (authentication, theme)
- **Local state** with `useState` for component-specific state

### Form Handling

All forms use React Hook Form with Zod validation:

```typescript
const schema = z.object({
  email: z.string().email("Invalid email"),
  password: z.string().min(8, "Password too short"),
});

const form = useForm({
  resolver: zodResolver(schema),
  defaultValues: { email: "", password: "" },
});
```

## 🔗 API Integration

The frontend communicates with the backend through the API service layer in `src/services/api.ts`. All API calls are wrapped with React Query for caching and optimistic updates.

## 📱 Responsive Design

The application is fully responsive with breakpoints:
- **Mobile**: < 640px
- **Tablet**: 640px - 1024px  
- **Desktop**: > 1024px

Key responsive features:
- Adaptive navigation (hamburger menu on mobile)
- Flexible grid layouts
- Touch-friendly interactive elements
- Optimized typography scaling

## 🚀 Build & Deployment

```bash
# Production build
npm run build

# The dist/ folder contains the built application
# Deploy the dist/ folder to your hosting provider
```

The build is optimized for production with:
- Code splitting and lazy loading
- Asset optimization and compression
- Modern ES modules for supported browsers
- Legacy polyfills for older browsers

## 🧪 Development Guidelines

- Use TypeScript for all new code
- Follow existing component patterns
- Write accessible components (ARIA labels, keyboard navigation)
- Optimize images and assets
- Use React Query for all API calls
- Handle loading and error states gracefully
- Test components thoroughly before committing