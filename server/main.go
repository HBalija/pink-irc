package main

import (
	"fmt"
	"net/http"
	"time"

	"github.com/gorilla/websocket"
	"github.com/mitchellh/mapstructure"
)

// upgrader: switch connection from http to websocket
// allow connections from any origin
var upgrader = websocket.Upgrader{
	ReadBufferSize:  1024,
	WriteBufferSize: 1024,
	CheckOrigin:     func(r *http.Request) bool { return true },
}

// Message received structure
type Message struct {
	Name string      `json:"name"`
	Data interface{} `json:"data"`
}

// Channel message data structure
type Channel struct {
	ID   string `json:"id"`
	Name string `json:"name"`
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
		var inMessage Message
		var outMessage Message

		err := socket.ReadJSON(&inMessage)
		if err != nil {
			fmt.Println(err)
			break
		}

		fmt.Printf("%#v\n", inMessage)

		switch inMessage.Name {
		case "channel add":
			err := addChannel(inMessage.Data)
			if err != nil {
				outMessage = Message{Name: "error", Data: err}
				err := socket.WriteJSON(outMessage)
				if err != nil {
					fmt.Println(err)
					break
				}
			}
		case "channel subscribe":
			go subscribeChannel(socket)
		}
	}
}

func addChannel(data interface{}) error {
	var channel Channel

	err := mapstructure.Decode(data, &channel)
	if err != nil {
		return err
	}
	channel.ID = "1"
	fmt.Println("added chennel")
	return nil
}

func subscribeChannel(socket *websocket.Conn) {
	// TODO: rethinkDB Query  / changefeed
	for {
		time.Sleep(time.Second * 1)
		message := Message{Name: "channel add", Data: Channel{ID: "1", Name: "Software Support"}}
		socket.WriteJSON(message)
		fmt.Println("sent new message")
	}
}
