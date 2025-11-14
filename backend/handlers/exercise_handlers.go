package handlers

import (
	"encoding/json"
	"exercise-tracker/models"
	"exercise-tracker/repository"
	"exercise-tracker/utils"
	"fmt"
	"net/http"

	"github.com/go-chi/chi/v5"
)

func GetExercises(w http.ResponseWriter, r *http.Request) {
    w.Header().Set("Content-Type", "application/json")

    exercises, err := repository.GetAllExercises()
    if err != nil {
		utils.LogErrorJSON(w, r, http.StatusInternalServerError, err, "Error fetching all exercises")
        http.Error(w, err.Error(), http.StatusInternalServerError)
        return
    }

    json.NewEncoder(w).Encode(exercises)
}

func AddExercise(w http.ResponseWriter, r *http.Request) {
    w.Header().Set("Content-Type", "application/json")

    var ex models.Exercise
    if err := json.NewDecoder(r.Body).Decode(&ex); err != nil {
		utils.LogErrorJSON(w, r, http.StatusBadRequest, err, "Invalid JSON to add exercise")
        http.Error(w, "Invalid JSON to add exercise", http.StatusBadRequest)
        return
    }

    if err := repository.AddExercise(ex); err != nil {
		utils.LogErrorJSON(w, r, http.StatusInternalServerError, err, fmt.Sprintf("Error adding exercise: %s", ex.Name))
        http.Error(w, err.Error(), http.StatusInternalServerError)
        return
    }

    w.WriteHeader(http.StatusCreated)
    json.NewEncoder(w).Encode(map[string]string{"message": "Exercise added successfully"})
}

func DeleteExercise(w http.ResponseWriter, r *http.Request) {

	exerciseName := chi.URLParam(r, "name")
	
	if exerciseName == "" {
		utils.LogErrorJSON(w, r, http.StatusBadRequest, nil, "Missing exercise name")
		http.Error(w, "Missing exercise name", http.StatusBadRequest)
		return
	}
	

    if err := repository.DeleteExercise(exerciseName); err != nil {
		utils.LogErrorJSON(w, r, http.StatusInternalServerError, err, fmt.Sprintf("Exercise %s could not be deleted", exerciseName))
        http.Error(w, err.Error(), http.StatusInternalServerError)
        return
    }

    w.WriteHeader(http.StatusCreated)
    json.NewEncoder(w).Encode(map[string]string{"message": fmt.Sprintf("Exercise %s deleted", exerciseName)})
}

func UpdateExerciseCount(w http.ResponseWriter, r *http.Request) {
	w.Header().Set("Content-Type", "application/json")

    var ex models.Exercise
    if err := json.NewDecoder(r.Body).Decode(&ex); err != nil {
		utils.LogErrorJSON(w, r, http.StatusBadRequest, err, "Invalid JSON to update exercise")
        http.Error(w, "Invalid JSON to update exercise", http.StatusBadRequest)
        return
    }

	if err := repository.UpdateExerciseCount(ex.Name, ex.Count); err != nil {
		utils.LogErrorJSON(w, r, http.StatusInternalServerError, err, fmt.Sprintf("Error updating exercise: %s with count %d", ex.Name, ex.Count))
		http.Error(w, err.Error(), http.StatusInternalServerError)
		return
	}

	w.WriteHeader(http.StatusCreated)
    json.NewEncoder(w).Encode(map[string]string{"message": fmt.Sprintf("Exercise %s updated to count %d", ex.Name, ex.Count)})
}