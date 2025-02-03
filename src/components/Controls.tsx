import React from "react";

type Props = {
  selectedAlgorithm: string;
  isPathfinding: boolean;
  startSearch: () => void;
  resetGrid: () => void;
};

export default function Controls({ selectedAlgorithm, isPathfinding, startSearch, resetGrid }: Props) {
  return (
    <div className="flex gap-4 mb-4">
      {/* Start Search Button */}
      <button
        className={`px-6 py-2 rounded-md text-white transition ${
          isPathfinding || !selectedAlgorithm
            ? "bg-gray-500 cursor-not-allowed" // Disabled button (gray)
            : "bg-black hover:bg-gray-800"
        }`}
        onClick={startSearch}
        disabled={isPathfinding || !selectedAlgorithm}
      >
        Start Search
      </button>

      {/* Reset Grid Button */}
      <button
        className="px-6 py-2 bg-red-600 hover:bg-red-800 text-white rounded-md transition"
        onClick={resetGrid}
      >
        Reset Grid
      </button>
    </div>
  );
}
