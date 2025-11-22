package routes

import (
	"net/http"

	"exercise-tracker/handlers"
	"exercise-tracker/utils"

	"github.com/go-chi/chi/v5"
	"github.com/go-chi/chi/v5/middleware"
)

func NewRouter() http.Handler {
	r := chi.NewRouter()

	// Global middleware
	r.Use(middleware.Logger)
	r.Use(utils.CORSMiddleware)

	// Health check route
	r.Get("/health", func(w http.ResponseWriter, r *http.Request) {
		w.Write([]byte("OK"))
	})

	// Example grouped routes
	r.Route("/api", func(r chi.Router) {
		r.Get("/exercise", handlers.GetExercises)
		r.Post("/exercise", handlers.AddExercise)
		r.Delete("/exercise/{name}", handlers.DeleteExercise)
		r.Put("/exercise", handlers.UpdateExerciseCount)
	})

	return r
}