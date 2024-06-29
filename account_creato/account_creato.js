let urlServer = "https://diegopirovano.pythonanywhere.com"
//urlServer = "http://127.0.0.1:8013"

var global_choice = false

//caricare il username della pagina
const urlParams = new URLSearchParams(window.location.search);
const username = urlParams.get('username')

url_to_send_message = "https://diegopirovano.pythonanywhere.com/sh/"+username

// cambiare il nome del titolo
document.getElementById("titolo").innerHTML="Ciao " + username + ", abbiamo aggiornato il tuo account!"
document.getElementById("url-invia-commento").innerHTML= '<a target="_blank" href='+url_to_send_message+'> Puoi inviare un commento a questo link </a>'

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