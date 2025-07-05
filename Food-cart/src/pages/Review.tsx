import React, { useEffect, useState } from "react";
import ReactStars from "react-rating-stars-component";
import { useStore } from "../context/store";

interface Props {
  productId: string;
}

const ReviewPage: React.FC<Props> = ({ productId }) => {
  const {
    user,
    reviews,
    getProductReviews,
    addReview,
    updateReview,
    deleteReview,
    isLoading,
  } = useStore();

  const [rating, setRating] = useState<number>(0);
  const [comment, setComment] = useState("");
  const [editingReviewId, setEditingReviewId] = useState<string | null>(null);

  // useEffect(() => {
  //   if (productId) getProductReviews(productId);
  // }, [productId]);

  const handleSubmit = async () => {
    if (!rating || !comment.trim()) return;

    if (editingReviewId) {
      await updateReview(editingReviewId, rating, comment);
      setEditingReviewId(null);
    } else {
      await addReview(productId, rating, comment);
    }

    setRating(0);
    setComment("");
  };

  const handleEdit = (id: string, existingRating: number, existingComment: string) => {
    setEditingReviewId(id);
    setRating(existingRating);
    setComment(existingComment);
  };

  const handleDelete = async (id: string) => {
    if (window.confirm("Are you sure you want to delete this review?")) {
      await deleteReview(id);
    }
  };

  return (
    <div className="max-w-2xl mx-auto py-12 px-4">
      <div className="bg-white shadow-lg rounded-xl p-6">
        <h2 className="text-xl font-bold text-gray-800 mb-4">Join the Conversation</h2>

        {/* Review Form */}
        {user && (
          <div>
            <h3 className="text-md font-semibold text-gray-700 mb-2">Leave a comment</h3>

            <ReactStars
              count={5}
              size={24}
              value={rating}
              onChange={setRating}
              activeColor="#FFA500"
              color="#e5e7eb"
            />

            <textarea
              className="w-full mt-2 border-2 border-orange-300 focus:border-orange-500 focus:ring-orange-400 rounded-md p-3 outline-none text-gray-700"
              placeholder="Write your comment here..."
              rows={3}
              value={comment}
              onChange={(e) => setComment(e.target.value)}
            />

            <button
              onClick={handleSubmit}
              className="mt-3 bg-orange-500 hover:bg-orange-600 text-white font-semibold px-6 py-2 rounded-md transition"
            >
              {editingReviewId ? "Update Review" : "Submit"}
            </button>
          </div>
        )}
      </div>

      {/* Reviews List */}
      <div className="mt-6">
        {isLoading ? (
          <p className="text-gray-500 text-center">Loading reviews...</p>
        ) : reviews.length === 0 ? (
          <div className="bg-white p-6 mt-4 rounded-lg shadow text-gray-500 text-center">
            No comments available.
          </div>
        ) : (
          reviews.map((rev) => (
            <div
              key={rev._id}
              className="bg-white mt-4 p-4 rounded-md shadow-md"
            >
              <div className="flex items-center justify-between">
                <p className="font-semibold text-gray-800">
                  {rev.user?.name}
                </p>
                <ReactStars
                  count={5}
                  size={20}
                  value={rev.rating}
                  edit={false}
                  activeColor="#FFA500"
                  color="#e5e7eb"
                />
              </div>
              <p className="mt-2 text-gray-700">{rev.comment}</p>

              {user?._id === rev.user._id && (
                <div className="mt-2 flex gap-4 text-sm">
                  <button
                    onClick={() => handleEdit(rev._id, rev.rating, rev.comment)}
                    className="text-blue-500 hover:underline"
                  >
                    Edit
                  </button>
                  <button
                    onClick={() => handleDelete(rev._id)}
                    className="text-red-500 hover:underline"
                  >
                    Delete
                  </button>
                </div>
              )}
            </div>
          ))
        )}
      </div>
    </div>
  );
};

export default ReviewPage;
