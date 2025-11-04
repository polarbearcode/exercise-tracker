export type Exercise = {
  name: string;
  count: number;
  dateAdded: string;
  category: string;
  description?: string;
};

export type ExerciseCategory = {
  name: string;
  exercises: Exercise[];
};

export type AddExerciseFormState = {
  success: boolean;
  message: string;
};
