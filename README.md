# 🎮 Interview Boss Fight

**A retro arcade-style interview preparation game built with React.**

## 1. About the Project

Interview Boss Fight is a browser-based interview preparation game designed to help users practise answering common interview questions in an engaging and interactive way.

Instead of simply reading interview tips, players enter an arcade-style interview arena, answer multiple-choice questions, receive instant feedback, manage their Health Points (HP), and complete a final behavioural interview challenge using the STAR method.

The project combines learning with game mechanics to make interview preparation more interactive.

## 2. Problem We Are Solving

Many students and beginners find interviews challenging because they may:

- Feel unprepared for common interview questions.
- Struggle to communicate their strengths.
- Find it difficult to structure behavioural answers.
- Not know how to respond to teamwork, leadership or problem-solving scenarios.

Interview Boss Fight provides a simple practice environment where users can learn from their choices and improve their interview preparation.

## 3. Key Features

### 🎯 Interactive Interview Questions

The game includes five interview categories:

1. Introduction
2. Problem Solving
3. Teamwork
4. Leadership
5. Adaptability

Each question has four possible responses.

### ❤️ Health Points (HP)

Players begin with 100 HP.

Their choices affect their health points:

- Strong answer: +10 HP.
- Partially suitable answer: no HP change.
- Weak answer: -15 HP.

HP is restricted to a range of 0–100.

### ⭐ Scoring System

Players earn points based on their selected answers.

- Strong answer: 20 points.
- Partially suitable answer: 5 points.
- Weak answer: 0 points.

The maximum possible score is 100.

### 🏆 Ranking System

At the end of the game, players receive a rank based on their score.

| Score | Rank |
|---|---|
| 85–100 | S |
| 65–84 | A |
| 40–64 | B |
| Below 40 | C |

### 💬 Instant Feedback

After selecting an answer, players receive feedback explaining why their response was effective or what they could improve.

### 🌟 STAR Challenge — Special Hackathon Twist

The final challenge contains a behavioural interview question:

"Tell me about a time you faced a difficult challenge while working with a team. How did you handle it?"

Players must structure their answer using the four STAR sections:

- **S — Situation:** What was happening?
- **T — Task:** What was your responsibility?
- **A — Action:** What steps did you take?
- **R — Result:** What happened in the end?

Players enter their responses into four separate fields.

All four sections must be completed before the answer can be submitted.

The completed STAR response is displayed on the final results screen.

### 📊 Final Results

At the end of the game, players can see:

- Final score.
- Final rank.
- Remaining HP.
- Personalised practice tips based on their score.
- Their completed STAR responses.

Players can also restart the game.

## 4. Technology Stack

| Technology | Purpose |
|---|---|
| React | Building the user interface and managing game state |
| JavaScript | Game logic, scoring and interactions |
| HTML | Application structure |
| CSS | Retro arcade styling and responsive layout |
| Vite | Development server and build tool |
| Git & GitHub | Version control and project hosting |

## 5. Design

The application uses a retro arcade-inspired visual style.

Design characteristics include:

- Split-screen layout.
- Midnight navy background.
- Electric cyan and arcade yellow accents.
- Coral and green status indicators.
- Arcade-inspired typography.
- Responsive layout for different screen sizes.

The interface is designed to make the experience feel like a game while keeping the interview questions easy to read.

## 6. How to Run the Project

### Prerequisites

Install:

- Node.js
- npm (included with Node.js)
- A modern web browser

### Step 1: Clone the repository

Open a terminal and run:

```bash
git clone https://github.com/advaitaprao34-cyber/college-project-1.git
```

### Step 2: Enter the project folder

```bash
cd college-project-1
```

### Step 3: Install dependencies

```bash
npm install
```

If you are using Windows PowerShell and encounter a script execution restriction, use:

```powershell
npm.cmd install
```

### Step 4: Start the development server

```powershell
npm.cmd run dev
```

### Step 5: Open the application

Vite will display a local development address, usually:

```text
http://localhost:5173/
```

Open that address in your browser.

### Step 6: Create a production build

To check that the application can be built for production:

```powershell
npm.cmd run build
```

The generated production files will be placed in the `dist` folder.

## 7. How to Play

1. Open the application in your browser.
2. Enter a player name.
3. Click **START GAME**.
4. Read each interview question.
5. Select one of the four available responses.
6. Read the feedback and observe your score and HP.
7. Complete all five interview rounds.
8. Enter the final STAR Challenge.
9. Answer the behavioural question using Situation, Task, Action and Result.
10. Complete all four sections and submit.
11. Review your final score, rank, HP and STAR notes.
12. Select **PLAY AGAIN** to restart.

## 8. Project Structure

The main project files are organised as follows:

```text
college-project-1/
│
├── public/
│
├── src/
│   ├── App.jsx
│   ├── App.css
│   ├── index.css
│   └── main.jsx
│
├── index.html
├── package.json
├── package-lock.json
└── README.md
```

**Important files:**

- `App.jsx` — Contains the interview questions, game logic, scoring, HP system, STAR Challenge and results screen.
- `App.css` — Contains the arcade design and component styling.
- `index.css` — Contains global styling and CSS reset.
- `main.jsx` — React application entry point.
- `package.json` — Contains project dependencies and scripts.
- `README.md` — Project documentation.

## 9. Data and Privacy

This prototype is designed to operate locally in the browser.

- Interview questions and answer options are fictional sample content.
- No real candidate database is used.
- No login or registration is required.
- No external AI API is required.
- No database is required.
- No API keys or `.env` configuration are required for the core game.
- Player answers and game progress are managed using React state.
- The application does not include a backend submission of player answers.

Game state is not designed to persist after the application is refreshed or restarted.

The prototype is intended for demonstration and educational purposes.

## 10. Judge Testing Guide

Judges can test the complete application using the following steps.

| Test | Action | Expected result |
|---|---|---|
| 1 | Enter a player name and start | Game opens |
| 2 | Select an interview answer | Feedback, score and HP update |
| 3 | Try selecting another answer in the same round | Additional answer is prevented |
| 4 | Submit an incomplete STAR response | Validation message appears |
| 5 | Complete STAR and submit | Final results screen displays all four answers |

### Suggested 60-Second Demonstration

**0–10 seconds:** Introduce Interview Boss Fight and explain the problem it addresses.

**10–25 seconds:** Start the game and demonstrate an interview question. Show how selecting an answer changes the score and HP.

**25–40 seconds:** Complete the interview rounds and introduce the STAR Challenge.

**40–50 seconds:** Demonstrate the Situation, Task, Action and Result fields and their completion validation.

**50–60 seconds:** Submit the response and show the final score, rank and STAR notes.

## 11. Current Limitations

This is a browser-first prototype.

Current limitations include:

- Five predefined multiple-choice questions.
- One predefined behavioural interview question.
- No automatic AI evaluation of written STAR answers.
- No user accounts or saved profiles.
- No online leaderboard.
- No persistent game history.
- No backend services.

The STAR Challenge checks whether all four sections have been completed. It does not automatically evaluate the quality of the written responses.

## 12. Future Improvements

Possible future enhancements include:

- More interview question categories.
- Multiple difficulty levels.
- More behavioural interview scenarios.
- Additional feedback and learning guidance.
- Optional progress history.
- More game levels and challenges.

These are potential future improvements and are not part of the current prototype.

## 13. Project Objective

The objective of Interview Boss Fight is to make interview preparation more approachable, interactive and engaging.

By combining interview scenarios, instant feedback, game mechanics and the STAR framework, the project helps users practise important professional communication skills.

---

**INTERVIEW BOSS FIGHT**

*Train Smart. Play Bold.*