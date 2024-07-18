const urlServer = "https://diegopirovano.pythonanywhere.com";
// urlServer = "http://127.0.0.1:8013";

// Caricare il username della pagina
const urlParams = new URLSearchParams(window.location.search);
const username = urlParams.get('username');

// Create and append image element
var img = document.createElement('img'); 
img.src = urlServer + "/get_image/" + username; 
img.alt = 'Logo';  
var container = document.getElementById('imageLogoContainer'); 
container.appendChild(img);



// aggiornare i titoli
url_to_send_message = "https://diegopirovano.pythonanywhere.com/sh/"+encodeURIComponent(username);
url_home = "https://cubettocubetto.github.io/Libro_dell_ospite/index.html"

document.getElementById("link_invia_commento").href = url_to_send_message
document.getElementById("link_home").href = url_home
document.getElementById('titolo_commenti_ricevuti').innerHTML = ('Commenti per ' + username );

function startLoading() {
    document.getElementById('loadingDiv').style.display = 'flex';
}

function stopLoading() {
    document.getElementById('loadingDiv').style.display = 'none';
}

function getDisplay(str) {
    return (str == "NO" || str == " ") ? "none" : "block";
}

function getStringStar(i) {
    const stars = ["⭐★★★★", "⭐⭐★★★", "⭐⭐⭐★★", "⭐⭐⭐⭐★", "⭐⭐⭐⭐⭐"];
    return stars[i - 1] || "error";
}

function escapeHtml(unsafe) {
    return unsafe
        .replace(/&/g, "&amp;")
        .replace(/</g, "&lt;")
        .replace(/>/g, "&gt;")
        .replace(/"/g, "&quot;")
        .replace(/'/g, "&#039;");
}

function createCard(data, params, i) {
    const card = document.createElement('div');
    card.classList.add('card');
    card.style.width = '18rem';
    card.style.marginBottom = '20px';

    const starsHTML = [2, 3, 4, 5, 6].map(j => {
        return `<div class="stella stella${j-1}" style="display:${getDisplay(params[j][1])};">
                    <h6><b>${params[j][1]}</b>: ${getStringStar(data[`stella${j-1}`][i])}</h6>
                </div>`;
    }).join('');

    card.innerHTML = `
        <div class="card-body">
            <div class="pin pin-left">
                <img src="../immagini/pin.png">
            </div>
            <div class="pin pin-right">
                <img src="../immagini/pin.png">
            </div>
            <h5 class="card-title mt-3">${escapeHtml(data.usernames[i])}</h5>
            <h6 class="card-subtitle mb-2 text-muted">Il ${escapeHtml(data.date[i])}, alle ${escapeHtml(data.time[i])}</h6>
            <p class="card-text">${escapeHtml(data.messages[i])}</p>
            ${starsHTML}
        </div>
    `;

    return card;
}

var params;
startLoading();
fetch(urlServer + "/get_params/" + username)
    .then(response => {
        if (!response.ok) {
            throw new Error('Network response was not ok ' + response.statusText);
        }
        return response.json();
    }).catch(error => {
        console.error('There was a problem with the fetch operation:', error);
        alert("C'è stato un errore:" + error.message);
    })
    .then(data => {
        params = data;
        return fetch(urlServer + "/visualizza_account/" + username);
    }).catch(error => {
        console.error('There was a problem with the fetch operation:', error);
        alert("C'è stato un errore:" + error.message);
    })
    .then(response => {
        if (!response.ok) {
            throw new Error('Network response was not ok ' + response.statusText);
        }
        return response.json();
    }).catch(error => {
        console.error('There was a problem with the fetch operation:', error);
        alert("C'è stato un errore:" + error.message);
    })
    .then(data => {
        if (data.status != "success") {
            alert("Attenzione: " + data.error);
        } else {
            const container = document.querySelector('.contenitore-carte');
            for (var i = 0; i < data.messages.length; i++) {
                const card = createCard(data, params, i);
                container.appendChild(card);
            }       
        }
        stopLoading();
    })
    .catch(error => {
        console.error('There was a problem with the fetch operation:', error);
        stopLoading();
    });
