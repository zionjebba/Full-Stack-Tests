import { Card } from "../ui/card";

const WeatherWidget = () => {
  return (
    <Card className="p-4 bg-white/90 backdrop-blur-sm border-0 shadow-lg animate-fade-in-down">
      <div className="flex items-center justify-between mb-3">
        <div className="text-sm font-medium text-gray-600">
          Saint Petersburg
        </div>
        <div className="text-xs text-gray-500">Today • 2:32 PM</div>
      </div>

      <div className="flex items-center justify-between">
        <div className="flex items-center space-x-3">
          <div className="w-12 h-12 bg-gradient-to-br from-yellow-400 to-orange-500 rounded-full flex items-center justify-center">
            <svg
              className="w-6 h-6 text-white"
              fill="currentColor"
              viewBox="0 0 24 24"
            >
              <path d="M12 2.25a.75.75 0 01.75.75v2.25a.75.75 0 01-1.5 0V3a.75.75 0 01.75-.75zM7.5 12a4.5 4.5 0 119 0 4.5 4.5 0 01-9 0zM18.894 6.166a.75.75 0 00-1.06-1.06l-1.591 1.59a.75.75 0 101.06 1.061l1.591-1.59zM21.75 12a.75.75 0 01-.75.75h-2.25a.75.75 0 010-1.5H21a.75.75 0 01.75.75zM17.834 18.894a.75.75 0 001.06-1.06l-1.59-1.591a.75.75 0 10-1.061 1.06l1.59 1.591zM12 18a.75.75 0 01.75.75V21a.75.75 0 01-1.5 0v-2.25A.75.75 0 0112 18zM7.758 17.303a.75.75 0 00-1.061-1.06l-1.591 1.59a.75.75 0 001.06 1.061l1.591-1.59zM6 12a.75.75 0 01-.75.75H3a.75.75 0 010-1.5h2.25A.75.75 0 016 12zM6.697 7.757a.75.75 0 001.06-1.06l-1.59-1.591a.75.75 0 00-1.061 1.06l1.59 1.591z" />
            </svg>
          </div>
          <div>
            <div className="text-2xl font-bold text-gray-900">19°</div>
            <div className="text-sm text-gray-600">Sunny</div>
          </div>
        </div>

        <div className="flex space-x-4 text-center">
          {[
            { day: "Mon", temp: "18°", icon: "☀️" },
            { day: "Tue", temp: "16°", icon: "⛅" },
            { day: "Wed", temp: "14°", icon: "🌧️" },
            { day: "Thu", temp: "17°", icon: "⛅" },
            { day: "Fri", temp: "19°", icon: "☀️" },
          ].map((forecast) => (
            <div key={forecast.day} className="text-xs">
              <div className="text-gray-500 mb-1">{forecast.day}</div>
              <div className="text-lg mb-1">{forecast.icon}</div>
              <div className="font-medium text-gray-700">{forecast.temp}</div>
            </div>
          ))}
        </div>
      </div>
    </Card>
  );
};

export default WeatherWidget;
