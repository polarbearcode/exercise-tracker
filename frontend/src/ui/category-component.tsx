import type { Exercise, ExerciseCategory } from "../lib/definitions";
import ExerciseComponent from "./exercise-component";

export default function ExerciseCategoryComponent({
  category,
}: {
  category: ExerciseCategory;
}) {
  return (
    <>
      <div key={"div-" + category.name}>
        <h2>{category.name}</h2>
        {category.exercises.map((exercise: Exercise) => {
          return <ExerciseComponent key={exercise.name} exercise={exercise} />;
        })}
      </div>
    </>
  );
}
