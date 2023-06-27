function fetchCities() {
  var input = document.getElementById("cityInput").value;
  var url = "fetch_cities.php";
  
  if (input.length > 2) {
    $.ajax({
      url: url,
      type: "GET",
      data: { input: input },
      success: function(response) {
        var cities = JSON.parse(response);
        displayDropdown(cities);
      }
    });
  } else {
    // Clear dropdown and city info if input is less than 3 characters
    document.getElementById("cityDropdown").innerHTML = "";
    document.getElementById("cityInfo").innerHTML = "";
  }
}

function displayDropdown(cities) {
  var dropdown = document.getElementById("cityDropdown");
  dropdown.innerHTML = ""; // Clear the dropdown before displaying new results
  
  if (cities.length > 0) {
    var ul = document.createElement("ul");
    for (var i = 0; i < cities.length; i++) {
      var li = document.createElement("li");
      li.innerHTML = cities[i];
      ul.appendChild(li);
    }
    dropdown.appendChild(ul);
    
    // Add click event listeners to the dropdown items
    var dropdownItems = ul.getElementsByTagName("li");
    for (var j = 0; j < dropdownItems.length; j++) {
      dropdownItems[j].addEventListener("click", function() {
        var selectedCity = this.innerHTML;
        displayCityInfo(selectedCity);
      });
    }
  }
}

function displayCityInfo(city) {
  $.ajax({
    url: "fetch_city_info.php",
    type: "GET",
    data: { city: city },
    success: function(response) {
      var cityInfo = JSON.parse(response);
      var infoDiv = document.getElementById("cityInfo");
      infoDiv.innerHTML = "<h2>" + city + "</h2>" +
        "<p>Rank: " + cityInfo.rank + "</p>" +
        "<p>Population (2011): " + cityInfo.population_2011 + "</p>" +
        "<p>Population (2001): " + cityInfo.population_2001 + "</p>" +
        "<p>State or Union Territory: " + cityInfo.state + "</p>";
    }
  });
}
