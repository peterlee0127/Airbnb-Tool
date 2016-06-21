"use strict";
const airbnb = require('airapi');
const filter = require('./filter.js');
const data = require('./data.js');

var existIDList = [];
function getRoomID() {
    data.getRoomIDList(function(IDArray){
        if(IDArray!=null) {
            existIDList = IDArray;
            console.log("exist:"+existIDList.length);
        }else {
            console.log("get exist ID List fail,try again");
            getRoomID();
        }
    });
}

function searchByIDArray(array,callback) {
    var count = max;
    if(count == 0) {
        callback();
    }
    var temp = [];
    var max = array.length;

    var existIDListCount = existIDList.length;
    for(var j=0;j<max;j++){
        var roomID = array[j];
        var found = false;
        for(var i=0;i<existIDListCount;i++) {
            if(roomID==existIDList[i]) {
                found = true;
            }
        }
        if(!found) {
            temp.push(roomID);
        }
    }
    temp = Array.from(new Set(temp));
    console.log(array.length+"->"+temp.length);
    array = temp;
    max = array.length;
    if(max==0){
        callback();
        return;
    }

    nextRoom(array,function(){
        callback();
    });
}

function nextRoom(array,callback) {
    var id = array[0];
    searchInfo(id,function(idfinish) {
        array.splice(0,1);
        console.log("(last:"+array.length+")");
        if(array.length==0){
            callback();
        }else {
            nextRoom(array,function() {
                callback();
            });
        }
    });
}


function searchInfo(id,callback) {
    var ids = id;
    console.log("====try:"+ids+"====");
    var timeout = setTimeout(callback,5200,ids);
    if(fromPage) {
        clearTimeout(timeout);
    }
    airbnb.getInfo(id).then(function(info) {
        clearTimeout(timeout);
        info = filter.removeUnusedInfo(info.listing);
        postDataAndCalendar(id,info);
        console.log("post:"+id);
        setTimeout(callback,2100,id);
    });
}
function postDataAndCalendar(id,info) {
    data.postData(id,info,function(success) {
        if(success) {
            getCalendar(id,function(){
            });
        }else {
            console.log("rePostData:"+id);
            postDataAndCalendar(id,info);
        }
    });
} 


var idArray = [];
var pageNullCount = 0;
var fromPage = false;

function searchPage(par,start,end,callback) {
    fromPage = true;
    var array = [];
    var count = end-start;
    var paraArray = [];
    for(var i = start;i <= end; i++ ) {
        var para = {};
        para.location= par.location;
        para.page = i;
        paraArray.push(para);
    }
    for(var i=0;i<paraArray.length;i++) {
        var para = paraArray[i];
        setTimeout(getIDFromPage,i*1200,para,end);
    }
}

function getIDFromPage(par,end) {
    if(pageNullCount>5) {
        return;
    }
   airbnb.search(par).then(function(result) {
        console.log("on page:"+par.page);
        var hostingIDs = getHostingID(result);
        var max = hostingIDs.length;
        if(max==0) {
            pageNullCount++;
        }
        for(var i = 0;i < max; i++){
            idArray.push(hostingIDs[i]);
        }
        if(par.page==end || pageNullCount==5) {
            searchByIDArray(idArray,function(){
                idArray = [];
                console.log("complete");
            });           
        } 
    });
}

function getHostingID(result) {
    result = filter.removeHTML(result);
    var hostingIDs = result.logging_info.search.result.hostingIds;
    return hostingIDs;
}


function getCalendar(id,callback) {
    console.log("try Calendar:"+id);
    var timeout = setTimeout(callback,5200);
    airbnb.getCalendar(id,{
            currency:'USD'
        }).then(function(schedules){
            clearTimeout(timeout);
            var cal = filter.removeUnusedCalendarInfo(schedules);
            postCal(id,cal);
            setTimeout(callback,1400);
    });
}
function postCal(id,cal) {
    data.postCalendar(id,cal,function(success) {
        if(!success) {
            console.log("rePostCalendar:"+id);
            postCal(id,cal);
        }     
    });
}

exports.getRoomID = getRoomID;
exports.searchByIDArray = searchByIDArray;
exports.searchInfo = searchInfo;
exports.searchPage = searchPage;
exports.getCalendar = getCalendar;
