

$(document).ready(function(){
    $('.wrapper').hide();
    // Variables
    var urlToOpen = "";
    var weatherData = {};
    var location, icon, sunrise, sunset, description;

    // Functions
    var updateIcon = function(icon) {
        $('.card-image img').attr('src', icon)
    }
    var updateHTML = function(selector, text) {
        $(selector).html(text);
    };
    var toCelsius = function(kelvin) {
        var celsius = kelvin - 273.15;
        return celsius.toFixed(0) + '&degC'
    }
    var toFahrenheit = function(kelvin) {
        var fahrenheit = (9 / 5) * (kelvin - 273.15) + 32;
        return fahrenheit.toFixed(0) + '&degF'
    }

    if (navigator.geolocation) {
        navigator.geolocation.getCurrentPosition(function(x) {
            var long = x.coords.longitude;
            var lat = x.coords.latitude;
            var urlToOpen = 'https://crossorigin.me/http://api.openweathermap.org/data/2.5/weather?lat=' + lat + '&lon=' + long + '&appid=' + '85ad46f83d5801cdebcbc16ab42983e7'
            $.get(urlToOpen, function(data) {
          // Populating
          weatherData = data;
          location = weatherData.name + ", " + weatherData.sys.country;
          icon = "icons/" + weatherData.weather[0].icon + ".svg";
          description = weatherData.weather[0].description;
          sunrise = (function() {
            var timestamp = new Date(null);
            timestamp.setSeconds(weatherData.sys.sunrise);
            return timestamp;
          })();
          sunset = (function() {
            var timestamp = new Date(null);
            timestamp.setSeconds(weatherData.sys.sunset);
            return timestamp;
          })();
          // Updating
          updateHTML("#location", location);
          updateHTML("#temperature", toCelsius(weatherData.main.temp));
          updateHTML("#description", description);
          updateHTML(
            "#sunrise",
            "Sunrise: " + sunrise.toLocaleString().substr(11)
          );
          updateHTML(
            "#sunset",
            "Sunset: " + sunset.toLocaleString().substr(11)
          );
          updateIcon(icon);
          // Remove preloader
          $(".spinner").hide();
          $(".wrapper").fadeIn();
        }
      );
    });
  } else {
    $("#preload-text").html(
      "Oops, your location is unavailable and I can't handle this!"
    );
    $(".preload").hide();
  }

  // Temp conversions
  $("input[name=temp]").on("click", function(val) {
    console.log(val.target.value);
    if (val.target.value == "fah") {
      updateHTML("#temperature", toFahrenheit(weatherData.main.temp));
    } else {
      updateHTML("#temperature", toCelsius(weatherData.main.temp));
    }
  });

    // Temp conversions
    $('input[name=temp]').on('click', function(val){ 
        if (val.target.value == 'fah') {
            updateHTML('#temperature', toFahrenheit(weatherData.main.temp))
        } else {
            updateHTML('#temperature', toCelsius(weatherData.main.temp))
        }
    })

    $('.card').on('mouseenter', function() {
        $('.card').toggleClass('z-depth-4')
    })
    $('.card').on('mouseleave', function() {
        $('.card').toggleClass('z-depth-4')
    })

})