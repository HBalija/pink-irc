package main

import (
	"github.com/gorilla/websocket"
)

// Message received structure
type Message struct {
	Name string      `json:"name"`
	Data interface{} `json:"data"`
}

// FindHandler type
type FindHandler func(string) (MsgHandler, bool)

// Client chan structure
type Client struct {
	send        chan Message
	socket      *websocket.Conn
	findHandler FindHandler
}

// send messages over ws
func (c *Client) Write() {
	for msg := range c.send {
		err := c.socket.WriteJSON(msg)
		if err != nil {
			break
		}
	}
	c.socket.Close()
}

// read messages from ws
func (c *Client) Read() {
	var message Message
	for {
		err := c.socket.ReadJSON(&message)
		if err != nil {
			break
		}
		handler, found := c.findHandler(message.Name)
		if found == true {
			handler(c, message.Data)
		}
	}
	c.socket.Close()
}

// NewClient return a client object pointer
func NewClient(socket *websocket.Conn, fh FindHandler) *Client {
	return &Client{
		send:        make(chan Message),
		socket:      socket,
		findHandler: fh,
	}
}
