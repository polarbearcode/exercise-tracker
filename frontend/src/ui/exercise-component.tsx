"use client";
import { useState } from "react";
import type { Exercise } from "../lib/definitions";
import { updateExerciseCountInDB } from "../lib/api";

export default function ExerciseComponent({
  exercise,
  handleDeleteFunction,
}: {
  exercise: Exercise;
  handleDeleteFunction: (exercise: Exercise) => void;
}) {
  const [repCount, setRepCount] = useState<number>(exercise.count);

  async function incrementCount() {
    exercise.count += 1;
    setRepCount(repCount + 1);
    await updateExerciseCountInDB({
      name: exercise.name,
      count: repCount + 1,
      date_added: exercise.date_added,
      category: exercise.category,
      description: exercise.description,
    });
  }

  async function decrementCount() {
    if (repCount > 0) {
      setRepCount(repCount - 1);
      exercise.count -= 1;
      await updateExerciseCountInDB({
        name: exercise.name,
        count: repCount - 1,
        date_added: exercise.date_added,
        category: exercise.category,
        description: exercise.description,
      });
    }
  }

  return (
    <>
      <table key={"table-" + exercise.name + " " + exercise.category}>
        <tbody>
          <tr>
            <td>{exercise.name}</td>
            <td>
              <button onClick={incrementCount}>+1</button>
            </td>
            <td>
              <button onClick={decrementCount}>-1</button>
            </td>
            <td>{repCount}</td>
            <td>
              <button onClick={() => handleDeleteFunction(exercise)}>
                Delete
              </button>
            </td>
          </tr>
        </tbody>
      </table>
    </>
  );
}
