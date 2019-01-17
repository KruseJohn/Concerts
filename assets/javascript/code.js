//Submit Search logic

bandName = "";
city = "";

$("#submit-Search").on("click",function(event){
    event.preventDefault();
    $("#venue-info").empty();
    

    bandName = $("#Band-Name").val().trim();
    city = $("#CityName").val().trim();
    // var dates=$("#Dates").val().trim();
    // var price = $("#PricePay").val().trim();

    ticketInfo();

    //Function call to Ticketmaster API
    function ticketInfo() {
 
    //Set Variables
    var TMAPIKEY = "7elxdku9GGG5k8j0Xm8KWdANDgecHMV0";
    var radius = "500";
    var unit = "miles";
    var latlong = "40.712776,-74.005974";

    // if/else statement to present different results if city is or isn't specified
    if (city !== "") {
        var queryURL = "https://app.ticketmaster.com/discovery/v2/events.json?apikey=" + TMAPIKEY + "&keyword=" + bandName + "&latlong=" + latlong + "&radius=" + radius + "&unit=" + unit;
        console.log(queryURL);
        }
        else {
        var queryURL = "https://app.ticketmaster.com/discovery/v2/events.json?apikey=" + TMAPIKEY + "&keyword=" + bandName;
        console.log(queryURL);
        };

$.ajax({
   
    url: queryURL,
    method: "GET"

    //Process API Get response
    }).then(function(response){
        // console.log(response);
        //Loop through for 10 event results print to screen
        for (i = 0; i < 10; i++) {
            
        var eventName = response._embedded.events[i].name;
        var eventURL = response._embedded.events[i].url;
        var localeventDate = response._embedded.events[i].dates.start.localDate;
        var localeventTime = response._embedded.events[i].dates.start.localTime;
        var promoter = response._embedded.events[i].promoter.name;
        var eventImage = response._embedded.events[i].images[0].url;
        var venueCity = response._embedded.events[i]._embedded.venues[0].city.name;
        var venueCountry = response._embedded.events[i]._embedded.venues[0].country.name;
        var venueLong = response._embedded.events[i]._embedded.venues[0].location.longitude;
        var venueLat = response._embedded.events[i]._embedded.venues[0].location.latitude;

        console.log(eventName);
        console.log(eventURL);
        console.log(localeventDate);
        console.log(localeventTime);
        console.log(eventImage);
        console.log(venueCity);
        console.log(venueCountry);
        console.log(venueLong);
        console.log(venueLat);
        console.log(response._embedded.events[i].priceRanges);


         // Creating a div for the info                  
         var venueDiv = $("<div>", {class: 'holder'});

         var a = $('<p>').text(promoter).css("color", "white");
         var b = $('<p>').text(eventName).css("color", "white");
         var c = $('<p>').text(localeventDate + ", " + localeventTime).css("color", "white");
         var d = $('<p>').text(venueCity + ", " + venueCountry).css("color", "white");
         
       //var f = $('<p>').text(coordinates);
 
         //  Creating a new variable to include data for eventImage
         var image = $("<img>").attr("src", eventImage).css("width", "50%").css("height", "auto")
         .css("float","left");
         
         // create a div and button for a favorite button
         var favBtn = $("<p><i class='far fa-heart fa-lg'></i><p>").css("padding","3px");
         favBtn.attr({'favorite-status': 'No'}).css("color", "red").css("float","right");
 
         // create a div and button for a map section
         var mapBtn = $("<p><i class='fas fa-map-marked-alt fa-lg'></i><p>").css("padding","3px");
         mapBtn.attr({'favorite-status': 'No'}).css("color", "yellow").css("float","right");
     
         venueDiv.append(image,mapBtn,a,b,c,d,favBtn);
 
         $("#venue-info").append(venueDiv);

        };  // end of for loop

    });  //  end of .then response

};  //end of ajax call

});  // end of submit search




