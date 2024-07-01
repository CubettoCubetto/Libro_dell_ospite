let urlServer = "https://diegopirovano.pythonanywhere.com"
//urlServer = "http://127.0.0.1:8013"


const urlParams = new URLSearchParams(window.location.search);
const destination = urlParams.get('destination') //sendComments or getQR


async function handleLogin(event) {
    event.preventDefault(); // Prevent the default form submission

    const username = document.getElementById('username').value;
    const responseDiv = document.getElementById('response');

    try {
        const response = await fetch(`${urlServer}/get_params/${username}`, {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json'
            }
        });

        if (!response.ok) {
            throw new Error('Username not found');
        }

        const result = await response.json();
        responseDiv.innerHTML = `<div class="alert alert-success">Success: ${JSON.stringify(result)}</div>`;
        if(destination == "sendComments"){
            window.open("https://cubettocubetto.github.io/Libro_dell_ospite/invia_commento/invia_commento.html?username=" + username);
        }
        else{
            window.open("https://cubettocubetto.github.io/Libro_dell_ospite/account_creato/account_creato.html?username=" + username);
        }
        
    } catch (error) {
        if(error.message == "Username not found"){
            alert("Username non trovato")
            responseDiv.innerHTML = `<div class="alert alert-danger">Username non trovato</div>`;
        }
        else{
            responseDiv.innerHTML = `<div class="alert alert-danger">Error: ${error.message}</div>`;
        }
    }
}
