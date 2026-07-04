import React, { useState, useEffect } from "react";
import { Zap, ChevronRight, MessageCircle, Volume2, Trophy, Flame } from "lucide-react";

interface MatchEvent {
  time: string;
  text: string;
  type: "four" | "six" | "wicket" | "run" | "dot" | "goal" | "card";
}

export default function LiveMatchBanner() {
  // Live score dynamic simulation
  const [cricketScore, setCricketScore] = useState({
    runs: 168,
    wickets: 5,
    overs: 18,
    balls: 2,
    batsman1: { name: "Babar Azam", runs: 74, balls: 51 },
    batsman2: { name: "Shaheen Afridi", runs: 12, balls: 6 },
    target: 182,
    lastEvent: "Shaheen takes a quick single. Babar Azam back on strike!",
    recentBalls: ["1", "4", "W", "2", "6", "1"]
  });

  const [footballScore, setFootballScore] = useState({
    home: "Real Madrid",
    away: "Manchester City",
    homeScore: 2,
    awayScore: 2,
    minutes: 82,
    lastEvent: "Vinícius Jr. forces an incredible save from Ederson!"
  });

  const [activeTab, setActiveTab] = useState<"cricket" | "football">("cricket");

  // Dynamic Simulator
  useEffect(() => {
    const timer = setInterval(() => {
      // Simulate Cricket updates
      setCricketScore(prev => {
        let nBalls = prev.balls + 1;
        let nOvers = prev.overs;
        if (nBalls >= 6) {
          nBalls = 0;
          nOvers += 1;
        }

        // If target is chased or 20 overs reached, reset
        if (prev.runs >= prev.target || nOvers >= 20) {
          return {
            runs: 124,
            wickets: 2,
            overs: 14,
            balls: 1,
            batsman1: { name: "Babar Azam", runs: 42, balls: 31 },
            batsman2: { name: "Mohammad Rizwan", runs: 58, balls: 46 },
            target: 182,
            lastEvent: "Match restarted! Pakistan chasing 182.",
            recentBalls: ["1", "2", "4", "1", "1", "0"]
          };
        }

        // Randomly pick outcome of the ball
        const outcomes = [
          { val: 1, label: "Single to deep midwicket.", type: "run" },
          { val: 2, label: "Great running! They push for two.", type: "run" },
          { val: 4, label: "FOUR! Beautiful cover drive by Babar Azam!", type: "four" },
          { val: 6, label: "SIX! Launched over long-on! What a hit!", type: "six" },
          { val: 0, label: "Good length delivery, defensive stroke.", type: "dot" },
          { val: "W", label: "OUT! Caught at long-off! A huge blow for Pakistan.", type: "wicket" }
        ];
        
        const roll = outcomes[Math.floor(Math.random() * outcomes.length)];
        let nRuns = prev.runs;
        let nWickets = prev.wickets;
        let b1 = { ...prev.batsman1 };
        let b2 = { ...prev.batsman2 };
        let eventText = "";

        if (roll.val === "W") {
          nWickets += 1;
          eventText = "WICKET! " + prev.batsman1.name + " departs. HM Sports recovery tools needed in the dressing room!";
          b1 = { name: "Naseem Shah", runs: 0, balls: 0 };
        } else {
          const runVal = roll.val as number;
          nRuns += runVal;
          b1.runs += runVal;
          eventText = roll.label;
        }
        b1.balls += 1;

        // Rotate strike on odd runs
        if (roll.val !== "W" && (roll.val as number) % 2 !== 0) {
          const temp = b1;
          b1 = b2;
          b2 = temp;
        }

        const newRecents = [...prev.recentBalls.slice(1), roll.val.toString()];

        return {
          ...prev,
          runs: nRuns,
          wickets: nWickets,
          overs: nOvers,
          balls: nBalls,
          batsman1: b1,
          batsman2: b2,
          lastEvent: eventText,
          recentBalls: newRecents
        };
      });

      // Simulate Football minutes and events
      setFootballScore(prev => {
        let nMin = prev.minutes + 1;
        if (nMin > 90) {
          nMin = 1;
          return {
            home: "Real Madrid",
            away: "Manchester City",
            homeScore: 0,
            awayScore: 0,
            minutes: 1,
            lastEvent: "Kickoff! High intensity clash starts at Santiago Bernabéu."
          };
        }

        // Random goal chance
        let hScore = prev.homeScore;
        let aScore = prev.awayScore;
        let event = prev.lastEvent;

        if (Math.random() > 0.93) {
          if (Math.random() > 0.5) {
            hScore += 1;
            event = `GOAL!!! Real Madrid score through an explosive header! State of absolute euphoria!`;
          } else {
            aScore += 1;
            event = `GOAL!!! Manchester City pull one back with a majestic team goal!`;
          }
        } else if (Math.random() > 0.8) {
          const commentators = [
            "Foul in the midfield. Yellow card shown.",
            "Incredible piece of skill on the wings!",
            "Corner kick cleared comfortably by the defense.",
            "Substitution: Fresh legs on the pitch.",
            "Counter-attack halted by a brilliant sliding tackle."
          ];
          event = commentators[Math.floor(Math.random() * commentators.length)];
        }

        return {
          ...prev,
          minutes: nMin,
          homeScore: hScore,
          awayScore: aScore,
          lastEvent: event
        };
      });

    }, 8000); // lightweight data-saving simulation polling every 8s

    return () => clearInterval(timer);
  }, []);

  return (
    <div className="bg-pitchgreen-dark border-b border-limeaccent/30 text-white select-none">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col sm:flex-row items-center justify-between py-2 sm:h-12 gap-2 text-xs">
          
          {/* Live indicator and Switcher */}
          <div className="flex items-center space-x-2.5 flex-shrink-0">
            <span className="flex items-center space-x-1.5 bg-red-500/20 text-red-400 font-mono font-black uppercase px-2 py-0.5 rounded border border-red-500/30">
              <span className="h-2 w-2 rounded-full bg-red-500 animate-ping inline-block" />
              <span>LIVE</span>
            </span>
            
            {/* Quick Micro Switcher */}
            <div className="flex bg-pitchgreen-light/40 border border-pitchgreen-light/60 rounded-md p-0.5 font-sans">
              <button
                onClick={() => setActiveTab("cricket")}
                className={`px-2.5 py-0.5 rounded text-[10px] font-bold transition-all ${
                  activeTab === "cricket"
                    ? "bg-limeaccent text-pitchgreen-dark"
                    : "text-gray-400 hover:text-white"
                }`}
              >
                🇵🇰 Cricket
              </button>
              <button
                onClick={() => setActiveTab("football")}
                className={`px-2.5 py-0.5 rounded text-[10px] font-bold transition-all ${
                  activeTab === "football"
                    ? "bg-limeaccent text-pitchgreen-dark"
                    : "text-gray-400 hover:text-white"
                }`}
              >
                🇪🇺 Football
              </button>
            </div>
          </div>

          {/* Dynamic Match Score text */}
          <div className="flex-grow text-center px-4 font-sans font-medium text-gray-200 truncate">
            {activeTab === "cricket" ? (
              <div className="flex items-center justify-center space-x-2 flex-wrap">
                <span className="text-limeaccent font-black tracking-wide">PAKISTAN vs INDIA</span>
                <span className="text-gray-400">|</span>
                <span className="font-mono text-white bg-pitchgreen-light/30 px-1.5 py-0.5 rounded border border-pitchgreen-light/30 font-bold">
                  {cricketScore.runs}/{cricketScore.wickets}
                </span>
                <span className="text-gray-400">({cricketScore.overs}.{cricketScore.balls} Ov)</span>
                <span className="text-gray-500">•</span>
                <span className="text-[11px] text-gray-300 italic hidden md:inline">
                  {cricketScore.lastEvent}
                </span>
              </div>
            ) : (
              <div className="flex items-center justify-center space-x-2 flex-wrap">
                <span className="text-limeaccent font-black tracking-wide">UEFA UCL LIVE</span>
                <span className="text-gray-400">|</span>
                <span className="font-bold text-white">
                  {footballScore.home} {footballScore.homeScore} - {footballScore.awayScore} {footballScore.away}
                </span>
                <span className="text-red-400 font-mono">({footballScore.minutes}')</span>
                <span className="text-gray-500">•</span>
                <span className="text-[11px] text-gray-300 italic hidden md:inline">
                  {footballScore.lastEvent}
                </span>
              </div>
            )}
          </div>

          {/* Quick-buy localized hook */}
          <div className="flex items-center space-x-3 flex-shrink-0">
            {activeTab === "cricket" ? (
              <a
                href="#product-card-bat-grip"
                className="text-[10px] bg-limeaccent text-pitchgreen-dark hover:bg-white font-sans font-black uppercase px-2.5 py-1 rounded transition-colors tracking-wider flex items-center space-x-1"
              >
                <Flame className="h-3 w-3 animate-pulse text-red-600" />
                <span>Shop Bat Grip</span>
              </a>
            ) : (
              <a
                href="#product-card-training-shoes"
                className="text-[10px] bg-limeaccent text-pitchgreen-dark hover:bg-white font-sans font-black uppercase px-2.5 py-1 rounded transition-colors tracking-wider flex items-center space-x-1"
              >
                <Trophy className="h-3 w-3 text-pitchgreen" />
                <span>Shop Shoes</span>
              </a>
            )}
          </div>

        </div>
      </div>
    </div>
  );
}
