package main

import (
	r "github.com/dancannon/gorethink"
	"github.com/gorilla/websocket"
)

// Message received structure
type Message struct {
	Name string      `json:"name"`
	Data interface{} `json:"data"`
}

// FindHandler type
type FindHandler func(string) (MsgHandler, bool)

// NewClient return a client object pointer
func NewClient(socket *websocket.Conn, fh FindHandler, session *r.Session) *Client {
	return &Client{
		send:         make(chan Message),
		socket:       socket,
		findHandler:  fh,
		session:      session,
		stopChannels: make(map[int]chan bool),
	}
}

// Client chan structure
type Client struct {
	send         chan Message
	socket       *websocket.Conn
	findHandler  FindHandler
	session      *r.Session
	stopChannels map[int]chan bool
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

func (c *Client) close() {
	for _, ch := range c.stopChannels {
		ch <- true
	}
	close(c.send)
}

func (c *Client) newStopChannel(stopKey int) chan bool {
	stop := make(chan bool)
	c.stopChannels[stopKey] = stop
	return stop
}
