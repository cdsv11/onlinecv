var statsJson = null;
var messagesJson = null;
var skillsJson = null;

function readData(sheetData) {
    var data = sheetData;
    var dataArray=[];
    for(var r=0; r<data.length; r=r+2) {
        var cell = data[r]["gs$cell"];
        var val = cell["$t"];
        var cell2 = data[r+1]["gs$cell"];
        var val2 = cell2["$t"];
        dataArray[val]=val2;
    }
    return dataArray;
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
    var list=document.getElementById("list_skills");
    for(var i=0;i<keys.length;i++){
        var key=keys[i];
        var value= skillsDataArray[key];
        var li= document.createElement("li");
        var div= document.createElement("div");
        div.classList.add("progress");
        div.classList.add("percent"+value);
        var span= document.createElement("span");
        span.innerText=value+"%";
        var strong = document.createElement("strong");        
        strong.innerText=key;
        div.appendChild(span);
        li.appendChild(div);
        li.appendChild(strong);
        list.appendChild(li);
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


//timeline Work
//TODO
//timeline education 
//TODO


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





