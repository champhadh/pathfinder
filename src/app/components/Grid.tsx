import React from "react";

const GRID_SIZE = 20; // Adjust grid size as needed

export default function Grid() {
  return (
    <div className="grid grid-cols-20 gap-1 p-4 bg-gray-200 border border-gray-500">
      {Array.from({ length: GRID_SIZE * GRID_SIZE }).map((_, index) => (
        <div
          key={index}
          className="w-6 h-6 bg-white border border-gray-400"
        ></div>
      ))}
    </div>
  );
}
