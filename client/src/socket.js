import { EventEmitter } from 'events';

class Socket {

  constructor(url, ee = new EventEmitter()) {
    this.ws = new WebSocket(url);
    this.ee = ee;
    this.ws.onopen = this.open.bind(this);
    this.ws.onmessage = this.message.bind(this);
    this.ws.onclose = this.close.bind(this);
  }

  emit(eventName, dataPayload) {
    // send message to server
    const message = JSON.stringify({ name: eventName, data: dataPayload });
    this.ws.send(message);
  }

  message(e) {
    // ws.onmessage handler from server
    // emits eventName and message data to event listeners
    try {
      const message = JSON.parse(e.data);
      this.ee.emit(message.name, message.data);
    } catch(err) {
      this.ee.emit('error', err);
    }
  }

  on(eventName, func) {
    // event listener
    // func argument takes data if sent from message handler
    this.ee.on(eventName, func);
  }

  off(eventName, func) {
    this.ee.removeListener(eventName, func);
  }


  open(){
    // ws.onopen handler
    this.ee.emit('connect');
  }

  close(){
    // ws.onclose handler
    this.ee.emit('disconnect');
  }
}

export default Socket;
