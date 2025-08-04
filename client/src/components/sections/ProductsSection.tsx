import ProductGrid from "../ProductGrid";

const ProductsSection = () => {
  return (
    <section id="products" className="py-20 bg-gray-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <h2 className="text-3xl lg:text-4xl font-bold text-gray-900 mb-4">
            Fresh Products from{" "}
            <span className="text-farm-green-600">Local Farmers</span>
          </h2>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto">
            Discover premium quality produce directly from verified farmers in
            your area. Every product is carefully selected to ensure freshness
            and sustainability.
          </p>
        </div>

        <ProductGrid />
      </div>
    </section>
  );
};

export default ProductsSection;
