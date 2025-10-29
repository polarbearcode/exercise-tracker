import type { Exercise, ExerciseCategory } from "./lib/definitions";
import ExerciseCategoryComponent from "./ui/category-component";

export default function Home() {
  const ankleCirlces: Exercise = {
    name: "Ankle Circles",
    count: 10,
    dateAdded: "2025-10-28",
    category: "Mobility",
    description:
      "Rotate your ankles in circular motions to improve flexibility.",
  };

  const planks: Exercise = {
    name: "Planks",
    count: 3,
    dateAdded: "2025-10-28",
    category: "Core",
    description: "Hold a plank position to strengthen your core muscles.",
  };

  const hamstringStretch: Exercise = {
    name: "Hamstring Stretch",
    count: 5,
    dateAdded: "2025-10-28",
    category: "Flexibility",
    description:
      "Stretch your hamstrings to improve flexibility and reduce injury risk.",
  };

  const mobility: ExerciseCategory = {
    name: "Mobility",
    exercises: [ankleCirlces],
  };

  const core: ExerciseCategory = {
    name: "Core",
    exercises: [planks],
  };

  const flexibility: ExerciseCategory = {
    name: "Flexibility",
    exercises: [hamstringStretch],
  };

  const categoriesForPage: ExerciseCategory[] = [mobility, core, flexibility];

  return (
    <>
      <div>
        <h1>Exercise Tracker</h1>
      </div>

      {categoriesForPage.map((category: ExerciseCategory) => {
        return (
          <ExerciseCategoryComponent key={category.name} category={category} />
        );
      })}
    </>
  );
}
