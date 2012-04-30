var http = require("http");
var url = require("url");
var fs = require("fs");
var path = require("path");

//function to handle a connection to our http server
var handleRequest = function (request, response) {
    var pathname = url.parse(request.url).pathname;
	//if the ask for an html file
    if (pathname.indexOf(".html") >= 0) {
        var filename = path.join(process.cwd(), pathname);
		//read the file async and write to output stream
        fs.readFile(filename, "binary", function (err, file) {
            response.writeHead(200);
            response.write(file);
            response.end();
        });
	//if they specifically ask for "/marco"
    } else if (pathname == "/marco") {
		//fake a 10 second delay to prove a point
		//any and all other requests made to the server after this will hang
		//remember: everything executes in parallel except your code :)
        sleep(10000);
        response.writeHead(200);
        response.write("polo!");
        response.end();
    } else {
		//any unmatched request - print out 200 OK "Hello World"
        response.writeHead(200);
        response.write("Hello World");
        response.end();
    }

	//log in node console that we handled a request
    console.log("processed request");
};

//simulates a processing delay
function sleep(milliseconds) {
    var startTime = new Date().getTime();
    while (new Date().getTime() < startTime + milliseconds);
}
//create an http server using the callback on port 8000
http.createServer(handleRequest).listen(8000);

console.log("Server running at localhost:8080");