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