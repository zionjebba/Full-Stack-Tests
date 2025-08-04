import { useState } from "react";
import type { Product } from "../types";
import InquiryModal from "./InquiryModal";
import { Card, CardContent, CardFooter } from "./ui/card";
import { Button } from "./ui/button";
import { Badge } from "./ui/badge";

interface ProductCardProps {
  product: Product;
  hideContactButton?: boolean;
}

const ProductCard = ({
  product,
  hideContactButton = false,
}: ProductCardProps) => {
  const [showInquiryModal, setShowInquiryModal] = useState(false);

  const farmerName =
    typeof product.farmer === "string" ? "Farmer" : product.farmer.name;

  return (
    <>
      <Card className="overflow-hidden bg-white hover:shadow-lg transition-shadow duration-300">
        <div className="h-48 bg-gray-200 relative">
          {product.imageUrl ? (
            <img
              src={product.imageUrl}
              alt={product.title}
              className="w-full h-full object-cover"
            />
          ) : (
            <div className="w-full h-full flex items-center justify-center">
              <svg
                className="w-16 h-16 text-gray-400"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={1.5}
                  d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z"
                />
              </svg>
            </div>
          )}
          <div className="absolute top-2 left-2">
            <Badge className="bg-green-600 text-white">
              {product.category}
            </Badge>
          </div>
        </div>

        <CardContent className="p-4">
          <h3 className="text-lg font-semibold text-gray-800 mb-2">
            {product.title}
          </h3>

          <p className="text-gray-600 text-sm mb-3 line-clamp-2">
            {product.description}
          </p>

          <div className="flex justify-between items-center mb-3">
            <span className="text-2xl font-bold text-green-600">
              ₵{product.price.toFixed(2)}
            </span>
            <span className="text-sm text-gray-500">
              {product.quantity} available
            </span>
          </div>

          <div className="flex items-center mb-4">
            <div className="w-8 h-8 bg-green-100 rounded-full flex items-center justify-center">
              <span className="text-green-600 text-sm font-semibold">
                {farmerName.charAt(0).toUpperCase()}
              </span>
            </div>
            <span className="ml-2 text-sm text-gray-600">by {farmerName}</span>
          </div>
        </CardContent>

        {!hideContactButton && (
          <CardFooter className="p-4 pt-0">
            <Button
              onClick={() => setShowInquiryModal(true)}
              className="w-full bg-green-600 hover:bg-green-700"
            >
              Contact Farmer
            </Button>
          </CardFooter>
        )}
      </Card>

      <InquiryModal
        isOpen={showInquiryModal}
        onClose={() => setShowInquiryModal(false)}
        product={product}
      />
    </>
  );
};

export default ProductCard;
