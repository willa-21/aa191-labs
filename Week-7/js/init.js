// declare variables
let mapOptions = {'center': [34.0709,-118.444],'zoom':5};

let Food = L.featureGroup();
let Drink = L.featureGroup();

let layers = {
    "Ordered Food": Food,
    "Ordered Drink": Drink
};

let circleOptions = {
    radius: 4,
    fillColor: "#ff7800",
    color: "#000",
    weight: 1,
    opacity: 1,
    fillOpacity: 0.8
};

const dataUrl = "https://docs.google.com/spreadsheets/d/e/2PACX-1vSBpLttm6Cqi7PyUVB6-hUqwHk4UCpS852Z4kV6yElblP4so1Y5qn9kyj_HorZK6EdOntU9fYQ60jNK/pub?output=csv";


const map = L.map('the_map').setView(mapOptions.center, mapOptions.zoom);

let CartoDB_Positron = L.tileLayer('https://{s}.basemaps.cartocdn.com/light_all/{z}/{x}/{y}{r}.png', {
	attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors &copy; <a href="https://carto.com/attributions">CARTO</a>',
	subdomains: 'abcd',
	maxZoom: 20
}).addTo(map);


L.control.layers(null,layers).addTo(map);

// L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
//     attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
// }).addTo(map);

function addMarker(data){
    if(data['What did you order'] == "Food"){
        circleOptions.fillColor = "red"
        Food.addLayer(L.circleMarker([data.lat,data.lng],circleOptions).bindPopup(`<h2>Ordered Food</h2>`))
        createButtons(data.lat,data.lng,data['What did you order'])
        }
    else{
        circleOptions.fillColor = "blue"
        Drink.addLayer(L.circleMarker([data.lat,data.lng],circleOptions).bindPopup(`<h2>Ordered Drink</h2>`))
        createButtons(data.lat,data.lng,data['What did you order'])
    }
    return data
};

function createButtons(lat,lng,title){
    const newButton = document.createElement("button"); // adds a new button
    newButton.id = "button"+title; // gives the button a unique id
    newButton.innerHTML = title; // gives the button a title
    newButton.setAttribute("lat",lat); // sets the latitude 
    newButton.setAttribute("lng",lng); // sets the longitude 
    newButton.addEventListener('click', function(){
        map.flyTo([lat,lng]); //this is the flyTo from Leaflet
    })
    const spaceForButtons = document.getElementById('placeForButtons')
    spaceForButtons.appendChild(newButton);//this adds the button to our page.
};

function loadData(url){
    Papa.parse(url, {
        header: true,
        download: true,
        complete: results => processData(results)
    })
};

function processData(results){
    console.log(results)
    results.data.forEach(data => {
        console.log(data)
        addMarker(data)
    })
    Food.addTo(map) // add our layers after markers have been made
    Drink.addTo(map) // add our layers after markers have been made  
    let allLayers = L.featureGroup([Food,Drink]);
    map.fitBounds(allLayers.getBounds());
};

loadData(dataUrl)
