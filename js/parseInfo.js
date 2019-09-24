var statsJson = null;
var messagesJson = null;
var skillsJson = null;
var statsDataArray = [];
var messagesDataArray = [];
var skillsDataArray = [];

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
    $("#stats_places").text(statsDataArray['Countries']);
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


//Skills
function drawSkills(skillsDataArray){
    var keys= Object.keys(skillsDataArray);
    for(var i=0;i<keys.length;i++){
        var value= messagesDataArray[keys[i]];
        //search for a way to duplicate the blocks from timelines. (is skills only on one page or 2? cause there is 2 timelines)
    
    }

}


function callSkills(){
    return $.ajax({
        dataType: "json",
        url: "https://spreadsheets.google.com/feeds/cells/1sKjUgTuTUz77IvSWWavdIzjcNRCfW4WKwoGRCNH2B0E/3/public/values?alt=json",
        success: doSkillsJson
      });
}
function doSkillsJson(json){
    skillsJson = json.feed.entry;
}


$(window).on('load', function(){
    $.when(callMessages()).done(function(response){
        drawMessages(readData(messagesJson));
    });
    $.when(callSkills()).done(function(response){
        drawSkills(readData(skillsJson));
    });
    $.when(callStats()).done(function(response){
        drawStats(readData(statsJson));
    });
    
});





