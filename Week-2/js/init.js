// declare variables
let zoomLevel = 4;
const mapCenter = [38.5467,-121.74433];

// use the variables
const map = L.map('the_map').setView(mapCenter, zoomLevel);

L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
    attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
}).addTo(map);

// create a function to add markers
function addMarker(lat,lng,title,message){
    console.log(message)
    L.marker([lat,lng]).addTo(map).bindPopup(`<h2>${title}</h2> <h3>${message}</h3>`)
    return message
}

// use our marker functions
addMarker(38.538332883853286,-121.76126189163067,'UC Davis','Undergraduate degree!')
addMarker(47.610401,-122.319366,'Seattle University','This is where I got my MA degree!')
addMarker(47.655334,-122.303520,'University of Washington','This is where I used to work')
addMarker(34.069107615577934, -118.44481632246173,'UCLA','This is  where I go to school')
