
function $(a){return document.getElementById(a)}

ws = new WebSocket ('ws://127.0.0.1:9000');

ws.onmessage = function (message) {
	var event = JSON.parse(message.data);
	switch (event.type) {
		case 'message':

			var name = document.createElement('div');
			var icon = document.createElement('div');
			var body = document.createElement('div');
			var root = document.createElement('div');

			name.innerText = event.from;
			body.innerText = specials_in(event);

			root.appendChild(name);
			root.appendChild(icon);
			root.appendChild(body);

      const messages = document.getElementByTagName('messages')

			messages.appendChild (root);

			break;

		  case 'authorize':
			if (event.success) {
				const loginform = document.getElementById('loginform')
				loginform.classList.remove('unauthorized');
			}
			break;

		  default:
			console.log ('unknown event:', event)
			break;
	}
}

const password = document.getElementById('password')
const login = document.getElementById('login')
password.onkeydown = function (e) {
    if (e.which == 13) {
		ws.send (JSON.stringify ({
			type: 'authorize',
			user: login.value,
			password: password.value
		}));
    }
}
const input = document.getElementByTagName('input')
input.onkeydown = function (e) {
	if (e.which == 13 && !e.ctrlKey && !e.shiftKey) {
		ws.send (JSON.stringify ({
			type: 'message',
			message: specials_out(input.innerText)
		}));
		input.innerText = '';
    }
}

const messages = document.getElementByTagName('messages')
var observer = new MutationObserver(function(mutations) {
	mutations.forEach(function(mutation) {
		var objDiv = messages;
		objDiv.scrollTop = objDiv.scrollHeight;
	});
}).observe(messages, { childList: true });
