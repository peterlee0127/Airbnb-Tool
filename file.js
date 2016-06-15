var fs = require('fs');
function writeFile(id,info) {
     fs.writeFile("Room/"+id+".json", JSON.stringify(info), function(err) {
        if(err) {
            return console.log(err);
        }
        console.log("Room:"+id+"\t was saved!");
    });
}

function readConfig(fileName,callback) {
    fs.readFile(fileName,'utf8',function(error,json){
        var index = 0;
        if(error) {
            console.log(error);
            fs.writeFile(fileName,JSON.stringify({"index":0}));
        }else {
            var js = JSON.parse(json);
            index = js.index;
        }
        callback(index);
   });
}

function writeConfig(fileName,index) {
    fs.writeFile(fileName,JSON.stringify({"index":index}));
}

exports.writeFile = writeFile;
exports.readConfig = readConfig;
exports.writeConfig = writeConfig;
