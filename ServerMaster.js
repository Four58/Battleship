const cluster = require("cluster");
const http = require("http");
const { Server } = require("socket.io");
const numCPUs = require("os").cpus().length;
const { setupMaster, setupWorker } = require("@socket.io/sticky");
const { setupPrimary } = require("@socket.io/cluster-adapter");
const { createClient } = require("redis");
const redisAdapter = require("@socket.io/redis-adapter");

if (cluster.isMaster) {
  //console.log(`Master ${process.pid} is running`);

  const httpServer = http.createServer();

  // setup sticky sessions
  setupMaster(httpServer, {
    loadBalancingMethod: "least-connection",
  });

  // setup connections between the workers
  setupPrimary();

  // needed for packets containing buffers (you can ignore it if you only send plaintext objects)
  // Node.js < 16.0.0
  //   cluster.setupMaster({
  //     serialization: "advanced",
  //   });
  // Node.js > 16.0.0
  cluster.setupPrimary({
    serialization: "advanced",
  });

  httpServer.listen(5000);

  for (let i = 0; i < numCPUs; i++) {
    cluster.fork();
  }

  cluster.on("exit", (worker) => {
    //console.log(`Worker ${worker.process.pid} died`);
    cluster.fork();
  });
} else {
  //console.log(`Worker ${process.pid} started`);

  const httpServer = http.createServer();
  const io = new Server(httpServer);

  // use the redis adapter
  const pubClient = createClient({ host: "localhost", port: 6379 });
  const subClient = pubClient.duplicate();
  io.adapter(redisAdapter(pubClient, subClient));

  // setup connection with the primary process
  setupWorker(io);

  io.on("connection", (socket) => {
    ServerWorker(io, socket);
    //console.log(`connected to worker: ${cluster.worker.id}`);
  });
}
