package main

import (
	"log"
	"net/http"

	r "github.com/dancannon/gorethink"
)

// User struct with gorethink field tags
type User struct {
	ID   string `gorethink:"id,omitempty"`
	Name string `gorethink:"name"`
}

// Channel message data structure
type Channel struct {
	ID   string `json:"id" gorethink:"id,omitempty"`
	Name string `json:"name" gorethink:"name"`
}

func main() {
	session, err := r.Connect(r.ConnectOpts{
		Address:  "localhost:28015",
		Database: "irc",
	})

	if err != nil {
		log.Panic(err.Error())
	}

	router := NewRouter(session)
	router.handle("channel add", addChannel)
	router.handle("channel subscribe", subscribeChannel)
	router.handle("channel unsubscribe", unsubscribeChannel)

	http.Handle("/", router)
	http.ListenAndServe(":8000", nil)
}
