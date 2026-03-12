
import { useState } from "react";

function App() {
  const [query, setQuery] = useState("");
  const [result, setResult] = useState("");

  const search = async () => {
    const res = await fetch(`http://localhost:5001/search?q=${query}`);
    const text = await res.text();
    setResult(text);
  };

  return (
    <div style={{
      fontFamily: "Arial",
      background: "#f5f7fa",
      minHeight: "100vh",
      padding: 40
    }}>
      <h1 style={{ textAlign: "center" }}>🔬 Research Paper Finder</h1>

      <div style={{ textAlign: "center", marginBottom: 30 }}>
        <input
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          placeholder="Enter topic like AI, ML..."
          style={{
            padding: 10,
            width: 300,
            fontSize: 16,
            borderRadius: 5,
            border: "1px solid #ccc"
          }}
        />

        <button
          onClick={search}
          style={{
            marginLeft: 10,
            padding: "10px 20px",
            fontSize: 16,
            background: "#4CAF50",
            color: "white",
            border: "none",
            borderRadius: 5,
            cursor: "pointer"
          }}
        >
          Search
        </button>
      </div>

      <div style={{
        background: "white",
        padding: 20,
        borderRadius: 10,
        boxShadow: "0 4px 12px rgba(0,0,0,0.1)"
      }}>
        <pre style={{ whiteSpace: "pre-wrap" }}>{result}</pre>
      </div>
    </div>
  );
}

export default App;