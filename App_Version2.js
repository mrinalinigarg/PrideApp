import React, { useState } from "react";

// Example tasks
const defaultTasks = [
  { id: 1, name: "Touch a butt/boob", points: 10 },
  { id: 2, name: "kiss someone", points: 10 },
  { id: 3, name: "3 way kiss", points: 20 },
  { id: 4, name: "Wear rainbow colors", points: 10 }
];

function PridePointsApp() {
  const [players, setPlayers] = useState([]);
  const [playerName, setPlayerName] = useState("");
  const [tasks, setTasks] = useState(defaultTasks);
  const [newTaskName, setNewTaskName] = useState("");
  const [newTaskPoints, setNewTaskPoints] = useState("");

  // Structure: { name: string, points: number, completed: Set of task ids }
  const addPlayer = () => {
    if (
      playerName.trim() &&
      !players.some((p) => p.name.toLowerCase() === playerName.toLowerCase())
    ) {
      setPlayers([
        ...players,
        { name: playerName.trim(), points: 0, completed: new Set() }
      ]);
      setPlayerName("");
    }
  };

  const addTask = () => {
    const name = newTaskName.trim();
    const points = parseInt(newTaskPoints, 10);
    if (name && !isNaN(points)) {
      setTasks([
        ...tasks,
        {
          id: tasks.length ? Math.max(...tasks.map((t) => t.id)) + 1 : 1,
          name,
          points
        }
      ]);
      setNewTaskName("");
      setNewTaskPoints("");
    }
  };

  const markTaskComplete = (playerIdx, taskId, points) => {
    setPlayers((prev) =>
      prev.map((p, idx) => {
        if (idx !== playerIdx) return p;
        if (p.completed.has(taskId)) return p;
        const newCompleted = new Set(p.completed);
        newCompleted.add(taskId);
        return {
          ...p,
          points: p.points + points,
          completed: newCompleted
        };
      })
    );
  };

  // Sort players by points descending
  const leaderboard = [...players].sort((a, b) => b.points - a.points);

  return (
    <div
      style={{
        fontFamily: "sans-serif",
        maxWidth: 600,
        margin: "0 auto",
        padding: 24,
        background:
          "linear-gradient(90deg, red, orange, yellow, green, blue, indigo, violet 90%)",
        minHeight: "100vh"
      }}
    >
      <h1 style={{ textAlign: "center", color: "white", textShadow: "2px 2px 6px #222" }}>
        🏳️‍🌈 Horny at Pride
      </h1>

      {/* Add Player */}
      <div
        style={{
          background: "white",
          padding: 16,
          borderRadius: 8,
          marginBottom: 24
        }}
      >
        <h2>Add Players</h2>
        <input
          type="text"
          value={playerName}
          onChange={(e) => setPlayerName(e.target.value)}
          placeholder="Enter player name"
        />
        <button onClick={addPlayer} style={{ marginLeft: 8 }}>
          Add
        </button>
      </div>

      {/* Add Task */}
      <div
        style={{
          background: "white",
          padding: 16,
          borderRadius: 8,
          marginBottom: 24
        }}
      >
        <h2>Add Task</h2>
        <input
          type="text"
          value={newTaskName}
          onChange={(e) => setNewTaskName(e.target.value)}
          placeholder="Task description"
          style={{ marginRight: 8 }}
        />
        <input
          type="number"
          value={newTaskPoints}
          onChange={(e) => setNewTaskPoints(e.target.value)}
          placeholder="Points"
          style={{ width: 80, marginRight: 8 }}
        />
        <button onClick={addTask}>Add Task</button>
      </div>

      {/* Tasks List */}
      <div
        style={{
          background: "white",
          padding: 16,
          borderRadius: 8,
          marginBottom: 24
        }}
      >
        <h2>Tasks</h2>
        {tasks.map((task) => (
          <div key={task.id} style={{ marginBottom: 8 }}>
            <b>{task.name}</b> <span>({task.points} pts)</span>
            <div style={{ display: "flex", gap: 8, marginTop: 4 }}>
              {players.map((p, idx) => (
                <button
                  key={p.name}
                  disabled={p.completed.has(task.id)}
                  style={{
                    background: p.completed.has(task.id)
                      ? "lightgray"
                      : "linear-gradient(90deg, #ff0080, #7928ca)",
                    color: "white",
                    border: "none",
                    borderRadius: 4,
                    padding: "4px 8px",
                    cursor: p.completed.has(task.id) ? "not-allowed" : "pointer",
                    opacity: p.completed.has(task.id) ? 0.6 : 1
                  }}
                  onClick={() => markTaskComplete(idx, task.id, task.points)}
                  title={
                    p.completed.has(task.id)
                      ? "Already Completed"
                      : `Mark complete for ${p.name}`
                  }
                >
                  {p.name} {p.completed.has(task.id) ? "✓" : ""}
                </button>
              ))}
            </div>
          </div>
        ))}
      </div>

      {/* Leaderboard */}
      <div
        style={{
          background: "white",
          padding: 16,
          borderRadius: 8
        }}
      >
        <h2>Leaderboard</h2>
        <ol>
          {leaderboard.map((p) => (
            <li key={p.name} style={{ fontWeight: "bold", marginBottom: 4 }}>
              {p.name}: {p.points} pts
            </li>
          ))}
        </ol>
      </div>
    </div>
  );
}

export default PridePointsApp;