/*
 * Bryson Neel 1001627866
*/

// Import Workbox for serviceWorker functions
importScripts('https://storage.googleapis.com/workbox-cdn/releases/6.0.2/workbox-sw.js');

// Assets to cache when the app starts
const static_assets =
[
	'/index.html',
	'/app.js',
	'/app.css',
	'/res/home1.jpg',
	'/res/home2.jpg',
	'/res/home3.jpg',
	'/res/home4.jpg',
	'/res/home.jpg',
	'/manifest.json',
	'/flag64.png',
	'/flag96.png',
	'/flag144.png',
	'/flag192.png',
	'/serviceWorker.js',
	'/Components/Navbar/index.js',
	'/Components/Navbar/NavbarElements.js',
	'/pages/contacts.js',
	'/pages/converter.js',
	'/pages/dropbox.js',
	'/pages/home.js',
	'/pages/itinerary.js',
	'/pages/admin.js',
	'/pages/translation.js',
	'./translations/Do-You-Speak-English.mp3',
	'./translations/Excuse-Me.mp3',
	'./translations/Good-Bye.mp3',
	'./translations/Good-Evening.mp3',
	'./translations/Good-Morning.mp3',
	'./translations/Hello.mp3',
	'./translations/I-Am-Sorry.mp3',
	'./translations/I-Do-Not-Understand.mp3',
	'./translations/My-Name-Is.mp3',
	'./translations/No.mp3',
	'./translations/Please.mp3',
	'./translations/Please-Tell-Me-Your-Name.mp3',
	'./translations/See-You-Later.mp3',
	'./translations/Thanks-For-What-You-Did.mp3',
	'./translations/Thank-You.mp3',
	'./translations/That-Is-Alright.mp3',
	'./translations/Where-Is-Restroom.mp3',
	'./translations/Yes.mp3',
	'./translations/You-Are-Welcome.mp3'
];

// Runs when the serviceWorker is installed
self.addEventListener('install', e =>
{
	e.waitUntil(
		caches.open("static").then(cache =>
		{
			// Cache these two files for offline use
			cache.addAll(static_assets);
		})
	);
});

// Runs when a fetch request is made to the serviceWorker
self.addEventListener('fetch', (e) =>
{
	e.respondWith(
		caches.match(e.request).then(response =>
		{
			// If the response was found in the cache, return it (without going to the network).
			//   If not, request it from the network.
			return response || fetch(e.request);
		})
	);
});

