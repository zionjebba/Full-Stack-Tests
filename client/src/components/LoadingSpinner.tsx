const LoadingSpinner = () => {
  return (
    <div className="flex justify-center items-center py-12">
      <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-green-600"></div>
      <span className="ml-3 text-gray-600">Loading products...</span>
    </div>
  );
};

export default LoadingSpinner;
