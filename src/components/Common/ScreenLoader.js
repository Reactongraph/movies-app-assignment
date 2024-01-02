import React from "react";

const ScreenLoader = () => {
  return (
    <div className="fixed top-0 left-0 w-full h-full flex items-center justify-center bg-gray-900 bg-opacity-75 z-50">
      <div className="loader animate-spin rounded-full border-t-8 border-t-blue-500 border-gray-200 h-32 w-32"></div>
    </div>
  );
};

export default ScreenLoader;
