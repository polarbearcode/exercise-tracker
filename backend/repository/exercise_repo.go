package repository

import (
	"encoding/json"
	"exercise-tracker/config"
	"exercise-tracker/models"
)

// Get all exerccises from the database
func GetAllExercises() ([]models.Exercise, error) {
    data, _, err := config.Supabase.From("exercise").Select("*", "", false).Execute()
    if err != nil {
        return nil, err
    }

    var exercises []models.Exercise
    if err := json.Unmarshal(data, &exercises); err != nil {
        return nil, err
    }

    return exercises, nil
}

// Add a new exercise to the database
func AddExercise(exercise models.Exercise) error {
    _, _, err := config.Supabase.From("exercise").Insert(exercise, false, "", "", "").Execute()
    return err
}

// Delete an exercise from the database by name
func DeleteExercise(exerciseName string) error {
	_, _, err := config.Supabase.From("exercise").Delete("", "").Eq("name", exerciseName).Execute()
	return err 
}

// Update the count of an existing exercise
func UpdateExerciseCount(exerciseName string, newCount int) error {
	_, _, err := config.Supabase.From("exercise").Update(map[string]interface{}{"count": newCount}, "", "").Eq("name", exerciseName).Execute()
	return err
}