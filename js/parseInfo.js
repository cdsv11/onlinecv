var statsJson = null;
var messagesJson = null;
var statsDataArray = [];
var messagesDataArray = [];

function readData(sheetData) {
    var data = sheetData;
    
    for(var r=0; r<data.length; r=r+2) {
        var cell = data[r]["gs$cell"];
        var val = cell["$t"];
        var cell2 = data[r+1]["gs$cell"];
        var val2 = cell2["$t"];
        statsDataArray[val]=val2;
    }
    return statsDataArray;
}


// fill the stats

function drawStats(statsDataArray){
    $("#stats_projects").text(statsDataArray['Projects completed']);    
    $("#stats_clients").text(statsDataArray['Happy clients']);
    $("#stats_blog").text(statsDataArray['Blog Posts']);
    $("#stats_coffee").text(statsDataArray['Cups of Coffee']);
    $("#stats_hours").text(statsDataArray['Hours']);
}

function callStats(){
    return $.ajax({
        dataType: "json",
        url: "https://spreadsheets.google.com/feeds/cells/1sKjUgTuTUz77IvSWWavdIzjcNRCfW4WKwoGRCNH2B0E/1/public/values?alt=json",
        success: doStatsJson
      });
}
function doStatsJson(json){
    statsJson = json.feed.entry;
}

//Messages

function drawMessages(messagesDataArray){
    var keys= Object.keys(messagesDataArray);
    for(var i=0;i<keys.length;i++){
        var value= messagesDataArray[keys[i]];
        $("#"+keys[i]).text(value);    
    }
}

function callMessages(){
    return $.ajax({
        dataType: "json",
        url: "https://spreadsheets.google.com/feeds/cells/1sKjUgTuTUz77IvSWWavdIzjcNRCfW4WKwoGRCNH2B0E/2/public/values?alt=json",
        success: doMessagesJson
      });
}
function doMessagesJson(json){
    messagesJson = json.feed.entry;
}

$(window).on('load', function(){
    $.when(callMessages()).done(function(response){
        drawMessages(readData(messagesJson));
    });
    $.when(callStats()).done(function(response){
        drawStats(readData(statsJson));
    });
    
});


