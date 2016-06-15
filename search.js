var args = process.argv.splice(2);
var airbnb = require('./airbnb.js');

var par = {"location":args[0]};

if(args.length != 3) {
    console.log("Parameter: location startPage endPage");
    process.exit();
}

airbnb.getRoomID();

airbnb.searchPage(par,args[1],args[2],function(){

});


