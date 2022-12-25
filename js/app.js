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
    
    if ('!matches') {
        return itemWrapper.innerHTML = `<p class="no-search">No results found.</p>`;  // Displaying no results found if movie title is not found. The return keyword breaks out of the function and does not require an else statement.
    } 
    for (var matchObj of matches) {                              // Loop through the the movies chosen and display them on the screen with their title, release, movie link and background image as shown on the data.Search object (console.log(data) to see the various properties to pass in to view title and the rest). Styling of the background image is done in CSS
        itemWrapper.insertAdjacentHTML('beforeend', `         
          <div class="movie-item" style="background-image:
          linear-gradient(rgba(0, 0, 0, 0.5), rgba(0, 0, 0, 0.5)),
          url(${matchObj.Poster})">
            <h3>${matchObj.Title}</h3>
            <p>Release Year: ${matchObj.Year}</p>
            <a data-id="${matchObj.imdbID}" href="https://www.imdb.com/title/${matchObj.imdbID}" target="_blank">View More Details</a>  
          </div> 
        `);                     
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

// Function to show more details if the 'view more details' link is clicked on a movie
function showMovieDetails(movieId) {
    // Making an AJAX Request to get data from a movie server using the movie ID
    var responsePromise = fetch(`https://www.omdbapi.com/?apikey=2a194df&i=${movieId}`); // fetching movie from external server based on the ID of the movie the user types in

    function handleResponse(responseObj) {
        return responseObj.json();
    }

    responsePromise
    .then(handleResponse)
    .then(function (data) {
        var detailDisplay = document.querySelector('.detail-display'); // Targetting the div that holds the details to be displayed

        // Writing the content of the div using javaScript - styling is already done in CSS
        detailDisplay.innerHTML = `                     
        <h2>Title: ${data.Title}</h2>
        <h3>Release Year: ${data.Year}</h3>
        <p><strong>Plot:</strong> ${data.Plot}</p>
        <p><strong>Genre:</strong> ${data.Genre}</p>
        <a href="https://www.imdb.com/title/${data.imdbID}" target="_blank">View IMDB Page</a>`

        detailDisplay.classList.remove('hide');  // displaying the details on the browser once the 'view more details' link is clicked
    });

}


// Create an initializing function - when the page loads, things that will run initially - listens for a key press
function init() {
    searchInput.addEventListener('keydown', getMovieData);

    // Add event listener for when 'view more details' button on a movie is clicked
    itemWrapper.addEventListener('click', function(event) {   
        event.preventDefault();
        var anchorLink = event.target;  // Targetting the actual button clicked as there are many buttons on the page

        if(anchorLink.tagName === 'A') {             // If the button clicked is the anchor tag <a> button then call the showMovieDetails() function created above and pass in the id of the movie clicked
            showMovieDetails(anchorLink.dataset.id)
        }
    })

}

init();










































