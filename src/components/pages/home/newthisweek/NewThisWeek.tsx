import React from "react";
import { mockPropsCard } from "@/mock/items";
import DefaultImageSlider from "@/components/shared/sliders/defaultImageSlider";
const NewThisWeek = () => {
  return (
    <div>
      <DefaultImageSlider data={mockPropsCard} />
    </div>
  );
};

export default NewThisWeek;
