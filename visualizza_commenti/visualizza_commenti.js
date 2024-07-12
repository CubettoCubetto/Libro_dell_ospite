let urlServer = "https://diegopirovano.pythonanywhere.com";
//urlServer = "http://127.0.0.1:8013";


//caricare il username della pagina
const urlParams = new URLSearchParams(window.location.search);
const username = urlParams.get('username')

var img = document.createElement('img'); 
 
// Set the source (src) attribute of the image 
img.src = urlServer+"/get_image/"+username; 

// Set any additional attributes like alt text, width, height, etc. 
img.alt = 'Logo';  

// Get a reference to the container where you want to insert the image 
var container = document.getElementById('imageLogoContainer'); 

// Append the image element to the container 
container.appendChild(img); 

function startLoading(){
    document.getElementById('loadingDiv').style.display = 'flex'; // Show the loading div
}
function stopLoading(){
    document.getElementById('loadingDiv').style.display = 'none'; // don't show the loading div
}


function getDisplay(str){
    if(str == "NO" || str ==" "){
        return "none"
    }
    return "block"
}

function getStringStar(i){
    const starYes = "⭐"
    const starNo = "★"

    switch(i) {
        case 1:
        return "⭐★★★★"
          break;
        case 2:
          return "⭐⭐★★★"
          break;
        case 3:
            return "⭐⭐⭐★★"
            break;
        case 4:
            return "⭐⭐⭐⭐★"
            break;
        case 5:
            return "⭐⭐⭐⭐⭐"
            break;
      }

    return "error" //codice non raggiungibile
}

var params
fetch(urlServer + "/get_params/" + username)
    .then(response => {
        if (!response.ok) {
            throw new Error('Network response was not ok ' + response.statusText);
        }
        return response.json();
    })
    .then(data => {
        params = data
        console.log(params);
        // Process the 'data' object here
    })
    .catch(error => {
        console.error('There was a problem with the fetch operation:', error);
    });


fetch(urlServer + "/visualizza_account/" + username)
    .then(response => {
        if (!response.ok) {
            throw new Error('Network response was not ok ' + response.statusText);
        }
        return response.json();
    })
    .then(data => {
        if (data["status"] != "success") {
            alert("Attenzione: " + data["error"]);
        } else {
            const container = document.querySelector('.contenitore-carte');
            console.log(data)
            for (var i = 0; i < data["messages"].length; i++) {

                // Create card element
                const card = document.createElement('div');
                card.classList.add('card');
                card.style.width = '18rem';
                card.style.marginBottom = '20px'; // Add margin bottom between cards

                // Card content
                card.innerHTML = `
                    <div class="card-body">
                    
                        <div class="pin pin-left">
                            <img src="../immagini/pin.png">
                        </div>
                        <div class="pin pin-right">
                            <img src="../immagini/pin.png">
                        </div>
                        <h5 class="card-title mt-3">${data["usernames"][i]}</h5>
                        <h6 class="card-subtitle mb-2 text-muted">Il ${data["date"][i]}, alle ${data["time"][i]}</h6>
                        <p class="card-text">${data["messages"][i]}</p>
                        <div class="stella stella1" style="display:${getDisplay(params[2][1])};">
                            <h6><b>${params[2][1]}:</b>${getStringStar(data["stella1"][i])}</h6>
                        </div>
                        <div class="stella stella2" style="display:${getDisplay(params[3][1])};">
                            <h6><b>${params[3][1]}</b>${getStringStar(data["stella2"][i])}</h6>
                        </div>
                        <div class="stella stella3" style="display:${getDisplay(params[4][1])};">
                            <h6><b>${params[4][1]}:</b>${getStringStar(data["stella3"][i])}</h6>
                        </div>
                        <div class="stella stella4" style="display:${getDisplay(params[5][1])};">
                            <h6><b>${params[5][1]}</b>${getStringStar(data["stella4"][i])}</h6>
                        </div>
                        <div class="stella stella5" style="display:${getDisplay(params[6][1])};">
                            <h6><b>${params[6][1]}</b>${getStringStar(data["stella5"][i])}</h6>
                        </div>
                    </div>
                `;

                // Append card to container
                container.appendChild(card);
            }
        }
    })
    .catch(error => {
        console.error('There was a problem with the fetch operation:', error);
    });
