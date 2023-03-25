// Client side script

// Get socket variable from server 
const socket = io( 'http://localhost:3000' )

// Get form message from html
const messageBox  = document.forms[ 'send_message' ]
// Get message text
const messageText = document.forms[ 'send_message' ][ 'new_message' ]
// Get display message container
const messageDisplay = document.getElementById( 'message_display_container' )


// Getting names of users
const name = prompt( 'Type your name' )
appendMessage( 'You joined' )		// Append to user's page
socket.emit( 'new-user', name )		// Send to server


// chat-message is an Event
socket.on( 'chat-message', data => {
	// Call function to append message to html
	appendMessage( `${data.name}: ${data.message}` )
}) 
	
// Handling broadcast from server for new user connected.
socket.on( 'user-connected', name => {
	// Call function to append message to html
	appendMessage( `${name} connected` )
}) 
	
// Handle disconnected user message from server.
socket.on( 'user-disconnected', name =>	{
	// Call function to append message to html
	appendMessage( `${name} disconnected` )
})
	
// Add event listener. Stop form from submitting.
messageBox.addEventListener( 'submit', e =>	{
	e.preventDefault()
	
	// Get message
	const message = messageText.value
	
	appendMessage( `You: ${message}` )
	
	// Send message from client to server
	socket.emit( 'send-chat-message', message )
	
	// Empty the value of message after sending.
	messageText.value = '' 
})
			
	
// Append message to html file
function appendMessage( message )
{
	const newMessageElement = document.createElement( 'div' ) 
	newMessageElement.innerText = message 
	messageDisplay.append( newMessageElement ) 
}