// Define array to store labels for each rating row
let labels = [
    document.querySelectorAll('.rating1 label'), // Array of labels for row 1
    document.querySelectorAll('.rating2 label'), // Array of labels for row 2
    document.querySelectorAll('.rating3 label'), // Array of labels for row 3
    document.querySelectorAll('.rating4 label'), // Array of labels for row 4
    document.querySelectorAll('.rating5 label')  // Array of labels for row 5
];

let valuesSelected = [1,1,1,1,1]
console.log('Initial Labels:', labels);

// Get all radio buttons
const radioButtons = document.querySelectorAll('input[type="radio"]');

// Add click event listener to each radio button
radioButtons.forEach(radio => {
    radio.addEventListener('click', function() {
        const value = this.value;
        const name = this.name;
        if(value == "yes" || value=="no" || value=="option1" || value=="option2"){
            return;
        }
        console.log('Clicked star value:', value, name);
        valuesSelected[name-1] = value
        for(let i = 0; i < 5; i++){
            labels[name - 1][4-i].innerHTML = i >= value ? "\u2605" : "\u2B50"
        }
    });
});