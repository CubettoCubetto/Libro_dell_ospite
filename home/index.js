var global_choice = false
let urlServer = "https://diegopirovano.pythonanywhere.com"
//urlServer = "http://127.0.0.1:8013"

//caricare il username della pagina
const urlParams = new URLSearchParams(window.location.search);
const username = urlParams.get('username')

// cambiare il nome del titolo
document.getElementById("TitoloNome").innerHTML=username

// nascondere le domande non volute dai settings
document.addEventListener('DOMContentLoaded', function() {

    fetch(urlServer+="/get_params/" + username)
        .then(response => {
            if (!response.ok) {
                throw new Error('Network response was not ok ' + response.statusText);
            }
            return response.json();
        })
        .then(data => {
            console.log(data)
            // Iterate through each key-value pair in the data
            data.forEach((pair, index) => {
                const [key, value] = pair;
                const elementId = `form${index + 1}`;
                const element = document.getElementById(elementId);
                if (element) {
                    const child = element.querySelector('.titolo');
                    if (value === 'NO') {
                        element.style.display = 'none';
                    } else if (child) {
                        child.innerHTML = value;
                    } else {
                        console.error(`Child with class 'titolo' inside element with id ${elementId} not found`);
                    }
                } else {
                    console.error(`Element with id ${elementId} not found`);
                }
            });
        })
        .catch(error => {
            console.error('Fetch error: ', error);
        });
});





// aggiungere il logo alla pagina
// Create a new image element 
var img = document.createElement('img'); 
 
// Set the source (src) attribute of the image 
img.src = urlServer+"/get_image/"+username; 

// Set any additional attributes like alt text, width, height, etc. 
img.alt = 'Logo';  

// Get a reference to the container where you want to insert the image 
var container = document.getElementById('imageLogoContainer'); 

// Append the image element to the container 
container.appendChild(img); 




$(document).ready(function() {
    $('#messageForm').on('submit', function(event) {
        event.preventDefault();

        var message = $('#message').val();

        

        var formData = {
            'name': global_choice ? $('#name').val(): "anonimo",
            'message': message,
            'ratings': valuesSelected
        };
        console.log(formData)

        fetch(urlServer + '/receive/' + username, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(formData),
        })
        .then(response => {
            if (!response.ok) {
                throw new Error('Network response was not ok');
            }
            return response.json(); // Parse the JSON from the response
        })
        .then(data => {
            // Success case
            $('#response').html('<div class="alert alert-success">Messaggio inviato, grazie!</div>');
        })
        .catch(error => {
            // Error case
            $('#response').html('<div class="alert alert-danger">C\'è stato un errore nell\'invio del messaggio, riprovare più tardi, grazie!</div>');
            console.error('Fetch error:', error);
        });
    });

    // Add event listeners for the radio buttons
    $('#choiceYes').on('change', function() {
        if (this.checked) {
            choiceChanged('yes');
        }
    });

    $('#choiceNo').on('change', function() {
        if (this.checked) {
            choiceChanged('no');
        }
    });
});

function choiceChanged(choice) {
    
    if (choice === 'yes') {
        global_choice = true
        document.getElementById("name-input").classList.remove("hide")
    } else if (choice === 'no') {
        global_choice = false
        document.getElementById("name-input").classList.add("hide")
    }
}

// Initial state: hide the name field until a choice is made
$('#nameGroup').hide();