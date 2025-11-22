// Container component that renders the homepage with exercise categories and exercises
"use client";

import { useEffect, useState } from "react";
import type { Exercise, ExerciseCategory } from "../lib/definitions";
import ExerciseCategoryComponent from "./category-component";
import AddCategoryForm from "./add-category-form";

export default function HomepageContainer({
  exerciseData,
}: {
  exerciseData: Exercise[];
}) {
  /** 
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

  const [categoriesForPage, setCategoriesForPage] = useState<
    ExerciseCategory[]
  >([mobility, core, flexibility]);

  const exerciseCategoriesNamesSet: Set<string> = new Set();

  for (const exerciseCat of categoriesForPage) {
    exerciseCategoriesNamesSet.add(exerciseCat.name);
  }

  */

  const [categoriesForPage, setCategoriesForPage] = useState<
    ExerciseCategory[]
  >([]);

  const [exerciseCategoriesNamesSet, setExerciseCategoriesNamesSet] = useState<
    Set<string>
  >(new Set());

  useEffect(() => {
    const exerciseCategoriesNamesSet: Set<string> = new Set();
    const exerciseCategoriesMap: Map<string, Exercise[]> = new Map();
    exerciseData.forEach((exercise) => {
      if (!exerciseCategoriesNamesSet.has(exercise.category)) {
        exerciseCategoriesNamesSet.add(exercise.category);
        exerciseCategoriesMap.set(exercise.category, []);
      }
      exerciseCategoriesMap.get(exercise.category)?.push(exercise);
    });

    const initialCategoriesForPage: ExerciseCategory[] = Array.from(
      exerciseCategoriesMap,
      ([name, exercises]) => ({ name, exercises })
    );

    setCategoriesForPage(initialCategoriesForPage);
    setExerciseCategoriesNamesSet(exerciseCategoriesNamesSet);
  }, [exerciseData]);

  // TODO: build my categories from the data pulling
  // TODO: add a category

  return (
    <>
      <div>
        <h1>Exercise Tracker</h1>
        <AddCategoryForm
          exerciseCategories={categoriesForPage}
          exerciseCategoriesNames={exerciseCategoriesNamesSet}
          setExerciseCategories={setCategoriesForPage}
        ></AddCategoryForm>
      </div>

      {categoriesForPage.map((category: ExerciseCategory) => {
        return (
          <ExerciseCategoryComponent key={category.name} category={category} />
        );
      })}
    </>
  );
}
