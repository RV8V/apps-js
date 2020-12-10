window.number = Number(42);

typeof window.localStorage.getItem('number');

window.localStorage.setItem('number', number.toString());

window.removeItem('number');

window.clear();

var obj = new Object({
});

window.localStorage.setItem('person', JSON.stringify(obj));

typeof JSON.parse(window.localStorage.getItem('person'));

window.window.addEventListener('storage', function(event) {
});

window.onstorage = function(event) {
};
