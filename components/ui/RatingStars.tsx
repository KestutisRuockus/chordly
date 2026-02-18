import { Star, StarHalf } from "lucide-react";

type Props = {
  value: number;
  max?: number;
  size?: number;
};

const RatingStars = ({ value, max = 5, size = 12 }: Props) => {
  const stars = Array.from({ length: max }, (_, i) => {
    if (value >= i + 1) {
      return (
        <Star
          key={i}
          size={size}
          className="text-yellow-500"
          fill="currentColor"
        />
      );
    }
    if (value > i) {
      return (
        <StarHalf
          key={i}
          size={size}
          className="text-yellow-500"
          fill="currentColor"
        />
      );
    }
    return (
      <Star key={i} size={size} className="text-gray-300" fill="currentColor" />
    );
  });

  return <div className="flex gap-1">{stars}</div>;
};

export default RatingStars;
