import { useState, useEffect } from "react";
import { Plus, Package, MessageSquare, LogOut } from "lucide-react";
import { useAuth } from "../../contexts/AuthContext";
import { Button } from "../ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "../ui/card";
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "../ui/dialog";
import { ProductForm } from "./ProductForm";
import ProductCard from "../ProductCard";
import { farmerService } from "../../services/api";
import LoadingSpinner from "../LoadingSpinner";
import type { Product, Inquiry, InquiryWithProduct } from "../../types";
import { toast } from "sonner";

export default function FarmerDashboard() {
  const { user, logout } = useAuth();
  const [products, setProducts] = useState<Product[]>([]);
  const [inquiries, setInquiries] = useState<Inquiry[]>([]);
  const [allInquiries, setAllInquiries] = useState<InquiryWithProduct[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [showProductForm, setShowProductForm] = useState(false);
  const [selectedProductId, setSelectedProductId] = useState<string | null>(
    null
  );
  const [activeTab, setActiveTab] = useState<"products" | "inquiries">(
    "products"
  );

  useEffect(() => {
    loadDashboardData();
  }, []);

  const loadDashboardData = async () => {
    try {
      setIsLoading(true);
      const [productsResponse, allInquiriesResponse] = await Promise.all([
        farmerService.getMyProducts(),
        farmerService.getAllMyInquiries(),
      ]);

      if (productsResponse.success && productsResponse.data) {
        setProducts(productsResponse.data);
      }

      if (allInquiriesResponse.success && allInquiriesResponse.data) {
        setAllInquiries(allInquiriesResponse.data);
      }
    } catch (error) {
      console.error("Error loading dashboard data:", error);
      toast.error("Failed to load dashboard data");
    } finally {
      setIsLoading(false);
    }
  };

  const loadInquiriesForProduct = async (productId: string) => {
    try {
      const response = await farmerService.getInquiriesForProduct(productId);
      if (response.success && response.data) {
        setInquiries(response.data);
        setSelectedProductId(productId);
      }
    } catch (error) {
      console.error("Error loading inquiries:", error);
      toast.error("Failed to load inquiries");
    }
  };

  const handleLogout = () => {
    logout();
    toast.success("Logged out successfully");
  };

  const handleProductCreated = () => {
    setShowProductForm(false);
    loadDashboardData();
  };

  if (isLoading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <LoadingSpinner />
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <header className="bg-white shadow-sm border-b">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-16">
            <div className="flex items-center">
              <h1 className="text-xl font-bold text-gray-900">🌾 FarmDirect</h1>
              <span className="ml-4 text-gray-500">Farmer Dashboard</span>
            </div>
            <div className="flex items-center space-x-4">
              <span className="text-sm text-gray-700">
                Welcome, {user?.name}
              </span>
              <Button
                variant="outline"
                size="sm"
                onClick={handleLogout}
                className="text-gray-600 hover:text-gray-900"
              >
                <LogOut className="h-4 w-4 mr-2" />
                Logout
              </Button>
            </div>
          </div>
        </div>
      </header>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Stats Cards */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">
                Total Products
              </CardTitle>
              <Package className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{products.length}</div>
              <p className="text-xs text-muted-foreground">Products listed</p>
            </CardContent>
          </Card>

          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">
                Total Inquiries
              </CardTitle>
              <MessageSquare className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{allInquiries.length}</div>
              <p className="text-xs text-muted-foreground">Buyer inquiries</p>
            </CardContent>
          </Card>

          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">
                Revenue Potential
              </CardTitle>
              <Package className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">
                ₵
                {products
                  .reduce(
                    (sum, product) => sum + product.price * product.quantity,
                    0
                  )
                  .toFixed(2)}
              </div>
              <p className="text-xs text-muted-foreground">
                Total inventory value
              </p>
            </CardContent>
          </Card>
        </div>

        {/* Tabs */}
        <div className="mb-8">
          <div className="border-b border-gray-200">
            <nav className="-mb-px flex space-x-8">
              <button
                onClick={() => setActiveTab("products")}
                className={`py-2 px-1 border-b-2 font-medium text-sm ${
                  activeTab === "products"
                    ? "border-green-500 text-green-600"
                    : "border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300"
                }`}
              >
                My Products ({products.length})
              </button>
              <button
                onClick={() => setActiveTab("inquiries")}
                className={`py-2 px-1 border-b-2 font-medium text-sm ${
                  activeTab === "inquiries"
                    ? "border-green-500 text-green-600"
                    : "border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300"
                }`}
              >
                All Inquiries ({allInquiries.length})
              </button>
            </nav>
          </div>
        </div>

        {/* Products Tab */}
        {activeTab === "products" && (
          <div className="mb-8">
            <div className="flex items-center justify-between mb-6">
              <h2 className="text-2xl font-bold text-gray-900">My Products</h2>
              <Button
                onClick={() => setShowProductForm(true)}
                className="bg-green-600 hover:bg-green-700"
              >
                <Plus className="h-4 w-4 mr-2" />
                Add Product
              </Button>
            </div>

            {products.length === 0 ? (
              <Card>
                <CardContent className="text-center py-12">
                  <Package className="h-12 w-12 text-gray-400 mx-auto mb-4" />
                  <h3 className="text-lg font-medium text-gray-900 mb-2">
                    No products yet
                  </h3>
                  <p className="text-gray-600 mb-4">
                    Start by adding your first product to the marketplace
                  </p>
                  <Button
                    onClick={() => setShowProductForm(true)}
                    className="bg-green-600 hover:bg-green-700"
                  >
                    <Plus className="h-4 w-4 mr-2" />
                    Add Your First Product
                  </Button>
                </CardContent>
              </Card>
            ) : (
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {products.map((product) => (
                  <div key={product._id} className="relative">
                    <ProductCard product={product} hideContactButton={true} />
                    <Button
                      variant="outline"
                      size="sm"
                      onClick={() => loadInquiriesForProduct(product._id)}
                      className="mt-2 w-full"
                    >
                      <MessageSquare className="h-4 w-4 mr-2" />
                      View Inquiries
                    </Button>
                  </div>
                ))}
              </div>
            )}

            {/* Product Inquiries Section - shown when a product is selected */}
            {selectedProductId && (
              <div className="mt-8">
                <h3 className="text-xl font-bold text-gray-900 mb-4">
                  Product Inquiries ({inquiries.length})
                </h3>
                {inquiries.length > 0 ? (
                  <div className="space-y-4">
                    {inquiries.map((inquiry) => (
                      <Card key={inquiry.id}>
                        <CardHeader>
                          <div className="flex items-center justify-between">
                            <CardTitle className="text-sm">
                              From: {inquiry.buyerEmail}
                            </CardTitle>
                            <span className="text-xs text-gray-500">
                              {new Date(inquiry.createdAt).toLocaleDateString()}
                            </span>
                          </div>
                        </CardHeader>
                        <CardContent>
                          <p className="text-gray-700">{inquiry.message}</p>
                        </CardContent>
                      </Card>
                    ))}
                  </div>
                ) : (
                  <Card className="text-center py-8">
                    <CardContent>
                      <div className="w-16 h-16 mx-auto mb-4 bg-gray-100 rounded-full flex items-center justify-center">
                        <MessageSquare className="w-8 h-8 text-gray-400" />
                      </div>
                      <h4 className="text-lg font-medium text-gray-900 mb-2">
                        No Inquiries Yet
                      </h4>
                      <p className="text-gray-500 max-w-sm mx-auto">
                        This product hasn't received any inquiries from buyers
                        yet. Keep your product details updated to attract more
                        interest!
                      </p>
                    </CardContent>
                  </Card>
                )}
              </div>
            )}
          </div>
        )}

        {/* All Inquiries Tab */}
        {activeTab === "inquiries" && (
          <div className="mb-8">
            <h2 className="text-2xl font-bold text-gray-900 mb-6">
              All Inquiries
            </h2>
            {allInquiries.length > 0 ? (
              <div className="space-y-4">
                {allInquiries.map((inquiry) => (
                  <Card key={inquiry.id}>
                    <CardHeader>
                      <div className="flex items-center justify-between">
                        <div>
                          <CardTitle className="text-sm">
                            From: {inquiry.buyerEmail}
                          </CardTitle>
                          <p className="text-xs text-green-600 mt-1">
                            Product: {inquiry.product.title} (
                            {inquiry.product.category})
                          </p>
                        </div>
                        <span className="text-xs text-gray-500">
                          {new Date(inquiry.createdAt).toLocaleDateString()}
                        </span>
                      </div>
                    </CardHeader>
                    <CardContent>
                      <p className="text-gray-700">{inquiry.message}</p>
                    </CardContent>
                  </Card>
                ))}
              </div>
            ) : (
              <Card className="text-center py-12">
                <CardContent>
                  <div className="w-16 h-16 mx-auto mb-4 bg-gray-100 rounded-full flex items-center justify-center">
                    <MessageSquare className="w-8 h-8 text-gray-400" />
                  </div>
                  <h4 className="text-lg font-medium text-gray-900 mb-2">
                    No Inquiries Yet
                  </h4>
                  <p className="text-gray-500 max-w-sm mx-auto">
                    You haven't received any inquiries yet. Make sure your
                    products are attractive and well-described to get more buyer
                    interest!
                  </p>
                </CardContent>
              </Card>
            )}
          </div>
        )}
      </div>

      {/* Product Form Modal */}
      <Dialog open={showProductForm} onOpenChange={setShowProductForm}>
        <DialogContent className="max-w-2xl">
          <DialogHeader>
            <DialogTitle>Add New Product</DialogTitle>
          </DialogHeader>
          <ProductForm
            onSuccess={handleProductCreated}
            onCancel={() => setShowProductForm(false)}
          />
        </DialogContent>
      </Dialog>
    </div>
  );
}
