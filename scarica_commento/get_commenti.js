let urlServer = "https://diegopirovano.pythonanywhere.com"
urlServer = "http://127.0.0.1:8013"


function handleLogin(event) {
    
  const username = document.getElementById('username').value;
  const password = document.getElementById('password').value;
  
  const radios = document.getElementsByName('inlineRadioOptions');
  let selectedValue;
  for (const radio of radios) {
      if (radio.checked) {
          selectedValue = radio.value;
          break;
      }
  }
  alert(`Selected value: ${selectedValue == "option1"}`);


  // Prepare data to be sent
  const data = {
    username: username,
    password: password,
    pubblicaCommenti: selectedValue == "option1"
  };

  // Send a POST request using Fetch API
  fetch(urlServer + '/get_commenti', {
    method: 'POST', // Specify the method
    headers: {
      'Content-Type': 'application/json', // Set the content type to JSON
    },
    body: JSON.stringify(data), // Convert data to JSON string
  })
  .then(response => {
    const contentType = response.headers.get('Content-Type');
  
    if (contentType && contentType.includes('application/json')) {
      // Response is JSON
      return response.json().then(data => {
        if (data.error) {
          alert(data.error);
          $('#response').html('<div class="alert alert-danger">' + data.error + '</div>');
          // Handle the error
        }
      });
    } else if (contentType && contentType.includes('application/vnd.openxmlformats-officedocument.spreadsheetml.sheet')) {
      // Response is a file (Excel)
      return response.blob().then(blob => {
        // Create a URL for the file blob
        const url = window.URL.createObjectURL(blob);
        // Create a link element
        const a = document.createElement('a');
        // Set the download attribute with the desired file name
        a.href = url;
        a.download = 'comments.xlsx'; // You can set a default file name here
        // Append the link to the document body
        document.body.appendChild(a);
        // Programmatically click the link to trigger the download
        a.click();
        // Remove the link from the document body
        document.body.removeChild(a);
        $('#response').html('<div class="alert alert-success">Ciao ' + data.username + ', puoi trovare il file scaricato nella cartella download o in alto a destra!</div>');
      });
    } else {
      console.error('Unexpected content type:', contentType);
      // Handle unexpected content type
    }
  })
  .catch(error => {
    console.error('Error:', error); // Log any errors
    // Handle error (e.g., show an error message)
  });
  
}