const http = require("http");
const cluster = require("cluster");
const numCPUs = require("os").cpus().length;

if (cluster.isMaster) {
  console.log("Master: " + process.pid);
  for (let i = 0; i < numCPUs; i++) {
    cluster.fork();
  }
  cluster.on("exit", (worker) => {
    console.log(`worker ${worker.process.pid} died`);
    // console.log(`only ${Object.keys(cluster.workers).length} remaining`);
    console.log(`forking new worker`);
    cluster.fork();
  });
} else {
  console.log(`stated worker at ${process.pid}`);
  http
    .createServer((req, res) => {
      console.log(`process: ${process.pid}`);
      // let user kill the process
      if (req.url === "/kill") {
        process.exit();
      } else if (req.url === "/") {
        console.log(`serving from ${process.pid}`);
        res.end(`process: ${process.pid}`);
      }
    })
    .listen(3000);
}
