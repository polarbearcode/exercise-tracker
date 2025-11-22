package config

import (
	"log"
	"os"

	"github.com/supabase-community/supabase-go"
)

var Supabase *supabase.Client

func InitDB() {

	
    url := os.Getenv("DB_URL")

    if url == "" {
        log.Fatal("DB_URL environment variable is not set")
    }

    key := os.Getenv("DB_API_KEY")

    if key == "" {
        log.Fatal("DB_API_KEY environment variable is not set")
    }

    client, err := supabase.NewClient(url, key, nil)
    if err != nil {
        log.Fatalf("Failed to connect to Supabase: %v", err)
    }

    Supabase = client
}