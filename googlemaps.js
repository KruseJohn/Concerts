document.addEventListener("DOMContentLoaded", function () {
    if (document.querySelectorAll("#map").length > 0)
    {
      if (document.querySelector("html").lang)
        lang = document.querySelector("html").lang;
      else
        lang = "en";
  
      var js_file = document.createElement("script");
      js_file.type = "text/javascript";
      js_file.src = "https://maps.googleapis.com/maps/api/js?key=AIzaSyDFpd-2EoMstvbarr8ywlER8dEv2nzfQhY&callback=initMap" + lang;
      document.getElementsByTagName("head")[0].appendChild(js_file);
    }
  });

  
  var geocoder;
  var map;
  //google api stuff

   
  function initMap() {
  var map = new google.maps.Map(document.getElementById("map"), {
    zoom: 8,
    center: {lat: -34.397, lng: 150.644}
  });
  var geocoder = new google.maps.Geocoder();

  document.getElementById("submit-Search").addEventListener("click", function() {
    geocodeAddress(geocoder, map);
  });
}

function geocodeAddress(geocoder, resultsMap) {
  var address = document.getElementById("address").value;
  geocoder.geocode({"address": address}, function(results, status) {
    if (status === "OK") {
      resultsMap.setCenter(results[0].geometry.location);
      var marker = new google.maps.Marker({
        map: resultsMap,
        position: results[0].geometry.location
      });
    } else {
      alert("Geocode was not successful for the following reason: " + status);
    }
  });
}