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
    const data = JSON.parse(string);
    if (this.types[data.type]) {
      return new Message(data.action, Object.assign(new this.types[data.type](), data.object));
    }
    return new Message(data.action, data.object);
  }

  encode(message) {
    return JSON.stringify(message);
  }
}

export { Message, Codec };
