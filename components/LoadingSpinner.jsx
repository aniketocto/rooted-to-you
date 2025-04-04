import React from "react";

const LoadingSpinner = () => {
  return (
    <div className="flex justify-center items-center h-[200px] w-full">
      <div className="w-12 h-12 border-4 border-yellow-400 border-t-transparent rounded-full animate-spin"></div>
    </div>
  );
};

export default LoadingSpinner;
