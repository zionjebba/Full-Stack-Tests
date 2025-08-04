import { Card } from "../ui/card";

const StatsOverlay = () => {
  return (
    <div className="grid grid-cols-2 gap-4">
      <Card className="p-4 bg-white/90 backdrop-blur-sm border-0 shadow-lg">
        <div className="flex items-center justify-between mb-2">
          <div className="text-sm font-medium text-gray-600">Growth Rate</div>
          <div className="w-6 h-6 bg-farm-green-100 rounded flex items-center justify-center">
            <svg
              className="w-4 h-4 text-farm-green-600"
              fill="currentColor"
              viewBox="0 0 24 24"
            >
              <path d="M16 6l2.29 2.29-4.88 4.88-4-4L2 16.59 3.41 18l6-6 4 4 6.3-6.29L22 12V6h-6z" />
            </svg>
          </div>
        </div>
        <div className="text-2xl font-bold text-gray-900 mb-1">0.90</div>
        <div className="flex items-center space-x-2">
          <div className="flex space-x-1">
            {[...Array(8)].map((_, i) => (
              <div
                key={i}
                className={`w-1 h-6 rounded-full ${
                  i < 6 ? "bg-farm-green-500" : "bg-gray-200"
                }`}
              />
            ))}
          </div>
          <span className="text-xs text-gray-500">July 20</span>
        </div>
      </Card>

      <Card className="p-4 bg-white/90 backdrop-blur-sm border-0 shadow-lg">
        <div className="flex items-center justify-between mb-2">
          <div className="text-sm font-medium text-gray-600">Active Farms</div>
          <div className="w-6 h-6 bg-blue-100 rounded flex items-center justify-center">
            <svg
              className="w-4 h-4 text-blue-600"
              fill="currentColor"
              viewBox="0 0 24 24"
            >
              <path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z" />
            </svg>
          </div>
        </div>
        <div className="text-2xl font-bold text-gray-900 mb-1">2,847</div>
        <div className="text-xs text-gray-500">+12% from last month</div>
      </Card>

      <Card className="p-4 bg-white/90 backdrop-blur-sm border-0 shadow-lg col-span-2">
        <div className="flex items-center justify-between mb-3">
          <div className="text-sm font-medium text-gray-600">
            Market Overview
          </div>
          <div className="text-xs text-gray-500">February 15 - July 20</div>
        </div>
        <div className="h-16 flex items-end space-x-1">
          {[
            { height: "h-8", color: "bg-farm-green-200" },
            { height: "h-12", color: "bg-farm-green-300" },
            { height: "h-6", color: "bg-farm-green-200" },
            { height: "h-16", color: "bg-farm-green-500" },
            { height: "h-10", color: "bg-farm-green-300" },
            { height: "h-14", color: "bg-farm-green-400" },
            { height: "h-8", color: "bg-farm-green-200" },
            { height: "h-12", color: "bg-farm-green-300" },
            { height: "h-16", color: "bg-farm-green-600" },
            { height: "h-10", color: "bg-farm-green-300" },
          ].map((bar, i) => (
            <div
              key={i}
              className={`flex-1 ${bar.height} ${bar.color} rounded-t-sm`}
            />
          ))}
        </div>
      </Card>
    </div>
  );
};

export default StatsOverlay;
