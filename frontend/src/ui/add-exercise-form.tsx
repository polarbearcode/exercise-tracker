"use client";

import { useState } from "react";

//Form that pops up to add a new exercise to the home page.
export default function AddExerciseForm() {
  const [showForm, setShowForm] = useState<boolean>(false);
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
