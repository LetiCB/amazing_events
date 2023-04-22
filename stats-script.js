import {
  getPercentageOfAttendance,
  getRevenue,
  getTopEvents,
  formatTopEvents,
  getCategoriesStats,
  displayTopEventCards,
  displayCategoriesStats,
} from "./functions.js";


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

    
    
    // <--- ELEMENTS IN THE DOM --- > //
    
    
    
    
    // <--- TABLE 1: TOP EVENT STATISTICS --- > //

    pastEvents = getPercentageOfAttendance(pastEvents); //adds the "percentage of attendance" property to every past event.

    // Events with the highest percentage of attendance

    let highestAttendanceContainer = document.getElementById("highest-attendance"); // locates the DOM element.
    let highestAttendanceEvents = getTopEvents(pastEvents,"percentageOfAttendance", 1, "desc" ); //gets the events with the highest percentage of attendance.
    let topHighestAttendanceEvents = formatTopEvents(highestAttendanceEvents, "percentageOfAttendance"); // formats the events.
    displayTopEventCards(topHighestAttendanceEvents, highestAttendanceContainer); // displays the events to the DOM.

    // Events with the lowest percentage of attendance

    let lowestAttendanceContainer =
      document.getElementById("lowest-attendance"); // locates the DOM element.
    let lowestAttendanceEvents = getTopEvents(
      pastEvents,
      "percentageOfAttendance",
      1,
      "asc"
    ); // gets the events with the lowest percentage of attendance.
    let topLowestAttendanceEvents = formatTopEvents(
      lowestAttendanceEvents,
      "percentageOfAttendance"
    ); // formats the events.
    displayTopEventCards(topLowestAttendanceEvents, lowestAttendanceContainer); // displays the events to the DOM.

    // Event with largest capacity

    let largestCapacityContainer = document.getElementById("largest-capacity"); // locates the DOM element.
    let largestCapacityEvents = getTopEvents(pastEvents, "capacity", 1, "desc"); // gets the events with largest capacity.
    let topLargestCapacityEvents = formatTopEvents(
      largestCapacityEvents,
      "capacity"
    ); // formats the events.
    displayTopEventCards(topLargestCapacityEvents, largestCapacityContainer); // displays the events to the DOM.

    // <--- TABLE 2: UPCOMING EVENT STATISTICS BY CATEGORY --- > //

    upcomingEvents = getPercentageOfAttendance(upcomingEvents); //adds the "percentage of attendance" property to every upcoming event.
    upcomingEvents = getRevenue(upcomingEvents); //adds the "revenue" property to every upcoming event.

    let upcomingEventContainer = document.querySelector("#second-table tbody"); // locates the DOM element
    let upcomingEventStats = getCategoriesStats(upcomingEvents);
    displayCategoriesStats(upcomingEventStats, upcomingEventContainer); // displays the events to the DOM.

    // <--- TABLE 3: PAST EVENT STATISTICS BY CATEGORY --- > //

    pastEvents = getRevenue(pastEvents); //adds the "revenue" property to every past event.

    let pastEventContainer = document.querySelector("#third-table tbody"); // locates the DOM element
    let pastEventStats = getCategoriesStats(pastEvents);
    displayCategoriesStats(pastEventStats, pastEventContainer); // displays the events to the DOM.
  });
//.catch((error) => console.error(error)); // Handle any error