
import { useState } from "react";
import "./App.css";

const questions = [
  {
    category: "INTRODUCTION",
    question: "Tell me about yourself.",
    options: [
      { text: "Repeat my entire resume word for word.", points: 0, feedback: "Keep your introduction concise and relevant to the role." },
      { text: "Explain my background, strengths and goals.", points: 20, feedback: "Excellent! A focused introduction makes a strong first impression." },
      { text: "Talk only about my hobbies.", points: 5, feedback: "Hobbies can help, but connect them to your strengths." },
      { text: "Say I don't know what to tell you.", points: 0, feedback: "Prepare a short introduction before an interview." }
    ]
  },
  {
    category: "PROBLEM SOLVING",
    question: "You receive a task you have never done before. What do you do?",
    options: [
      { text: "Give up because I have no experience.", points: 0, feedback: "Show willingness to learn rather than giving up." },
      { text: "Research, ask questions and try a solution.", points: 20, feedback: "Great! This demonstrates initiative and problem-solving." },
      { text: "Wait until someone tells me every step.", points: 5, feedback: "Take initiative while asking for guidance when needed." },
      { text: "Pretend I already know how to do it.", points: 0, feedback: "Honesty is important. Explain how you would learn." }
    ]
  },
  {
    category: "TEAMWORK",
    question: "A teammate disagrees with your idea. How do you respond?",
    options: [
      { text: "Listen and discuss both ideas respectfully.", points: 20, feedback: "Strong answer! Collaboration means considering different perspectives." },
      { text: "Insist that my idea is always correct.", points: 0, feedback: "Good teamwork requires listening and respectful discussion." },
      { text: "Stop contributing to the project.", points: 0, feedback: "Stay involved and work towards a shared solution." },
      { text: "Ignore their opinion.", points: 5, feedback: "Acknowledge your teammate's perspective." }
    ]
  },
  {
    category: "LEADERSHIP",
    question: "Your team is falling behind on a deadline. What would you do?",
    options: [
      { text: "Blame the slowest team member.", points: 0, feedback: "Focus on solving the problem, not blaming people." },
      { text: "Review priorities and redistribute tasks fairly.", points: 20, feedback: "Excellent! This shows responsibility and practical leadership." },
      { text: "Ignore the deadline.", points: 0, feedback: "Deadlines need communication and action." },
      { text: "Do everyone's work alone.", points: 5, feedback: "Leadership is about coordinating the team." }
    ]
  },
  {
    category: "ADAPTABILITY",
    question: "You receive constructive criticism about your work. What do you do?",
    options: [
      { text: "Listen, ask questions and use it to improve.", points: 20, feedback: "Perfect! Being open to feedback is a valuable professional skill." },
      { text: "Take it personally and refuse to change.", points: 0, feedback: "Try to separate feedback about your work from your personal worth." },
      { text: "Ignore the feedback.", points: 0, feedback: "Feedback can help you identify areas to improve." },
      { text: "Argue without understanding it.", points: 5, feedback: "Understand the feedback first, then discuss it respectfully." }
    ]
  }
];

const emptyStar = {
  situation: "",
  task: "",
  action: "",
  result: ""
};

const starFields = [
  { key: "situation", letter: "S", label: "SITUATION", hint: "What was happening?" },
  { key: "task", letter: "T", label: "TASK", hint: "What were you responsible for?" },
  { key: "action", letter: "A", label: "ACTION", hint: "What steps did you take?" },
  { key: "result", letter: "R", label: "RESULT", hint: "What happened in the end?" }
];
const behaviouralQuestion =
  "Tell me about a time you faced a difficult challenge while working with a team. How did you handle it?";

function App() {
  const [screen, setScreen] = useState("start");
  const [player, setPlayer] = useState("");
  const [questionIndex, setQuestionIndex] = useState(0);
  const [hp, setHp] = useState(100);
  const [score, setScore] = useState(0);
  const [selected, setSelected] = useState(null);
  const [answered, setAnswered] = useState(false);
  const [star, setStar] = useState(emptyStar);
  const [starError, setStarError] = useState("");
  const currentQuestion = questions[questionIndex];
  const progress = ((questionIndex + (answered ? 1 : 0)) / questions.length) * 100;

  const rank =
    score >= 85 ? "S" :
    score >= 65 ? "A" :
    score >= 40 ? "B" : "C";

  const starCount = Object.values(star).filter(value => value.trim()).length;

  function startGame() {
    if (!player.trim()) return;
    setScreen("battle");
  }

  function chooseAnswer(option, index) {
    if (answered) return;

    setSelected(index);
    setAnswered(true);
    setScore(previous => previous + option.points);

    setHp(previous =>
      Math.max(0, Math.min(100,
        previous + (option.points === 20 ? 10 : option.points === 5 ? 0 : -15)
      ))
    );
  }

  function nextQuestion() {
    if (questionIndex < questions.length - 1) {
      setQuestionIndex(previous => previous + 1);
      setSelected(null);
      setAnswered(false);
    } else {
      setScreen("star");
    }
  }

  function updateStar(field, value) {
  setStar(previous => ({ ...previous, [field]: value }));
  setStarError("");
  }

  function submitStar() {
    if (starCount < 4) {
      setStarError("Complete all four STAR sections before submitting!");
      return;
    }

    setStarError("");
    setScreen("result");
  }

  function restartGame() {
    setScreen("start");
    setPlayer("");
    setQuestionIndex(0);
    setHp(100);
    setScore(0);
    setSelected(null);
    setAnswered(false);
    setStar(emptyStar);
    setStarError("");
  }

  const tips = score >= 65
    ? [
        "Keep practising concise answers using real examples.",
        "Prepare STAR stories about teamwork, challenges and achievements."
      ]
    : [
        "Practise introducing yourself in 30–60 seconds.",
        "Use STAR to organise examples from projects and activities."
      ];

  return (
    <main className="arcade-app">
      <header className="arcade-header">
        <div className="arcade-logo">
          <span className="logo-mark">▣</span>
          INTERVIEW<span className="logo-highlight">BOSS</span>
        </div>
        <div className="header-right">
          <span className="online-dot" /> ARCADE MODE
          <span className="version-tag">V1.0</span>
        </div>
      </header>

      {screen === "start" && (
        <section className="start-layout">
          <div className="start-copy">
            <div className="eyebrow"><span>★</span> PLAYER ONE READY?</div>
            <h1>INTERVIEW<br /><span>BOSS FIGHT</span></h1>
            <p className="start-description">
              Five questions. One final challenge. Are you ready to enter the interview arena?
            </p>

            <div className="start-features">
              <div><span>01</span> ANSWER CHALLENGES</div>
              <div><span>02</span> PROTECT YOUR HP</div>
              <div><span>03</span> DEFEAT THE BOSS</div>
            </div>
          </div>

          <div className="start-terminal">
            <div className="terminal-top">
              <span>PLAYER TERMINAL</span>
              <span>● SYSTEM ONLINE</span>
            </div>
            <div className="start-monster">👾</div>
            <div className="monster-caption">THE INTERVIEW BOSS</div>
            <div className="insert-coin">INSERT YOUR NAME TO START</div>
            <input
              value={player}
              onChange={event => setPlayer(event.target.value)}
              onKeyDown={event => event.key === "Enter" && startGame()}
              placeholder="PLAYER NAME..."
              maxLength={24}
            />
            <button className="arcade-button" onClick={startGame}>
              START GAME <span>▶</span>
            </button>
            <p className="terminal-note">PRESS START TO BEGIN YOUR QUEST</p>
          </div>
        </section>
      )}

      {screen === "battle" && (
        <section className="game-layout">
          <aside className="game-sidebar">
            <div className="side-label">PLAYER PROFILE</div>
            <div className="player-avatar">👨‍💻</div>
            <h2 className="player-name">{player}</h2>
            <div className="player-level">LEVEL 01 · ROOKIE</div>

            <div className="side-divider" />

            <div className="stat-heading">PLAYER STATS</div>
            <div className="stat-row">
              <span>♥ HEALTH POINTS</span>
              <strong>{hp}/100</strong>
            </div>
            <div className="health-track">
              <div className="health-fill" style={{ width: `${hp}%` }} />
            </div>
            <div className="health-caption">
              {hp > 65 ? "STATUS: STABLE" : hp > 30 ? "STATUS: CAUTION" : "STATUS: CRITICAL"}
            </div>

            <div className="side-divider" />

            <div className="stat-row">
              <span>★ SCORE</span>
              <strong>{score}</strong>
            </div>
            <div className="stat-row">
              <span>⚔ ROUND</span>
              <strong>{questionIndex + 1}/5</strong>
            </div>

            <div className="boss-card">
              <div className="boss-card-label">CURRENT OPPONENT</div>
              <div className="boss-sprite">
                {answered
                  ? currentQuestion.options[selected].points >= 20 ? "😵" : "👹"
                  : "👾"}
              </div>
              <div className="boss-card-name">INTERVIEW BOSS</div>
              <div className="boss-card-status">
                {answered ? "HIT CONFIRMED!" : "AWAITING ANSWER..."}
              </div>
            </div>
          </aside>

          <div className="battle-main">
            <div className="battle-topline">
              <div>
                <div className="eyebrow">MISSION 01 / INTERVIEW ARENA</div>
                <h2>THE BATTLE BEGINS</h2>
              </div>
              <div className="round-badge">ROUND {questionIndex + 1}</div>
            </div>

            <div className="question-progress">
              <div className="progress-info">
                <span>MISSION PROGRESS</span>
                <strong>{Math.round(progress)}%</strong>
              </div>
              <div className="progress-track">
                <div style={{ width: `${progress}%` }} />
              </div>
            </div>

            <div className="question-card">
              <div className="question-category">
                <span>◆</span> {currentQuestion.category}
              </div>
              <h3>{currentQuestion.question}</h3>
              <p className="choose-label">SELECT YOUR RESPONSE:</p>

              <div className="answer-list">
                {currentQuestion.options.map((option, index) => (
                  <button
                    key={index}
                    className={[
                      "answer-option",
                      selected === index ? "chosen" : "",
                      answered && selected === index
                        ? option.points >= 20 ? "answer-correct" : "answer-wrong"
                        : ""
                    ].join(" ")}
                    disabled={answered}
                    onClick={() => chooseAnswer(option, index)}
                  >
                    <span className="answer-key">{["A", "B", "C", "D"][index]}</span>
                    <span>{option.text}</span>
                    <span className="answer-arrow">›</span>
                  </button>
                ))}
              </div>

              {answered && (
                <div className="answer-feedback">
                  <strong>
                    {currentQuestion.options[selected].points >= 20
                      ? "★ CRITICAL HIT!"
                      : "◆ RESPONSE RECORDED"}
                  </strong>
                  <p>{currentQuestion.options[selected].feedback}</p>
                  <button className="arcade-button" onClick={nextQuestion}>
                    {questionIndex === 4 ? "FINAL CHALLENGE →" : "NEXT ROUND →"}
                  </button>
                </div>
              )}
            </div>
            <div className="battle-footer">
              <span>◈ THINK BEFORE YOU ANSWER</span>
              <span>INTERVIEW BOSS FIGHT © 2026</span>
            </div>
          </div>
        </section>
      )}

      {screen === "star" && (
  <section className="special-screen">
    <div className="eyebrow">★ FINAL BOSS CHALLENGE</div>

    <h1>THE <span>STAR</span> METHOD</h1>

    <p className="start-description">
      Every great interview answer needs a real example.
      Structure your response using the STAR method.
    </p>

    <div className="question-card">
      <div className="question-category">
        ◆ BEHAVIOURAL INTERVIEW QUESTION
      </div>

      <h3>{behaviouralQuestion}</h3>

      <p className="choose-label">
        YOUR CHALLENGE: ANSWER USING ALL FOUR STAR SECTIONS.
      </p>
    </div>

    <div className="star-progress">
      {starFields.map(field => (
        <div
          key={field.key}
          className={star[field.key].trim() ? "star-done" : ""}
        >
          {field.letter}
        </div>
      ))}
    </div>

    <div className="star-form">
      {starFields.map(field => (
        <label className="star-input-group" key={field.key}>
          <span>
            <b>{field.letter}</b> {field.label}
          </span>

          <p>{field.hint}</p>

          <textarea
            rows="3"
            placeholder={field.hint}
            value={star[field.key]}
            onChange={event =>
              updateStar(field.key, event.target.value)
            }
          />
        </label>
      ))}
    </div>

    <div className="star-bottom">
      <span>{starCount}/4 SECTIONS COMPLETED</span>

      <button className="arcade-button" onClick={submitStar}>
        SUBMIT STAR ANSWER →
      </button>
    </div>

    {starError && (
      <p role="alert" className="star-error">
        {starError}
      </p>
    )}
  </section>
  )}

      {screen === "result" && (
        <section className="result-screen">
          <div className="eyebrow">★ GAME OVER · MISSION COMPLETE</div>
          <div className="result-trophy">🏆</div>
          <h1>WELL PLAYED,<br /><span>{player.toUpperCase()}!</span></h1>
          <p className="start-description">You made it through the Interview Boss Fight.</p>

          <div className="result-stats">
            <div><span>FINAL SCORE</span><strong>{score}<small>/100</small></strong></div>
            <div><span>FINAL RANK</span><strong className="final-rank">{rank}</strong></div>
            <div><span>HP REMAINING</span><strong>{hp}<small>/100</small></strong></div>
          </div>

          <div className="result-advice">
            <h3>★ YOUR NEXT POWER-UPS</h3>
            {tips.map((tip, index) => (
              <p key={index}><span>▸</span> {tip}</p>
            ))}
          </div>

          <div className="result-star">
            <h3>YOUR STAR NOTES · {starCount}/4</h3>
            {starFields.map(field => (
              <p key={field.key}>
                <strong>{field.label}:</strong> {star[field.key] || "Not filled in"}
              </p>
            ))}
          </div>

          <button className="arcade-button restart-button" onClick={restartGame}>
            ↻ PLAY AGAIN
          </button>
        </section>
      )}

      <footer className="arcade-footer">
        <span>▣ INTERVIEW BOSS FIGHT</span>
        <span>TRAIN SMART. PLAY BOLD.</span>
      </footer>
    </main>
  );
}

export default App;
