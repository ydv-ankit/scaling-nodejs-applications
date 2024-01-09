const http = require("http")
const cluster = require("cluster")
const numCPUs = require("os").cpus().length

if(cluster.isMaster){
	console.log("Master: " + process.pid)
	for(let i = 0; i < numCPUs; i++){
		cluster.fork()
	}
}else{
	http.createServer((req, res)=>{
	const msg = `Worker: ${process.pid}`
	console.log(msg)
	res.end(msg)
	}).listen(3000)
}
