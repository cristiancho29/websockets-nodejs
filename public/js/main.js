var socket = io.connect('/', { 'forceNew': true });

socket.on('messages', function(data) {
  render(data);
})

function render (data) {
  var html = data.map(function(elem, index) {
    return(`<div>
              <strong>${elem.author}</strong>:
              <em>${elem.text}</em>
            </div>`);
  }).join(" ");

  document.getElementById('messages').innerHTML = html;
  console.log("Data:"+data)
}

function addMessage(e) {
  var message = {
    author: document.getElementById('username').value,
    text: document.getElementById('texto').value
  };

  socket.emit('new-message', message);
  
  document.getElementById('username').value="";
  document.getElementById('texto').value="";
  
  return false;
}