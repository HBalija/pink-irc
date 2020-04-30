package main

import (
	"net/http"
)

// Channel message data structure
type Channel struct {
	ID   string `json:"id"`
	Name string `json:"name"`
}

func main() {
	router := NewRouter()
	// router.handle("channel add", func() bool { return true })

	http.Handle("/", router)
	http.ListenAndServe(":8000", nil)
}
