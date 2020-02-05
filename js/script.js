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

    //increments the recent serches
    let keys = Object.keys(objectTest);
    for (var i = 0; i < keys.length; i++) {
        var createNewOption = $("<option>");
        createNewOption.addClass("autoOption");
        createNewOption.attr("id", objectTest[keys[i]].LocationTest);
        createNewOption.attr("value", objectTest[keys[i]].LocationTest);
        $(createNewOption).text(objectTest[keys[i]].LocationTest);
        //console.log(objectTest[keys[i]].LocationTest);
        $(".skill-dropdown").append(createNewOption);
    }
});
// Add click functions to Search
$(document).ready(function () {

    // on click searchfunctions to Search
    $(".button").click(function () {
        var searchBar = $("#search").val();
        console.log(searchBar);
        console.log("second " + searchBar);
        if ($("#youtube-radio").prop("checked") == true) {
            getVideo(searchBar);
        };
        if ($("#wiki-radio").prop("checked") == true) {
            getInfo(searchBar);
        };

        //if clicked, returns definition of search term
        if ($("#def-radio").prop("checked") == true) {
            getDefinition(searchBar);
        if ($("#def-radio").prop("checked") == true) {
            var queryURL = getDefinition(searchBar);
            $.ajax({
                url: queryURL,
                method: "GET"
            }).then(updatePage);
        };
        clear();
        var queryURL = getDefinition();
        $.ajax({
            url: queryURL,
            method: "GET"
        }).then(updatePage);
    });
});

    });
});

//list of functions
//get the video
function getVideo(searchBar) {
    $.ajax({
        type: 'GET',
        url: 'https://www.googleapis.com/youtube/v3/search',
        data: {
            key: 'AIzaSyBlRMCifkXmDv30ugkOCWMX3OkgtpNseR4',
            q: "How to " + searchBar,
            part: 'snippet',
            maxResults: 1,
            type: 'video',
            videoEmbeddable: true,
        },
        success: function (data) {
            //puts video to page
            embedVideo(data)
        },
        error: function (response) {
            console.log("Request Failed");
        }
    });
}
//puts video to page
function embedVideo(data) {
    $('iframe').attr('src', 'https://www.youtube.com/embed/' + data.items[0].id.videoId)
    $('h3').text(data.items[0].snippet.title)
    // $('.description').text(data.items[0].snippet.description)
}
//API AJAX for wiki
function getInfo(searchBar) {
    $.ajax({
        type: 'GET',
        url: 'https://en.wikipedia.org/w/api.php?format=json&action=query&prop=extracts&exintro&explaintext&redirects=1&titles=' + searchBar,
        crossDomain: true,
        dataType: 'jsonp',
        success: function (data) {
            console.log(data);
            let wikiKeys = Object.keys(data.query.pages);
            console.log(data.query.pages[wikiKeys[0]].extract);
            let wikiContent = data.query.pages[wikiKeys[0]].extract
            $('.wiki-content').html(wikiContent);
        }
    });
}
//clrears previous info
function clear() {
    $(".dictionary-def").empty();
}
//Dictionary function
function getDefinition(searchBar) {

    var queryURL = "https://www.dictionaryapi.com/api/v3/references/collegiate/json/";
    var queryParams = { "key": "00129733-b164-4319-9aef-fb3e4f691bac" };
    DefSearch = searchBar
    console.log("---------------\nURL: " + queryURL + "\n---------------");
    console.log(queryURL + DefSearch + "?" + $.param(queryParams));
    return queryURL + DefSearch + "?" + $.param(queryParams);
}
//updates the page to new info
function updatePage(defData) {
    //var mainDef = defData[0].meta.id
    var defPron = defData[0].hwi.hw
    var defType = defData[0].fl
    var definition = defData[0].def[0].sseq[0][1][1].dt[0][1]
    console.log(definition)
    var displayDef = $("<div></div>").text(mainDef)
    var displayPron = $("<div></div>").text(defPron)
    var typeDef = $("<div></div>").text(defType)
    var defi = $("<div></div>").text(definition)

    $(".dictionary-def").append(displayDef)
    $(".dictionary-def").append(displayPron)
    $(".dictionary-def").append(typeDef)
    $(".dictionary-def").append(defi)
}