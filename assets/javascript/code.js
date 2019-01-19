
var config = {
    apiKey: "AIzaSyDz_0KKxD5xNCPQjwG-66J5Vjky4qM6-Lg",
    authDomain: "uden-bootcamp-project-1-team-1.firebaseapp.com",
    databaseURL: "https://uden-bootcamp-project-1-team-1.firebaseio.com",
    projectId: "uden-bootcamp-project-1-team-1",
    storageBucket: "uden-bootcamp-project-1-team-1.appspot.com",
    messagingSenderId: "68929725202"
  };
  
  firebase.initializeApp(config);
 
  var database = firebase.database();



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
         var favBtn = $("<p class='far fa-heart fa-lg' id='heart'></p>").css("padding","3px");
         favBtn.attr('favorite-status', 'No').css("color", "red").css("float","right");
         favBtn.attr("data-promoter", promoter);
         favBtn.attr("data-dateTime", localeventDate + localeventTime)
         favBtn.attr("data-venue" , venueCity + venueCountry);
         favBtn.attr("data-eventName",eventName);
         favBtn.attr("data-eventImage", eventImage);
         // create a div and button for a map section
         var mapBtn = $("<p><i class='fas fa-map-marked-alt fa-lg'></i><p>").css("padding","3px");
         mapBtn.attr({'favorite-status': 'No'}).css("color", "yellow").css("float","right");
     
         venueDiv.append(image,mapBtn,a,b,c,d,favBtn);
 
         $("#venue-info").append(venueDiv);

        };  // end of for loop

    });  //  end of .then response

};  //end of ajax call

});  // end of submit search

$(document.body).on("click", "#heart", function () {
    var favStatus = $(this).attr("favorite-status");
    var parentCard = $(this).attr("data-promoter");
 //   var parentCardID = "#" + parentCard;
    console.log(parentCard);
    console.log(favStatus);
    
    // Add to Favorites section
    if (favStatus === "No") {
        $(this).addClass("fas").removeClass("far");
        $(this).attr({
            'favorite-status': 'Yes'
        });
       
    
        } else {
            // Remove from Favorites
            $(this).attr({
                'favorite-status': 'No'
            }).addClass("far").removeClass("fas");
            
            
        }

        var favSav = {
            promoter : $(this).attr("data-promoter"),   
            eventName: $(this).attr("data-eventName"),
           // eventURL: $(this).attr(eventURL,
            eventImage: $(this).attr("data-eventImage"),
           localeventDate : $(this).attr("data-dateTime"),
           // localeventTime : localeventTime,
           venueCity : $(this).attr("data-venue"),
           // venueCountry : venueCountry
           }
       
           database.ref().push(favSav);
    
           function renderButtons() {
            $("#fav-btn").empty();
     
           for(i = 0; i < favSav.length; i++) {
                
            
                 var newBtn = $("<button class = 'btn btn-primary'>");
               newBtn.addClass("favorite");
                 
                newBtn.text("favorites");
                newBtn.attr("data-promoter" ,[i]);
                $("#fav-btn").append(newBtn);
             
             
         };
     }
          // end of renderButtons function...
     
         //  call the function  
        renderButtons(); 
    }); 
    database.ref().on("child_added", function(snapshot){
       
        console.log(snapshot.val());

        $("#favorite").attr(snapshot.val());

    });

 $("#favorite").on("click" , function () {
          console.log(this);
              
          
    var venueDiv = $("<div>", {class: 'holder'});

    var a = $('<p>');
    a = $(this).attr("eventname");
        
           
    var b = $('<p>');
        b = $(this).attr("promoter");
        console.log(a + "," + b);

    var c = $('<p>');
        c = $(this).attr("localeventdate"); 
    
    var d = $('<p>');
        d = $(this).attr("venuecity");     
    
    //var eventImage = $('<img src = >');
    
     //   eventImage = $(this).attr("eventimage");
        
       // venueDiv.append(eventImage);
        venueDiv.append(a);
        venueDiv.append(b);
        venueDiv.append(c);
        venueDiv.append(d);
        
 
         $("#venue-info").prepend(venueDiv);
        });
 





// When the user scrolls down 600px from the top of the document, show "back to top" button
var btn = $('#upBtn');

$(window).scroll(function () {
    if ($(window).scrollTop() > 600) {
        btn.addClass('show');
    } else {
        btn.removeClass('show');
    }
});

btn.on('click', function (e) {
    e.preventDefault();
    $('html, body').animate({
        scrollTop: 0
    }, '300');
});