"use client";

import { useEffect, useState } from "react";
import { getIdeas } from "@/services/frillService";

export default function Dashboard() {
  const [ideas, setIdeas] = useState<any[]>([]);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchIdeas = async () => {
      try {
        const response = await fetch("/api/idea");
        if (!response.ok) throw new Error("Failed to fetch ideas");
        const data = await response.json();
        console.log(data);
        setIdeas(data.data);
      } catch (err) {
        setError(err instanceof Error ? err.message : "Failed to fetch ideas");
      }
    };

    fetchIdeas();
  }, []);

  if (error) {
    return <div>Error: {error}</div>;
  }

  return (
    <div className="container mx-auto p-4 bg-white text-black rounded-lg shadow-lg">
      <h1>Ideas</h1>
      {ideas && (
        <ul className="space-y-4">
          {ideas.map((idea) => (
            <li key={idea.idx}>{idea.name}</li>
          ))}
        </ul>
      )}
    </div>
  );
}
