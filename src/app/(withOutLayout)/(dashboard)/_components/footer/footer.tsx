import React from "react";

const Footer = () => {
  return (
    <>
      <footer className="bg-white shadow-md py-4">
        <div className="container mx-auto text-center text-gray-600">
          &copy; {new Date().getFullYear()} RecipeShare. All Rights Reserved.
        </div>
      </footer>
    </>
  );
};

export default Footer;
