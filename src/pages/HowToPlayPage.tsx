import React from "react";

import HomePageNavBar from "@/pages/HomePage/HomePageNavBar";

const HowToPlayPage: React.FC = () => {
  return (
    <div className="min-h-screen background-color">
      <HomePageNavBar />
      <main className="max-w-2xl mx-auto px-4 py-12">
        {/* Hero header */}
        <div className="mb-10 text-center">
          <h1 className="text-4xl font-bold mb-2 tracking-tight text-white drop-shadow">
            PickPoker <span className="text-rave-red">(4-Players)</span>
          </h1>
          <div className="mx-auto w-16 h-1 bg-gradient-to-r from-rave-black to-rave-red  mb-4"></div>
          <p className="text-base text-gray-300 max-w-xl mx-auto">
            Master the rules and strategies to become the PickPoker champion!
          </p>
        </div>

        <section className="bg-white/5 border border-rave-red/50  p-6 mb-8 shadow-sm">
          <h2 className="text-xl font-semibold mb-2 text-rave-red">
            Objective
          </h2>
          <p className="text-sm leading-relaxed">
            The primary goal is to collect the highest number of{" "}
            <strong>Books</strong>. A Book is a complete set of four cards of
            the same rank (e.g., all four 7s).
          </p>
        </section>

        <section className="bg-white/5 border border-rave-red/50  p-6 mb-8 shadow-sm">
          <h2 className="text-xl font-semibold mb-2 text-rave-red">
            1. Match Setup & Distribution
          </h2>
          <ul className="list-disc pl-5 text-sm leading-relaxed">
            <li>
              <strong>Players:</strong> 4
            </li>
            <li>
              <strong>Starting Hand:</strong> Each player is dealt 13 cards from
              a standard 52-card deck.
            </li>
            <li>
              <strong>Game Duration:</strong> The match continues until all 13
              possible Books have been collected, unless a Dominant Winner is
              identified early.
            </li>
          </ul>
        </section>

        <section className="bg-white/5 border border-rave-red/50  p-6 mb-8 shadow-sm">
          <h2 className="text-xl font-semibold mb-2 text-rave-red">
            2. Turn Mechanics & Time Limits
          </h2>
          <ul className="list-disc pl-5 text-sm leading-relaxed">
            <li>
              <strong>Active Turn:</strong> Players select an opponent and
              request a specific card rank (e.g., "Player B, do you have any
              3s?").
            </li>
            <li>
              <strong>Time Limit:</strong> Each turn has a 1-minute limit.
              Failure to make a selection within this window results in an
              automatic forfeit of the turn.
            </li>
            <li>
              <strong>Success & Continuity:</strong> If the requested opponent
              possesses the card, they must surrender the requested card. The
              active player is granted an additional turn, and the 1-minute
              timer resets.
            </li>
            <li>
              <strong>Failure:</strong> If the request is incorrect, the player
              loses their turn, and play passes to the next participant.
            </li>
            <li>
              <strong>Live Chat Logs:</strong> All actions are broadcasted in
              the live chat, detailing which player made a request, who the
              target was, and the specific card rank involved.
            </li>
          </ul>
        </section>

        <section className="bg-white/5 border border-rave-red/50  p-6 mb-8 shadow-sm">
          <h2 className="text-xl font-semibold mb-2 text-rave-red">
            3. Gameplay Continuity
          </h2>
          <ul className="list-disc pl-5 text-sm leading-relaxed">
            <li>
              <strong>Depleted Hands:</strong> If a player runs out of cards
              before all 13 Books are collected, they remain in the game. They
              may continue requesting cards from opponents to build new Books.
            </li>
            <li>
              <strong>Abandonment Policy:</strong> If any player leaves the
              match before completion, the session is classified as Abandoned,
              and the match results are voided.
            </li>
          </ul>
        </section>

        <section className="bg-white/5 border border-rave-red/50  p-6 mb-4 shadow-sm">
          <h2 className="text-xl font-semibold mb-2 text-rave-red">
            4. Determination of Winner
          </h2>
          <ul className="list-disc pl-5 text-sm leading-relaxed">
            <li>
              <strong>Dominant Victory (Early Termination):</strong> A match
              will conclude early if a player secures a dominated amount of
              Books. If a player’s score reaches a point where it is
              mathematically impossible for any opponent to catch up or surpass
              them, that player is immediately declared the winner.
            </li>
            <li>
              <strong>Final Scoring:</strong> If the match reaches the full
              collection of 13 Books:
              <ul className="list-disc pl-5 mt-2">
                <li>
                  The player with the highest number of Books is the winner.
                </li>
                <li>
                  <strong>Lucky Draw:</strong> In the event of a tie between 2
                  or 3 players, a randomized lucky draw will be conducted by the
                  system to determine the final winner.
                </li>
              </ul>
            </li>
          </ul>
        </section>
      </main>
    </div>
  );
};

export default HowToPlayPage;
