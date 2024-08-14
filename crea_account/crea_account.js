let urlServer = "https://diegopirovano.pythonanywhere.com";
//urlServer = "http://127.0.0.1:8013";

// Load the username from the page
const urlParams = new URLSearchParams(window.location.search);
const modificaAccount = urlParams.get('modificaAccount');
let username = urlParams.get('username');

if (username) {
    username = username.toLowerCase();
}

function startLoading(){
    document.getElementById('loadingDiv').style.display = 'flex'; // Show the loading div
}
function stopLoading(){
    document.getElementById('loadingDiv').style.display = 'none'; // don't show the loading div
}

// Auto-fill the account data if modifying the account instead of creating it
document.addEventListener('DOMContentLoaded', function() {
    if (modificaAccount === "true") {
        document.getElementById("titolo-principale").innerHTML = "Modifica il tuo account";
        fetch(urlServer + "/get_params/" + username)
            .then(response => {
                if (!response.ok) {
                    alert(response.json);
                    throw new Error('Network response was not ok ' + response.statusText);
                }
                return response.json();
            })
            .then(data => {
                console.log(data);
                // Iterate through each key-value pair in the data
                document.getElementById("username").value = username;
                document.getElementById("titolo").value = data[0][1];
                document.getElementById("messaggio").value = data[1][1];
                document.getElementById("star1").value = data[2][1];
                document.getElementById("star2").value = data[3][1];
                document.getElementById("star3").value = data[4][1];
                document.getElementById("star4").value = data[5][1];
                document.getElementById("star5").value = data[6][1];
                document.getElementById("nome").value = data[7][1];
                document.getElementById("inlineRadio1").checked = data[8][1];
            })
            .catch(error => {
                console.error('Error fetching account data:', error);
            });
    }
});

document.getElementById('createAccountForm').addEventListener('submit', function(event) {
    event.preventDefault();

    // Check if passwords match
    if (document.getElementById('password').value !== document.getElementById('confirmPassword').value) {
        alert("Attenzione: le due password non corrispondono");
        return;
    }

    // Check if a logo file is uploaded
    if (!document.getElementById('formFile').files[0]) {
        alert("Attenzione: per favore carica il tuo logo");
        return;
    }

    // Check if the user has consented to publish the message
    const radios = document.getElementsByName('inlineRadioOptions');
    let selectedValue;
    for (const radio of radios) {
        if (radio.checked) {
            selectedValue = radio.value;
            break;
        }
    }

    const formData = new FormData();
    formData.append('formFile', document.getElementById('formFile').files[0]);
    formData.append('username', document.getElementById('username').value.trim());
    formData.append('password', document.getElementById('password').value.trim());
    formData.append('titolo', document.getElementById('titolo').value.trim());
    formData.append('messaggio', document.getElementById('messaggio').value);
    formData.append('star1', document.getElementById('star1').value);
    formData.append('star2', document.getElementById('star2').value);
    formData.append('star3', document.getElementById('star3').value);
    formData.append('star4', document.getElementById('star4').value);
    formData.append('star5', document.getElementById('star5').value);
    formData.append('nome', document.getElementById('nome').value.trim());
    formData.append('pubblicaCommenti', selectedValue === "option1");
    formData.append('providedPassword', document.getElementById('providedPassword').value.trim());

    for (const value of formData.values()) {
        console.log(value);
    }

    startLoading();
    fetch(urlServer + "/create_account", {
        method: 'POST',
        body: formData
    })
    .then(response => response.json())
    .then(data => {
        console.log('Success:', data);
        
        if (data["status"] !== "success") {
            stopLoading();
            alert("Attenzione: " + data["message"]);
            return;
        }
        // Open the account confirmation page
        window.open("https://cubettocubetto.github.io/Libro_dell_ospite/account_creato/account_creato.html?username=" + data['username'], "_self");
    })
    .catch(error => {
        stopLoading();
        console.error('Error:', error);
    });
});
