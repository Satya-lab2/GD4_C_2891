'use client';

import React, { useState, useEffect } from 'react';
import GameBoard from '../components/GameBoard';
import ScoreBoard from '../components/ScoreBoard';

import { GiCardJoker } from 'react-icons/gi';
import { FaAppleAlt, FaLemon, FaHeart, FaStar, FaMoon, FaFire} from 'react-icons/fa';
import { IoDiamond } from "react-icons/io5";
import { AiFillThunderbolt } from "react-icons/ai";
import { FaSmile, FaMeh, FaSkull } from "react-icons/fa";

const ICONS = [
  { icon: FaAppleAlt, color: '#ef4444' },
  { icon: FaLemon, color: '#eab308' },
  { icon: FaHeart, color: '#ec4899' },
  { icon: FaStar, color: '#f97316' },
  { icon: IoDiamond, color: '#06b6d4' },
  { icon: AiFillThunderbolt, color: '#a855f7' },
  { icon: FaMoon, color: '#22c55e' },
  { icon: FaFire, color: '#f43f5e' }
];

function shuffleArray(array) {
  const shuffled = [...array];

  for (let i = shuffled.length - 1; i > 0; i--) {

    const j = Math.floor(Math.random() * (i + 1));

    [shuffled[i], shuffled[j]] =
      [shuffled[j], shuffled[i]];
  }

  return shuffled;
}

function createCards(pairs) {

  const selected = ICONS.slice(0, pairs);

  const paired = selected.flatMap((item, index) => [

    {
      id: index * 2,
      icon: item.icon,
      color: item.color,
      pairId: index
    },

    {
      id: index * 2 + 1,
      icon: item.icon,
      color: item.color,
      pairId: index
    }

  ]);

  return shuffleArray(paired);
}

export default function Home() {

  const [difficulty, setDifficulty] = useState(4);
  const [cards, setCards] = useState([]);
  const [flippedCards, setFlippedCards] = useState([]);
  const [matchedCards, setMatchedCards] = useState([]);
  const [moves, setMoves] = useState(0);
  const [time, setTime] = useState(0);

  const isGameComplete =
    matchedCards.length / 2 === difficulty;

  useEffect(() => {
    resetGame();
  }, [difficulty]);

  useEffect(() => {

    if (isGameComplete) return;

    const timer = setInterval(() => {
      setTime((prev) => prev + 1);
    }, 1000);

    return () => clearInterval(timer);

  }, [matchedCards]);

  useEffect(() => {

    if (flippedCards.length === 2) {

      const [firstId, secondId] = flippedCards;

      const firstCard =
        cards.find((c) => c.id === firstId);

      const secondCard =
        cards.find((c) => c.id === secondId);

      setMoves((prev) => prev + 1);

      if (firstCard.pairId === secondCard.pairId) {

        setMatchedCards((prev) => [
          ...prev,
          firstId,
          secondId
        ]);

        setFlippedCards([]);

      } else {

        const timer = setTimeout(() => {
          setFlippedCards([]);
        }, 800);

        return () => clearTimeout(timer);
      }
    }

  }, [flippedCards]);

  const handleCardFlip = (id) => {

    if (
      flippedCards.length < 2 &&
      !flippedCards.includes(id)
    ) {
      setFlippedCards((prev) => [...prev, id]);
    }
  };

  const resetGame = () => {

    setCards(createCards(difficulty));
    setFlippedCards([]);
    setMatchedCards([]);
    setMoves(0);
    setTime(0);
  };

  return (

    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-indigo-950 via-purple-900 to-fuchsia-900 relative overflow-hidden">

      <div className="absolute w-[500px] h-[500px] bg-purple-600 opacity-30 blur-[150px] rounded-full top-[-150px] left-[-150px]"></div>
      <div className="absolute w-[500px] h-[500px] bg-pink-600 opacity-30 blur-[150px] rounded-full bottom-[-150px] right-[-150px]"></div>

      <div className="relative flex flex-col items-center text-center gap-8">

        <h1 className="text-5xl font-bold text-white flex items-center gap-3">

          <GiCardJoker className="text-yellow-400 text-5xl"/>

          Memory Card

        </h1>

        <div className="flex gap-4">

          <button
            onClick={() => setDifficulty(4)}
            className={`px-6 py-3 rounded-full flex items-center gap-2 border transition
            ${difficulty === 4
              ? "bg-yellow-400 text-indigo-900 font-bold shadow-lg"
              : "bg-white/10 text-white border-white/20"}`}
          >
            <FaSmile/> Easy (4)
          </button>

          <button
            onClick={() => setDifficulty(6)}
            className={`px-6 py-3 rounded-full flex items-center gap-2 border transition
            ${difficulty === 6
              ? "bg-yellow-400 text-indigo-900 font-bold shadow-lg"
              : "bg-white/10 text-white border-white/20"}`}
          >
            <FaMeh/> Medium (6)
          </button>

          <button
            onClick={() => setDifficulty(8)}
            className={`px-6 py-3 rounded-full flex items-center gap-2 border transition
            ${difficulty === 8
              ? "bg-yellow-400 text-indigo-900 font-bold shadow-lg"
              : "bg-white/10 text-white border-white/20"}`}
          >
            <FaSkull/> Hard (8)
          </button>

        </div>

        <ScoreBoard
          moves={moves}
          matchedCount={matchedCards.length / 2}
          totalPairs={difficulty}
          time={time}
          onReset={resetGame}
        />

        <div className="bg-white/10 backdrop-blur-xl border border-white/20 p-8 rounded-3xl shadow-2xl">

          <GameBoard
            cards={cards}
            flippedCards={flippedCards}
            matchedCards={matchedCards}
            onFlip={handleCardFlip}
          />

        </div>

      </div>

    </div>
  );
}