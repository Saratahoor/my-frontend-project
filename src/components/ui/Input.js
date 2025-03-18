import React from "react";

export const Input = ({ name, placeholder, type = "text", onChange }) => (
  <input
    name={name}
    type={type}
    placeholder={placeholder}
    onChange={onChange}
    className="border p-2 w-full rounded-md mt-1"
  />
);
