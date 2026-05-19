importScripts('https://www.gstatic.com/firebasejs/10.12.0/firebase-app-compat.js');
importScripts('https://www.gstatic.com/firebasejs/10.12.0/firebase-messaging-compat.js');

firebase.initializeApp({
  apiKey: "AIzaSyBLUsaETkcXh_1f2KOayMAkhM9jPb1XE9Y",
  authDomain: "keep-up-f9d1c.firebaseapp.com",
  projectId: "keep-up-f9d1c",
  storageBucket: "keep-up-f9d1c.firebasestorage.app",
  messagingSenderId: "216417089419",
  appId: "1:216417089419:web:0f736931c79dbe4ed8618e"
});

const messaging = firebase.messaging();

messaging.onBackgroundMessage(function(payload) {
  const title = payload.notification?.title || 'Keep Up';
  const options = {
    body: payload.notification?.body || 'Someone posted in your family group',
    icon: '/Keepup/icon-192.png',
    badge: '/Keepup/icon-192.png',
    data: payload.data
  };
  return self.registration.showNotification(title, options);
});

self.addEventListener('notificationclick', function(event) {
  event.notification.close();
  event.waitUntil(
    clients.openWindow('https://keepupfamilyapp.github.io/Keepup')
  );
});
