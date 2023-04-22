// Make an HTTP request to retrieve the JSON file
fetch("https://mindhub-xj03.onrender.com/api/amazing")
  .then((response) => response.json()) // Parse the JSON data
  .then((data) => {
    // Store the JSON data in the variable
    jsonData = data;

    // Access specific data
    let currentDate = jsonData.currentDate; // Access the "currentDate" data
    let eventsData = jsonData.events; // Access the "events" array

    // Display card details

    // Display all event details
    let detailSection = document.getElementById("container-details");

    function displayEventDetails(event, container) {
      container.innerHTML = `<div class="container big-card">
        <div class="card">
          <div class="row">
            <div class="col-sm-6">
              <img
                id="details-img"
                class="card-img"
                src="${event.image}"
                alt="Image of the event: ${event.name}"
              />
            </div>
            <div class="col-sm-6">
              <div class="card-body-right">
                <h4 class="card-title">${event.name}</h4>
                <p class="card-text">${event.description}</p>
                <p class="card-text">${event.category}</p>
                <p class="card-text">Date: ${event.date}</p>
                <p class="card-text">Location: ${event.place}</p>
                <p class="card-text">Price: $ ${event.price}</p>
              </div>
            </div>
          </div>
        </div>
      </div>`;
    }

    let queryParams = new URLSearchParams(window.location.search); // Get the value of a parameter
    let eventId = queryParams.get("id");
    let selectedEvent = eventsData.find((event) => event._id == eventId);
    displayEventDetails(selectedEvent, detailSection);
    
    })
  .catch((error) => console.error(error)); // Handle any error
