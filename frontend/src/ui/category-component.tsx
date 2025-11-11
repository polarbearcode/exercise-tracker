// A category component. Includes multiple ExerciseComponents.
// Put onto the homepage.
"use client";
import { useState } from "react";
import type { Exercise, ExerciseCategory } from "../lib/definitions";
import ExerciseComponent from "./exercise-component";
import AddExerciseForm from "./add-exercise-form";

export default function ExerciseCategoryComponent({
  category,
}: {
  category: ExerciseCategory;
}) {
  // State variable: what exercises to display
  const [categoryExerciseList, setCategoryExerciseList] = useState<Exercise[]>(
    category.exercises
  );

  // for tracking unique exercise names
  const [categoryExerciseNamesSet, setCategoryExerciseNamesSet] = useState<
    Set<string>
  >(new Set(category.exercises.map((ex) => ex.name)));

  // track deleted exercises in the exercise category
  const [deletedExercises, setDeletedExercises] = useState<Exercise[]>([]);

  /**
   * Handles when the delete button is pressed on an exercise.
   * Removes the exercise from the list displayed in this category.
   * Puts it to top of the deleted exercise stack.
   */
  function handleExerciseDeleteButton(exercise: Exercise) {
    setCategoryExerciseList((prev) =>
      prev.filter((ex) => ex.name !== exercise.name)
    );

    setDeletedExercises((prev) => [exercise, ...prev]);

    setCategoryExerciseNamesSet((prev) => {
      const newSet = new Set(prev);
      newSet.delete(exercise.name);
      return newSet;
    });
  }

  // Handle undoing deletion of an exercise.
  function handleUndoDelete() {
    if (deletedExercises.length === 0) {
      return;
    }
    setCategoryExerciseList((prev) => [...prev, deletedExercises[0]]);
    setDeletedExercises((prev) => prev.slice(1));
  }

  return (
    <>
      <div key={"div-" + category.name}>
        <h2>{category.name}</h2>
        <button onClick={handleUndoDelete}>Undo</button>
        <AddExerciseForm
          category={category.name}
          categoryExerciseList={categoryExerciseList}
          categoryExerciseNamesSet={categoryExerciseNamesSet}
          setCategoryExerciseList={setCategoryExerciseList}
        />
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
