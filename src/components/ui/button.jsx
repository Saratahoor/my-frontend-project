import React from "react";

export const Button = ({ children, onClick, variant = "solid" }) => {
  const baseStyles = "px-4 py-2 rounded-md focus:outline-none";
  const styles =
    variant === "outline"
      ? "border border-gray-500 text-gray-700"
      : "bg-blue-600 text-white";

  return (
    <button className={`${baseStyles} ${styles}`} onClick={onClick}>
      {children}
    </button>
  );
};
