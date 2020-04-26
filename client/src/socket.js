import { EventEmitter } from 'events';


class Socket {

  constructor(ws = new WebSocket(), ee = new EventEmitter()) {
    this.ws = ws;
    this.ee = ee;
    ws.onmessage = this.message;
    ws.onopen = this.open;
    ws.onclose = this.close;
  }

  on(eventName, func) {
    // message received from server
    this.ee.on(eventName, func);
  }

  off(eventName, func) {
    this.ee.removeListener(eventName, func);
  }

  emit(eventName, dataPayload) {
    // message sent to server
    const message = JSON.stringify({ name: eventName, data: dataPayload });
    this.ws.send(message);
  }

  message(e) {
    try {
      const message = JSON.parse(e.data);
      this.ee.emit(message.name, message.data);
    } catch(err) {
      this.ee.emit('error, err');
    }
  }

  open(){
    this.ee.emit('connect');
  }

  close(){
    this.ee.emit('disconnect');
  }
}

export default Socket;
