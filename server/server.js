const net = require('net');
const filter = require('./filter');
const ISHP = require('../ishp');
const Filters = require('./filters/Filters');

const server = net.createServer();
const sockets = [];
let id = 0;

server.on('connection', (socket) => {
    console.log('Connected to the server', socket.address());
    const clientISHP = new ISHP();

    // socket.write(Object.keys(Filters).join('\n'));

    sockets.push({
        client: socket,
        id: ++id,
        receivedData: clientISHP
    })

    clientISHP.on('streamEnd', async () => {
        const result = await filter(clientISHP.lastReceivedData.image, clientISHP.lastReceivedData.option);

        socket.write(
            ISHP.wrap(clientISHP.lastReceivedData.option, result)
        );

        clientISHP.clear();
    })
    
    socket.on('data', async (data) => {
        const client = sockets.find(s => s.client === socket);
        client.receivedData.append(data);
    })

    socket.on('error', () => {
        console.log('Disconnected!');
    })
})

server.listen(process.env.PORT, process.env.HOSTNAME, () => {
    console.log(`Server is listening on port ${process.env.PORT}`);
})
