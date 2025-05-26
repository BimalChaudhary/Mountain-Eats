import React, { useState, useEffect } from "react";
import "./Header.css";

const images = [
  "/header_img1.png",
  "/header_img2.png",
  "/header_img3.png",
  "/header_img4.png",
  "/header_img5.png"
];

const Header = () => {
  const [bgIndex, setBgIndex] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setBgIndex((prev) => (prev + 1) % images.length);
    }, 3000);

    return () => clearInterval(interval);
  }, []);

  return (
    <div
      className="header"
      style={{
        backgroundImage: `url(${images[bgIndex]})`,
        backgroundRepeat: "no-repeat",
        backgroundSize: "contain",
        backgroundPosition: "center",
      }}
    >
      <div className="header-contents">
        <h2>Order your favourite food here</h2>
        <p>
          Choose from a diverse menu featuring a delectable array of dishes crafted
          with the finest ingredients and culinary expertise. Our mission is to
          satisfy your craving and elevate your dining experience, one delicious
          meal at a time.
        </p>
        <button>View Menu</button>
      </div>
    </div>
  );
};

export default Header;
