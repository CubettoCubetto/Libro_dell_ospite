let urlServer = "https://diegopirovano.pythonanywhere.com"
//urlServer = "http://127.0.0.1:8013"

var global_choice = false;

// Load the username from the page
const urlParams = new URLSearchParams(window.location.search);
const username = urlParams.get('username').toLowerCase();

if (!username) {
    alert('Username non specificato nel URL');
} else {
    // Hide unwanted questions based on settings
    document.addEventListener('DOMContentLoaded', function() {
        fetch(urlServer + "/get_params/" + username)
            .then(response => {
                if (!response.ok) {
                    throw new Error('Network response was not ok ' + response.statusText);
                }
                return response.json();
            })
            .then(data => {
                console.log(data);
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
                console.error('There was a problem with the fetch operation:', error);
                alert("C'è stato un errore:" + error.message);
            });
    });

    // Create and append image element
    var img = document.createElement('img');
    img.alt = 'Logo';
    var container = document.getElementById('imageLogoContainer');

    fetch(urlServer + "/get_image/" + username)
        .then(response => {
            if (!response.ok) {
                
                console.log(response)
                // Check for the specific status code
                if (response.status === 403) {
                    // Account is disabled, redirect to a new page
                    window.location.href = '../account_disabled/account_disabled.html';
                } else {
                    alert("C'è stato un errore, riaggiornare la pagina. Se l'errore persiste, contattateci")
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

    function startLoading() {
        document.getElementById('loadingDiv').style.display = 'flex'; // Show the loading div
    }

    function stopLoading() {
        document.getElementById('loadingDiv').style.display = 'none'; // Hide the loading div
    }

    $(document).ready(function() {
        $('#messageForm').on('submit', function(event) {
            event.preventDefault();

            const message = $('#message').val();
            const radios = document.getElementsByName('inlineRadioOptions');
            let selectedValue;
            for (const radio of radios) {
                if (radio.checked) {
                    selectedValue = radio.value;
                    break;
                }
            }

            const formData = {
                'name': global_choice ? $('#name').val() : "anonimo",
                'message': message,
                'ratings': valuesSelected, // Ensure `valuesSelected` is defined in the scope
                'public': selectedValue === "option1"
            };

            console.log(formData);
            startLoading();

            $.ajax({
                type: 'POST',
                url: urlServer + '/receive/' + username,
                contentType: 'application/json',
                data: JSON.stringify(formData),
                success: function(response) {
                    stopLoading();
                    alert("Messaggio inviato, grazie!");
                    location.reload();
                },
                error: function() {
                    stopLoading();
                    $('#response').html('<div class="alert alert-danger">C\'è stato un errore nell\'invio del messaggio, riprovare più tardi grazie!</div>');
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
            global_choice = true;
            document.getElementById("name-input").classList.remove("hide");
        } else if (choice === 'no') {
            global_choice = false;
            document.getElementById("name-input").classList.add("hide");
        }
    }

    // Initial state: hide the name field until a choice is made
    $('#nameGroup').hide();

    // Handle errors
    window.addEventListener('error', function(event) {
        alert("C'è stato un errore:" + event.message);
    });
}
