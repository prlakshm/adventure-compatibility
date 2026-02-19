import { useState, useRef, useEffect } from "react";

const questions = [
  {
    id: 1,
    question: "How do you feel about planning a spontaneous weekend getaway?",
    answers: [
      "Love it! The thrill of the unknown excites me",
      "I prefer planning everything in advance",
      "I might consider it if there's some structure",
    ],
  },
  {
    id: 2,
    question: "When choosing a vacation, what appeals to you most?",
    answers: [
      "Backpacking through unknown places",
      "A relaxing resort stay",
      "A mix of adventure and comfort",
    ],
  },
  {
    id: 3,
    question: "Your partner suggests skydiving on your anniversary. What's your response?",
    answers: [
      "Absolutely! Let's do it!",
      "No way! That's too extreme for me",
      "I'd consider it after some research",
    ],
  },
  {
    id: 4,
    question: "How do you handle getting lost while traveling?",
    answers: [
      "I see it as part of the adventure!",
      "I get stressed and frustrated",
      "I try to stay calm and find a solution",
    ],
  },
  {
    id: 5,
    question: "If you had a free day with no plans, what would you do?",
    answers: [
      "Go on a spontaneous road trip or outdoor activity",
      "Stay home and relax",
      "Maybe explore a new café or museum",
    ],
  },
  {
    id: 6,
    question: "What's your ideal way to spend time together?",
    answers: [
      "Hiking, camping, or trying something new",
      "Watching movies or having a quiet dinner",
      "A mix of active and relaxing activities",
    ],
  },
  {
    id: 7,
    question: "How do you feel about trying exotic foods while traveling?",
    answers: [
      "I'm always up for trying anything new!",
      "I prefer sticking to familiar foods",
      "I'll try it if it's not too extreme",
    ],
  },
  {
    id: 8,
    question: "You and your partner have a free weekend. How do you decide what to do?",
    answers: [
      "We pick something exciting last-minute",
      "We plan a laid-back stay-at-home weekend",
      "We discuss and find a compromise",
    ],
  },
  {
    id: 9,
    question: "Your partner surprises you with an outdoor survival camping trip. What's your reaction?",
    answers: [
      "Amazing! I've always wanted to try this!",
      "No thanks, I'd rather be somewhere comfortable",
      "I'd go but would prefer some modern amenities",
    ],
  },
  {
    id: 10,
    question: "How do you feel about high-energy activities like zip-lining or scuba diving?",
    answers: [
      "I thrive on them and would do them often!",
      "I'd rather pass on anything too intense",
      "I'd try it once, but it's not my go-to",
    ],
  },
];

const SCORE_LABELS = ["A", "B", "C"];

function computeCompatibility(p1, p2) {
  // A=0 (one extreme), B=2 (other extreme), C=1 (middle)
  const remap = [0, 2, 1];
  
  let totalScore = 0;
  for (let i = 0; i < questions.length; i++) {
    const diff = Math.abs(remap[p1[i]] - remap[p2[i]]);
    if (diff === 0) totalScore += 2;
    else if (diff === 1) totalScore += 1;
    else totalScore += 0;
  }
  const maxScore = questions.length * 2;
  return Math.round((totalScore / maxScore) * 100);
}

function getResultMessage(pct) {
  if (pct >= 85)
    return {
      title: "Adventure Soulmates",
      desc: "You're practically the same person when it comes to adventure. Every trip, every leap, every wild idea, you'll share it together.",
      emoji: "🔥",
      color: "#c0392b",
    };
  if (pct >= 65)
    return {
      title: "Great Match",
      desc: "You complement each other beautifully. Your differences in adventure style will push you both to try new things.",
      emoji: "✨",
      color: "#8e44ad",
    };
  if (pct >= 45)
    return {
      title: "Balanced Pair",
      desc: "You have different adventure styles, but that's what makes you interesting together. Compromise will be your superpower.",
      emoji: "⚖️",
      color: "#2980b9",
    };
  return {
    title: "Opposites Attract",
    desc: "You see adventure very differently, but love has always thrived between contrasts. Your journeys together will be surprising.",
    emoji: "🌊",
    color: "#27ae60",
  };
}

function QuestionBlock({ q, index, answer, onAnswer, personColor }) {
  return (
    <div
      style={{
        marginBottom: "2.5rem",
        opacity: 1,
        animation: "fadeUp 0.4s ease forwards",
        animationDelay: `${index * 0.05}s`,
      }}
    >
      <div style={{ display: "flex", alignItems: "flex-start", gap: "1rem", marginBottom: "1rem" }}>
        <span
          style={{
            fontFamily: "'Playfair Display', serif",
            fontSize: "1.5rem",
            color: personColor,
            fontWeight: 700,
            lineHeight: 1,
            minWidth: "2rem",
            opacity: 0.5,
          }}
        >
          {index + 1}
        </span>
        <p
          style={{
            fontFamily: "'Lora', serif",
            fontSize: "1.1rem",
            color: "#2c1a0e",
            lineHeight: 1.6,
            margin: 0,
            fontWeight: 600,
          }}
        >
          {q.question}
        </p>
      </div>
      <div style={{ display: "flex", flexDirection: "column", gap: "0.6rem", paddingLeft: "3rem" }}>
        {q.answers.map((ans, ai) => {
          const selected = answer === ai;
          return (
            <button
              key={ai}
              onClick={() => onAnswer(index, ai)}
              style={{
                display: "flex",
                alignItems: "center",
                gap: "0.75rem",
                padding: "0.75rem 1.2rem",
                borderRadius: "0.75rem",
                border: selected ? `2px solid ${personColor}` : "2px solid #e8ddd4",
                background: selected ? `${personColor}18` : "#faf7f4",
                cursor: "pointer",
                transition: "all 0.2s ease",
                textAlign: "left",
                fontFamily: "'Lora', serif",
                fontSize: "0.95rem",
                color: selected ? "#2c1a0e" : "#5a4a3a",
                fontWeight: selected ? 600 : 400,
                boxShadow: selected ? `0 2px 12px ${personColor}30` : "none",
              }}
            >
              <span
                style={{
                  width: "1.4rem",
                  height: "1.4rem",
                  borderRadius: "50%",
                  border: selected ? `2px solid ${personColor}` : "2px solid #c5b8ae",
                  background: selected ? personColor : "transparent",
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  flexShrink: 0,
                  fontSize: "0.65rem",
                  color: "white",
                  fontWeight: 700,
                  fontFamily: "sans-serif",
                }}
              >
                {selected ? "✓" : SCORE_LABELS[ai]}
              </span>
              {ans}
            </button>
          );
        })}
      </div>
    </div>
  );
}

export default function App() {
  const [phase, setPhase] = useState("intro"); // intro | person1 | person2 | results
  const [person1Name, setPerson1Name] = useState("");
  const [person2Name, setPerson2Name] = useState("");
  const [nameInput1, setNameInput1] = useState("");
  const [nameInput2, setNameInput2] = useState("");
  const [answers1, setAnswers1] = useState(Array(10).fill(null));
  const [answers2, setAnswers2] = useState(Array(10).fill(null));
  const topRef = useRef(null);

  const scrollToTop = () => {
    setTimeout(() => topRef.current?.scrollIntoView({ behavior: "smooth" }), 50);
  };

  const allAnswered1 = answers1.every((a) => a !== null);
  const allAnswered2 = answers2.every((a) => a !== null);

  const handleAnswer1 = (qi, ai) => {
    const next = [...answers1];
    next[qi] = ai;
    setAnswers1(next);
  };

  const handleAnswer2 = (qi, ai) => {
    const next = [...answers2];
    next[qi] = ai;
    setAnswers2(next);
  };

  const compatibility = phase === "results" ? computeCompatibility(answers1, answers2) : null;
  const result = compatibility !== null ? getResultMessage(compatibility) : null;

  const person1Label = person1Name || "Person 1";
  const person2Label = person2Name || "Person 2";

  const P1_COLOR = "#b5451b";
  const P2_COLOR = "#2c6e8a";

  return (
    <div
      ref={topRef}
      style={{
        minHeight: "100vh",
        background: "linear-gradient(160deg, #ecddd3 0%, #f5ede4 35%, #dde8f0 100%)",
        fontFamily: "'Lora', serif",
        color: "#2c1a0e",
      }}
    >
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Playfair+Display:ital,wght@0,700;0,900;1,700&family=Lora:wght@400;600&display=swap');
        @keyframes fadeUp {
          from { opacity: 0; transform: translateY(16px); }
          to { opacity: 1; transform: translateY(0); }
        }
        @keyframes pulse {
          0%, 100% { transform: scale(1); }
          50% { transform: scale(1.05); }
        }
        * { box-sizing: border-box; }
        button:hover { filter: brightness(0.95); }
      `}</style>

      {/* HEADER */}
      <header
        style={{
          textAlign: "center",
          padding: "4rem 2rem 2rem",
          position: "relative",
          overflow: "hidden",
        }}
      >
        <h1
          style={{
            fontFamily: "'Playfair Display', serif",
            fontSize: "clamp(2.2rem, 5vw, 3.8rem)",
            fontWeight: 900,
            color: "#2c1a0e",
            lineHeight: 1.15,
            margin: "0 auto 1.5rem",
            maxWidth: "700px",
          }}
        >
          Couple Adventure
          <br />
          <em style={{ color: P1_COLOR }}>Compatibility</em> Quiz
        </h1>
        <p
          style={{
            fontFamily: "'Lora', serif",
            fontSize: "1rem",
            color: "#6b5040",
            maxWidth: "520px",
            margin: "0 auto",
            lineHeight: 1.7,
          }}
        >
          Are you and your partner on the same page when it comes to adventure? Explore how your styles align — or beautifully contrast.
        </p>
        <div
          style={{
            display: "flex",
            justifyContent: "center",
            gap: "2rem",
            marginTop: "1.5rem",
            fontSize: "0.8rem",
            color: "#8a7060",
            letterSpacing: "0.1em",
          }}
        >
          <span>10 Questions</span>
          <span style={{ opacity: 0.4 }}>·</span>
          <span>2 Players</span>
          <span style={{ opacity: 0.4 }}>·</span>
          <span>~5 min</span>
        </div>

        {/* Decorative line */}
        <div style={{ display: "flex", alignItems: "center", justifyContent: "center", gap: "1rem", marginTop: "2.5rem" }}>
          <div style={{ height: "1px", width: "60px", background: "linear-gradient(to right, transparent, #c5a898)" }} />
          <span style={{ fontSize: "1.2rem" }}>♡</span>
          <div style={{ height: "1px", width: "60px", background: "linear-gradient(to left, transparent, #c5a898)" }} />
        </div>
      </header>

      <main style={{ maxWidth: "680px", margin: "0 auto", padding: "0 1.5rem 6rem" }}>

        {/* ===== INTRO / NAME ENTRY ===== */}
        {phase === "intro" && (
          <div style={{ animation: "fadeUp 0.5s ease" }}>
            <div
              style={{
                background: "white",
                borderRadius: "1.5rem",
                padding: "2.5rem",
                boxShadow: "0 4px 40px #b5451b12",
                marginBottom: "1.5rem",
              }}
            >
              <p
                style={{
                  fontFamily: "'Playfair Display', serif",
                  fontSize: "1.1rem",
                  color: "#5a3a2a",
                  marginBottom: "1.8rem",
                  lineHeight: 1.6,
                }}
              >
                Enter both names to begin. Each person will answer all 10 questions privately — then we'll reveal how compatible you really are.
              </p>

              <div style={{ display: "flex", flexDirection: "column", gap: "1.2rem" }}>
                <div>
                  <label
                    style={{
                      display: "block",
                      fontSize: "0.75rem",
                      letterSpacing: "0.15em",
                      textTransform: "uppercase",
                      color: P1_COLOR,
                      marginBottom: "0.5rem",
                      fontFamily: "sans-serif",
                      fontWeight: 600,
                    }}
                  >
                    ● Person 1
                  </label>
                  <input
                    value={nameInput1}
                    onChange={(e) => setNameInput1(e.target.value)}
                    placeholder="Enter name..."
                    style={{
                      width: "100%",
                      padding: "0.85rem 1.1rem",
                      borderRadius: "0.75rem",
                      border: `2px solid ${nameInput1 ? P1_COLOR : "#e0d0c4"}`,
                      background: "#fdf9f7",
                      fontFamily: "'Lora', serif",
                      fontSize: "1rem",
                      color: "#2c1a0e",
                      outline: "none",
                      transition: "border-color 0.2s",
                    }}
                  />
                </div>

                <div>
                  <label
                    style={{
                      display: "block",
                      fontSize: "0.75rem",
                      letterSpacing: "0.15em",
                      textTransform: "uppercase",
                      color: P2_COLOR,
                      marginBottom: "0.5rem",
                      fontFamily: "sans-serif",
                      fontWeight: 600,
                    }}
                  >
                    ● Person 2
                  </label>
                  <input
                    value={nameInput2}
                    onChange={(e) => setNameInput2(e.target.value)}
                    placeholder="Enter name..."
                    style={{
                      width: "100%",
                      padding: "0.85rem 1.1rem",
                      borderRadius: "0.75rem",
                      border: `2px solid ${nameInput2 ? P2_COLOR : "#e0d0c4"}`,
                      background: "#fdf9f7",
                      fontFamily: "'Lora', serif",
                      fontSize: "1rem",
                      color: "#2c1a0e",
                      outline: "none",
                      transition: "border-color 0.2s",
                    }}
                  />
                </div>
              </div>

              <button
                onClick={() => {
                  setPerson1Name(nameInput1.trim().replace(/^\w/, (c) => c.toUpperCase()));
                  setPerson2Name(nameInput2.trim().replace(/^\w/, (c) => c.toUpperCase()));
                  setPhase("person1");
                  scrollToTop();
                }}
                disabled={!nameInput1.trim() || !nameInput2.trim()}
                style={{
                  marginTop: "2rem",
                  width: "100%",
                  padding: "1rem",
                  borderRadius: "0.875rem",
                  border: "none",
                  background: `linear-gradient(135deg, ${P1_COLOR}, #8a2e10)`,
                  color: "white",
                  fontFamily: "'Playfair Display', serif",
                  fontSize: "1.1rem",
                  fontWeight: 700,
                  cursor: !nameInput1.trim() || !nameInput2.trim() ? "not-allowed" : "pointer",
                  opacity: !nameInput1.trim() || !nameInput2.trim() ? 0.4 : 1,
                  transition: "all 0.2s",
                  letterSpacing: "0.02em",
                }}
              >
                Begin the Quiz →
              </button>
            </div>
          </div>
        )}

        {/* ===== PERSON 1 QUESTIONS ===== */}
        {phase === "person1" && (
          <div style={{ animation: "fadeUp 0.4s ease" }}>
            <div
              style={{
                display: "flex",
                alignItems: "center",
                gap: "1rem",
                marginBottom: "2rem",
                padding: "1.2rem 1.5rem",
                background: `${P1_COLOR}14`,
                borderRadius: "1rem",
                borderLeft: `4px solid ${P1_COLOR}`,
              }}
            >
              <div>
                <p style={{ margin: 0, fontSize: "0.7rem", letterSpacing: "0.15em", textTransform: "uppercase", color: P1_COLOR, fontFamily: "sans-serif", fontWeight: 600 }}>
                  Round 1
                </p>
                <p style={{ margin: "0.2rem 0 0", fontFamily: "'Playfair Display', serif", fontSize: "1.3rem", fontWeight: 700, color: "#2c1a0e" }}>
                  {person1Label}'s Turn
                </p>
              </div>
              <div style={{ marginLeft: "auto", fontSize: "0.85rem", color: "#7a5a4a", fontFamily: "sans-serif" }}>
                {answers1.filter((a) => a !== null).length} / 10
              </div>
            </div>

            {questions.map((q, i) => (
              <QuestionBlock
                key={q.id}
                q={q}
                index={i}
                answer={answers1[i]}
                onAnswer={handleAnswer1}
                personColor={P1_COLOR}
              />
            ))}

            <button
              onClick={() => { setPhase("person2"); scrollToTop(); }}
              disabled={!allAnswered1}
              style={{
                width: "100%",
                padding: "1.1rem",
                borderRadius: "0.875rem",
                border: "none",
                background: allAnswered1
                  ? `linear-gradient(135deg, ${P1_COLOR}, #8a2e10)`
                  : "#d4c4ba",
                color: "white",
                fontFamily: "'Playfair Display', serif",
                fontSize: "1.1rem",
                fontWeight: 700,
                cursor: allAnswered1 ? "pointer" : "not-allowed",
                marginTop: "1rem",
                transition: "all 0.2s",
              }}
            >
              {allAnswered1 ? `Pass to ${person2Label} →` : `Answer all questions to continue`}
            </button>

            {!allAnswered1 && (
              <p style={{ textAlign: "center", marginTop: "0.75rem", fontSize: "0.85rem", color: "#9a7a6a" }}>
                {10 - answers1.filter((a) => a !== null).length} question{10 - answers1.filter((a) => a !== null).length !== 1 ? "s" : ""} remaining
              </p>
            )}
          </div>
        )}

        {/* ===== PERSON 2 QUESTIONS ===== */}
        {phase === "person2" && (
          <div style={{ animation: "fadeUp 0.4s ease" }}>
            <div
              style={{
                display: "flex",
                alignItems: "center",
                gap: "1rem",
                marginBottom: "2rem",
                padding: "1.2rem 1.5rem",
                background: `${P2_COLOR}14`,
                borderRadius: "1rem",
                borderLeft: `4px solid ${P2_COLOR}`,
              }}
            >
              <div>
                <p style={{ margin: 0, fontSize: "0.7rem", letterSpacing: "0.15em", textTransform: "uppercase", color: P2_COLOR, fontFamily: "sans-serif", fontWeight: 600 }}>
                  Round 2
                </p>
                <p style={{ margin: "0.2rem 0 0", fontFamily: "'Playfair Display', serif", fontSize: "1.3rem", fontWeight: 700, color: "#2c1a0e" }}>
                  {person2Label}'s Turn
                </p>
              </div>
              <div style={{ marginLeft: "auto", fontSize: "0.85rem", color: "#4a6a7a", fontFamily: "sans-serif" }}>
                {answers2.filter((a) => a !== null).length} / 10
              </div>
            </div>

            {questions.map((q, i) => (
              <QuestionBlock
                key={q.id}
                q={q}
                index={i}
                answer={answers2[i]}
                onAnswer={handleAnswer2}
                personColor={P2_COLOR}
              />
            ))}

            <button
              onClick={() => { setPhase("results"); scrollToTop(); }}
              disabled={!allAnswered2}
              style={{
                width: "100%",
                padding: "1.1rem",
                borderRadius: "0.875rem",
                border: "none",
                background: allAnswered2
                  ? `linear-gradient(135deg, ${P2_COLOR}, #1a4a5e)`
                  : "#d4c4ba",
                color: "white",
                fontFamily: "'Playfair Display', serif",
                fontSize: "1.1rem",
                fontWeight: 700,
                cursor: allAnswered2 ? "pointer" : "not-allowed",
                marginTop: "1rem",
                transition: "all 0.2s",
              }}
            >
              {allAnswered2 ? "Reveal Our Compatibility ✦" : "Answer all questions to continue"}
            </button>

            {!allAnswered2 && (
              <p style={{ textAlign: "center", marginTop: "0.75rem", fontSize: "0.85rem", color: "#9a7a6a" }}>
                {10 - answers2.filter((a) => a !== null).length} question{10 - answers2.filter((a) => a !== null).length !== 1 ? "s" : ""} remaining
              </p>
            )}
          </div>
        )}

        {/* ===== RESULTS ===== */}
        {phase === "results" && result && (
          <div style={{ animation: "fadeUp 0.6s ease" }}>
            {/* Big score card */}
            <div
              style={{
                background: "white",
                borderRadius: "2rem",
                padding: "3rem 2rem",
                textAlign: "center",
                boxShadow: "0 8px 60px #00000014",
                marginBottom: "2rem",
                position: "relative",
                overflow: "hidden",
              }}
            >
              <div
                style={{
                  position: "absolute",
                  top: 0, left: 0, right: 0, height: "6px",
                  background: `linear-gradient(to right, ${P1_COLOR}, ${P2_COLOR})`,
                }}
              />

              <div style={{ fontSize: "3rem", marginBottom: "0.5rem" }}>{result.emoji}</div>

              <div
                style={{
                  fontFamily: "'Playfair Display', serif",
                  fontSize: "clamp(4rem, 12vw, 6.5rem)",
                  fontWeight: 900,
                  lineHeight: 1,
                  color: result.color,
                  marginBottom: "0.25rem",
                  animation: "pulse 2s ease infinite",
                }}
              >
                {compatibility}%
              </div>

              <p
                style={{
                  fontFamily: "'Lora', serif",
                  fontSize: "0.75rem",
                  letterSpacing: "0.2em",
                  textTransform: "uppercase",
                  color: "#9a8070",
                  marginBottom: "1rem",
                }}
              >
                Compatible
              </p>

              <div
                style={{
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  gap: "0.75rem",
                  marginBottom: "1.5rem",
                  fontFamily: "'Playfair Display', serif",
                  fontSize: "1.1rem",
                  color: "#2c1a0e",
                }}
              >
                <span style={{ color: P1_COLOR, fontWeight: 700 }}>{person1Label}</span>
                <span style={{ color: "#c5a898" }}>♡</span>
                <span style={{ color: P2_COLOR, fontWeight: 700 }}>{person2Label}</span>
              </div>

              <h2
                style={{
                  fontFamily: "'Playfair Display', serif",
                  fontSize: "1.6rem",
                  fontWeight: 700,
                  color: "#2c1a0e",
                  marginBottom: "0.75rem",
                }}
              >
                {result.title}
              </h2>
              <p
                style={{
                  fontFamily: "'Lora', serif",
                  fontSize: "1rem",
                  color: "#5a4a3a",
                  lineHeight: 1.7,
                  maxWidth: "420px",
                  margin: "0 auto",
                }}
              >
                {result.desc}
              </p>

              {/* Compatibility bar */}
              <div
                style={{
                  marginTop: "2rem",
                  height: "8px",
                  borderRadius: "99px",
                  background: "#f0e8e2",
                  overflow: "hidden",
                }}
              >
                <div
                  style={{
                    height: "100%",
                    width: `${compatibility}%`,
                    borderRadius: "99px",
                    background: `linear-gradient(to right, ${P1_COLOR}, ${result.color}, ${P2_COLOR})`,
                    transition: "width 1.5s cubic-bezier(0.4, 0, 0.2, 1)",
                  }}
                />
              </div>
            </div>

            {/* Answer breakdown */}
            <div
              style={{
                background: "white",
                borderRadius: "1.5rem",
                padding: "2rem",
                boxShadow: "0 4px 30px #00000008",
                marginBottom: "1.5rem",
              }}
            >
              <h3
                style={{
                  fontFamily: "'Playfair Display', serif",
                  fontSize: "1.2rem",
                  fontWeight: 700,
                  color: "#2c1a0e",
                  marginBottom: "1.5rem",
                  paddingBottom: "0.75rem",
                  borderBottom: "1px solid #f0e4d8",
                }}
              >
                Answer Breakdown
              </h3>

              <div
                style={{
                  display: "grid",
                  gridTemplateColumns: "1fr auto auto",
                  gap: "0.5rem 1rem",
                  alignItems: "center",
                }}
              >
                <div style={{ fontSize: "0.7rem", letterSpacing: "0.1em", textTransform: "uppercase", color: "#9a8070", fontFamily: "sans-serif" }}>Question</div>
                <div style={{ fontSize: "0.7rem", letterSpacing: "0.1em", textTransform: "uppercase", color: P1_COLOR, fontFamily: "sans-serif", textAlign: "center" }}>{person1Label}</div>
                <div style={{ fontSize: "0.7rem", letterSpacing: "0.1em", textTransform: "uppercase", color: P2_COLOR, fontFamily: "sans-serif", textAlign: "center" }}>{person2Label}</div>

                {questions.map((q, i) => {
                const remap = [0, 2, 1];
                const diff = Math.abs(remap[answers1[i]] - remap[answers2[i]]);
                const match = diff === 0;
                const close = diff === 1;
                  return (
                    <>
                      <div
                        key={`q${i}`}
                        style={{
                          fontSize: "0.85rem",
                          color: "#5a4a3a",
                          fontFamily: "'Lora', serif",
                          padding: "0.5rem 0",
                          borderTop: "1px solid #f5ede6",
                          display: "flex",
                          alignItems: "center",
                          gap: "0.5rem",
                        }}
                      >
                        <span style={{ fontSize: "0.7rem", color: match ? "#27ae60" : close ? "#e67e22" : "#e74c3c" }}>
                          {match ? "●" : close ? "◐" : "○"}
                        </span>
                        Q{i + 1}
                      </div>
                      <div
                        key={`a1${i}`}
                        style={{
                          textAlign: "center",
                          borderTop: "1px solid #f5ede6",
                          padding: "0.5rem 0",
                          fontFamily: "sans-serif",
                          fontWeight: 700,
                          fontSize: "0.9rem",
                          color: P1_COLOR,
                        }}
                      >
                        {SCORE_LABELS[answers1[i]]}
                      </div>
                      <div
                        key={`a2${i}`}
                        style={{
                          textAlign: "center",
                          borderTop: "1px solid #f5ede6",
                          padding: "0.5rem 0",
                          fontFamily: "sans-serif",
                          fontWeight: 700,
                          fontSize: "0.9rem",
                          color: P2_COLOR,
                        }}
                      >
                        {SCORE_LABELS[answers2[i]]}
                      </div>
                    </>
                  );
                })}
              </div>

              <div style={{ marginTop: "1.2rem", display: "flex", gap: "1.5rem", fontSize: "0.78rem", color: "#8a7060", fontFamily: "sans-serif" }}>
                <span><span style={{ color: "#27ae60" }}>●</span> Exact match</span>
                <span><span style={{ color: "#e67e22" }}>◐</span> Close</span>
                <span><span style={{ color: "#e74c3c" }}>○</span> Different</span>
              </div>
            </div>

            {/* Retake button */}
            <button
              onClick={() => {
                setPhase("intro");
                setAnswers1(Array(10).fill(null));
                setAnswers2(Array(10).fill(null));
                setNameInput1("");
                setNameInput2("");
                scrollToTop();
              }}
              style={{
                width: "100%",
                padding: "1rem",
                borderRadius: "0.875rem",
                border: `2px solid #e0d0c4`,
                background: "transparent",
                fontFamily: "'Playfair Display', serif",
                fontSize: "1rem",
                fontWeight: 700,
                color: "#5a4a3a",
                cursor: "pointer",
                transition: "all 0.2s",
              }}
            >
              ↩ Take It Again
            </button>
          </div>
        )}
      </main>
    </div>
  );
}
