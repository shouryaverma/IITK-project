var http = require('http');
var fs = require ('fs');
const hbs = require('hbs');
var qs = require('querystring');
var mong= require('mongodb').mong; //before executing this code make sure mongodb is running on your laptop,
																		//create a database and a table/collection in it

var url ="mongodb://localhost:27017/NameOfDatabase"; //0000 is the port number on which mongodb would be opened on the server,
																										//make sure you enter the correct port number
http.createServer(function(req,res){
	if(req.url == "/"){
		res.writeHead(200,{"Content-Type":"text/html"});
		fs.createReadStream("./Users/shour/misc/Desktop/web-app/views/home.hbs","UTF-8").pipe(res); //make sure you enter the correct path of
																																													//the directory in which the drag and drop form is
																																													//as the first argument of this function

	}
	if (req.method == "POST"){
		var data ="";
		req.on("data",function(parts){
			data+=parts;
		});
		req.on("end", function(parts){

			mong.connect(url, function(err,result){
				if(err) throw err;
				var q = qs.parse(data);
				db.collection('xxx').insertOne(q,function(err,res){ //xxx is the name of the collection in the database,
																															//you can write any name you want to
					if (err) throw err;
					console.log("Data entered");
					db.close();
				});
			});
		});
	}
}).listen(3000); //3000 is the port number on which i ve created the server, you can use any port number you like
