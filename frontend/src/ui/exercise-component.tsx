import type { Exercise } from "../lib/definitions";

export default function ExerciseComponent({
  exercise,
}: {
  exercise: Exercise;
}) {
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
          <td>{exercise.count}</td>
        </tr>
      </table>
    </>
  );
}
