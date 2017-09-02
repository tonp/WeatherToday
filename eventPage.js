
/*	
*	Will execute during installation
*	Check if user location is stored in user local storage. 
*	Prompt for location if not in storage. 
*/
chrome.storage.local.getBytesInUse('userLocation', function(bytes){

		/* user location is not set */
		if (bytes == 0){
			
			var location = prompt("Please enter your location (Eg. Seattle, US): ", "City, Country"); 
			chrome.storage.local.set({'userLocation': location}, function(){

				alert("Location is saved.");

			});
			
		}

});