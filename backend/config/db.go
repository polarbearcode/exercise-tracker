package config

import (
	"log"
	"os"

	"github.com/joho/godotenv"
	"github.com/supabase-community/supabase-go"
)

var Supabase *supabase.Client

func InitDB() {

	err := godotenv.Load()
    if err != nil {
        log.Println("No .env file found — using system environment variables")
    }
	
    url := os.Getenv("DB_URL")
    key := os.Getenv("DB_API_KEY")

    client, err := supabase.NewClient(url, key, nil)
    if err != nil {
        log.Fatalf("Failed to connect to Supabase: %v", err)
    }

    Supabase = client
}