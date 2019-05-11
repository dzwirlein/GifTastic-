


var topicArray = ["Football", "Baseball", "Basketball", "Golf", "Hockey"];
var fixed = "";
var animated = "";


$(document).ready(function(){


  addButton(topicArray);

});


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

          var still = results[i].images.fixed_height_still.url;
          var animated = results[i].images.fixed_height.url;

          var topicImage = $("<img class='gifImage'>");
          topicImage.attr("src", still);
          topicImage.attr('data-still', still)
          topicImage.attr('data-animated', animated)
          
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

    event.preventDefault();


  });




  $(document).on("click", ".gifImage", function(event){
    console.log("image clicked")

    var imgSrc = event.target.src
 

  if (imgSrc.includes("_s.gif")) {
    $(this).attr('src', $(this).data('animated'));

  }else {

    $(this).attr('src', $(this).data('still'));

  }

  });







  //   // create variables to set new url values
  //   // compare still vs. active images on click
  //   // includes() function
  //   // If/else fuction to change default to still on click, else keep the same

