var http = require('http');
const MongoClient = require('mongodb').MongoClient;
const url ="mongodb://localhost:27017/iit-k"; 
const client = new MongoClient(url, { useNewUrlParser: true });
http.createServer(function(req,res){
	
	client.connect(err => {
			if(err) throw err;
  			const collection = client.db("iit-k").collection("records");
			collection.find({}).toArray(function(err,result){ 
						if(err) throw err;
						res.writeHead(200,{"Content-Type":"text/html"});
						res.end(JSON.stringify(result));
						console.log("Data found");
						client.close();

				});
	});
  
}).listen(3000);	