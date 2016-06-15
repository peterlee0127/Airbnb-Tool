"use strict"
var request = require('request');
const http = require('http');
const remoteServer = "192.168.4.71";
const port = 8080;
const apiPrefix = "http://"+remoteServer+":"+port;
//var remoteServer = "localhost"

function postData(id,info,callback) {
    var postData = JSON.stringify({
            'id' : id,
            'payload': info
        });

    var options = {
          hostname: remoteServer,
          port: port,
          path: '/api/addRoom',
          method: 'POST',
          headers: {
              'Content-Type': 'application/json'
          }
    };

    var req = http.request(options, (res) => {
            res.setEncoding('utf8');
            var statusCode = res.statusCode;
            if(statusCode!=200){
                console.log(statusCode);
            }
            res.on('data', (chunk) => {
                  //process.stdout.write(chunk);
                  callback(true);
                  console.log(chunk);
            });
            res.on('end', () => {
            })
            });

    req.on('error', (e) => {
            console.log(`problem with request: ${e.message}`);
            callback(null);
    });

    req.on('socket', function (socket) {
            socket.setTimeout(60000);  
            socket.on('timeout', function() {
                req.abort();
            });
        });

    req.write(postData);
    req.end();
}

function postCalendar(id,calendar,callback) {
    var postData = JSON.stringify({
            'id' : id,
            'calendar': calendar
        });
    var options = {
          hostname: remoteServer,
          port: port,
          path: '/api/addCalendar',
          method: 'POST',
          headers: {
              'Content-Type': 'application/json'
          }
    };

    var req = http.request(options, (res) => {
            res.setEncoding('utf8');
            var statusCode = res.statusCode;
            if(statusCode!=200){
                console.log(statusCode);
            }
            res.on('data', (chunk) => {
                  //process.stdout.write(chunk);
                  console.log(chunk);
                  callback(true);
            });
            res.on('end', () => {
            })
     });

    req.on('socket', function (socket) {
            socket.setTimeout(60000);  
            socket.on('timeout', function() {
                    req.abort();
                });
            });

    req.on('error', (e) => {
        console.log(`problem with request: ${e.message}`);
        callback(null);
    });
    req.write(postData);
    req.end();

}

function saveAndUpdateData(id,info,callback) {
    db.Room.findOne({id:id}, function(error,room){
            if(!room) {
                var ro = new db.Room({
                    id:id,
                    payload:info
                });
                ro.save();
                console.log("new:"+id);
            }else {
                room.payload = info;
                console.log("update:"+id);
                room.save();
            }
            callback();
    });
}

var options = {
    method: 'GET',
     timeout: 120000,
    headers:{
        'User-Agent':'Safari (Macintosh; OS X/10.11.5) NSURLConnection/1259',
        'Content-Type':'application/json; charset=utf-8'
    }
};

function checkJSON(json) {
    try {
        JSON.parse(json);
    } catch (e) {
        return false;
    }
    return true;
}

var tryCount = 0;
function getRoomIDList(callback) {
    tryCount++;
    if(tryCount>15){
        process.exit();
    }
    var api = apiPrefix+"/api/roomID";
    request(api,options,function(error,response,body) {
        if(error) {
            console.log(error);
            callback(null);
        }else {
            if(checkJSON(body)) {
                callback(JSON.parse(body));
            }else {
                callback(null);
            }
        }
    });
};

var calTryCount = 0;
function getRoomCalendar(page,callback) {
    calTryCount++;
    if(calTryCount>70){
        console.log("fail exit()");
        process.exit();
    }
    var api = apiPrefix+"/api/calendar/page/"+page;
    request(api,options,function(error,response,body) {
        if(error) {
            console.log(error);
            callback(null);
        }else {
            if(checkJSON(body)) {
                callback(JSON.parse(body));
            }else {
                callback(null);
            }
        }
    });
};


function getRoomCalendarByCount(count,callback) {
    calTryCount++;
    if(calTryCount>70){
        console.log("fail exit()");
        process.exit();
    }
    var api = apiPrefix+"/api/calendar/count/"+count;
    request(api,options,function(error,response,body) {
        if(error) {
            console.log(error);
            callback(null);
        }else {
            if(checkJSON(body)) {
                callback(JSON.parse(body));
            }else {
                callback(null);
            }
        }
    });
};

exports.getRoomCalendarByCount = getRoomCalendarByCount;
exports.getRoomIDList = getRoomIDList;
exports.getRoomCalendar = getRoomCalendar;
exports.postData = postData;
exports.postCalendar = postCalendar;
exports.saveAndUpdateData = saveAndUpdateData;
