import {getUniqueCategories, displayCheckboxes, displayCards, getCheckboxDom, filterCategory, filterInput} from "./functions.js";


// Make an HTTP request to retrieve the JSON file

fetch("https://mindhub-xj03.onrender.com/api/amazing")
  .then((response) => response.json()) // Parse the JSON data
  .then((data) => {
    // Store the JSON data in the variable
    let jsonData = data;

    // Access specific data
    let currentDate = jsonData.currentDate; // Access the "currentDate" data
    let eventsData = jsonData.events; // Access the "events" array

    let upcomingEvents = eventsData.filter((event) => event.date > currentDate);
    let pastEvents = eventsData.filter((event) => event.date < currentDate);

    let uniqueCategories = getUniqueCategories(eventsData);
    console.log("Unique Event Category:", uniqueCategories);


    // UPDATE THE DOM //

    // <--- CHECKBOXES --- > //

    let checkboxSection = document.querySelector(".checkbox-section"); // Get reference to the checkbox section div
    checkboxSection.innerHTML = ""; // Clear the contents of the checkbox section
    displayCheckboxes(uniqueCategories, checkboxSection);

    // <--- CARDS --- > //

    // Display cards

    let cardSection = document.getElementById("card-section-index");
    displayCards(eventsData, cardSection);

    

    // <--- SEARCH --- > //

    // Search input and button
    let searchInput = document.getElementById("search-input");
    let searchButton = document.getElementById("search-button");

    searchInput.addEventListener("keyup", () => {
      let filteredEvents = filterInput(eventsData, searchInput.value);

      let checkedCheckboxes = document.querySelectorAll(
        "input[type='checkbox']:checked"
      );
      let checkedCheckboxesArray = Array.from(checkedCheckboxes);
      let selectedCategories = checkedCheckboxesArray.map((box) => box.id);

      let filteredCardsByCat = filterCategory(
        filteredEvents,
        selectedCategories
      );
      
      if (filteredCardsByCat.length != 0){
        displayCards(filteredCardsByCat, cardSection);
      }else{
        cardSection.innerHTML = "<p style='font-size: 1.8rem; text-align:center;'>Nop, nothing. Keep searching &#128539;</p>"; 
      }
      
    });

    // Filter events with checkbox selection
    let checkboxDom = getCheckboxDom(uniqueCategories);
    checkboxDom.forEach((dom) => {
      dom.addEventListener("change", () => {
        let filteredEvents = filterInput(eventsData, searchInput.value);

        let checkedCheckboxes = document.querySelectorAll(
          "input[type='checkbox']:checked"
        );
        let checkedCheckboxesArray = Array.from(checkedCheckboxes);
        let selectedCategories = checkedCheckboxesArray.map((box) => box.id);

        let filteredCardsByCat = filterCategory(filteredEvents, selectedCategories);
        //displayCards(filteredCardsByCat, cardSection);
        if (filteredCardsByCat.length != 0){
          displayCards(filteredCardsByCat, cardSection);
        }else{
          cardSection.innerHTML = "<p style='font-size: 1.8rem; text-align:center;'>Nop, nothing, nada. Keep searching &#128539;</p>"; 
        }
      });
    });
  })
  .catch((error) => console.error(error)); // Handle any error
