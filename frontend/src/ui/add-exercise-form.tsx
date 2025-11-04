"use client";

import { useActionState, useState } from "react";
import type { AddExerciseFormState } from "../lib/definitions";
import { addExercise } from "../lib/utils";

//Form that pops up to add a new exercise to the home page.
// okay to have use client here and have form submit to database with async function
export default function AddExerciseForm({
  categoryExerciseSet,
  setCategoryExerciseSet,
}: {
  categoryExerciseSet: Set<string>;
  setCategoryExerciseSet: (set: Set<string>) => void;
}) {
  const [showForm, setShowForm] = useState<boolean>(false);

  const [state, formAction, isPending] = useActionState(
    async (prevState: AddExerciseFormState, formData: FormData) => {
      return await addExercise(
        prevState,
        formData,
        categoryExerciseSet,
        setCategoryExerciseSet
      );
    },
    { success: false, message: "Form not filled out" }
  );
  return (
    <>
      {!showForm && (
        <button onClick={() => setShowForm(true)}>Add Exercise</button>
      )}
      {showForm && (
        <div className="overlay">
          <div className="modal">
            <form>
              <h3>Add An Exercise</h3>
              <label htmlFor="exercise-name">Exercise Name:</label>
              <input
                className="border p-2 rounded mb-3 w-full"
                placeholder="Name"
                name="exercise-name"
              />
              <br />
              <label htmlFor="exercise-category">Category:</label>
              <input
                className="border p-2 rounded mb-3 w-full"
                placeholder="Category"
                name="exercise-category"
              />
              <button
                type="submit"
                className="bg-blue-500 text-white p-2 rounded"
              >
                Add Exercise
              </button>

              <button type="button" onClick={() => setShowForm(false)}>
                Cancel
              </button>
            </form>
          </div>
        </div>
      )}
    </>
  );
}
