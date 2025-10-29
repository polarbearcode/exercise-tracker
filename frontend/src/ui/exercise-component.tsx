"use client";
import { useState, type Dispatch, type SetStateAction } from "react";
import type { Exercise } from "../lib/definitions";

export default function ExerciseComponent({
  exercise,
  handleDeleteFunction,
}: {
  exercise: Exercise;
  handleDeleteFunction: (exercise: Exercise) => void;
}) {
  const [repCount, setRepCount] = useState<number>(exercise.count);

  function incrementCount() {
    setRepCount(repCount + 1);
  }

  function decrementCount() {
    if (repCount > 0) {
      setRepCount(repCount - 1);
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
