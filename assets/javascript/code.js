//This is where I would stick my code

$("#submit-Search").on("click" , function(event){
    event.preventDefault();

    var bandName = $("#Band-Name").val().trim();
    var city = $("#CityName").val().trim();
    var dates=$("#Dates").val().trim();
    var price = $("#PricePay").val().trim();

    console.log(bandName,city,dates,price);
});