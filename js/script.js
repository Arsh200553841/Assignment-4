var studentId = "200553841";
var studentName = "Arshpreet Singh Guray";

var studentInfo = document.getElementById('studentInfo');
var studentButton = document.getElementById('studentButton');

// Function to display student info
function displayStudentInfo() {
    studentInfo.textContent = "StudentId: " + studentId + ", Name: " + studentName;
}

// Event listener for student button click
studentButton.addEventListener("click", displayStudentInfo);

document.addEventListener("DOMContentLoaded", function() {
    const countriesList = document.getElementById("countriesList");
    const searchInput = document.getElementById("searchInput");
    const searchButton = document.getElementById("searchButton");

    // Function to filter countries based on search input
    function filterCountries(searchTerm) {
        fetch(`https://restcountries.com/v3.1/name/${searchTerm}`)
            .then(response => response.json())
            .then(data => {
                // Clear existing list
                countriesList.innerHTML = "";
                // Display filtered countries
                data.forEach(country => {
                    const countryItem = document.createElement("li");
                    countryItem.className = "country";
                    countryItem.innerHTML = `
                        <h2>${country.name.common}</h2>
                        <p><strong>Capital:</strong> ${country.capital}</p>
                        <p><strong>Population:</strong> ${country.population.toLocaleString()}</p>
                        <p><strong>Region:</strong> ${country.region}</p>
                        <img src="${country.flags.png}" alt="${country.name.common} Flag" width="100">
                    `;
                    countriesList.appendChild(countryItem);
                });
            })
            .catch(error => {
                console.error("Error fetching country data:", error);
                countriesList.innerHTML = "<li>No countries found</li>";
            });
    }

    // Event listener for search button click
    searchButton.addEventListener("click", function() {
        const searchTerm = searchInput.value.trim();
        if (searchTerm !== "") {
            filterCountries(searchTerm);
        }
    });

    // Event listener for Enter key press in search input
    searchInput.addEventListener("keypress", function(event) {
        if (event.key === "Enter") {
            const searchTerm = searchInput.value.trim();
            if (searchTerm !== "") {
                filterCountries(searchTerm);
            }
        }
    });
});
