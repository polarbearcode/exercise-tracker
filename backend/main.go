package main

import (
	"exercise-tracker/routes"
	"net/http"
)

func main() {
	r := routes.NewRouter()
	http.ListenAndServe(":8080", r)
}