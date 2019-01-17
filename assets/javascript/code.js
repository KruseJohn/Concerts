//Submit Search logic

bandName = "";
city = "";

$("#submit-Search").on("click",function(event){
    event.preventDefault();
    

    bandName = $("#Band-Name").val().trim();
    city = $("#CityName").val().trim();
    // var dates=$("#Dates").val().trim();
    // var price = $("#PricePay").val().trim();

    console.log(bandName,city);
    ticketInfo();
    
    //Function call to Ticketmaster API
function ticketInfo() {
 
    //Set Variables
    var TMAPIKEY = "7elxdku9GGG5k8j0Xm8KWdANDgecHMV0";
    var responseSize = "20";
    var sorting = "date,desc";
    var queryURL = "https://app.ticketmaster.com/discovery/v2/events.json?apikey=" + TMAPIKEY + "&keyword=" + bandName;
    
    
$.ajax({
   
    url: queryURL,
    method: "GET"

    //Process API Get response
    }).then(function(response){
        console.log(response);
        //Loop through for 10 event results print to screen
        for (i = 0; i < 10; i++) {
            
        console.log(response._embedded.events[i].name);
        console.log(response._embedded.events[i].url);
        console.log(response._embedded.events[i].dates.start.localDate);
        console.log(response._embedded.events[i].dates.start.localTime);
        console.log(response._embedded.events[i].promoter.name);
        // console.log(response._embedded.events[i].priceRanges[0].currency);
        console.log(response._embedded.events[i].images[0].url);
        console.log(response._embedded.events[i]._embedded.venues[0].city.name);
        console.log(response._embedded.events[i]._embedded.venues[0].country.name);
        console.log(response._embedded.events[i]._embedded.venues[0].location.longitude);
        console.log(response._embedded.events[i]._embedded.venues[0].location.latitude);
        };
    });
};

});




