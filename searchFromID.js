var airbnb = require('./airbnb.js');
var fs = require('fs');
//42697
var start = 100569;
var fileName = "./temp/id.json";

fs.readFile(fileName,'utf8',function(error,json){
    if(error) {
        console.log(error);
        fs.writeFile(fileName,JSON.stringify({"id":start}));
    }else {
        var js = JSON.parse(json);
        start = js.id;
    }
    search(start);
});

function search(id){
    var ids = id+1;
    if(id<start) {
        console.log("duplicate");
        return;
    }
    start = ids;
    if(ids%30==0) {
        fs.writeFile(fileName,JSON.stringify({"id":start}));
    }
    airbnb.searchInfo(id,function(callbackID) {
        search(ids);
    });
};

