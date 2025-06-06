import React, { useState } from "react";

export const DropdownMenu = ({ children }) => {
  const [open, setOpen] = useState(false);

  return (
    <div className="relative">
      <button onClick={() => setOpen(!open)} className="text-blue-600">
        ☰ Menu
      </button>
      {open && (
        <div className="absolute top-full left-0 mt-2 bg-white shadow-md rounded-md p-2">
          {children}
        </div>
      )}
    </div>
  );
};

export const DropdownMenuTrigger = ({ children, onClick }) => (
  <button onClick={onClick} className="text-sm text-blue-500">
    {children}
  </button>
);

export const DropdownMenuContent = ({ children }) => (
  <div className="absolute bg-white shadow-lg p-2 rounded-md">
    {children}
  </div>
);

export const DropdownMenuItem = ({ children, onClick }) => (
  <div onClick={onClick} className="cursor-pointer p-2 hover:bg-gray-100">
    {children}
  </div>
);
