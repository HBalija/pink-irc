package main

import (
	"log"
	"net/http"

	r "github.com/dancannon/gorethink"
)

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

	router.handle("user edit", editUser)
	router.handle("user subscribe", subscribeUser)
	router.handle("user unsubscribe", unsubscribeUser)

	router.handle("message add", addChannelMessage)
	router.handle("message subscribe", subscribeChannelMessage)
	router.handle("message unsubscribe", unsubscribeChannelMessage)

	http.Handle("/", router)
	http.ListenAndServe(":8000", nil)
}
