//https://api.airbnb.com/v2/listings/5116458?client_id=3092nxybyb0otqw18e8nh5nty&_format=v1_legacy_for_p3

var airbnb = require('./airbnb.js');
var file = require('./file.js');
var data = require('./data.js');
var https = require('https');
var fileName = "./temp/hosting.json";
var request = require('request');
var index = 0;

function start() {
    data.getRoomIDList(function(json){
        file.readConfig(fileName,function(index){
            json.sort(function() {
                return .5 - Math.random();
            });
            parseHostListing(json,index);
        });
    });
}
start();

var options = {
method: 'GET',
        headers:{
            'User-Agent':'Safari (Macintosh; OS X/10.11.5) NSURLConnection/1259',
            'Content-Type':'application/json; charset=utf-8'
        }
};


function parseHostListing(userIDArray,index) {
    var id = userIDArray[index];
    
    console.log("index:"+index+"  "+id);

    var url = "https://api.airbnb.com/v2/listings?";
    var useridPar = "user_id="+id;
    var client_idPar = "client_id=3092nxybyb0otqw18e8nh5nty";
    var formatPar = "_format=v1_legacy_for_p3";
    var requestURL = url+useridPar+"&"+client_idPar+"&"+formatPar;
    var ids = [];
    request(requestURL, options, function (error, response, body) {
        if (!error && response.statusCode == 200) {
            var json = JSON.parse(body);
            var listings = json.listings;
            for(var i = 0,max = listings.length ; i<max ; i++){
              ids.push(listings[i].id);
            }
            if(listings.length>0) {
                console.log(ids);
            }
            airbnb.searchByIDArray(ids,function() {
                next(userIDArray,index);
            });
        }else {
            next(userIDArray,index);
        }
    })
}
function next(userIDArray,index) {
    index = index+1;
    if(index%3 == 0) {
        file.writeConfig(fileName,index);
    }
    setTimeout(parseHostListing,2000,userIDArray,index);
    //parseHostListing(userIDArray, index);
}
