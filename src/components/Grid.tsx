"use client";

import React, { useState } from "react";

const GRID_SIZE = 20;

type CellType = "empty" | "wall" | "start" | "end";

export default function Grid() {
  const [grid, setGrid] = useState<CellType[]>(Array(GRID_SIZE * GRID_SIZE).fill("empty"));
  const [startIndex, setStartIndex] = useState<number | null>(null);
  const [endIndex, setEndIndex] = useState<number | null>(null);

  const handleCellClick = (index: number) => {
    setGrid((prevGrid) => {
      const newGrid = [...prevGrid];

      if (startIndex === null) {
        newGrid[index] = "start";
        setStartIndex(index);
      } else if (endIndex === null && index !== startIndex) {
        newGrid[index] = "end";
        setEndIndex(index);
      } else if (newGrid[index] === "wall") {
        newGrid[index] = "empty"; // Remove wall
      } else {
        newGrid[index] = "wall"; // Add wall
      }

      return newGrid;
    });
  };

  return (
    <div className="grid grid-cols-20 gap-1 p-4 bg-gray-200 border border-gray-500">
      {grid.map((cell, index) => (
        <div
          key={index}
          className={`w-6 h-6 border border-gray-400 cursor-pointer ${
            cell === "wall" ? "bg-black" : ""
          } ${cell === "start" ? "bg-green-500" : ""} ${cell === "end" ? "bg-red-500" : ""}`}
          onClick={() => handleCellClick(index)}
        ></div>
      ))}
    </div>
  );
}
