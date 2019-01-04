import * as Pusher from 'pusher-js';

const pusher = new Pusher('f15495b1a9cc2b74d7ed', {
  cluster: 'eu',
  forceTLS: true
});

export default pusher; // singleton
