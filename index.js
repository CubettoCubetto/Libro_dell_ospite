var global_choice = false

$(document).ready(function() {
    $('#messageForm').on('submit', function(event) {
        event.preventDefault();

        var message = $('#message').val();
        if (message.includes("Michele") || message.includes("Davide")) {
            $('#response').html('<div class="alert alert-danger">Grazie ma non ci interessano messaggi relativi a Michele e Davide!</div>');
            return; // Stop further execution if message exceeds 100 characters
        }
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
            url: 'https://diegopirovano.pythonanywhere.com/receive',
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