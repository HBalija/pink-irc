package main

import (
	"fmt"
	"net/http"

	"github.com/gorilla/websocket"
)

// upgrader: switch connection from http to websocket
// allow connections from any origin
var upgrader = websocket.Upgrader{
	ReadBufferSize:  1024,
	WriteBufferSize: 1024,
	CheckOrigin:     func(r *http.Request) bool { return true },
}

// Handler router handle custom type
type Handler func(*Client, interface{})

// Router struct implement Handler interface (ServeHTTP method)
type Router struct {
	rules map[string]Handler
}

// NewRouter return pointer to a new router struct
func NewRouter() *Router {
	return &Router{
		rules: make(map[string]Handler),
	}
}

// Handle custom messages
func (m *Router) Handle(msgName string, handler Handler) {
	m.rules[msgName] = handler
}

func (m *Router) ServeHTTP(w http.ResponseWriter, r *http.Request) {
	// var socket *websocket.Conn
	socket, err := upgrader.Upgrade(w, r, nil)

	if err != nil {
		// HTTP status 500
		w.WriteHeader(http.StatusInternalServerError)
		fmt.Fprint(w, err.Error())
		return
	}

	client := NewClient(socket)
	go client.Write()
	client.Read()
}
