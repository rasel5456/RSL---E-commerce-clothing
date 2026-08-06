type ProductCardProps = {
  name: string;
  price: number;
  image: string;
};

export default function ProductCard({ name, price, image }: ProductCardProps) {
  return (
    <div className="border border-gray-200 rounded-lg overflow-hidden hover:shadow-lg transition-shadow">
      {/* Product Image */}
      <div className="aspect-square bg-gray-100">
        <img
          src={image}
          alt={name}
          className="w-full h-full object-cover"
        />
      </div>

      {/* Product Info */}
      <div className="p-4">
        <h3 className="font-medium text-gray-900 mb-1">{name}</h3>
        <p className="text-lg font-bold text-gray-900">৳{price}</p>
        <button className="mt-3 w-full bg-black text-white py-2 rounded-md text-sm font-medium hover:bg-gray-800">
          কার্টে যোগ করুন
        </button>
      </div>
    </div>
  );
}