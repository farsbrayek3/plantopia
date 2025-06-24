import { useEffect, useState } from "react";
import axios from "@/utils/axios";

interface Plant {
  id: number;
  name: string;
  species: string;
}

export default function PlantsPage() {
  const [plants, setPlants] = useState<Plant[]>([]);

  useEffect(() => {
    axios
      .get("/plants")
      .then((res) => setPlants(res.data))
      .catch((err) => console.error("Error fetching plants:", err));
  }, []);

  return (
    <main className="min-h-screen p-8 sm:p-16 bg-white text-black dark:bg-black dark:text-white">
      <h1 className="text-3xl font-bold mb-8">🌿 Your Plants</h1>
      {plants.length > 0 ? (
        <ul className="grid gap-6 grid-cols-1 sm:grid-cols-2 md:grid-cols-3">
          {plants.map((plant) => (
            <li
              key={plant.id}
              className="p-4 border rounded-lg shadow-md hover:shadow-lg transition-all bg-gray-100 dark:bg-gray-900"
            >
              <h2 className="text-xl font-semibold">{plant.name}</h2>
              <p className="text-sm text-gray-600 dark:text-gray-400">
                {plant.species}
              </p>
            </li>
          ))}
        </ul>
      ) : (
        <p className="text-gray-500">No plants found.</p>
      )}
    </main>
  );
}
