class Message {
  constructor(action, object) {
    this.action = action;
    this.type = object.constructor.name;
    this.object = object;
  }
}

class Codec {
  constructor(types) {
    this.types = types;
  }

  decode(string) {
    // TODO: deserialize the message
  }

  encode(message) {
    // TODO: serialize the message
  }
}

export { Message, Codec };
