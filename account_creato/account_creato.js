let urlServer = "https://diegopirovano.pythonanywhere.com"
//urlServer = "http://127.0.0.1:8013"

var global_choice = false

//caricare il username della pagina
const urlParams = new URLSearchParams(window.location.search);
const username = urlParams.get('username')

// cambiare il nome del titolo
document.getElementById("titolo").innerHTML="Bentornato " + username + "!"