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

func main() {
	http.HandleFunc("/", handler)

	http.ListenAndServe(":8000", nil)
}

func handler(w http.ResponseWriter, r *http.Request) {

	// var socket *websocket.Conn
	socket, err := upgrader.Upgrade(w, r, nil)
	if err != nil {
		fmt.Println(err)
		return
	}

	for {
		msgType, msg, err := socket.ReadMessage()
		if err != nil {
			fmt.Println(err)
			return
		}
		fmt.Println("msgType", msgType)
		// msg --> []slice
		fmt.Println("msg", string(msg))

		// echo message back to the client
		err = socket.WriteMessage(msgType, msg)
		if err != nil {
			fmt.Println(err)
			return
		}
	}
}
