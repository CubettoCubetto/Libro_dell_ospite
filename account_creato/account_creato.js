let urlServer = "https://diegopirovano.pythonanywhere.com"
//urlServer = "http://127.0.0.1:8013"

var global_choice = false

//caricare il username della pagina
const urlParams = new URLSearchParams(window.location.search);
const username = urlParams.get('username').toLowerCase();

// url to modify the account
url_to_modify_account = "https://cubettocubetto.github.io/Libro_dell_ospite/crea_account/crea_account.html?modificaAccount=true&username="+encodeURIComponent(username)
url_to_send_message = "https://diegopirovano.pythonanywhere.com/sh/"+encodeURIComponent(username);
url_to_see_message = "https://cubettocubetto.github.io/Libro_dell_ospite/visualizza_commenti/visualizza_commenti?username="+encodeURIComponent(username)

document.getElementById("link_to_modify_account1").setAttribute("href", url_to_modify_account)
document.getElementById("linkVisualizzaCommenti").href = url_to_see_message

// Create and append image element
var img = document.createElement('img');
img.alt = 'Logo';
var container = document.getElementById('imageLogoContainer');

fetch(urlServer + "/get_image/" + username)
    .then(response => {
        if (!response.ok) {
            // Check for the specific status code
            if (response.status === 403) {
                // Account is disabled, redirect to a new page
                window.location.href = '../account_disabled/account_disabled.html';
            } else {
                throw new Error('Network response was not ok');
            }
        }
        return response.blob();
    })
    .then(blob => {
        var url = URL.createObjectURL(blob);
        img.src = url;
        container.appendChild(img);
    })
    .catch(error => {
        console.error('There has been a problem with your fetch operation:', error);
    });

// cambiare il nome del titolo
document.getElementById("titolo").innerHTML="Ciao " + username + ", il tuo account è pronto!"
document.getElementById("url-invia-commento").innerHTML= '<a target="_blank" href='+ url_to_send_message+'> Puoi inviare un commento a questo link </a>'

const qrcode = new QRCode(document.getElementById("qrcode"), {
    text: url_to_send_message,
    width: 256,
    height: 256
});

document.getElementById('downloadQR').addEventListener('click', function() {
    const qrCanvas = document.querySelector('#qrcode canvas');
    const qrDataUrl = qrCanvas.toDataURL('image/png');
    const link = document.createElement('a');
    link.href = qrDataUrl;
    link.download = 'qrcode.png';
    link.click();
});