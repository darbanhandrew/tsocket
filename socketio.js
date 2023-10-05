const { get_redis_subscriber } = require("../frappe/node_utils");
const subscriber = get_redis_subscriber();

const io = require("socket.io")("9001", {
	path: '/tsocket.io',
});

subscriber.subscribe("events");

io.of('/tsocket.io').on('connection', (socket) => {
	console.log(`Client connected: ${socket.id}`);

	socket.on('join', (data) => {
		socket.join('taskerpage.com:user:' + data);
	});

	socket.on('disconnect', () => {
		console.log(`Client disconnected: ${socket.id}`);
	});
});

subscriber.on("message", function (_channel, message) {
	message = JSON.parse(message);

	if (message.room) {
		io.of('/tsocket.io').to(message.room).emit(message.event, message.message);
	} else {
		io.of('/tsocket.io').emit(message.event, message.message);
	}
});