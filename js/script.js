
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

    //Gets the recent searches
    if ((localStorage.getItem("recentSearches") === null)) {
        var recentSearches = [];
        console.log(recentSearches);
    } else {
        var recentSearches = JSON.parse(localStorage.getItem("recentSearches"));
        console.log(recentSearches);
    }
    getDropDown(recentSearches);

    // on click searchfunctions to Search
    $(".button").click(function () { runAll() });

    $(".skill-dropdown").change(function () {
        $("#search").val($(this).val());
        runAll();
    });

    //main running Function
    function runAll() {
        var searchBar = $("#search").val();
        console.log(searchBar);
        console.log("second " + searchBar);
        recentSearches.push(searchBar);
        addToDropDown(searchBar);
        localStorage.setItem("recentSearches", JSON.stringify(recentSearches));
    
        if ($("#youtube-radio").prop("checked") == true) {
            getVideo(searchBar);
        };
        if ($("#wiki-radio").prop("checked") == true) {
            getInfo(searchBar);
        };
        if ($("#dic-def").prop("checked") == true) {
            urbanDic(searchBar);
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


    }

        var queryURL = getDefinition();
        $.ajax({
            url: queryURL,
            method: "GET"
        }).then(updatePage);
    };

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
    $(".urbanDic").empty();
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
    var mainDef = defData[0].meta.id
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

};
//urbanDic
function urbanDic(searchBar) {
$.ajax({
    async: true,
    crossDomain: true,
    url: "https://mashape-community-urban-dictionary.p.rapidapi.com/define?term=" + searchBar,
    method: "GET",
    headers: {
      "x-rapidapi-host": "mashape-community-urban-dictionary.p.rapidapi.com",
      "x-rapidapi-key": "2e6a00a0b7mshb40a079e7a67f38p181597jsn5910590141c3"
    },
      success: function (dicData) {
        console.log(dicData);
        spawnDicData(dicData);
    }
  })
}
function spawnDicData(dicData) {

    var displayUrbTable = $("<div></div>").text("Urban Dictionary Results")
    
    for (var i = 0; i<10; i++) {

    var urbanDic = dicData.list[i].definition;

    console.log(urbanDic)
    
   
    var displayUrbanDic = $("<div></div>").text(urbanDic)

    $(displayUrbanDic).addClass("dicList")
    $(".urbanDic").append(displayUrbTable)
    $(displayUrbTable).append(displayUrbanDic)
    }
}
function getDropDown(recentSearches) {
    for (var i = 0; i < recentSearches.length; i++) {
        var createNewOption = $("<option>");
        createNewOption.addClass("auto-option");
        createNewOption.attr("id", recentSearches[i]);
        createNewOption.attr("value", recentSearches[i]);
        $(createNewOption).text(recentSearches[i]);
        $(".skill-dropdown").append(createNewOption);
    }
}

//adds the new serach to drop down menu
function addToDropDown(searchForBoth) {
    var createNewOption = $("<option>");
    createNewOption.addClass("autoOption");
    createNewOption.attr("id", searchForBoth);
    createNewOption.attr("value", searchForBoth);
    $(createNewOption).text(searchForBoth);
    $(".skill-dropdown").append(createNewOption);
}
