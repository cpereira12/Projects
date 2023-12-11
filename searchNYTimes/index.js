let apiKey = 'ZzbBCGfvtiUUwhZqEnhqkFJPXhABp3kw';
let queryURL = 'https://api.nytimes.com/svc/search/v2/articlesearch.json?q=';

let keyword = "";
let searchCount = "";
let startYear = "";
let endYear = "";
let searchObject = "";

$(function() {

    console.log("hello");
    $("#doSearch").on("click", searchArticles);
});

function searchArticles(event) {
    event.preventDefault();
    let strURL = buildURL();
    $.ajax({
        url: strURL,
        method:'GET'
    }).then(function(data){
        displayResult(data);
    });

}
function displayResult(data) {
    let searchCount = $("#numRecordsSelect").val();

    $("#search-results").empty();
    data.response.docs=data.response.docs.slice(1,parseInt(searchCount)+1);
    data.response.docs.forEach(function(element) {
        const articleDiv = $('<div>');
        articleDiv.text(element.abstract);
        articleDiv.addClass('search-item-div');
        $('#search-results').append(articleDiv);
    });
}
function buildURL(){
    keyword = $("#keyword").val().trim();
    searchCount = $("#numRecordsSelect").val();
    startYear = $("#startYear").val().trim();
    endYear = $("#endYear").val().trim();
    let returnURL = `${queryURL}${keyword}`;

    if(startYear === "" && endYear === "") {
        returnURL = `${queryURL}${keyword}&api-key=${apiKey}`;
        return returnURL;
    }

    if( startYear === "" && endYear !== "")
    {
        returnURL=`${queryURL}${keyword}&facet=true&end_date=${endYear}&api-key=${apiKey}`;
        return returnURL;
        
    }
    //user provide start year only
    if( startYear !== "" && endYear === "")
    {
        returnURL=`${queryURL}${keyword}&facet=true&begin_date=${startYear}&api-key=${apiKey}`;
        return returnURL;
        
    }
    //user provides both values
    if( startYear !== "" && endYear !== "")
    {
        returnURL=`${queryURL}${keyword}&facet=true&begin_date=${startYear}&end_date=${endYear}&api-key=${apiKey}`;
        return returnURL;
        
    }
    
}