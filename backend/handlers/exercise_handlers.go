package handlers

import (
	"encoding/json"
	"exercise-tracker/models"
	"exercise-tracker/repository"
	"net/http"
)

func GetExercises(w http.ResponseWriter, r *http.Request) {
    w.Header().Set("Content-Type", "application/json")

    exercises, err := repository.GetAllExercises()
    if err != nil {
        http.Error(w, err.Error(), http.StatusInternalServerError)
        return
    }

    json.NewEncoder(w).Encode(exercises)
}

func AddExercise(w http.ResponseWriter, r *http.Request) {
    w.Header().Set("Content-Type", "application/json")

    var ex models.Exercise
    if err := json.NewDecoder(r.Body).Decode(&ex); err != nil {
        http.Error(w, "Invalid JSON", http.StatusBadRequest)
        return
    }

    if err := repository.AddExercise(ex); err != nil {
        http.Error(w, err.Error(), http.StatusInternalServerError)
        return
    }

    w.WriteHeader(http.StatusCreated)
    json.NewEncoder(w).Encode(map[string]string{"message": "Exercise added successfully"})
}

func DeleteExercise(w http.ResponseWriter, r *http.Request) {
	w.Header().Set("Content-Type", "application/json")

	var ex models.Exercise
    if err := json.NewDecoder(r.Body).Decode(&ex); err != nil {
        http.Error(w, "Invalid JSON", http.StatusBadRequest)
        return
    }

    if err := repository.DeleteExercise(ex); err != nil {
        http.Error(w, err.Error(), http.StatusInternalServerError)
        return
    }

    w.WriteHeader(http.StatusCreated)
    json.NewEncoder(w).Encode(map[string]string{"message": "Exercise added successfully"})

}