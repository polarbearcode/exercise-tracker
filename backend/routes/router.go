package routes

import (
	"exercise-tracker/handlers"
	"exercise-tracker/utils"
	"net/http"
)

func RegisterRoutes() {
	http.Handle("/api/exercise/exercises", utils.CORSMiddleware(http.HandlerFunc(handlers.GetExercises)))
	http.Handle("/api/exercise/add", utils.CORSMiddleware(http.HandlerFunc(handlers.AddExercise)))
	http.Handle("/api/exercise/delete", utils.CORSMiddleware(http.HandlerFunc(handlers.DeleteExercise)))
}