const io = require( 'socket.io' )(3000)

const users = {}

io.on( 'connection' , socket => 
	{
		// Catch new user
		socket.on( 'new-user', username =>
					{
						users[ socket.id] = username
						// Broadcast to all clients. Handled by clients.
						socket.broadcast.emit( 'user-connected', username )
					})
				
		// Handling of new message
		socket.on( 'send-chat-message', message =>
					{
						// Sends to all connections.
						socket.broadcast.emit( 'chat-message',{ message: message, name: users[socket.id] } )
					})
					
		// Handle disconnect user
		socket.on( 'disconnect', () =>
					{
						socket.broadcast.emit( 'user-disconnected', users[socket.id] )
						delete users[socket.id]
						
					})
				
	})