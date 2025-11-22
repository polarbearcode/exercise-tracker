"use client";

import {
  useActionState,
  useEffect,
  useState,
  type Dispatch,
  type SetStateAction,
} from "react";
import type { AddExerciseFormState, Exercise } from "../lib/definitions";
import { addExercise } from "../lib/utils";
import { useAsyncFormAction } from "../lib/useAsyncFormAction";

//Form that pops up to add a new exercise to the home page.
// okay to have use client here and have form submit to database with async function
export default function AddExerciseForm({
  category,
  categoryExerciseList,
  categoryExerciseNamesSet,
  setCategoryExerciseList,
}: {
  category: string;
  categoryExerciseList: Array<Exercise>;
  categoryExerciseNamesSet: Set<string>;
  setCategoryExerciseList: Dispatch<SetStateAction<Array<Exercise>>>;
}) {
  const [showForm, setShowForm] = useState<boolean>(false);

  const [state, formAction, isPending] = useAsyncFormAction(
    async (_prevState: AddExerciseFormState, formData: FormData) => {
      return await addExercise(
        formData,
        category,
        categoryExerciseNamesSet,
        categoryExerciseList,
        setCategoryExerciseList
      );
    },
    { success: false, message: "Form not filled out" }
  );

  useEffect(() => {
    if (state.success) {
      setShowForm(false);
    }
  }, [state.success]);
  return (
    <>
      {!showForm && (
        <button onClick={() => setShowForm(true)}>Add Exercise</button>
      )}
      {showForm && (
        <div className="overlay">
          <div className="modal">
            <form onSubmit={formAction}>
              <h3>Add An Exercise</h3>
              <label htmlFor="exercise-name">Exercise Name:</label>
              <input
                className="border p-2 rounded mb-3 w-full"
                placeholder="Name"
                name="exercise-name"
              />
              <br />
              <input
                className="border p-2 rounded mb-3 w-full"
                placeholder="Category"
                name="exercise-category"
                type="hidden"
                value={category}
              />
              <button
                type="submit"
                className="bg-blue-500 text-white p-2 rounded"
                disabled={isPending}
              >
                {isPending ? "Saving" : "Add Exercise"}
              </button>

              <button type="button" onClick={() => setShowForm(false)}>
                Cancel
              </button>
              {state.message}
            </form>
          </div>
        </div>
      )}
    </>
  );
}
