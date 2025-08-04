import { Button } from "../ui/button";

const HeroContent = () => {
  return (
    <div className="space-y-8 animate-fade-in-up">
      <div className="space-y-4">
        <div className="inline-flex items-center px-3 py-1 rounded-full bg-farm-green-100 text-farm-green-800 text-sm font-medium">
          <span className="w-2 h-2 bg-farm-green-600 rounded-full mr-2"></span>
          Powered by Agricultural Intelligence
        </div>

        <h1 className="text-5xl lg:text-6xl font-bold text-gray-900 leading-tight">
          Transform Your{" "}
          <span className="text-farm-green-600">Farming Journey</span> with
          Innovation
        </h1>

        <p className="text-xl text-gray-600 max-w-lg leading-relaxed">
          Connect directly with local farmers, discover fresh produce, and
          revolutionize your agricultural marketplace experience with AI-powered
          tools.
        </p>
      </div>

      <div className="flex flex-col sm:flex-row gap-4">
        <Button
          size="lg"
          className="bg-farm-green-600 hover:bg-farm-green-700 text-white px-8 py-3 text-lg"
        >
          Get Started Now
          <svg
            className="ml-2 w-5 h-5"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M17 8l4 4m0 0l-4 4m4-4H3"
            />
          </svg>
        </Button>

        <Button
          variant="outline"
          size="lg"
          className="border-farm-green-600 text-farm-green-600 hover:bg-farm-green-50 px-8 py-3 text-lg"
        >
          <svg
            className="mr-2 w-5 h-5"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M14.828 14.828a4 4 0 01-5.656 0M9 10h1.5a2.5 2.5 0 015 0H17m-5 4v6m-1-6h2m-1 0V9.5a2.5 2.5 0 00-5 0V10H5"
            />
          </svg>
          See How It Works
        </Button>
      </div>

      <div className="flex items-center space-x-8 pt-8">
        <div className="flex -space-x-3">
          {[1, 2, 3, 4].map((i) => (
            <div
              key={i}
              className="w-10 h-10 rounded-full bg-farm-green-100 border-2 border-white flex items-center justify-center text-farm-green-600 font-semibold"
            >
              {String.fromCharCode(64 + i)}
            </div>
          ))}
        </div>
        <div>
          <div className="text-2xl font-bold text-gray-900">10,000+</div>
          <div className="text-sm text-gray-600">
            Satisfied Farmers using FarmDirect
          </div>
        </div>
      </div>
    </div>
  );
};

export default HeroContent;
