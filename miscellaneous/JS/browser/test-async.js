window.onload = function() {
    window.alert('page is loaded');
    window.document.getElementsByTagName('img').forEach(element => element.onclick = function(event) {
        event.target.src = 'img/' + event.target.id + '.jpg';
    });
}

window.alert('some text');
