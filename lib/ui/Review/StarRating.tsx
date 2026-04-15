/* eslint-disable react/display-name */
import { Color } from "@lib/common";
import React from "react";
import StarRating from "react-native-star-rating-widget";

type Props = {
  rating: number;
  onChange?: (rating: number) => void;
  disabled?: boolean;
};

const StarRatingComponent = React.memo(
  ({ rating, onChange, disabled }: Props) => {
    const handleChange = (value: number) => {
      if (disabled) return;
      onChange?.(value);
    };

    return (
      <StarRating
        rating={rating}
        onChange={handleChange}
        maxStars={5}
        starSize={26}
        color={Color.starRating} // ✅ đúng prop
      />
    );
  },
);

export default StarRatingComponent;
