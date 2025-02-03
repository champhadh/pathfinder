"use client";

import React, { useState, useEffect } from "react";
import Dropdown from "./Dropdown";
import Controls from "./Controls";
import { bfs } from "../algorithms/bfs";
import { dfs } from "../algorithms/dfs";
import { dijkstra } from "../algorithms/dijkstra";
import { aStar } from "../algorithms/astar";

const GRID_SIZE = 20;

type CellType = "empty" | "wall" | "start" | "end" | "path" | "visited";

export default function Grid() {
  const [grid, setGrid] = useState<CellType[]>(Array(GRID_SIZE * GRID_SIZE).fill("empty"));
  const [startIndex, setStartIndex] = useState<number | null>(null);
  const [endIndex, setEndIndex] = useState<number | null>(null);
  const [isPathfinding, setIsPathfinding] = useState(false);
  const [mouseDown, setMouseDown] = useState(false);
  const [selectedAlgorithm, setSelectedAlgorithm] = useState<string>("");

  // Enable Mouse Click & Dragging for Walls
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
        bfs(startIndex!, endIndex!, grid, animateSearch);
        break;
      case "DFS":
        dfs(startIndex!, endIndex!, grid, animateSearch);
        break;
      case "Dijkstra":
        dijkstra(startIndex!, endIndex!, grid, animateSearch);
        break;
      case "A*":
        aStar(startIndex!, endIndex!, grid, animateSearch);
        break;
      default:
        break;
    }
  };

  const animateSearch = (visitedNodesInOrder: number[], shortestPath: number[] = []) => {
    let i = 0;
    const interval = setInterval(() => {
      setGrid((prevGrid) => {
        const newGrid = [...prevGrid];

        // Show search expansion (dark gray for visited nodes)
        if (i < visitedNodesInOrder.length) {
          const node = visitedNodesInOrder[i];
          if (newGrid[node] !== "start" && newGrid[node] !== "end") {
            newGrid[node] = "visited"; // Dark gray
          }
        }
        // Show shortest path (Purple instead of yellow)
        else if (shortestPath.length > 0 && i - visitedNodesInOrder.length < shortestPath.length) {
          const pathIndex = i - visitedNodesInOrder.length;
          const node = shortestPath[pathIndex];
          if (newGrid[node] !== "start" && newGrid[node] !== "end") {
            newGrid[node] = "path"; // Purple path
          }
        } else {
          clearInterval(interval);
          setIsPathfinding(false);
        }

        i++;
        return newGrid;
      });
    }, 10); // Faster animation
  };

  const resetGrid = () => {
    setGrid(Array(GRID_SIZE * GRID_SIZE).fill("empty")); // Reset grid
    setStartIndex(null);
    setEndIndex(null);
    setIsPathfinding(false);
  };

  return (
    <div className="flex flex-col items-center">
      <Dropdown selectedAlgorithm={selectedAlgorithm} setSelectedAlgorithm={setSelectedAlgorithm} />
      <Controls
        selectedAlgorithm={selectedAlgorithm}
        isPathfinding={isPathfinding}
        startSearch={startSearch}
        resetGrid={resetGrid}
      />

      {/* Grid Container */}
      <div className="relative">
        <div
          className="grid grid-cols-20 gap-[1px] bg-gray-300 p-2 border border-gray-500"
          onMouseDown={() => setMouseDown(true)}
        >
          {grid.map((cell, index) => (
            <div
              key={index}
              className={`w-6 h-6 border cursor-pointer transition-colors duration-100 ${
                cell === "wall" ? "bg-black" : ""
              } ${cell === "start" ? "bg-green-500" : ""} ${cell === "end" ? "bg-red-500" : ""} ${
                cell === "path" ? "bg-purple-500" : "" // Changed to Purple
              } ${cell === "visited" ? "bg-gray-700" : ""}`} // Dark gray for visited nodes
              onClick={() => handleCellClick(index)}
              onMouseEnter={() => handleMouseEnter(index)}
            />
          ))}
        </div>

        {/* Footer Section */}
        <div className="flex justify-between items-center w-full text-black text-sm mt-2 px-2">
          <span className="text-left">Made by Hady Wehbe</span>

          <a
            href="https://github.com/your-repo-link"
            target="_blank"
            rel="noopener noreferrer"
            className="px-4 py-2 bg-gray-900 text-white text-xs rounded-md hover:bg-gray-700 transition"
          >
            GitHub Repository
          </a>
        </div>
      </div>
    </div>
  );
}
