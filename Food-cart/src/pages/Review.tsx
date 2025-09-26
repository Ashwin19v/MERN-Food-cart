import React, { useEffect, useState } from "react";
import StarRatings from "react-star-ratings";

import type { Review } from "../types/types";
import { motion, AnimatePresence } from "framer-motion";
import { FiEdit2, FiTrash2, FiSend, FiUser } from "react-icons/fi";
import { FaStar } from "react-icons/fa";
import { useReview } from "../context/reviewStore";
import { useAuth } from "../context/authStore";

interface Props {
  productId: string | undefined;
}

const ReviewPage: React.FC<Props> = ({ productId }) => {
  const { addReview, updateReview, getProductReviews, handleReviewDelete } =
    useReview();
  const { user } = useAuth();

  const [rating, setRating] = useState<number>(0);
  const [comment, setComment] = useState<string>("");
  const [editingReviewId, setEditingReviewId] = useState<string | null>(null);
  const [reviews, setReviews] = useState<Review[]>([]);
  const [reviewLoading, setReviewLoading] = useState<boolean>(false);
  const [isSubmitting, setIsSubmitting] = useState<boolean>(false);

  useEffect(() => {
    const fetchReviews = async () => {
      if (productId) {
        setReviewLoading(true);
        try {
          const data = await getProductReviews(productId);
          setReviews(data ?? []);
        } catch (error) {
          console.error("Failed to fetch reviews:", error);
        } finally {
          setReviewLoading(false);
        }
      }
    };
    fetchReviews();
  }, [productId]);

  const handleReview = async () => {
    if (!productId || !comment.trim() || rating === 0) return;

    setIsSubmitting(true);
    try {
      if (editingReviewId) {
        await updateReview(editingReviewId, rating, comment);
        setEditingReviewId(null);
      } else {
        await addReview(productId, rating, comment);
      }
      setRating(0);
      setComment("");
      const data = await getProductReviews(productId);
      setReviews(data ?? []);
    } catch (error) {
      console.error("Review submission failed:", error);
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleReviewEdit = (
    id: string,
    existingRating: number,
    existingComment: string
  ) => {
    setEditingReviewId(id);
    setRating(existingRating);
    setComment(existingComment);
    window.scrollTo({
      top: 0,
      behavior: "smooth",
    });
  };

  const handleReviewDel = async (id: string) => {
    if (!productId) return;
    try {
      await handleReviewDelete(id);
      const data = await getProductReviews(productId);
      setReviews(data ?? []);
    } catch (error) {
      console.error("Failed to delete review:", error);
    }
  };

  return (
    <div className="max-w-7xl mx-auto py-8  sm:px-6">
      <motion.div
        initial={{ opacity: 0, y: 30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="bg-white shadow-lg rounded-xl p-6 mb-8 border border-gray-100"
      >
        <h2 className="text-2xl font-bold text-gray-800 mb-6 flex items-center">
          <FaStar className="text-amber-500 mr-2" />
          Customer Reviews
          <span className="ml-auto text-sm font-normal bg-amber-100 text-amber-800 px-3 py-1 rounded-full">
            {reviews.length} {reviews.length === 1 ? "review" : "reviews"}
          </span>
        </h2>

        {user ? (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.3, duration: 0.4 }}
            className="space-y-4"
          >
            <h3 className="text-lg font-semibold text-gray-700">
              {editingReviewId ? "Edit Your Review" : "Share Your Experience"}
            </h3>

            <div className="flex flex-col space-y-4">
              <div className="flex items-center space-x-2">
                <StarRatings
                  rating={rating}
                  starRatedColor="amber"
                  starDimension="24px"
                  starSpacing="2px"
                  changeRating={(newRating) => setRating(newRating)}
                  numberOfStars={5}
                  name="rating"
                />
                <span className="ml-2 text-sm text-gray-500">
                  {rating > 0
                    ? `${rating} star${rating !== 1 ? "s" : ""}`
                    : "Select rating"}
                </span>
              </div>

              <div className="relative">
                <textarea
                  className="w-full border border-gray-200 focus:border-amber-300 focus:ring-2 focus:ring-amber-100 rounded-lg p-3 outline-none text-gray-700 transition-all resize-none"
                  placeholder="Share your thoughts about this product..."
                  rows={4}
                  value={comment}
                  onChange={(e) => setComment(e.target.value)}
                />
                <div className="absolute bottom-2 right-2 text-xs text-gray-400">
                  {comment.length}/500
                </div>
              </div>

              <div className="flex justify-end space-x-3">
                {editingReviewId && (
                  <button
                    onClick={() => {
                      setEditingReviewId(null);
                      setRating(0);
                      setComment("");
                    }}
                    className="px-4 py-2 text-sm text-gray-600 hover:text-gray-800 font-medium rounded-lg border border-gray-200 hover:bg-gray-50 transition"
                  >
                    Cancel
                  </button>
                )}
                <button
                  onClick={handleReview}
                  disabled={!comment.trim() || rating === 0 || isSubmitting}
                  className={`px-6 py-2 text-sm font-medium rounded-lg transition flex items-center space-x-2 ${
                    !comment.trim() || rating === 0
                      ? "bg-gray-200 text-gray-500 cursor-not-allowed"
                      : "bg-amber-500 hover:bg-amber-600 text-white"
                  }`}
                >
                  {isSubmitting ? (
                    <span className="inline-block h-4 w-4 border-2 border-white border-t-transparent rounded-full animate-spin"></span>
                  ) : (
                    <FiSend className="inline" />
                  )}
                  <span>{editingReviewId ? "Update" : "Submit"}</span>
                </button>
              </div>
            </div>
          </motion.div>
        ) : (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="bg-blue-50 border border-blue-100 rounded-lg p-4 text-center"
          >
            <p className="text-blue-800">
              Please <span className="font-semibold">login</span> to leave a
              review and share your experience with this product.
            </p>
          </motion.div>
        )}
      </motion.div>

      <div className="space-y-6">
        {reviewLoading ? (
          <div className="flex justify-center items-center py-12">
            <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-amber-500"></div>
          </div>
        ) : reviews.length === 0 ? (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="bg-white p-8 rounded-xl shadow-sm border border-gray-100 text-center"
          >
            <div className="text-gray-400 mb-3">
              <FiUser className="inline-block text-4xl" />
            </div>
            <h3 className="text-lg font-medium text-gray-600 mb-1">
              No reviews yet
            </h3>
            <p className="text-gray-500 text-sm">
              Be the first to share your thoughts about this product!
            </p>
          </motion.div>
        ) : (
          <AnimatePresence>
            {reviews.map((rev, index) => (
              <motion.div
                key={rev._id}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, x: -20 }}
                transition={{ delay: index * 0.05, duration: 0.3 }}
                className="bg-white p-5 rounded-xl shadow-sm border border-gray-100 hover:shadow-md transition-shadow"
              >
                <div className="flex items-start justify-between mb-3">
                  <div className="flex items-center space-x-3">
                    <div className="bg-amber-100 text-amber-800 w-10 h-10 rounded-full flex items-center justify-center font-semibold">
                      {rev.user?.name.charAt(0).toUpperCase()}
                    </div>
                    <div>
                      <p className="font-semibold text-gray-800">
                        {rev.user?.name}
                      </p>
                      <p className="text-xs text-gray-500">
                        {new Date(rev.createdAt).toLocaleDateString()}
                      </p>
                    </div>
                  </div>
                  <div className="flex space-x-1">
                    {[...Array(5)].map((_, i) => (
                      <FaStar
                        key={i}
                        className={`text-sm ${
                          i < rev.rating ? "text-amber-400" : "text-gray-300"
                        }`}
                      />
                    ))}
                  </div>
                </div>
                <p className="text-gray-700 pl-13">{rev.comment}</p>

                {user?._id === rev.user._id && (
                  <div className="mt-4 pt-3 border-t border-gray-100 flex justify-end space-x-4">
                    <button
                      onClick={() =>
                        handleReviewEdit(rev._id, rev.rating, rev.comment)
                      }
                      className="text-blue-500 hover:text-blue-700 text-sm font-medium flex items-center space-x-1 transition"
                    >
                      <FiEdit2 size={14} />
                      <span>Edit</span>
                    </button>
                    <button
                      onClick={() => handleReviewDel(rev._id)}
                      className="text-red-500 hover:text-red-700 text-sm font-medium flex items-center space-x-1 transition"
                    >
                      <FiTrash2 size={14} />
                      <span>Delete</span>
                    </button>
                  </div>
                )}
              </motion.div>
            ))}
          </AnimatePresence>
        )}
      </div>
    </div>
  );
};

export default ReviewPage;
