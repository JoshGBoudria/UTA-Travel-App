//importScripts('cdn://workbox-sw.js');
importScripts('https://storage.googleapis.com/workbox-cdn/releases/6.0.2/workbox-sw.js');

/*
workbox.routing.registerRoute(
	/\.(?:css|js)$/,  // if the file is js or css
	new workbox.strategies.StaleWhileRevalidate(
	{
		"cacheName": "css and js",
		plugins:
		[
			new workbox.expiration.Plugin(
			{
				maxEntries: 1000,
				maxAgeSeconds: 600
			})
		]
	})
)


workbox.routing.registerRoute(
	/\.(?:png|jpg|gif|wav)$/,  // if the file is png, jpg, gif, or wav
	new workbox.strategies.CacheFIrst(
	{
		"cacheName": "assets",
		plugins:
		[
			new workbox.expiration.Plugin(
			{
				maxEntries: 1000,
				maxAgeSeconds: 600
			})
		]
	})
)
*/

self.addEventListener("install", e =>
{
	//console.log("Service worker installed");
	e.waitUntil(
		caches.open("static").then(cache =>  // doesn't have to be named "static"
		{
			return cache.addAll(["/static/assets/Japanese Phrases audio files/Do You Speak English.wav",
				"/static/assets/Japanese Phrases audio files/Excuse Me.wav"]);
		})
	);
});

self.addEventListener("fetch", e =>
{
	//console.log("Fetch for: ${e.request.url}");
	e.respondWith(
		caches.match(e.request).then(response =>
		{
			return response || fetch(e.request);    // if found the response in the cache, return that (without going to the network)
			                                        // if not found, request it from the network
		})
	);
});



