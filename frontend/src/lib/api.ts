import type { Exercise } from "./definitions";

const BASE_URL = import.meta.env.VITE_BACKEND_BASE_URL;

console.log("API BASE URL:", BASE_URL);

export function addExerciseToDB(exercise: Exercise): Promise<Response> {
  return fetch(`${BASE_URL}/exercise`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(exercise),
  });
}

export function deleteExerciseFromDB(exerciseName: string): Promise<Response> {
  return fetch(`${BASE_URL}/exercise/${encodeURIComponent(exerciseName)}`, {
    method: "DELETE",
  });
}

export function updateExerciseCountInDB(exercise: Exercise): Promise<Response> {
  return fetch(`${BASE_URL}/exercise`, {
    method: "PUT",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(exercise),
  });
}

export async function fetchExercisesFromDB(): Promise<Exercise[]> {
  const res = await fetch(`${BASE_URL}/exercises`);
  return await res.json();
}
