window. access = window.document.getElementById('code9');
window. code   = access.innerHTML;
window. console. log({ access: access.valueOf() });
window. document.write(code + '<br />');

window. document.getElementById('code4').innerHTML = 'hello, world';

window. elements = window.document.getElementsByClassName('some class');
window. document.write(elements);
window. console. log({ elements });

window. access.  setAttribute('class', 'red-text');
window. elements. forEach(element => element. setAttribute('class', 'red-text'));
window. document.getElementById('code2'). setAttribute('class', 'green-one');

window. code2     = window.document.getElementById('code2');
window. attribute = window. code2.  getAttribute('class');

window. elem = window. document. getElementById('img id'). getAttribute('alt');
window. console.log(window.elem);
