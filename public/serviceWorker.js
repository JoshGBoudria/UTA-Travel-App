// Import Workbox for serviceWorker functions
importScripts('https://storage.googleapis.com/workbox-cdn/releases/6.0.2/workbox-sw.js');

// Runs when the serviceWorker is installed
self.addEventListener("install", e =>
{
	console.log('yes');
	e.waitUntil(
		caches.open("static").then(cache =>  // doesn't have to be named "static"
		{
			// Cache these two files for offline use
			return cache.addAll(["./translations/Do You Speak English.wav",
				"./translations/Japanese Phrases audio files/Excuse Me.wav"]);
		})
	);
});

// Runs when a fetch request is made to the serviceWorker
self.addEventListener("fetch", e =>
{
	e.respondWith(
		caches.match(e.request).then(response =>
		{
			// If the response was found in the cache, return it (without going to the network)
			// If not, request it from the network
			return response || fetch(e.request);
		})
	);
});



