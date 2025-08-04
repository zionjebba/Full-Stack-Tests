import { Button } from "../ui/button";
import {
  Play,
  ArrowRight,
  TrendingUp,
  Cloud,
  CloudRain,
  Sun,
  CloudSnow,
} from "lucide-react";

const HeroSection = () => {
  return (
    <div className="min-h-screen bg-black relative overflow-hidden">
      {/* Hero Background */}
      <div className="absolute inset-0">
        <img
          src="https://images.unsplash.com/photo-1574323347407-f5e1ad6d020b?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=2340&q=80"
          alt="Agricultural field with fresh produce"
          className="w-full h-full object-cover"
        />
        <div className="absolute inset-0 bg-gradient-to-r from-black/60 via-black/30 to-transparent" />
      </div>

      {/* Hero Content */}
      <div className="relative z-10 flex items-center min-h-screen px-6">
        <div className="max-w-7xl mx-auto w-full">
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            {/* Left Content */}
            <div className="space-y-6">
              <div className="text-green-400 text-sm font-medium">
                Fresh • Direct • Sustainable
              </div>

              <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold text-white leading-tight">
                Fresh Produce Directly from Local Farmers
              </h1>

              <p className="text-white/80 text-lg max-w-lg">
                Connect with local farmers and get the freshest produce
                delivered to your door. Support sustainable farming while
                enjoying premium quality vegetables and fruits.
              </p>

              <div className="flex flex-col sm:flex-row gap-4">
                <Button className="bg-green-500 hover:bg-green-600 text-black font-medium px-6 py-3">
                  Browse Products <ArrowRight className="ml-2 h-4 w-4" />
                </Button>

                <Button
                  variant="ghost"
                  className="text-white hover:bg-white/10 px-6 py-3"
                >
                  <Play className="mr-2 h-4 w-4" />
                  How It Works
                </Button>
              </div>

              {/* Social Proof */}
              <div className="flex items-center space-x-3 pt-4">
                <div className="flex -space-x-2">
                  <div className="w-8 h-8 rounded-full bg-green-500 border-2 border-white flex items-center justify-center text-xs font-bold text-black">
                    J
                  </div>
                  <div className="w-8 h-8 rounded-full bg-orange-500 border-2 border-white flex items-center justify-center text-xs font-bold text-white">
                    M
                  </div>
                  <div className="w-8 h-8 rounded-full bg-blue-500 border-2 border-white flex items-center justify-center text-xs font-bold text-white">
                    S
                  </div>
                </div>
                <div className="text-white">
                  <div className="font-bold">500+</div>
                  <div className="text-sm text-white/70">
                    Happy customers buying fresh produce
                  </div>
                </div>
              </div>
            </div>

            {/* Right Side - Floating UI Elements */}
            <div className="relative hidden lg:block">
              {/* Weather Widget */}
              <div className="absolute top-0 right-0 bg-white/10 backdrop-blur-md rounded-2xl p-4 border border-white/20">
                <div className="flex items-center space-x-3 mb-3">
                  <Cloud className="h-6 w-6 text-white" />
                  <div className="text-white">
                    <div className="font-bold text-2xl">24°</div>
                    <div className="text-sm opacity-80">
                      Perfect for farming
                    </div>
                  </div>
                </div>

                <div className="text-white text-sm mb-3">
                  Local Farm Conditions
                  <div className="text-xs opacity-70">Updated • 10:30 AM</div>
                </div>

                <div className="flex space-x-2">
                  <div className="text-center">
                    <Sun className="h-4 w-4 text-yellow-400 mx-auto mb-1" />
                    <div className="text-xs text-white">26°</div>
                    <div className="text-xs text-white/60">TU</div>
                  </div>
                  <div className="text-center">
                    <Cloud className="h-4 w-4 text-gray-300 mx-auto mb-1" />
                    <div className="text-xs text-white">22°</div>
                    <div className="text-xs text-white/60">WE</div>
                  </div>
                  <div className="text-center">
                    <CloudRain className="h-4 w-4 text-blue-400 mx-auto mb-1" />
                    <div className="text-xs text-white">20°</div>
                    <div className="text-xs text-white/60">TH</div>
                  </div>
                  <div className="text-center">
                    <Sun className="h-4 w-4 text-yellow-400 mx-auto mb-1" />
                    <div className="text-xs text-white">25°</div>
                    <div className="text-xs text-white/60">FR</div>
                  </div>
                  <div className="text-center">
                    <CloudSnow className="h-4 w-4 text-blue-200 mx-auto mb-1" />
                    <div className="text-xs text-white">18°</div>
                    <div className="text-xs text-white/60">SA</div>
                  </div>
                </div>
              </div>

              {/* Harvest Quality Chart */}
              <div className="absolute bottom-20 right-20 bg-white/10 backdrop-blur-md rounded-2xl p-4 border border-white/20">
                <div className="flex items-center space-x-2 mb-2">
                  <TrendingUp className="h-4 w-4 text-green-400" />
                  <span className="text-white text-sm">
                    Fresh produce quality
                  </span>
                </div>

                <div className="text-white font-bold text-2xl mb-2">
                  98% <span className="text-green-400 text-sm">↗</span>
                </div>

                <div className="flex items-end space-x-1 h-12">
                  {[
                    0.8, 0.9, 0.7, 0.95, 0.85, 0.98, 1.0, 0.92, 0.96, 0.88,
                    0.94, 0.98,
                  ].map((height, i) => (
                    <div
                      key={`chart-bar-${i}-${height}`}
                      className="bg-green-400 rounded-sm w-2"
                      style={{ height: `${height * 100}%` }}
                    />
                  ))}
                </div>

                <div className="flex justify-between text-xs text-white/60 mt-1">
                  <span>This Month</span>
                  <span>Today</span>
                </div>
              </div>

              {/* Featured Product Card */}
              <div className="absolute bottom-0 left-0 bg-white/10 backdrop-blur-md rounded-2xl p-4 border border-white/20 w-48">
                <div className="text-white text-sm mb-2">
                  🥕 Fresh Organic Carrots
                </div>
                <div className="text-green-400 font-bold text-lg">
                  ₵14.50/kg
                </div>
                <div className="text-white/70 text-xs">From Johnson Farm</div>
                <div className="mt-2 flex items-center space-x-1">
                  <div className="w-2 h-2 bg-green-400 rounded-full"></div>
                  <span className="text-white/70 text-xs">In stock</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default HeroSection;
