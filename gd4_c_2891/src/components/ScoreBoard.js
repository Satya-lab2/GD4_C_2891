import React from "react";
import { FaClock, FaMousePointer, FaCheck, FaRedo } from "react-icons/fa";

function ScoreBoard({ moves, matchedCount, totalPairs, time, onReset, onShuffle }) {

  const isGameComplete = matchedCount === totalPairs;

  const minutes = Math.floor(time / 60);
  const seconds = time % 60;

  const formattedTime =
    `${minutes}:${seconds.toString().padStart(2, "0")}`;

  return (

    <div className="text-center">

      {/* SCORE */}
      <div className="flex gap-6 justify-center mb-6">

        <div className="bg-white/10 border border-white/20 backdrop-blur-sm px-5 py-3 rounded-2xl w-36">
          <p className="text-indigo-200 text-sm flex justify-center gap-2">
            <FaClock/> WAKTU
          </p>
          <p className="text-4xl font-bold text-white">
            {formattedTime}
          </p>
        </div>

        <div className="bg-white/10 border border-white/20 backdrop-blur-sm px-5 py-3 rounded-2xl w-36">
          <p className="text-indigo-200 text-sm flex justify-center gap-2">
            <FaMousePointer/> PERCOBAAN
          </p>
          <p className="text-4xl font-bold text-white">
            {moves}
          </p>
        </div>

        <div className="bg-white/10 border border-white/20 backdrop-blur-sm px-5 py-3 rounded-2xl w-36">
          <p className="text-indigo-200 text-sm flex justify-center gap-2">
            <FaCheck/> DITEMUKAN
          </p>
          <p className="text-4xl font-bold text-white">
            {matchedCount}/{totalPairs}
          </p>
        </div>

      </div>

      {isGameComplete && (
        <div className="bg-yellow-400/20 border border-yellow-400 px-6 py-6 rounded-2xl mb-6 w-125">
          <p className="text-yellow-300 text-2xl font-bold">
            🎉 Selamat! Selesai dalam waktu {formattedTime} dengan {moves} percobaan!
          </p>
        </div>
      )}
      <button
        onClick={isGameComplete ? onReset : onShuffle}
        className="px-10 py-4 bg-yellow-400 text-indigo-900 font-bold text-xl rounded-full hover:bg-yellow-300 transition shadow-lg flex items-center gap-3 mx-auto mb-6"
      >
        <FaRedo/>
        {isGameComplete ? "Main Lagi" : "Acak Ulang"}
      </button>


    </div>
  );
}

export default ScoreBoard;