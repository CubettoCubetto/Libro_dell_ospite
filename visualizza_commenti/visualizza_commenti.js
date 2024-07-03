let urlServer = "https://diegopirovano.pythonanywhere.com"
urlServer = "http://127.0.0.1:8013"


//caricare il username della pagina
const urlParams = new URLSearchParams(window.location.search);
const username = urlParams.get('username')

fetch(urlServer + "/visualizza_account/" + username)
        .then(response => {
            console.log(response)
            if (!response.ok) {
                throw new Error('Network response was not ok ' + response.statusText);
            }
            console.log(response.json)
            return response.json();
        })
        .then(data => {
            console.log(data)

            if (data["status"] != "success"){
                alert("Attenzione: " + data["error"])
            }
            // Iterate through each key-value pair in the data
            data.forEach((pair, index) => {
                console.log(pair)
                const [key, value] = pair;
            });
        })