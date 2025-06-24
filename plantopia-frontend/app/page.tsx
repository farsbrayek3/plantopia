"use client";
"use client";

import { useEffect, useState } from "react";
import axios from "axios";

interface Plant {
  id: string;
  name: string;
  type: string;
  temperature: number;
  humidity: number;
  plantId: string; // Assuming this is a unique identifier for the plant
}

export default function PlantsPage() {
  const [plants, setPlants] = useState<Plant[]>([]);
  const [error, setError] = useState<string | null>(null);

  // 🔐 Replace this with your real access token from Keycloak
  // const token = "eyJhbGciOiJSUzI1NiIsInR5cCI6IkpXVCIsImtpZCI6IkpX...";

  useEffect(() => {
    axios
      .get("http://localhost:3001/sensor")
      .then((response) => {
        setPlants(response.data);
      })
      .catch((err) => {
        setError("Error fetching plants: " + err.message);
        console.error(err);
      });
  }, []);

  return (
    <div className="p-6">
      <h1 className="text-2xl font-bold mb-4">🌿 IoT List</h1>

      {error && <p className="text-red-500 font-semibold mb-4">{error}</p>}

      <ul className="space-y-2">
        {plants.map((plant) => (
          <li key={plant.id} className="border p-4 rounded">
            <strong>{plant.name}</strong> — {plant.type}
            <br />
            🌡️ temperature: {plant.temperature}%
            <br />
            💧 humidity: {plant.humidity}%
            <br />
            ☀️ plantId: {plant.plantId}
          </li>
        ))}
      </ul>
    </div>
  );
}
