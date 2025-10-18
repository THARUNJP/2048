export default function Header({
  score,
  bestScore,
  newGame,
}: {
  score: number;
  bestScore: number;
  newGame: () => void;
}) {
  return (
    <header className="flex flex-col sm:flex-row items-center sm:justify-between px-4 sm:px-8 py-6 bg-[#faf8ef] text-[#776e65] gap-4 sm:gap-0">
      {/* Left Section - Logo */}
      <div className="flex items-center space-x-3">
        <h1 className="text-3xl sm:text-4xl font-extrabold">2048</h1>
      </div>

      {/* Middle Section - Score Boxes */}
      <div className="flex items-center space-x-3">
        <div className="flex flex-col items-center bg-[#bbada0]/30 rounded-md px-4 py-2">
          <span className="text-xs font-semibold uppercase text-[#bbada0]">
            Score
          </span>
          <span className="text-lg font-bold text-[#776e65]">{score}</span>
        </div>
        <div className="flex flex-col items-center bg-[#bbada0]/30 rounded-md px-4 py-2">
          <span className="text-xs font-semibold uppercase text-[#bbada0]">
            Best
          </span>
          <span className="text-lg font-bold text-[#776e65]">{bestScore}</span>
        </div>
      </div>

      {/* Right Section - Button */}
      <div className="flex items-center space-x-2">
        <button
          onClick={newGame}
          className="bg-[#8f7a66] text-white text-sm font-semibold rounded-md px-4 py-2 shadow-md hover:opacity-90 transition"
        >
          New Game
        </button>
      </div>
    </header>
  );
}
