import WebsocketNotif from './websocket-notif';
import CONFIG from '../global/config';

let socket = null;

const WebSocketInitiator = {
  init(url) {
    socket = new WebSocket(url);
    console.log('ws connected to => ', socket.url);

    socket.onmessage = this._onMessageHandler;
  },

  _onMessageHandler(message) {
    console.log('websocket onmessage handler => ', message);

    const reviewData = JSON.parse(message.data);

    WebsocketNotif.sendNotification({
      title: reviewData.name,
      options: {
        body: reviewData.review,
        icon: 'icons/192x192.png',
        image: `${CONFIG.BASE_IMAGE_URL + reviewData.pictureId}`,
        vibrate: [200, 100, 200],
      },
    });
  },
};

const sendDataToWebsocket = (reviewData) => {
  if (socket && socket.readyState === WebSocket.OPEN) {
    const data = JSON.stringify(reviewData);
    socket.send(data);
  } else {
    console.info('websocket-review-data');
  }
};

export { WebSocketInitiator, sendDataToWebsocket };
