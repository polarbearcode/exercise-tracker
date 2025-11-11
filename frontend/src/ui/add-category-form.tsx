// form that pops up to add a new category to the home page
"use client";
import {
  useActionState,
  useState,
  type Dispatch,
  type SetStateAction,
} from "react";
import { addCategory } from "../lib/utils";
import type { AddExerciseFormState } from "../lib/definitions";

export default function AddCategoryForm({
  exerciseCategories,
  setExerciseCategories,
}: {
  exerciseCategories: Set<string>;
  setExerciseCategories: Dispatch<SetStateAction<Set<string>>>;
}) {
  const [showForm, setShowForm] = useState<boolean>(false);

  const [state, formAction, isPending] = useActionState(
    async (_prevState: AddExerciseFormState, formData: FormData) => {
      return await addCategory(
        formData,
        exerciseCategories,
        setExerciseCategories
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
            <form action={formAction}>
              <h3>Add An Exercise Category</h3>
              <label htmlFor="exercise-name">Category:</label>
              <input
                className="border p-2 rounded mb-3 w-full"
                placeholder="Name"
                name="exercise-name"
              />

              <button
                type="submit"
                className="bg-blue-500 text-white p-2 rounded"
                disabled={isPending}
              >
                {isPending ? "Saving" : "Add Category"}
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
