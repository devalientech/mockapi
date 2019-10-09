require('dotenv').config()
const cluster = require('cluster')
const numCPUs = require('os').cpus().length;

if (cluster.isMaster) {
    console.log(`Master ${process.pid} is running`);

    for (let i = 0; i < numCPUs; i++) {
        cluster.fork();
    }

    cluster.on('exit', (worker, code, signal) => {
        console.log(`worker ${worker.process.pid} died`);
    });
} else {

    const App = require('./src/app')
    const app = new App();
    app.listen(3000);
    
    console.log(`Worker ${process.pid} started on port 3000...`);
}