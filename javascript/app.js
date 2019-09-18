var topics = ["Astros", "Golden Retreiver","Racoons","Dallas Cowboys", "Mascots","The Office","Friends"];

function displayGif(){
	$("#gif-view").empty();
	var gif = $(this).attr("data-name");
	var key = "dc6zaTOxFJmzC";
	var queryURL = "https://api.giphy.com/v1/gifs/search?q="+ gif + "&limit=10&api_key="+ key;

	$.ajax({
		url:queryURL,
		method: "GET"
	}).done(function(response){
		console.log(response);

		for(i=0;i<response.data.length;i++){

		var gifdiv = $("<div>");
		var animateURL = response.data[i].images.original.url;
		var stillURL = response.data[i].images.original_still.url;
		var image = $("<img>").attr("src", stillURL);
		image.attr("alt","gif");
		image.attr("data-state","still");
		image.attr("data-still",stillURL);
		image.attr("data-animate",animateURL);
		image.addClass("gif");
		$("#gif-view").append(gifdiv);
		$("#gif-view").append("<br>");
		var rating = response.data[i].rating;
		var ratediv = $("<div>");
		var p = $("<p>").html("Rating: " + rating);
		ratediv.html(p);
		console.log(rating);
		gifdiv.append(image);
		$("#gif-view").append(ratediv);
		$("#gif-view").append("<br>");

	}
	});

	$(document).on('click',".gif", function(){

		var state = $(this).attr("data-state");

		if(state === "still"){
			$(this).attr("src", $(this).attr("data-animate"));
			$(this).attr("data-state", "animate");
		}else{
			$(this).attr("src", $(this).attr("data-still"));
			$(this).attr("data-state", "still");
		}


	});




}


function renderButtons(){
	$("#buttons-view").empty();
	for(i=0;i<topics.length;i++){
		var a = $("<button>");
		a.attr("data-name", topics[i]);
		a.addClass("topic");
		a.text(topics[i]);
		$("#buttons-view").append(a);
	}
}

renderButtons();

$("#add-gif").on("click", function(event){
	event.preventDefault();

	var topic = $("#topic-input").val().trim();
	topics.push(topic);
	renderButtons();

});


$(document).on("click",".topic",displayGif);