// Get references to each HTML elements
var $tbody = document.querySelector("tbody");
var $dateTimeInput = document.querySelector("#dateTime");
var $cityInput = document.querySelector("#city");
var $stateInput = document.querySelector("#state");
var $countryInput = document.querySelector("#country");
var $shapeInput = document.querySelector("#shape");
var $searchButton = document.querySelector("#search");

// searchButton to run handleSearchButtonClick when clicked
$searchButton.addEventListener("click", handleSearchButtonClick);

// Set ufoSightingsData to the dataSet in data.js
var ufoSightingsData = dataSet;

// Will render the ufoSightingsData to the tbody
function renderTable() {
  // Clear the tbody first 
  $tbody.innerHTML = "";

  for (var i = 0; i < ufoSightingsData.length; i++) {
    // Get each ufoSightings object and its fields
    var ufoSightings = ufoSightingsData[i];
    var fields = Object.keys(ufoSightings);

    // Create a new row in the tbody, then set the index to increase by i
    var $row = $tbody.insertRow(i);

    for (var j = 0; j < fields.length; j++) {
      // For every field in the ufoSightings object, create a new cell
      // Then set the inner text to be the current values of the current ufoSightings's field
      var field = fields[j];
      var $cell = $row.insertCell(j);
      $cell.innerText = ufoSightings[field];
    }
  }
}

function handleSearchButtonClick() {
  // Format the user's search by date/time
  var filterDateTime = $dateTimeInput.value;
  var filterCity = $cityInput.value.trim().toLowerCase();
  var filterState = $stateInput.value.trim().toLowerCase();
  var filterCountry = $countryInput.value.trim().toLowerCase();
  var filterShape = $shapeInput.value.trim().toLowerCase();

  // Set filterDateTime to an array of the ufoDateTime whose "date/time" matches the filter
  ufoSightingsData = dataSet.filter(function(ufoSightings) {
    var ufoDateTime = ufoSightings.datetime;
    var ufoCity = ufoSightings.city;
    var ufoState = ufoSightings.state;
    var ufoCountry = ufoSightings.country;
    var ufoShape = ufoSightings.shape;

    // If true, add the date/time to the filteredDateTime, otherwise don't add to it 
    return ufoDateTime == filterDateTime || 
    ufoCity == filterCity || 
    ufoState == filterState || 
    ufoCountry == filterCountry || 
    ufoShape == filterShape;
  });

  renderTable();
}

// Render the table for the first time on page load
renderTable();

function queryParams() {
  return {
      type: 'owner',
      sort: 'updated',
      direction: 'desc',
      per_page: 100,
      page: 1
  };
}