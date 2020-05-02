package main

import (
	"fmt"
	"net/http"

	r "github.com/dancannon/gorethink"
	"github.com/gorilla/websocket"
)

// upgrader: switch connection from http to websocket
// allow connections from any origin
var upgrader = websocket.Upgrader{
	ReadBufferSize:  1024,
	WriteBufferSize: 1024,
	CheckOrigin:     func(r *http.Request) bool { return true },
}

// MsgHandler router handle custom type
type MsgHandler func(*Client, interface{})

// NewRouter return pointer to a new router struct
func NewRouter(session *r.Session) *Router {
	return &Router{
		rules:   make(map[string]MsgHandler),
		session: session,
	}
}

// Router struct implement Handler interface (ServeHTTP method)
type Router struct {
	rules   map[string]MsgHandler
	session *r.Session
}

func (m *Router) handle(msgName string, handler MsgHandler) {
	m.rules[msgName] = handler
}

func (m *Router) findHandler(msgName string) (MsgHandler, bool) {
	handler, found := m.rules[msgName]
	return handler, found
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

	client := NewClient(socket, m.findHandler, m.session)
	defer client.close()
	go client.Write()
	client.Read()
}
