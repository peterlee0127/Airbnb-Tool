var request = require('request');
var filter = require('./filter.js');
var options = {
        method: 'GET',
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

function getReview(id,offset,callback){
    var url = "https://api.airbnb.com/v2/reviews?client_id=3092nxybyb0otqw18e8nh5nty&locale=en-US&role=all&_limit=50";
    url = url+"&_offset="+offset+"&listing_id="+id;
    request(url,options,function(error,response,body) {
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
}

var id = 7624847;
var offset = 0;
var end = 20;

getReview(id,offset,function(response){
    var reviewCounts = response.metadata.reviews_count;
    var res = filter.removeUnusedReviewInfo(response);
    console.log(reviewCounts);
    console.log(res.length);
    offset = reviewCounts-offset;

});

