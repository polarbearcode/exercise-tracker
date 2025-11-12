package models

type Exercise struct {
	Name        string `json:"name"`
	Category    string `json:"category"`
	Count       int    `json:"count"`
	DateAdded   string `json:"date_added"`
	Description string `json:"description,omitempty"`
}