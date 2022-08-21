var apiKey = "&key=" + "65808fcc669441d98a37afa2e978b679";
var daysValue = $("#days");
var daysCount = $("#days-count");
$("#city-search").on("keydown", function () {
	$("#city-search").removeClass("is-invalid");
	$("#city-empty-alert").empty();
});
console.log(window.screen.width);
if (window.screen.width < 768) {
	$("#days").attr("type", "select");
	$("#days").attr("value", "");
} else {
	$("#days").attr("type", "range");
}
$("#searchBtn").on("click", function (e) {
	e.preventDefault();
	var city = "?city=" + $("#city-search").val().replace(/\s/g, "").toLowerCase();
	var units = "&units=" + $("input[name=units]:radio:checked").val();
	var days = "&days=" + $("#days").val();

	if ($("#city-search").val().length == 0) {
		var alert = $("<div class='alert alert-danger' role='alert'><p>Please enter a city before searching</p></div");
		$("#city-search").addClass("is-invalid");
		$("#city-empty-alert").append(alert);
	} else {
		getWeather(city, units, days);
	}
});

function getWeather(city, units, days) {
	$.ajax({
		method: "get",
		url: "https://api.weatherbit.io/v2.0/forecast/daily" + city + units + days + apiKey,
	}).then(function (response) {
		console.log("https://api.weatherbit.io/v2.0/forecast/daily" + city + units + days + apiKey);
		console.log(response.data[0]);
		$("#todays-forcast").empty();
		var highTemp = response.data[0].high_temp;
		var lowTemp = response.data[0].low_temp;
		var currentTemp = response.data[0].temp;
		var windSpeed = response.data[0].wind_spd;
		var windDirection = response.data[0].wind_cdir_full;
		var weatherDescr = response.data[0].weather.description;
		var weatherIcon = response.data[0].weather.icon;
		console.log(highTemp, lowTemp, currentTemp, windSpeed, windDirection, weatherDescr, weatherIcon);
		$("#city-search").val("");
	});
}
function showVal(newVal) {
	$("#number-of-days").text(newVal);
}

// function todaysWeather();
