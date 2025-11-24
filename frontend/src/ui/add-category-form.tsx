// form that pops up to add a new category to the home page
"use client";
import { useEffect, useState, type Dispatch, type SetStateAction } from "react";
import { addCategory } from "../lib/utils";
import type {
  AddExerciseFormState,
  ExerciseCategory,
} from "../lib/definitions";
import { useAsyncFormAction } from "../lib/useAsyncFormAction";

export default function AddCategoryForm({
  exerciseCategories,
  exerciseCategoriesNames,
  setExerciseCategories,
}: {
  exerciseCategories: ExerciseCategory[];
  exerciseCategoriesNames: Set<string>;
  setExerciseCategories: Dispatch<SetStateAction<ExerciseCategory[]>>;
}) {
  const [showForm, setShowForm] = useState<boolean>(false);

  const [state, formAction, isPending] = useAsyncFormAction(
    async (_prevState: AddExerciseFormState, formData: FormData) => {
      return await addCategory(
        formData,
        exerciseCategories,
        exerciseCategoriesNames,
        setExerciseCategories
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
        <button onClick={() => setShowForm(true)}>Add Category</button>
      )}
      {showForm && (
        <div className="overlay">
          <div className="modal">
            <form onSubmit={formAction}>
              <h3>Add An Exercise Category</h3>
              <label htmlFor="exercise-name">Category:</label>
              <input
                className="border p-2 rounded mb-3 w-full"
                placeholder="Name"
                name="category-name"
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
