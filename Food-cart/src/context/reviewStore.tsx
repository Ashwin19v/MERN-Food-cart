import {
  createContext,
  useCallback,
  useContext,
  useState,
  type ReactNode,
} from "react";
import api from "../lib/api";

import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import type { ReviewContextType } from "../types/types";

const ReviewContext = createContext<ReviewContextType | undefined>(undefined);

export const reviewProvider = ({ children }: { children: ReactNode }) => {
  const [loading, setLoading] = useState<boolean>(false);

  // Review functions

  const getProductReviews = useCallback(async (productId: string) => {
    try {
      const { data } = await api.get(`/reviews/${productId}`);
      return data.data || [];
    } catch (error: any) {
      console.log(error.response?.data?.message || "Failed to fetch reviews");
      return [];
    }
  }, []);

  //  Add review function

  const addReview = async (
    productId: string,
    rating: number,
    comment: string
  ) => {
    setLoading(true);
    try {
      const { data } = await api.post(`/reviews/add`, {
        productId,
        rating,
        comment,
      });
      toast.success("Review added successfully!");
    } catch (error: any) {
      toast.error("Failed to add review");
    } finally {
      setLoading(false);
    }
  };

  //  Update review function

  const updateReview = async (
    reviewId: string,
    rating: number,
    comment: string
  ) => {
    setLoading(true);
    try {
      const { data } = await api.put(`/reviews/${reviewId}`, {
        rating,
        comment,
      });
      toast.success("Review updated successfully!");
    } catch (error: any) {
      toast.error("Failed to update review");
      throw error;
    } finally {
      setLoading(false);
    }
  };

  // Delete review function
  const deleteReview = async (reviewId: string) => {
    setLoading(true);
    try {
      await api.delete(`/reviews/${reviewId}`);
      toast.success("Review deleted successfully!");
    } catch (error: any) {
      toast.error("Failed to delete review");
    } finally {
      setLoading(false);
    }
  };

  // Handle review edit and delete

  const handleReviewDelete = async (reviewId: string) => {
    if (window.confirm("Are you sure you want to delete this review?")) {
      await deleteReview(reviewId);
    }
  };

  return (
    <ReviewContext.Provider
      value={{
        getProductReviews,
        loading,
        addReview,
        updateReview,
        deleteReview,
        handleReviewDelete,
      }}
    >
      {children}
     
    </ReviewContext.Provider>
  );
};

export const useReview = () => {
  const context = useContext(ReviewContext);
  if (!context) {
    throw new Error("useStore must be used within StoreProvider");
  }
  return context;
};
