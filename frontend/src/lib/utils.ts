"use server";
import * as z from "zod";
import type { AddExerciseFormState } from "./definitions";

// Add exercise form must have a name and category filled out
// and be a string
const ExerciseSchema = z.object({
  name: z.string().min(1, "Exercise name cannot be empty"),
  category: z.string().min(1, "Category cannot be empty"),
});

export async function addExercise(
  prevState: AddExerciseFormState,
  formData: FormData,
  categoryExerciseSet: Set<string>,
  setCategoryExerciseSet: (set: Set<string>) => void
): Promise<AddExerciseFormState> {
  const validatedFields = ExerciseSchema.safeParse({
    name: formData.get("name")?.toString() || "",
    category: formData.get("category")?.toString() || "",
  });

  if (!validatedFields.success) {
    //error handling
    return { success: false, message: validatedFields.error.issues[0].message };
  } else {
    const { name: exerciseName, category: exerciseCategory } =
      validatedFields.data;

    if (categoryExerciseSet.has(exerciseName)) {
      alert("Exercise already exists in this category.");
      return {
        success: false,
        message: `Exercise ${exerciseName} already exists in this category.`,
      };
    }

    const newSet = new Set(categoryExerciseSet);
    newSet.add(exerciseName);
    setCategoryExerciseSet(newSet);
    return {
      success: true,
      message: `Exercise ${exerciseName} added successfully.`,
    };
  }
}
