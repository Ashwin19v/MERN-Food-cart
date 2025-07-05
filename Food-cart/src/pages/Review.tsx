import React, { useEffect } from "react";
import StarRatings from "react-star-ratings";
import ReactStars from "react-rating-stars-component";
import { useStore } from "../context/store";

interface Props {
  productId: string | undefined;
}

const ReviewPage: React.FC<Props> = ({ productId }) => {
  const {
    user,
    reviews,
    getProductReviews,
    rating,
    setRating,
    comment,
    setComment,
    editingReviewId,
    handleReviewSubmit,
    handleReviewEdit,
    handleReviewDelete,
    isLoading,
  } = useStore();

  // useEffect(() => {
  //   if (productId) {
  //     getProductReviews(productId);
  //   }
  // }, [productId]);

  return (
    <div className="max-w-3xl mx-auto py-10 px-6">
      <div className="bg-white shadow-md rounded-lg p-6">
        <h2 className="text-2xl font-bold text-gray-800 mb-4">
          Customer Reviews
        </h2>

        {user && (
          <div>
            <h3 className="text-md font-semibold text-gray-700 mb-2">
              Leave a Review
            </h3>

            <StarRatings
              rating={rating}
              starRatedColor="orange"
              starHoverColor="orange"
              changeRating={setRating}
              numberOfStars={5}
              starDimension="30px"
              starSpacing="5px"
              name="rating"
            />

            <textarea
              className="w-full mt-4 border-2 border-orange-300 focus:border-orange-500 focus:ring-orange-400 rounded-md p-3 outline-none text-gray-700"
              placeholder="Share your experience..."
              rows={3}
              value={comment}
              onChange={(e) => setComment(e.target.value)}
            />

            <button
              onClick={() => productId && handleReviewSubmit(productId)}
              className="mt-3 bg-orange-500 hover:bg-orange-600 text-white font-semibold px-6 py-2 rounded-md transition"
            >
              {editingReviewId ? "Update Review" : "Submit Review"}
            </button>
          </div>
        )}
      </div>

      <div className="mt-6">
        {isLoading ? (
          <p className="text-center text-gray-500">Loading reviews...</p>
        ) : reviews.length === 0 ? (
          <div className="bg-white p-6 mt-4 rounded-lg shadow text-gray-500 text-center">
            No reviews yet.
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
                  size={22}
                  value={rev.rating}
                  edit={false}
                  activeColor="#FFA500"
                  color="#ddd"
                />
              </div>
              <p className="mt-2 text-gray-700">{rev.comment}</p>

              {user?._id === rev.user._id && (
                <div className="mt-2 flex gap-4 text-sm">
                  <button
                    onClick={() =>
                      handleReviewEdit(rev._id, rev.rating, rev.comment)
                    }
                    className="text-blue-500 hover:underline"
                  >
                    Edit
                  </button>
                  <button
                    onClick={() => handleReviewDelete(rev._id)}
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
