package utils

import (
	"log"
	"net/http"
)

// CORSMiddleware wraps any handler and adds CORS headers
func CORSMiddleware(next http.Handler) http.Handler {
	return http.HandlerFunc(func(w http.ResponseWriter, r *http.Request) {
		// Allow all origins (you can restrict this to your frontend URL in production)
		w.Header().Set("Access-Control-Allow-Origin", "*")
		// Which HTTP methods are allowed
		w.Header().Set("Access-Control-Allow-Methods", "GET, POST, PUT, DELETE, OPTIONS")
		// Which headers are allowed from the frontend
		w.Header().Set("Access-Control-Allow-Headers", "Content-Type, Authorization")

		// Handle preflight (OPTIONS) requests immediately
		if r.Method == http.MethodOptions {
			w.WriteHeader(http.StatusNoContent)
			return
		}

		// Continue with the actual handler
		next.ServeHTTP(w, r)
	})
}

func LogErrorJSON(w http.ResponseWriter, r *http.Request, status int, err error, msg string) {
	log.Printf(`{"status":%d,"method":"%s","path":"%s","message":"%s","error":"%v"}`, 
		status, r.Method, r.URL.Path, msg, err)
	http.Error(w, msg, status)
}
