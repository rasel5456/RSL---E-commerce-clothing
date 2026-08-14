"use client";

import { useState } from "react";

interface Review {
  id: string;
  customer_name: string;
  rating: number;
  comment: string;
  created_at: string;
}

interface ReviewSectionProps {
  productId: string;
  initialReviews: Review[];
}

export default function ReviewSection({ productId, initialReviews }: ReviewSectionProps) {
  const [reviews, setReviews] = useState(initialReviews);
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [rating, setRating] = useState(5);
  const [comment, setComment] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [success, setSuccess] = useState(false);

  const averageRating =
    reviews.length > 0
      ? (reviews.reduce((sum, r) => sum + r.rating, 0) / reviews.length).toFixed(1)
      : null;

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError("");
    setLoading(true);

    const res = await fetch("/api/reviews", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        product_id: productId,
        customer_name: name,
        customer_email: email,
        rating: rating,
        comment: comment,
      }),
    });

    const data = await res.json();
    setLoading(false);

    if (data.success) {
      setReviews([data.review, ...reviews]);
      setName("");
      setEmail("");
      setRating(5);
      setComment("");
      setSuccess(true);
      setTimeout(() => setSuccess(false), 3000);
    } else {
      setError(data.message || "Something went wrong");
    }
  };

  return (
    <div className="max-w-6xl mx-auto px-6 md:px-10 py-16 border-t border-[#DDD6C8]">
      <h2 className="text-2xl mb-2" style={{ fontFamily: "var(--font-display)" }}>
        Customer Reviews
      </h2>

      {averageRating ? (
        <p className="text-[#6E675C] mb-8">
          {averageRating} out of 5 ({reviews.length} review{reviews.length > 1 ? "s" : ""})
        </p>
      ) : (
        <p className="text-[#6E675C] mb-8">No reviews yet. Be the first to review this product.</p>
      )}

      <div className="grid md:grid-cols-2 gap-12">
        <div>
          {reviews.length === 0 ? null : (
            <div className="flex flex-col gap-6">
              {reviews.map((review) => (
                <div key={review.id} className="border-b border-[#DDD6C8] pb-6">
                  <div className="flex items-center justify-between mb-1">
                    <p className="font-medium text-sm">{review.customer_name}</p>
                    <p className="text-[#9C7A44] text-sm">{"★".repeat(review.rating) + "☆".repeat(5 - review.rating)}</p>
                  </div>
                  <p className="text-[#6E675C] text-sm">{review.comment}</p>
                </div>
              ))}
            </div>
          )}
        </div>

        <div>
          <h3 className="text-lg mb-4" style={{ fontFamily: "var(--font-display)" }}>
            Write a Review
          </h3>

          <form onSubmit={handleSubmit}>
            <div className="mb-4">
              <label className="text-[11px] tracking-[0.15em] text-[#6E675C] mb-2 block">YOUR NAME</label>
              <input
                type="text"
                value={name}
                onChange={(e) => setName(e.target.value)}
                required
                className="w-full border border-[#DDD6C8] px-4 py-2.5 focus:outline-none focus:border-[#9C7A44]"
              />
            </div>

            <div className="mb-4">
              <label className="text-[11px] tracking-[0.15em] text-[#6E675C] mb-2 block">EMAIL (optional)</label>
              <input
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="w-full border border-[#DDD6C8] px-4 py-2.5 focus:outline-none focus:border-[#9C7A44]"
              />
            </div>

            <div className="mb-4">
              <label className="text-[11px] tracking-[0.15em] text-[#6E675C] mb-2 block">RATING</label>
              <div className="flex gap-1">
                {[1, 2, 3, 4, 5].map((star) => (
                  <button
                    key={star}
                    type="button"
                    onClick={() => setRating(star)}
                    className="text-2xl"
                  >
                    {star <= rating ? "★" : "☆"}
                  </button>
                ))}
              </div>
            </div>

            <div className="mb-4">
              <label className="text-[11px] tracking-[0.15em] text-[#6E675C] mb-2 block">YOUR REVIEW</label>
              <textarea
                value={comment}
                onChange={(e) => setComment(e.target.value)}
                required
                rows={4}
                className="w-full border border-[#DDD6C8] px-4 py-2.5 focus:outline-none focus:border-[#9C7A44]"
              />
            </div>

            {error ? <p className="text-red-600 mb-4 text-sm">{error}</p> : null}
            {success ? <p className="text-green-600 mb-4 text-sm">Thank you for your review!</p> : null}

            <button
              type="submit"
              disabled={loading}
              className="bg-[#14120F] text-[#F7F4EF] px-6 py-3 text-[13px] tracking-[0.1em] hover:bg-[#9C7A44] transition-colors"
            >
              {loading ? "SUBMITTING..." : "SUBMIT REVIEW"}
            </button>
          </form>
        </div>
      </div>
    </div>
  );
}
