console.log('Service worker loaded...');

self.addEventListener('push', e => {
    const {title, message} = e.data.json();
    console.log('Push recieved...');
    self.registration.showNotification(title, {
        body: message
    });
});