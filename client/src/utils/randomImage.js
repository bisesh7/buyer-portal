// src/utils/propertyImages.js
import property1 from "../assets/property1.png";
import property2 from "../assets/property2.png";
import property3 from "../assets/property3.png";

const images = [property1, property2, property3];

export const getPropertyImage = (id) => {
  const index = (id - 1) % images.length;
  return images[index];
};
