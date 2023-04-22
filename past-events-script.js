import {getUniqueCategories, displayCheckboxes, displayCards, getCheckboxDom} from "./functions.js";

fetch("https://mindhub-xj03.onrender.com/api/amazing")
  .then((response) => response.json()) // Parse the JSON data
  .then((data) => {
    // Store the JSON data in the variable
    let jsonData = data;

    // Access specific data
    let currentDate = jsonData.currentDate; // Access the "currentDate" data
    let allEventsData = jsonData.events; // Access the "events" array

    let eventsData = allEventsData.filter((event) => event.date < currentDate);

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

    // <--- CHECKBOX FILTER --- > //

    // Filter events data by selected categories
    function filterCategory(events, selectedCategories) {
      if (selectedCategories.length === 0) {
        return events;
      } else {
        let filteredEvents = events.filter((event) =>
          selectedCategories.includes(event.category)
        );
        return filteredEvents;
      }
    }

    // filter events data based on given input
    function filterInput(events, words) {
      let filteredCards = events.filter(
        (event) =>
          event.name.toLowerCase().includes(words.toLowerCase()) ||
          event.description.toLowerCase().includes(words.toLowerCase()) ||
          event.place.toLowerCase().includes(words.toLowerCase())
      );
      return filteredCards;
    }

    // <--- SEARCH --- > //

    // Search input and button
    let searchInput = document.getElementById("search-input");
    let searchButton = document.getElementById("search-button");

    searchInput.addEventListener("keyup", () => {
      let filteredCards = filterInput(eventsData, searchInput.value);
      // here he have to filter filteredCards by categories

      let checkboxesChecked = document.querySelectorAll(
        "input[type='checkbox']:checked"
      );
      let checkboxesCheckedArray = Array.from(checkboxesChecked);
      let selectedCategories = checkboxesCheckedArray.map((box) => box.id);

      let filteredCardsByCat = filterCategory(
        filteredCards,
        selectedCategories
      );

      displayCards(filteredCardsByCat, cardSection);
    });

    // Filter events with checkbox selection
    let checkboxDom = getCheckboxDom(uniqueCategories);
    checkboxDom.forEach((dom) => {
      dom.addEventListener("change", () => {
        let filteredCards = filterInput(eventsData, searchInput.value);

        let checkboxesChecked = document.querySelectorAll(
          "input[type='checkbox']:checked"
        );
        let checkboxesCheckedArray = Array.from(checkboxesChecked);
        let selectedCategories = checkboxesCheckedArray.map((box) => box.id);

        let filteredCardsByCat = filterCategory(filteredCards, selectedCategories);
        displayCards(filteredCardsByCat, cardSection);
        
      });
    });
  })
  .catch((error) => console.error(error)); // Handle any error
