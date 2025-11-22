package main

import (
	"exercise-tracker/config"
	"exercise-tracker/routes"
	"log"
	"net/http"
	"os"

	"github.com/aws/aws-lambda-go/lambda"
	"github.com/awslabs/aws-lambda-go-api-proxy/httpadapter"
	"github.com/joho/godotenv"
)

func main() {
	config.InitDB()
	r := routes.NewRouter()

	err := godotenv.Load()
    if err != nil {
        log.Println("No .env file found — using system environment variables")
    }

	if (os.Getenv("environemnt") == "production") {
		log.Println("Running in production mode")
		http.ListenAndServe(":8080", r)
		return
	} else {
		log.Println("Running in lambda")
		lambda.Start(httpadapter.New(r).ProxyWithContext)
	}

	http.ListenAndServe(":8080", r)
}