import React from "react";
import { FaQuestion } from "react-icons/fa";

function Card({ card, isFlipped, isMatched, onFlip }) {

  const handleClick = () => {

    if (!isFlipped && !isMatched) {
      onFlip(card.id);
    }

  };

  const isOpen = isFlipped || isMatched;
  const IconComponent = card.icon;

  return (

    <div
      onClick={handleClick}
      className={`
      w-24 h-24 flex items-center justify-center text-3xl
      rounded-xl cursor-pointer select-none
      transition-all duration-300
      ${isOpen
        ? "bg-white shadow-md"
        : "bg-gradient-to-br from-purple-500 to-indigo-600 hover:scale-110 shadow-lg"}
      ${isMatched ? "ring-4 ring-green-400" : ""}
      `}
    >

      {isOpen ? (
        <IconComponent style={{ color: card.color }} />
      ) : (
        <FaQuestion className="text-white/70" />
      )}

    </div>

  );
}

export default Card;