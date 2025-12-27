var todayInSpace = document.getElementById("today-in-space");
var launches = document.getElementById("launches");
var planets = document.getElementById("planets");
var navLinks = document.querySelectorAll(".nav-link");
var todayApoadBtn = document.getElementById("today-apod-btn");
var loadingImage = document.getElementById("apod-loading");
var loadingFailed = document.getElementById("loading-failed");
var loadingText = document.getElementById("loading-text");

// Function to hide all sections and show the sent section:
function openSection(section) {
    todayInSpace.classList.add("hidden");
    launches.classList.add("hidden");
    planets.classList.add("hidden");
    section.classList.remove("hidden");
}

// Function to change the style of the active link:
function changeActiveLink(link) {
    for (var i = 0; i < navLinks.length; i++) {
        navLinks[i].classList.remove("bg-blue-500/10");
        navLinks[i].classList.remove("text-blue-400");
        navLinks[i].classList.remove("text-slate-300");
        navLinks[i].classList.add("hover:bg-slate-800");
    }
    link.classList.add("bg-blue-500/10");
    link.classList.add("text-blue-400");
}

// Function to get the specific section:
(function getSpecificSection() {
    for (var i = 0; i < navLinks.length; i++) {
        navLinks[i].addEventListener("click", function () {
            // console.log(this);
            var clickedSectionId = this.getAttribute("data-section"); // Get the section id using the data-section attribute
            var clickedSection = document.getElementById(clickedSectionId); // Get the section using the id
            // console.log(clickedSection);
            openSection(clickedSection);
            changeActiveLink(this);
        });
    }
})();

// Get today's details on click the button and on loading page:
todayApoadBtn.addEventListener("click", function () {
    getTodaydetails();
});
getTodaydetails();

// Function to change the date format:
function changeFormatDateShort(APIDate) {
    var date = new Date(APIDate);
    return date.toLocaleDateString("en-US", {
        day: "numeric",
        month: "short",
        year: "numeric",
    });
}

function changeFormatDateLong(APIDate) {
    var date = new Date(APIDate);
    return date.toLocaleDateString("en-US", {
        day: "numeric",
        month: "long",
        year: "numeric",
    });
}

function changeFormatTime(APIDate) {
    var date = new Date(APIDate);
    return date.toLocaleTimeString("en-US", {
        hour: "2-digit",
        minute: "2-digit",
        timeZoneName: "short",
    });
}

// Function to get today's details using API with current date:
async function getTodaydetails() {
    loadingImage.classList.remove("hidden");
    loadingText.classList.remove("hidden");
    var response = await fetch(
        "https://api.nasa.gov/planetary/apod?api_key=qFMJJ4kvyjEHtj6J9qiOGjOWMB46IcdgvsTVjDIT"
    );
    var data = await response.json();
    loadingImage.classList.add("hidden");
    // console.log(data);
    if (response.ok) {
        loadingFailed.classList.add("hidden");
    } else {
        document.getElementById("apod-image").src = "";
        loadingFailed.classList.remove("hidden");
    }
    changeUITodayInSpace(data);
}

// Function to get a specific day using API with a specific date:
async function getSpecificDay(date) {
    loadingImage.classList.remove("hidden");
    loadingText.classList.remove("hidden");
    var response = await fetch(
        `https://api.nasa.gov/planetary/apod?api_key=qFMJJ4kvyjEHtj6J9qiOGjOWMB46IcdgvsTVjDIT&date=${date}`
    );
    var data = await response.json();
    loadingImage.classList.add("hidden");
    // console.log(data);
    if (response.ok) {
        loadingFailed.classList.add("hidden");
    } else {
        document.getElementById("apod-image").src = "";
        loadingFailed.classList.remove("hidden");
    }
    changeUITodayInSpace(data);
}

// Function to load a specific day:
function loadSpecificDay() {
    var apodDateInput = document.getElementById("apod-date-input");
    var selectedDate = apodDateInput.value;
    document.getElementById("formatted-date").innerHTML =
        changeFormatDateShort(selectedDate);
    getSpecificDay(selectedDate);
}

// Get specific day on click the button:
document.getElementById("load-date-btn").addEventListener("click", function () {
    loadSpecificDay();
});

// Change the content of the date on change the date:
document.getElementById("apod-date-input").addEventListener("change", function () {
        var apodDateInput = document.getElementById("apod-date-input");
        var selectedDate = apodDateInput.value;
        document.getElementById("formatted-date").innerHTML =
            changeFormatDateShort(selectedDate);
    });

// Function to change the UI:
function changeUITodayInSpace(data) {
    loadingText.classList.add("hidden");
    document.getElementById("apod-date").innerHTML = data.date
        ? `Astronomy Picture of the Day - ${data.date}`
        : "Invalid Date";
    document.getElementById("apod-date-input").value = data.date;
    document.getElementById("formatted-date").innerHTML =
        changeFormatDateShort(data.date) || "Invalid Date";
    document.getElementById("apod-date-detail").innerHTML = data.date
        ? `<i class="far fa-calendar mr-2"></i> ${data.date}`
        : "Invalid Date";
    document.getElementById("apod-date-info").innerHTML =
        data.date || "Invalid Date";
    document.getElementById("apod-title").innerHTML = data.title || "No Title";
    document.getElementById("apod-explanation").innerHTML =
        data.explanation || "No Explanation";
    document.getElementById("apod-image").src = data.url;
    document.getElementById("apod-media-type").innerHTML =
        data.media_type || "Image";
    document.getElementById("apod-copyright").innerHTML = `&copy; ${data.copyright || "NASA/JPL"
        }`;
    document.getElementById("view-full-image").href = data.url || "#";
}

// =========== Launches ===========

// Get upcoming launches:
(function getUpcomingLaunches() {
    fetch("https://ll.thespacedevs.com/2.3.0/launches/upcoming/?limit=10")
    .then(function(response){
        return response.json();
    })
    .then(function(data){
        console.log(data.results);
        // console.log("Upcoming Launches");
        displayHeadUpcomingLaunches(data.results[0]);
        getLaunchesGrid(data.results);
    })
})();

// Function to display the head of the upcoming launches:
function displayHeadUpcomingLaunches(data) {
    // console.log(data.name);
    // console.log(data.launch_service_provider.name);
    // console.log(data.rocket.configuration.name);
    // console.log(changeFormatDateLong(data.net));
    // console.log(changeFormatTime(data.net));
    // console.log(data.pad.location.name);
    // console.log(data.pad.country.name);
    // console.log(data.mission?.description || "No description available");
    // console.log(data.image?.image_url || "");
    document.getElementById("launch-title").innerHTML = data.name; // OK
    document.getElementById("launch-company").innerHTML =
        data.launch_service_provider.name; // OK
    document.getElementById("launch-vehicle").innerHTML =
        data.rocket.configuration.name; // OK
    document.getElementById("launch-date").innerHTML = changeFormatDateLong(
        data.net
    ); // OK
    document.getElementById("launch-time").innerHTML = changeFormatTime(data.net); // OK
    document.getElementById("launch-location").innerHTML = data.pad.location.name; // OK
    document.getElementById("launch-country").innerHTML = data.pad.country.name; // OK
    document.getElementById("launch-description").innerHTML =
        data.mission?.description || "No description available"; // OK
    document.getElementById("launch-image").src = data.image?.image_url || ""; // OK
}

var launchesGrid = document.getElementById("launches-grid");

// Function to get the launches grid:
function getLaunchesGrid(data) {
    var launchesGridBox = "";
    for (var i = 1; i < data.length; i++) {
        launchesGridBox += `
            <div class="bg-slate-800/50 border border-slate-700 rounded-2xl overflow-hidden hover:border-blue-500/30 transition-all group cursor-pointer">
                <div class="relative">
                    <div class="relative h-full min-h-[400px] rounded-2xl overflow-hidden bg-slate-900/50">
                        <img
                            class="launch-image h-full w-full object-cover"
                            src="${data[i].image?.thumbnail_url ||
            data[i].image?.image_url ||
            "./Images/launch-placeholder.png"
            }"
                            alt="${data[i].name}"
                            >
                        <div class="absolute inset-0 bg-linear-to-t from-slate-900 via-transparent to-transparent"></div>
                    </div>
                </div>
                <div class="p-5">
                    <div class="mb-3">
                        <h4 class="font-bold text-lg mb-2 line-clamp-2 group-hover:text-blue-400 transition-colors">
                            ${data[i].name}
                        </h4>
                        <p class="text-sm text-slate-400 flex items-center gap-2">
                            <i class="fas fa-building text-xs"></i>
                            ${data[i].launch_service_provider.name}
                        </p>
                    </div>
                    <div class="space-y-2 mb-4">
                        <div class="flex items-center gap-2 text-sm">
                            <i class="fas fa-calendar text-slate-500 w-4"></i>
                            <span class="text-slate-300">${changeFormatDateShort(
                data[i].net
            )}</span>
                        </div>
                        <div class="flex items-center gap-2 text-sm">
                            <i class="fas fa-clock text-slate-500 w-4"></i>
                            <span class="text-slate-300">${changeFormatTime(
                data[i].net
            )}</span>
                        </div>
                        <div class="flex items-center gap-2 text-sm">
                            <i class="fas fa-rocket text-slate-500 w-4"></i>
                            <span class="text-slate-300">${data[i].rocket.configuration.name
            }</span>
                        </div>
                        <div class="flex items-center gap-2 text-sm">
                            <i class="fas fa-map-marker-alt text-slate-500 w-4"></i>
                            <span class="text-slate-300 line-clamp-1">${data[i].pad.location.name
            }</span>
                        </div>
                    </div>
                    <div class="flex items-center gap-2 pt-4 border-t border-slate-700">
                        <button class="flex-1 px-4 py-2 bg-slate-700 rounded-lg hover:bg-slate-600 transition-colors text-sm font-semibold">
                            Details
                        </button>
                        <button class="px-3 py-2 bg-slate-700 rounded-lg hover:bg-slate-600 transition-colors">
                            <i class="far fa-heart"></i>
                        </button>
                    </div>
                </div>
            </div>
        `;
    }
    launchesGrid.innerHTML = launchesGridBox;
}

// ========== Planets ==========

var planetsGrid = document.querySelectorAll("#planets-grid .planet-card");
// console.log(planetsGrid);
var planetDetailImage = document.getElementById("planet-detail-image");
var planetDetailName = document.getElementById("planet-detail-name");
var planetDetailDescription = document.getElementById(
    "planet-detail-description"
);
var planetDistance = document.getElementById("planet-distance");
var planetRadius = document.getElementById("planet-radius");
var planetMass = document.getElementById("planet-mass");
var planetDensity = document.getElementById("planet-density");
var planetOrbitalPeriod = document.getElementById("planet-orbital-period");
var planetRotation = document.getElementById("planet-rotation");
var planetMoons = document.getElementById("planet-moons");
var planetGravity = document.getElementById("planet-gravity");
var planetDiscoverer = document.getElementById("planet-discoverer");
var planetDiscoveryDate = document.getElementById("planet-discovery-date");
var planetBodyType = document.getElementById("planet-body-type");
var planetVolume = document.getElementById("planet-volume");
var planetFacts = document.getElementById("planet-facts");
var planetPerihelion = document.getElementById("planet-perihelion");
var planetAphelion = document.getElementById("planet-aphelion");
var planetEccentricity = document.getElementById("planet-eccentricity");
var planetInclination = document.getElementById("planet-inclination");
var planetAxialTilt = document.getElementById("planet-axial-tilt");
var planetTemp = document.getElementById("planet-temp");
var planetEscape = document.getElementById("planet-escape");

function getPlanetsDetails(planetId) {
    fetch("https://solar-system-opendata-proxy.vercel.app/api/planets")
        .then(function (response) {
            return response.json();
        })
        .then(function (data) {
            var planet = data.bodies.find(function (body) {
                return body.id === planetId;
            });
            if (planet) {
                displayPlanetDetails(planet);
            } else {
                console.log("Planet not found");
            }
        });
}

for (var i = 0; i < planetsGrid.length; i++) {
    planetsGrid[i].addEventListener("click", function () {
        var clickedPlanetId = this.getAttribute("data-planet-id");
        // console.log(clickedPlanetId);
        getPlanetsDetails(clickedPlanetId);
    });
}

function displayPlanetDetails(data) {
    planetDetailImage.src = data.image || "";
    planetDetailName.innerHTML = data.englishName || data.name || "Unknown";
    planetDetailDescription.innerHTML =
        data.description || "No description available";

    planetDistance.innerHTML = data.semimajorAxis
        ? `${data.semimajorAxis} km`
        : "Unknown";

    planetRadius.innerHTML = data.meanRadius
        ? `${data.meanRadius} km`
        : "Unknown";

    planetMass.innerHTML = data.mass
        ? `${data.mass.massValue} × 10<sup>${data.mass.massExponent}</sup> kg`
        : "Unknown";

    planetDensity.innerHTML = data.density ? `${data.density} g/cm³` : "Unknown";

    planetOrbitalPeriod.innerHTML = data.sideralOrbit
        ? `${data.sideralOrbit} days`
        : "Unknown";

    planetRotation.innerHTML = data.sideralRotation
        ? `${data.sideralRotation} hours`
        : "Unknown";

    planetMoons.innerHTML = data.moons ? data.moons.length : 0;

    planetGravity.innerHTML = data.gravity ? `${data.gravity} m/s²` : "Unknown";

    planetDiscoverer.innerHTML = data.discoveredBy || "Unknown";
    planetDiscoveryDate.innerHTML = data.discoveryDate || "Unknown";
    planetBodyType.innerHTML = data.bodyType || "Unknown";

    planetVolume.innerHTML = data.vol
        ? `${data.vol.volValue} × 10<sup>${data.vol.volExponent}</sup> km³`
        : "Unknown";

    planetPerihelion.innerHTML = data.perihelion
        ? `${data.perihelion} km`
        : "Unknown";

    planetAphelion.innerHTML = data.aphelion
        ? `${data.aphelion} km`
        : "Unknown";

    planetEccentricity.innerHTML = data.eccentricity ?? "Unknown";
    planetInclination.innerHTML = data.inclination
        ? `${data.inclination}°`
        : "Unknown";

    planetAxialTilt.innerHTML = data.axialTilt ? `${data.axialTilt}°` : "Unknown";

    planetTemp.innerHTML = data.avgTemp ? `${data.avgTemp} K` : "Unknown";

    planetEscape.innerHTML = data.escape ? `${data.escape} m/s` : "Unknown";
}
