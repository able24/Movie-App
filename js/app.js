/*****PSEUDOCODE *****/
// Grab html elements
// Get the input's value on enter key press
// Grab data related to user's search
// Inject the movieitems into the DOM based on user's search


// Targeting html elements and store to variables
var searchInput = document.querySelector('.search');
var itemWrapper = document.querySelector('main');


// Function to create HTML div (use backtick so you can insert variables) to display entered movie title
function displayMatches(matches) {
    itemWrapper.innerHTML = '';  // clear off the paragraph text when a movie title is entered

    for (var matchObj of matches) {
        itemWrapper.insertAdjacentHTML('beforeend', `         
          <div class="movie-item" style="background-image:
          linear-gradient(rgba(0, 0, 0, 0.5), rgba(0, 0, 0, 0.5)),
          url(${matchObj.image_url})">
            <h3>${matchObj.title}</h3>
            <p>${matchObj.description}</p>
            <a href="${matchObj.imdb_url}" target="_blank">View More Details</a>  
          </div> 
        `);                     // Loop through the the movies chosen and display them on the screen with their title, description, movie link and background image. Styling of the background image is done in CSS
    }

}

// Function to get movie titles that match entered title by user.
function getMovieData(event) {
    var keyCode = event.keyCode;   // Get the key that was pressed
    var searchText = searchInput.value.trim().toLowerCase();  // Set input entered by user to lower case and remove any spacings using the trim()

    if (keyCode === 13 && searchText) {    // Checking to see if the key pressed is the enter key and if some text is typed in the input box
        
        // Making an AJAX Request to get data from a server using API
        var responsePromise = fetch(`https://www.omdbapi.com/?apikey=2a194df&s=${searchText}`); // fetching movie from external server based on the title the user types in

        function handleResponse(responseObj) {
            return responseObj.json();
        }

        responsePromise
        .then(handleResponse)
        .then(function (data) {
            displayMatches(data.Search);  // Calling the function to display the movie matches entered by the user
        });

        /* // Shorter and modern version of the code for making AJAX request to a server (Arrow Function)
        fetch('https://www.omdbapi.com/?apikey=2a194df&t=drive')
        .then(res => res.json())
        .then(data => console.log(data));*/

        
    }

}
// Create an initializing function - when the page loads, things that will run initially - listens for a key press
function init() {
    searchInput.addEventListener('keydown', getMovieData);

}

init();










































