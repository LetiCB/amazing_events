export {
  getUniqueCategories,
  displayCheckboxes,
  displayCards,
  getCheckboxDom,
  filterCategory,
  filterInput,
  getPercentageOfAttendance,
  getRevenue,
  getTopEvents,
  formatTopEvents,
  getCategoriesStats,
  displayTopEventCards,
  displayCategoriesStats,
};

// <--- UNIQUE CATEGORIES --- > //

// Create an array of unique categories
function getUniqueCategories(events) {
  let categories = []; // Create an empty array to store unique categories
  events.forEach((event) => {
    // Loop through each event
    if (!categories.includes(event.category)) {
      // Check if the category is not already in the "categories" array
      categories.push(event.category); // If not, add it to the "categories" array
    }
  });
  return categories; // Return the unique categories array
}

// <--- CHECKBOXES --- > //

// Display the checkboxes to the DOM
function displayCheckboxes(categories, container) {
  container.innerHTML = categories
    .map((category) => {
      return `<div class="checkbox-section">
          <label><input type="checkbox" name="${category.toLowerCase()}" id="${category}"> ${category}</label></div>`;
    })
    .join(" ");
}

// Display cards to the DOM
function displayCards(events, container) {
  container.innerHTML = events
    .map((event) => {
      return `<div class="card card_container">
          <a href="./details.html"><img class="card-img-top" src="${event.image}" alt="Image of the event: ${event.name}"></a>
          <div class="card-body">
                  <h5 class="card-title">${event.name}</h5>
                  <p class="card-text">${event.description}</p>
                  <p class="card-text"><small class="text-muted">${event.date}</small></p>
                  <a href="./details.html?id=${event._id}" class="btn btn-primary align-self-end justify-self-end">Learn more</a>
          </div>
          </div>`;
    })
    .join(" ");
}

// <--- CHECKBOX AND SEARCH FILTER --- > //

// Get Checkbox location in the DOM
function getCheckboxDom(ids) {
  let checkboxDom = [];
  ids.forEach((id) => {
    checkboxDom.push(document.getElementById(id));
  });
  return checkboxDom;
}

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
  let filteredEvents = events.filter(
    (event) =>
      event.name.toLowerCase().includes(words.toLowerCase()) ||
      event.description.toLowerCase().includes(words.toLowerCase()) ||
      event.place.toLowerCase().includes(words.toLowerCase())
  );
  return filteredEvents;
}

// <--- STATISTICS --- > //

// Calculate and add the "percentage of attendance" property to every event object in the array.
function getPercentageOfAttendance(events) {
  events.forEach((event) => {
    if ("estimate" in event) {
      // In upcoming events, the "estimate" property is used to calculate the percentage of attendance.
      event["percentageOfAttendance"] = parseFloat(
        ((event.estimate / event.capacity) * 100).toFixed(2)
      ); // rounds the result to 2 decimal places.
    } else {
      event["percentageOfAttendance"] = parseFloat(
        ((event.assistance / event.capacity) * 100).toFixed(2)
      ); // rounds the result to 2 decimal places.
    }
  });
  return events;
}

// Calculate and add the "revenue" property to every event object in the array.
function getRevenue(events) {
  events.forEach((event) => {
    if ("estimate" in event) {
      // In upcoming events, the "estimate" property is used to calculate the revenue.
      event["revenue"] = event.price * event.estimate;
    } else {
      event["revenue"] = event.price * event.assistance; // In past events, the "assistance" property is used to calculate the revenue.
    }
  });
  return events;
}

// Take an array of objects, sort its data in descending or ascending order based on a chosen property
// and returns the first chosen amount of events.
function getTopEvents(events, property, number, order) {
  if (order === "asc") {
    events.sort((a, b) => a[property] - b[property]); // sorts the array in ascending order
    return events.slice(0, number);
  } else {
    events.sort((a, b) => b[property] - a[property]); // sorts the array in descending order
    return events.slice(0, number);
  }
}

// Create a new array with this format: "event name: property".
function formatTopEvents(events, property) {
  let topEventsArray = [];
  events.forEach((event) => {
    topEventsArray.push(event["name"] + ": " + event[property]);
  });
  return topEventsArray;
}

// Get basic stats of every category: total count, sum of percentage of attendance and total revenue.
function getCategoriesStats(events) {
  let categories = [];
  events.forEach((event) => {
    let categoryIndex = categories.findIndex(
      (cat) => cat.category === event.category
    );
    if (categoryIndex === -1) {
      categories.push({
        category: event.category,
        attendancePercentageSum: event.percentageOfAttendance,
        eventsCount: 1,
        revenueSum: event.revenue,
      });
    } else {
      categories[categoryIndex].attendancePercentageSum +=
        event.percentageOfAttendance;
      categories[categoryIndex].eventsCount++;
      categories[categoryIndex].revenueSum += event.revenue;
    }
  });
  return categories;
}

// Display the events to the DOM
function displayTopEventCards(topEvents, container) {
  container.innerHTML = topEvents
    .map((event) => {
      if (container.id == "largest-capacity") {
        return `<p>${event}</p>`;
      }
      return `<p>${event} %</p>`;
    })
    .join(" ");
}

// Display the events to the DOM
function displayCategoriesStats(events, container) {
  let rows = events.map((event) => {
    // Create new rows for each event
    return `          <tr>
          <td>${event.category}</td>
          <td>$ ${event.revenueSum}</td>
          <td>${(event.attendancePercentageSum / event.eventsCount).toFixed(
            2
          )} %</td>
        </tr>`;
  });
  container.insertAdjacentHTML("beforeend", rows.join("")); // Append the new rows to the table body
}
