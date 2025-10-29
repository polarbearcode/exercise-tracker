"use client";
import { useState } from "react";
import type { Exercise } from "../lib/definitions";

export default function ExerciseComponent({
  exercise,
}: {
  exercise: Exercise;
}) {
  const [repCount, setRepCount] = useState<number>(exercise.count);

  return (
    <>
      <table key={"table-" + exercise.name + " " + exercise.category}>
        <tr>
          <td>{exercise.name}</td>
          <td>
            <button>+1</button>
          </td>
          <td>
            <button>-1</button>
          </td>
          <td>{repCount}</td>
        </tr>
      </table>
    </>
  );
}
