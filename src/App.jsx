
import { useState } from "react";
import "./App.css";

const questions = [
  {
    category: "INTRODUCTION",
    question: "Tell me about yourself.",
    options: [
      { text: "Repeat my entire resume word for word.", points: 0, feedback: "Try to give a concise introduction focused on relevant skills and experience." },
      { text: "Briefly explain my background, strengths and goals.", points: 20, feedback: "Excellent! A focused introduction makes a strong first impression." },
      { text: "Talk only about my hobbies.", points: 5, feedback: "Hobbies can help, but connect your answer to the role." },
      { text: "Say I don't know what to tell you.", points: 0, feedback: "Prepare a short introduction before an interview." }
    ]
  },
  {
    category: "PROBLEM SOLVING",
    question: "You are given a task you have never done before. What do you do?",
    options: [
      { text: "Give up because I have no experience.", points: 0, feedback: "Show willingness to learn rather than giving up." },
      { text: "Understand the task, research, ask questions and try a solution.", points: 20, feedback: "Great approach! This demonstrates initiative and problem-solving." },
      { text: "Wait until someone tells me every step.", points: 5, feedback: "Try to take initiative while asking for guidance when needed." },
      { text: "Pretend I already know how to do it.", points: 0, feedback: "Honesty is important. Explain how you would learn." }
    ]
  },
  {
    category: "TEAMWORK",
    question: "A teammate disagrees with your idea. How do you respond?",
    options: [
      { text: "Listen to their reasoning and discuss both ideas respectfully.", points: 20, feedback: "Strong answer! Collaboration means considering different perspectives." },
      { text: "Insist that my idea is always correct.", points: 0, feedback: "Good teamwork requires listening and respectful discussion." },
      { text: "Stop contributing to the project.", points: 0, feedback: "Stay involved and work towards a shared solution." },
      { text: "Ignore their opinion.", points: 5, feedback: "Acknowledge your teammate's perspective before deciding." }
    ]
  },
  {
    category: "LEADERSHIP",
    question: "Your team is falling behind on a deadline. What would you do?",
    options: [
      { text: "Blame the slowest team member.", points: 0, feedback: "Blaming people doesn't solve the problem. Focus on the work." },
      { text: "Review priorities, communicate and redistribute tasks fairly.", points: 20, feedback: "Excellent! This shows responsibility and practical leadership." },
      { text: "Ignore the deadline.", points: 0, feedback: "Deadlines need communication and action." },
      { text: "Try to do everyone's work alone.", points: 5, feedback: "Leadership is about coordinating the team, not doing everything yourself." }
    ]
  },
  {
    category: "ADAPTABILITY",
    question: "You receive constructive criticism about your work. What do you do?",
    options: [
      { text: "Listen, ask questions and use it to improve.", points: 20, feedback: "Perfect! Being open to feedback is a valuable professional skill." },
      { text: "Take it personally and refuse to change.", points: 0, feedback: "Try to separate feedback about your work from your personal worth." },
      { text: "Ignore the feedback.", points: 0, feedback: "Feedback can help you identify areas to improve." },
      { text: "Argue without understanding the feedback.", points: 5, feedback: "Understand the feedback first, then discuss it respectfully." }
    ]
  }
];

function App() {
  const [screen, setScreen] = useState("start");
  const [player, setPlayer] = useState("");
  const [questionIndex, setQuestionIndex] = useState(0);
  const [hp, setHp] = useState(70);
  const [score, setScore] = useState(0);
  const [selected, setSelected] = useState(null);
  const [answered, setAnswered] = useState(false);
  const [star, setStar] = useState({
    situation: "",
    task: "",
    action: "",
    result: ""
  });

  const currentQuestion = questions[questionIndex];
  const progress = ((questionIndex + 1) / questions.length) * 100;

  function startGame() {
    if (!player.trim()) return;
    setScreen("battle");
  }

  function chooseAnswer(option, index) {
    if (answered) return;

    setSelected(index);
    setAnswered(true);
    setScore((previous) => previous + option.points);
    setHp((previous) =>
      Math.max(0, Math.min(100,
        previous + (option.points === 20 ? 10 : option.points === 5 ? 0 : -15)
      ))
    );
  }

  function nextQuestion() {
    if (questionIndex < questions.length - 1) {
      setQuestionIndex((previous) => previous + 1);
      setSelected(null);
      setAnswered(false);
    } else {
      setScreen("star");
    }
  }

  function updateStar(field, value) {
    setStar((previous) => ({ ...previous, [field]: value }));
  }

  function finishGame() {
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
    setStar({ situation: "", task: "", action: "", result: "" });
  }

  const rank = score >= 85 ? "S" : score >= 65 ? "A" : score >= 40 ? "B" : "C";

  const tips = score >= 65
    ? [
        "Keep practising concise answers using real examples.",
        "Prepare a few STAR stories about teamwork, challenges and achievements."
      ]
    : [
        "Practise introducing yourself in 30–60 seconds.",
        "Use the STAR method to organise examples from school, projects or activities."
      ];

  return (
    <main className="app">
      <header className="topbar">
        <div className="brand"><span className="brand-icon">⚔</span> INTERVIEW<span>BOSS</span></div>
        <div className="top-tag">CAREER ARENA · LEVEL 01</div>
      </header>

      {screen === "start" && (
        <section className="panel start-screen">
          <div className="eyebrow">YOUR NEXT CHALLENGE STARTS HERE</div>
          <div className="boss-icon">👾</div>
          <h1>INTERVIEW<br /><span>BOSS FIGHT</span></h1>
          <p className="subtitle">Can you survive the interview arena?</p>
          <p className="description">Face five interview challenges, manage your confidence meter and prove you're ready for the real world.</p>
          <input
            className="name-input"
            placeholder="Enter your player name"
            value={player}
            onChange={(event) => setPlayer(event.target.value)}
            maxLength={24}
          />
          <button className="primary-btn" onClick={startGame}>ENTER THE ARENA →</button>
          {!player.trim() && <p className="hint">Enter a name to begin your challenge.</p>}
          <div className="feature-row">
            <span>⚡ 5 CHALLENGES</span>
            <span>♥ HP METER</span>
            <span>🏆 FINAL RANK</span>
          </div>
        </section>
      )}

      {screen === "battle" && (
        <section className="panel battle-screen">
          <div className="battle-heading">
            <div>
              <div className="eyebrow">PLAYER: {player.toUpperCase()}</div>
              <h2>THE INTERVIEW ARENA</h2>
            </div>
            <div className="level-tag">ROUND {questionIndex + 1}/5</div>
          </div>

          <div className="meter-card">
            <div className="meter-label"><span>♥ CONFIDENCE / HP</span><strong>{hp}/100</strong></div>
            <div className="meter-track"><div className="meter-fill" style={{ width: `${hp}%` }} /></div>
            <div className="meter-caption">Your confidence changes with every decision.</div>
          </div>

          <div className="progress-track"><div style={{ width: `${progress}%` }} /></div>
          <div className="eyebrow question-category">{currentQuestion.category}</div>
          <h2 className="question-title">{currentQuestion.question}</h2>
          <div className="options">
            {currentQuestion.options.map((option, index) => (
              <button
                key={index}
                className={`option ${selected === index ? "selected" : ""} ${answered && selected === index ? (option.points >= 20 ? "correct" : "incorrect") : ""}`}
                onClick={() => chooseAnswer(option, index)}
                disabled={answered}
              >
                <span className="option-letter">{String.fromCharCode(65 + index)}</span>
                {option.text}
              </button>
            ))}
          </div>

          {answered && (
            <div className="feedback">
              <strong>{currentQuestion.options[selected].points >= 20 ? "GREAT ANSWER!" : "LESSON LEARNED"}</strong>
              <p>{currentQuestion.options[selected].feedback}</p>
              <button className="primary-btn" onClick={nextQuestion}>
                {questionIndex === questions.length - 1 ? "CONTINUE TO STAR CHALLENGE →" : "NEXT QUESTION →"}
              </button>
            </div>
          )}
          <div className="score-line">CURRENT SCORE: <strong>{score}</strong> / 100</div>
        </section>
      )}

      {screen === "star" && (
        <section className="panel star-screen">
          <div className="eyebrow">SPECIAL CHALLENGE · FINAL ROUND</div>
          <h1>THE <span>STAR</span> METHOD</h1>
          <p className="description">Structure a strong behavioural interview answer. Use a real example from a project, class or team activity.</p>
          {[
            ["situation", "S", "SITUATION", "What was the situation?"],
            ["task", "T", "TASK", "What were you responsible for?"],
            ["action", "A", "ACTION", "What steps did you take?"],
            ["result", "R", "RESULT", "What happened as a result?"]
          ].map(([field, letter, label, placeholder]) => (
            <div className="star-field" key={field}>
              <label><span>{letter}</span> {label}</label>
              <textarea
                placeholder={placeholder}
                value={star[field]}
                onChange={(event) => updateStar(field, event.target.value)}
                rows="2"
              />
            </div>
          ))}
          <button className="primary-btn" onClick={finishGame}>COMPLETE THE BOSS FIGHT →</button>
          <p className="hint">Your STAR responses are used only in this session.</p>
        </section>
      )}

      {screen === "result" && (
        <section className="panel result-screen">
          <div className="eyebrow">BATTLE COMPLETE</div>
          <div className="trophy">🏆</div>
          <h1>WELL PLAYED, <span>{player.toUpperCase()}!</span></h1>
          <p className="subtitle">You made it through the Interview Boss Fight.</p>
          <div className="result-grid">
            <div className="result-stat"><span>FINAL SCORE</span><strong>{score}/100</strong></div>
            <div className="result-stat"><span>FINAL RANK</span><strong className="rank">{rank}</strong></div>
            <div className="result-stat"><span>HP LEFT</span><strong>{hp}/100</strong></div>
          </div>
          <div className="advice-card">
            <h3>🎯 YOUR NEXT POWER-UPS</h3>
            {tips.map((tip, index) => <p key={index}>✦ {tip}</p>)}
          </div>
          <div className="star-summary">
            <h3>YOUR STAR NOTES</h3>
            {Object.entries(star).map(([field, value]) => (
              <p key={field}><strong>{field.toUpperCase()}:</strong> {value || "Not filled in"}</p>
            ))}
          </div>
          <button className="primary-btn" onClick={restartGame}>↻ PLAY AGAIN</button>
        </section>
      )}

      <footer>INTERVIEW BOSS FIGHT <span>·</span> TRAIN SMART. PLAY BOLD.</footer>
    </main>
  );
}

export default App;
