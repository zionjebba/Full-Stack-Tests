import { useState } from "react";
import { toast } from "sonner";
import { useCreateInquiry } from "../hooks/useQueries";
import type { Product, InquiryForm } from "../types";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "./ui/dialog";
import { Button } from "./ui/button";
import { Input } from "./ui/input";
import { Label } from "./ui/label";

interface InquiryModalProps {
  isOpen: boolean;
  onClose: () => void;
  product: Product;
}

const InquiryModal = ({ isOpen, onClose, product }: InquiryModalProps) => {
  const [formData, setFormData] = useState<InquiryForm>({
    buyerEmail: "",
    message: "",
  });
  const [errors, setErrors] = useState<Partial<InquiryForm>>({});

  const createInquiryMutation = useCreateInquiry();

  const validateForm = (): boolean => {
    const newErrors: Partial<InquiryForm> = {};

    if (!formData.buyerEmail) {
      newErrors.buyerEmail = "Email is required";
    } else if (!/\S+@\S+\.\S+/.test(formData.buyerEmail)) {
      newErrors.buyerEmail = "Please enter a valid email";
    }

    if (!formData.message) {
      newErrors.message = "Message is required";
    } else if (formData.message.length < 10) {
      newErrors.message = "Message must be at least 10 characters";
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!validateForm()) return;

    try {
      await createInquiryMutation.mutateAsync({
        productId: product._id,
        inquiryData: formData,
      });

      setFormData({ buyerEmail: "", message: "" });
      setErrors({});
      onClose();

      toast.success(
        "Your inquiry has been sent successfully! The farmer will contact you soon."
      );
    } catch (error) {
      console.error("Failed to send inquiry:", error);
      toast.error("Failed to send inquiry. Please try again.");
    }
  };

  const handleInputChange = (field: keyof InquiryForm, value: string) => {
    setFormData((prev) => ({ ...prev, [field]: value }));
    if (errors[field]) {
      setErrors((prev) => ({ ...prev, [field]: undefined }));
    }
  };

  const farmerName =
    typeof product.farmer === "string" ? "the farmer" : product.farmer.name;

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="max-w-md bg-white">
        <DialogHeader>
          <DialogTitle>Contact Farmer</DialogTitle>
          <DialogDescription>
            Send a message to {farmerName} about this product.
          </DialogDescription>
        </DialogHeader>

        <div className="flex items-center space-x-3 p-3 bg-muted rounded-lg">
          {product.imageUrl ? (
            <img
              src={product.imageUrl}
              alt={product.title}
              className="w-12 h-12 object-cover rounded"
            />
          ) : (
            <div className="w-12 h-12 bg-gray-200 rounded flex items-center justify-center">
              <svg
                className="w-6 h-6 text-gray-400"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z"
                />
              </svg>
            </div>
          )}
          <div>
            <h3 className="font-medium">{product.title}</h3>
            <p className="text-sm text-muted-foreground">
              ₵{product.price.toFixed(2)} • {product.quantity} available
            </p>
          </div>
        </div>

        <form onSubmit={handleSubmit} className="space-y-4">
          <div className="space-y-2">
            <Label htmlFor="email">Your Email</Label>
            <Input
              type="email"
              id="email"
              value={formData.buyerEmail}
              onChange={(e) => handleInputChange("buyerEmail", e.target.value)}
              placeholder="Enter your email address"
              className={errors.buyerEmail ? "border-red-500" : ""}
            />
            {errors.buyerEmail && (
              <p className="text-red-500 text-sm">{errors.buyerEmail}</p>
            )}
          </div>

          <div className="space-y-2">
            <Label htmlFor="message">Message</Label>
            <textarea
              id="message"
              value={formData.message}
              onChange={(e) => handleInputChange("message", e.target.value)}
              rows={4}
              className={`flex min-h-[80px] w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50 resize-none ${
                errors.message ? "border-red-500" : ""
              }`}
              placeholder="I'm interested in this product. Please let me know about availability, delivery options, etc."
            />
            {errors.message && (
              <p className="text-red-500 text-sm">{errors.message}</p>
            )}
          </div>

          <DialogFooter>
            <Button type="button" variant="outline" onClick={onClose}>
              Cancel
            </Button>
            <Button
              type="submit"
              disabled={createInquiryMutation.isPending}
              className="bg-green-600 hover:bg-green-700"
            >
              {createInquiryMutation.isPending ? "Sending..." : "Send Inquiry"}
            </Button>
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  );
};

export default InquiryModal;
