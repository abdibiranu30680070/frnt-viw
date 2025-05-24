import React from "react";
import './ImageMarquee.css'; // Import CSS for styling
// Import images directly (if images are in the src folder)
import doctor1 from "./images/Afircapng-removebg-preview.png";
import doctor2 from "./images/WHO1-removebg-preview.png";
import doctor3 from "./images/MOH-removebg-preview.png";
import image4 from "./images/WHO.png";
import image5 from "./images/JJU-removebg-preview.png";
import image6 from "./images/MOE-removebg-preview.png";

const images = [
  doctor1,
  doctor2,
  doctor3,
  image4,
  image5,
  image6,
];


const ImageMarquee = () => {
  // Duplicate images for a seamless marquee effect
  const duplicatedImages = [...images, ...images, ...images, ...images];

  return (
    <div className="marquee-container">
      <div className="marquee-content">
        {duplicatedImages.map((src, index) => (
          <img
            key={`${src}-${index}`} // Unique key for each image
            src={src}
            alt={`Diabetes Image ${(index % images.length) + 1}`} // Cycle through original alt text
            className="marquee-image"
            aria-hidden={index >= images.length} // Hide duplicated images from screen readers
          />
        ))}
      </div>
    </div>
  );
};

export default React.memo(ImageMarquee); // Optimize re-renders