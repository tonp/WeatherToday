
/*	
*	Once the page is ready the function will shoot off two ajax calls to 
*	OpenWeatherMap API to collect necessary weather data given a stored 
*	user location. 
*/ 
document.addEventListener('DOMContentLoaded', function(){

	// Get stored location
	chrome.storage.local.get("userLocation", function(loc){

		// Split location to get city
		var location = loc.userLocation;
		var city = location.split(',')

		// Display location to user
		var current = document.getElementById('cu'); 
		current.innerHTML = "Today in " + city + ":";

		// Set up api access
		var key = // Omitted key
		var url = 'http://api.openweathermap.org/data/2.5/weather?q=' + city[0] + '&units=imperial';
		var url = url + '&appid='+ key;

		// AJAX to get current weather
		var req = new XMLHttpRequest(); 
		req.open('GET', url, true); 
		req.addEventListener('load', function(){

			if (req.status >= 200 && req.status < 400){
				var res = JSON.parse(req.responseText);
				// Send data to parse
				parseCurrentData(res); 
			}
			else{
				console.log("Error"); 
				console.log(req.statusText); 
			}

		});
		req.send(null); 

		/* AJAX to get next five days weather */ 
		var url2 = 'http://api.openweathermap.org/data/2.5/forecast/daily?q=' + location + '&cnt=6' + '&units=imperial';
		var url2 = url2 + '&appid='+ key;

		var req2 = new XMLHttpRequest(); 
		req2.open('GET', url2, true); 
		req2.addEventListener('load', function(){

			if (req2.status >= 200 && req2.status < 400){
				var res2 = JSON.parse(req2.responseText);
				// Send data to parse
				parseFiveDaysData(res2); 
			}
			else{
				console.log("Error"); 
				console.log(req2.statusText); 
			}

		});
		req2.send(null); 
	});

	
	event.preventDefault();
	
});







/*
*	Parse and format the current weather data 
*/
function parseCurrentData(data){
	
	document.getElementById('cdegree').innerHTML = data.main.temp.toPrecision(3) + " " + "&#x2109";
	document.getElementById('cdescript').innerHTML = data.weather['0'].description;

}







/*
*	Parse and format the weather data for the next five days. 
*/
function parseFiveDaysData(res){

	// For Each Day
	for (var day = 1; day < 6; day++){

		// Set Date
		var d = new Date(); 
		d.setDate(d.getDate()+ day);

		var month = d.getMonth(); 
		month = month + 1;
		var dayOfMonth;
		dayOfMonth = d.getDate();


		var table = document.getElementById("fiveDayTable"); 

		// Create Row
		var tr = document.createElement("tr");

		// Create Cols
		var date = document.createElement("td");
		var temp = document.createElement("td");
		var forcast = document.createElement("td");

		// Set data
		date.innerHTML = month + '/' + dayOfMonth;
		temp.innerHTML = res.list[day].temp.day.toPrecision(3) + " &#x2109";;
		forcast.innerHTML = res.list[day].weather['0'].description;

		// Append to table
		tr.appendChild(date); 
		tr.appendChild(temp); 
		tr.appendChild(forcast); 

		table.appendChild(tr);

	}
}