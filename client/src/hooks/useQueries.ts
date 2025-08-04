import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { productService, inquiryService } from "../services/api";
import type { InquiryForm } from "../types";

export const useProducts = () => {
  return useQuery({
    queryKey: ["products"],
    queryFn: productService.getProducts,
    staleTime: 5 * 60 * 1000, // 5 minutes
  });
};

export const useProduct = (productId: string) => {
  return useQuery({
    queryKey: ["products", productId],
    queryFn: () => productService.getProduct(productId),
    enabled: !!productId, // we will only run if productId exists
  });
};

export const useCreateInquiry = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: ({
      productId,
      inquiryData,
    }: {
      productId: string;
      inquiryData: InquiryForm;
    }) => inquiryService.createInquiry(productId, inquiryData),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["inquiries"] });
    },
  });
};

export const useProductInquiries = (productId: string) => {
  return useQuery({
    queryKey: ["inquiries", productId],
    queryFn: () => inquiryService.getInquiriesForProduct(productId),
    enabled: !!productId,
  });
};
