// Form that pops up to add a new exercise to the home page.
export default function AddExerciseForm() {
  return (
    <>
      <div>
        <h2>Add New Exercise</h2>

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
          <button type="submit" className="bg-blue-500 text-white p-2 rounded">
            Add Exercise
          </button>
        </form>
      </div>
    </>
  );
}
