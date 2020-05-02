package main

import (
	r "github.com/dancannon/gorethink"
	"github.com/mitchellh/mapstructure"
)

// declering constants
const (
	channelStop = iota // 0
	userStop           // 1
	messageStop        // 2
)

func addChannel(client *Client, data interface{}) {
	var channel Channel
	err := mapstructure.Decode(data, &channel)
	if err != nil {
		client.send <- Message{Name: "error", Data: err.Error()}
		return
	}
	go func() {
		// Insert channel into db
		err = r.Table("channel").
			Insert(channel).
			Exec(client.session)
		if err != nil {
			client.send <- Message{Name: "error", Data: err.Error()}
		}
	}()
}

func subscribeChannel(client *Client, data interface{}) {
	stop := client.newStopChannel(channelStop)
	result := make(chan r.ChangeResponse)

	cursor, err := r.Table("channel").
		Changes(r.ChangesOpts{IncludeInitial: true}).
		Run(client.session)
	if err != nil {
		client.send <- Message{Name: "error", Data: err.Error()}
		return
	}

	go func() {
		var change r.ChangeResponse
		for cursor.Next(&change) {
			result <- change
		}
	}()

	go func() {
		for {
			select {
			case <-stop:
				cursor.Close()
				return
			case change := <-result:
				if change.NewValue != nil && change.OldValue == nil {
					// record inserted
					client.send <- Message{Name: "channel add", Data: change.NewValue}
				}
			}
		}
	}()
}

func unsubscribeChannel(client *Client, data interface{}) {
	client.stopForKey(channelStop)
}
