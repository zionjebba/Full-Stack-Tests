import type { ReactNode } from "react";

interface AuthLayoutProps {
  children: ReactNode;
  title: string;
  subtitle: string;
}

export function AuthLayout({ children, title, subtitle }: AuthLayoutProps) {
  return (
    <div className="min-h-screen bg-black flex">
      <div className="flex-1 flex items-center justify-center px-6 py-12">
        <div className="w-full max-w-md space-y-8">
          <div className="text-center">
            <div className="text-white text-2xl font-bold mb-2">
              🌾 FarmDirect
            </div>
            <div className="text-green-400 text-sm">
              Connecting Farmers to Markets
            </div>
          </div>

          <div className="text-center">
            <h2 className="text-3xl font-bold text-white">{title}</h2>
            <p className="mt-2 text-white/70">{subtitle}</p>
          </div>

          {children}
        </div>
      </div>

      <div className="hidden lg:block flex-1 relative">
        <img
          src="https://images.unsplash.com/photo-1574323347407-f5e1ad6d020b?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1000&q=80"
          alt="Agricultural field"
          className="w-full h-full object-cover"
        />
        <div className="absolute inset-0 bg-gradient-to-l from-transparent to-black/50" />

        <div className="absolute inset-0 flex items-center justify-center p-12">
          <div className="text-center text-white space-y-6">
            <h3 className="text-4xl font-bold">
              Transform Your Farming Journey
            </h3>
            <p className="text-xl text-white/90">
              Join thousands of farmers connecting directly with buyers to get
              better prices for their produce
            </p>
            <div className="flex items-center justify-center space-x-8 pt-8">
              <div className="text-center">
                <div className="text-3xl font-bold text-green-400">5,000+</div>
                <div className="text-sm text-white/80">Active Farmers</div>
              </div>
              <div className="text-center">
                <div className="text-3xl font-bold text-green-400">85%</div>
                <div className="text-sm text-white/80">Better Prices</div>
              </div>
              <div className="text-center">
                <div className="text-3xl font-bold text-green-400">24/7</div>
                <div className="text-sm text-white/80">Market Access</div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
