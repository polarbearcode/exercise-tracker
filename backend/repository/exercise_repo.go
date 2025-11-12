package repository

import (
	"encoding/json"
	"exercise-tracker/config"
	"exercise-tracker/models"
)

func GetAllExercises() ([]models.Exercise, error) {
    data, _, err := config.Supabase.From("exercises").Select("*", "", false).Execute()
    if err != nil {
        return nil, err
    }

    var exercises []models.Exercise
    if err := json.Unmarshal(data, &exercises); err != nil {
        return nil, err
    }

    return exercises, nil
}

func AddExercise(exercise models.Exercise) error {
    _, _, err := config.Supabase.From("exercises").Insert(exercise, false, "", "", "").Execute()
    return err
}

func DeleteExercise(exercise models.Exercise) error {
	_, _, err := config.Supabase.From("exercises").Delete("", "").Eq("name", exercise.Name).Execute()
	return err 
}