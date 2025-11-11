"use server";
import * as z from "zod";
import type { AddExerciseFormState, Exercise } from "./definitions";
import type { Dispatch, SetStateAction } from "react";

// Add exercise form must have a name and category filled out
// and be a string
const ExerciseSchema = z.object({
  name: z.string().min(1, "Exercise name cannot be empty"),
  category: z.string().min(1, "Category cannot be empty"),
});

// Checking add category form
const CategorySchema = z.object({
  name: z.string().min(1, "Category name cannot be empty"),
});

/**
 * Add an exercise to a category and update the database (TODO)
 * @param formData data from the add exercise form submission (name, category)
 * @param categoryExerciseSet the current exercises in the category
 * @param setCategoryExerciseSet the setter function to update the exercise set
 * @returns  the state of the form submission
 */
export async function addExercise(
  formData: FormData,
  category: string,
  categoryExerciseNamesSet: Set<string>,
  categoryExerciseList: Array<Exercise>,
  setCategoryExerciseList: Dispatch<SetStateAction<Array<Exercise>>>
): Promise<AddExerciseFormState> {
  const validatedFields = ExerciseSchema.safeParse({
    name: formData.get("exercise-name")?.toString() || "",
    category: formData.get("exercise-category")?.toString() || "",
  });

  if (!validatedFields.success) {
    //error handling
    return { success: false, message: validatedFields.error.issues[0].message };
  } else {
    const { name: exerciseName } = validatedFields.data;

    if (categoryExerciseNamesSet.has(exerciseName)) {
      alert("Exercise already exists in this category.");
      return {
        success: false,
        message: `Exercise ${exerciseName} already exists in this category.`,
      };
    }

    const newExercise: Exercise = {
      name: exerciseName,
      count: 0,
      dateAdded: new Date().toLocaleDateString(),
      category: category,
    };

    const newExerciseList: Array<Exercise> = Array.from(categoryExerciseList);
    newExerciseList.push(newExercise);
    setCategoryExerciseList(newExerciseList);

    return {
      success: true,
      message: `Exercise ${exerciseName} added successfully.`,
    };
  }
}

/**
 * Add a new exercise category
 * @param formData data from the add category form submission (name)
 * @param exerciseCategories the current exercise categories
 * @param setExerciseCategories the setter function to update the exercise categories
 * @returns the state of the form submission
 */
export async function addCategory(
  formData: FormData,
  exerciseCategories: Set<string>,
  setExerciseCategories: (set: Set<string>) => void
): Promise<AddExerciseFormState> {
  const validatedFields = CategorySchema.safeParse({
    name: formData.get("name")?.toString() || "",
  });

  if (!validatedFields.success) {
    //error handling
    return { success: false, message: validatedFields.error.issues[0].message };
  } else {
    const { name: categoryName } = validatedFields.data;
    if (exerciseCategories.has(categoryName)) {
      alert("Category already exists.");
      return {
        success: false,
        message: `Category ${categoryName} already exists.`,
      };
    }
    const newSet = new Set(exerciseCategories);
    newSet.add(categoryName);
    setExerciseCategories(newSet);
    return {
      success: true,
      message: `Category ${categoryName} added successfully.`,
    };
  }
}
