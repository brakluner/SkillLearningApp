var objectTest = {
    firstName: {
        LocationTest: "minnesnowta",
        Weather: "Colder than Canada",
    },
    secondName: {
        LocationTest: "Califorincation",
        Weather: "'It's Raining Men",
    }


}


let keys = Object.keys(objectTest);
//console.log(objectTest[newI].LocationTest);
$(document).ready(function () {

    let keys = Object.keys(objectTest);
    for (var i = 0; i < keys.length; i++) {

        var createNewOption = $("<option>");
        createNewOption.addClass("autoOption");
        createNewOption.attr("id", objectTest[keys[i]].LocationTest);
        createNewOption.attr("value", objectTest[keys[i]].LocationTest);
        $(createNewOption).text(objectTest[keys[i]].LocationTest);
        console.log(objectTest[keys[i]].LocationTest);



        $(".skill-dropdown").append(createNewOption);
    }




});

//API key for cool videos

$(document).ready(function() {

    function getVideo() {
        $.ajax({
          type: 'GET',
          url: 'https://www.googleapis.com/youtube/v3/search',
          data: {
              key: 'AIzaSyBlRMCifkXmDv30ugkOCWMX3OkgtpNseR4',
              q: "How to bake bread",
              part: 'snippet',
              maxResults: 1,
              type: 'video',
              videoEmbeddable: true,
          },
          success: function(data){
              embedVideo(data)
          },
          error: function(response){
              console.log("Request Failed");
          }
        });
      }
  
  function embedVideo(data) {
      $('iframe').attr('src', 'https://www.youtube.com/embed/' + data.items[0].id.videoId)
      $('h3').text(data.items[0].snippet.title)
      $('.description').text(data.items[0].snippet.description)
  }
  
  getVideo();
  
  });

});

