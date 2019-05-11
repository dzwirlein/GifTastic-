

$(function(){
    addButton(topicArray);
});



var topicArray = ["Football", "Baseball", "Basketball", "Golf", "Hockey"];

function addButton(){

    $("#addButton").empty();

    for(var i =0; i< topicArray.length; i++){
        var newDiv = $('<button>');
        newDiv.data("topic", topicArray[i]);
        newDiv.addClass("newButton")
        newDiv.text(topicArray[i]);
        $('#addButton').append(newDiv);
    }

    // console.log(newDiv)

}



$(document).on("click", ".newButton", function() {
    event.preventDefault();
    $("#addGif").empty();
    var topic = $(this).data("topic");
    var queryURL = "https://api.giphy.com/v1/gifs/search?q=" + topic + "&api_key=D8KmrFWcTHemc7ycRSa36jD6moPwQGOX";

    // console.log(queryURL)

    $.ajax({
      url: queryURL,
      method: "GET"
    })
      .then(function(response) {
        console.log(response);

        var results = response.data;

        for (var i = 0; i < results.length; i++) {
          var gifDiv = $("<div>");

          var rating = results[i].rating;

          var p = $("<p>").text("Rating: " + rating);

          var topicImage = $("<img>");
          topicImage.attr("src", results[i].images.fixed_height.url);

          gifDiv.prepend(p);
          gifDiv.prepend(topicImage);

          $("#addGif").prepend(gifDiv);
        }
      });
  });

  $('.newSearch').on("click",function(){
    var addSearch = $('input').val();

    console.log(addSearch);

    topicArray.push(addSearch);
    addButton(topicArray);

    return false;


  });