// A category component. Includes multiple ExerciseComponents.
// Put onto the homepage.
"use client";
import { useState } from "react";
import type { Exercise, ExerciseCategory } from "../lib/definitions";
import ExerciseComponent from "./exercise-component";

export default function ExerciseCategoryComponent({
  category,
}: {
  category: ExerciseCategory;
}) {
  // State variable: what exercises to display
  const [categoryExerciseList, setCategoryExerciseList] = useState<Exercise[]>(
    category.exercises
  );

  /**
   * Handles when the delete button is pressed on an exercise.
   * Removes the exercise from the list displayed in this category.
   */
  function handleExerciseDeleteButton(exercise: Exercise) {
    setCategoryExerciseList((prev) =>
      prev.filter((ex) => ex.name !== exercise.name)
    );
  }

  return (
    <>
      <div key={"div-" + category.name}>
        <h2>{category.name}</h2>
        {categoryExerciseList.map((exercise: Exercise) => {
          return (
            <ExerciseComponent
              key={exercise.name}
              exercise={exercise}
              handleDeleteFunction={handleExerciseDeleteButton}
            />
          );
        })}
      </div>
    </>
  );
}
