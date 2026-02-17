import { useParams, Navigate } from "react-router-dom";
import GameControlCenter from "./GameControlCenter";
import GameOpponents from "./GameOpponents";
import GamePlayerCard from "./GamePlayerCard";

const GameBoard = () => {
    const { roomId } = useParams<{ roomId: string }>();
    if (!roomId) {
      return <Navigate to="/game/mock" />;
    }

//   return (
//     <div className="grid grid-cols-3 h-screen w-screen overflow-hidden bg-slate-950">
      
//       {/* LEFT 1/3: Control Center */}
//       <aside className="col-span-1 border-r border-slate-800 bg-slate-900 p-6 flex flex-col">
//         <h2 className="text-xl font-bold text-indigo-400 mb-6 uppercase tracking-widest">
//           Control Center
//         </h2>
        
//         <div className="flex-grow space-y-4">
//           <div className="p-4 bg-slate-800 rounded-md border-l-4 border-green-500">
//             <p className="text-sm text-slate-400">Current Turn</p>
//             <p className="text-lg font-semibold text-white">Your Turn!</p>
//           </div>
          
//           <div className="text-slate-300 text-sm italic">
//             Room ID: {roomId}
//           </div>
//         </div>

//         {/* Action Buttons */}
//         <div className="space-y-2">
//           <button className="w-full py-3 bg-indigo-600 rounded font-bold text-white hover:bg-indigo-500 transition">
//             Request
//           </button>
//           <button className="w-full py-3 bg-slate-700 rounded font-bold text-white hover:bg-slate-600 transition">
//             End Turn
//           </button>
//         </div>
//       </aside>

//       {/* RIGHT 2/3: Game Arena */}
//       <main className="col-span-2 grid grid-rows-3 h-full">
        
//         {/* Top Half: Opponents */}
//         <section className="row-span-2 flex items-center justify-around bg-slate-800/50 p-4 border-b border-slate-800">
//           {[1, 2, 3].map((num) => (
//             <div key={num} className="flex flex-col items-center gap-2">
//               <div className="w-20 h-20 rounded-full bg-slate-700 border-2 border-slate-600 flex items-center justify-center text-white text-xl shadow-lg">
//                 P{num + 1}
//               </div>
//               <span className="text-slate-400 text-xs font-medium">Opponent {num}</span>
//             </div>
//           ))}
//         </section>

//         {/* Bottom Half: Player's Hand */}
//         <section className=" row-span-1 p-8 flex flex-col items-center">
//           <h3 className="text-slate-500 uppercase text-xs font-bold mb-6 self-start">Your Cards</h3>
//           <div className="flex gap-4 overflow-x-auto pb-4">
//             {/* Mock Cards */}
//             {[1, 2, 3, 4, 5].map((c) => (
//               <div key={c} className="w-24 h-36 bg-white rounded-lg shadow-2xl transform hover:-translate-y-4 transition-transform cursor-pointer border-2 border-slate-300" />
//             ))}
//           </div>
//         </section>

//       </main>
//     </div>
//   );
// };

    return (
      <div className="grid grid-cols-3 h-screen w-screen overflow-hidden bg-slate-950">
        <GameControlCenter roomId={roomId!} />
        <main className="col-span-2 grid grid-rows-3 h-full">
          <GameOpponents className="row-span-2" />
          <GamePlayerCard className="row-span-1" />
        </main>
      </div>
    );
  };

export default GameBoard;