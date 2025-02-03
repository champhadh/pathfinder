"use client";

import React, { useState, useEffect } from "react";
import Dropdown from "./Dropdown";
import Controls from "./Controls";
import { bfs } from "../algorithms/bfs";
import { dfs } from "../algorithms/dfs";
import { dijkstra } from "../algorithms/dijkstra";
import { aStar } from "../algorithms/astar";
import { getNeighbors } from "../utils/helpers";

const GRID_SIZE = 20;

type CellType = "empty" | "wall" | "start" | "end" | "path" | "visited";

export default function Grid() {
  const [grid, setGrid] = useState<CellType[]>(Array(GRID_SIZE * GRID_SIZE).fill("empty"));
  const [startIndex, setStartIndex] = useState<number | null>(null);
  const [endIndex, setEndIndex] = useState<number | null>(null);
  const [isPathfinding, setIsPathfinding] = useState(false);
  const [mouseDown, setMouseDown] = useState(false);
  const [selectedAlgorithm, setSelectedAlgorithm] = useState<string>("");

  useEffect(() => {
    const handleMouseUp = () => setMouseDown(false);
    window.addEventListener("mouseup", handleMouseUp);
    return () => window.removeEventListener("mouseup", handleMouseUp);
  }, []);

  const handleCellClick = (index: number) => {
    if (isPathfinding) return;

    setGrid((prevGrid) => {
      const newGrid = [...prevGrid];

      if (startIndex === null) {
        newGrid[index] = "start";
        setStartIndex(index);
      } else if (endIndex === null && index !== startIndex) {
        newGrid[index] = "end";
        setEndIndex(index);
      } else if (newGrid[index] === "wall") {
        newGrid[index] = "empty";
      } else {
        newGrid[index] = "wall";
      }

      return newGrid;
    });
  };

  const handleMouseEnter = (index: number) => {
    if (!mouseDown || isPathfinding) return;
    setGrid((prevGrid) => {
      const newGrid = [...prevGrid];
      if (newGrid[index] === "empty") newGrid[index] = "wall";
      return newGrid;
    });
  };

  const startSearch = () => {
    if (!selectedAlgorithm) return;
    setIsPathfinding(true);

    switch (selectedAlgorithm) {
      case "BFS":
        bfs(startIndex!, endIndex!, grid, animatePath);
        break;
      case "DFS":
        dfs(startIndex!, endIndex!, grid, animatePath);
        break;
      case "Dijkstra":
        dijkstra(startIndex!, endIndex!, grid, animatePath);
        break;
      case "A*":
        aStar(startIndex!, endIndex!, grid, animatePath);
        break;
      default:
        break;
    }
  };

  const animatePath = (path: number[]) => {
    let i = 0;
    const interval = setInterval(() => {
      setGrid((prevGrid) => {
        const newGrid = [...prevGrid];
        if (i < path.length) newGrid[path[i]] = "path";
        i++;
        return newGrid;
      });

      if (i >= path.length) {
        clearInterval(interval);
        setIsPathfinding(false);
      }
    }, 30);
  };

  return (
    <div className="flex flex-col items-center">
      <Dropdown selectedAlgorithm={selectedAlgorithm} setSelectedAlgorithm={setSelectedAlgorithm} />
      <Controls selectedAlgorithm={selectedAlgorithm} isPathfinding={isPathfinding} startSearch={startSearch} />
      <div className="grid grid-cols-20 gap-[1px] bg-gray-300 p-2 border border-gray-500">
        {grid.map((cell, index) => (
          <div key={index} className={`w-6 h-6 border cursor-pointer ${cell === "wall" ? "bg-black" : ""}`} />
        ))}
      </div>
    </div>
  );
}
