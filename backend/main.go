package main

import (
	"exercise-tracker/config"
	"exercise-tracker/routes"
	"net/http"
)

func main() {
	config.InitDB()
	r := routes.NewRouter()
	http.ListenAndServe(":8080", r)
}