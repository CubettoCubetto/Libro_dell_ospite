var global_choice = false
const url = "DiegoPirovano.pythonanywhere.com"

//caricare il username della pagina
const urlParams = new URLSearchParams(window.location.search);
const username = urlParams.get('username')
console.log(username);

// cambiare il nome del titolo
document.getElementById("TitoloNome").innerHTML=username


// aggiungere il logo alla pagina
// Create a new image element 
var img = document.createElement('img'); 
 
// Set the source (src) attribute of the image 
img.src = url+"/get_image/"+username; 

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
            'name': $('#name').val(),
            'message': message,
        };

        if(!global_choice ){
            formData = {
                'name': "Anonimo",
                'message': message,
            };
        }
        $.ajax({
            type: 'POST',
            url: url+'/receive/' + username,
            contentType: 'application/json',
            data: JSON.stringify(formData),
            success: function(response) {
                $('#response').html('<div class="alert alert-success">Messagio inviato, grazie!</div>');
            },
            error: function() {
                $('#response').html('<div class="alert alert-danger">C\'e stato un errore nell\'invio del messaggio, riprovare più tardi grazie!</div>');
            }
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