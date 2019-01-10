import Pusher from 'pusher-js/react-native';
import config from '../../config/pusher';

class PusherService {
  constructor() {
    const { key, additionalConfig } = config;
    this.pusher = new Pusher(key, additionalConfig);
  }

  subscribe(channel, event, callback) {
    const pusherChannel = this.pusher.subscribe(channel);

    pusherChannel.bind(event, ({ data }) => callback(data));
    // pusherChannel.bind(event, ({ data }) => callback(data));

    return pusherChannel;
  }

  unsubscribe(channel) {
    this.pusher.unsubscribe(channel);
  }
}

const pusherService = new PusherService();

export default pusherService;
