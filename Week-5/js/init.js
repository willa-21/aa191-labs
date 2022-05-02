// declare variables
let mapOptions = {'center': [34.0709,-118.444],'zoom':5}

// use the variables
const map = L.map('the_map').setView(mapOptions.center, mapOptions.zoom);

L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
    attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
}).addTo(map);

// create a function to add markers
function addMarker(data){
    console.log(message)
    L.marker([data.lat,data.lng]).addTo(map).bindPopup(`<h2>${data['Zipcode']}</h2> <h3>${data['Graduate Program in SEIS']}</h3>`)
    
    return message
}

const dataUrl = "https://docs.google.com/spreadsheets/d/e/2PACX-1vSXUeZeWwRM9BM8Nk3HQPdrM7nmkGRtzJrFsG-ZaF7KFATkqyWpABk-cNi3WiFKfDhpQg_BTDi5Rs8G/pub?output=csv"

function loadData(url){
    Papa.parse(url, {
        header: true,
        download: true,
        complete: results => processData(results)
    })
}

function processData(results){
    console.log(results)
    results.data.forEach(data => {
        console.log(data)
        addMarker(data.lat,data.lng,data['Zipcode'],data['Graduate Program in SEIS'])
    })
}

loadData(dataUrl)
