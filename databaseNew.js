var http = require('http');
var fs = require ('fs');
const qs = require('querystring');
const MongoClient = require('mongodb').MongoClient;//before executing this code make sure mongodb is running on your laptop, create a database and a table/collection in it
const url ="mongodb://localhost:27017/iit-k"; //0000 is the port number on which mongodb would be opened on the server, make sure you enter the correct port number
const client = new MongoClient(url, { useNewUrlParser: true });

http.createServer(function(req,res){
	if(req.url == "/"){
		res.writeHead(200,{"Content-Type":"text/html"});
		fs.createReadStream("./views/home.hbs","UTF-8").pipe(res); //make sure you enter the correct path of the directory in which the drag and drop form is as the first argument of this function

	}
	if (req.method == "POST"){
		var data ="";
		req.on("data",function(parts){
			data+=parts;
		});
		req.on("end", function(parts){

			const q = qs.parse(data);
			client.connect(err => {
			if(err) throw err;
  			const collection = client.db("iit-k").collection("records");
  			collection.insertOne(q,function(err,res){ //xxx is the name of the collection in the database, you can write any name you want to

						console.log("Data entered");
						client.close();
				});

			})
		});
	}
}).listen(3000); //3000 is the port number on which i ve created the server, you can use any port number you like
