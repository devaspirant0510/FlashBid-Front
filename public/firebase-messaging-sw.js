importScripts('https://www.gstatic.com/firebasejs/10.13.2/firebase-app-compat.js');
importScripts('https://www.gstatic.com/firebasejs/10.13.2/firebase-messaging-compat.js');

firebase.initializeApp({
  apiKey: "AIzaSyB-kyMqugz0V7tF3jsitFrUE7ZHBquPFdA",
  authDomain: "unknownauction-8bfa1.firebaseapp.com",
  projectId: "unknownauction-8bfa1",
  storageBucket: "unknownauction-8bfa1.firebasestorage.app",
  messagingSenderId: "33743379845",
  appId: "1:33743379845:web:9f2ec900a98b224dc538ec",
  measurementId: "G-PM0YQTLDS7"
});

const messaging = firebase.messaging();

// 백그라운드 메시지 처리
messaging.onBackgroundMessage((payload) => {
  console.log('[firebase-messaging-sw.js] Received background message ', payload);

  const notificationTitle = payload.data?.title || '기본 알림 제목';
  const notificationOptions = {
    body: payload.data?.body || '기본 알림 내용',
    icon: '/images/logo.png',
    data: {
      click_action: payload.data?.click_action || '/'
    }
  };

  self.registration.showNotification(notificationTitle, notificationOptions);
});

// 알림 클릭 시 동작
self.addEventListener('notificationclick', function(event) {
  console.log('[firebase-messaging-sw.js] Notification click Received.', event);

  event.notification.close(); // 알림 닫기

  const clickAction = event.notification.data?.click_action || '/';

  event.waitUntil(
    clients.matchAll({ type: 'window', includeUncontrolled: true }).then(windowClients => {
      for (let client of windowClients) {
        if (client.url === clickAction && 'focus' in client) {
          return client.focus();
        }
      }
      if (clients.openWindow) {
        return clients.openWindow(clickAction);
      }
    })
  );
});
