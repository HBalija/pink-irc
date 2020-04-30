package main

import (
	"fmt"
	"math/rand"
	"time"
)

// Client chan structure
type Client struct {
	send chan Message
}

// send messages over ws
func (c *Client) Write() {
	for msg := range c.send {
		// TODO: socket.sendJson(msg)
		fmt.Printf("%T\n", c)
		fmt.Printf("%#v\n", msg)
		fmt.Printf("%v\n", msg)
	}
}

// read messages from ws
func (c *Client) Read() {

}

func (c *Client) subscribeChannels() {
	// TODO: changefeed Query RethinkDB
	for {
		time.Sleep(time.Millisecond * time.Duration(rand.Intn(1000)))
		c.send <- Message{Name: "channel add"}
	}
}

func (c *Client) subscribeMessages() {
	// TODO: changefeed Query RethinkDB
	for {
		time.Sleep(time.Millisecond * time.Duration(rand.Intn(1000)))
		c.send <- Message{Name: "message add"}
	}
}

// NewClient return a client object pointer
func NewClient() *Client {
	return &Client{
		send: make(chan Message),
	}
}
