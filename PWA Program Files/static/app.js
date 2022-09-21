if("serviceWorker" in navigator)
{
	navigator.serviceWorker.register("static/serviceWorker.js")
		.then(registration =>
		{
			console.log("Service worker registered");
			console.log(registration);
		}).catch(error =>
		{
			console.log("Service worker not registered");
			console.log(error);
		});
}

