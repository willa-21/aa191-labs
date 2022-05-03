// declare variables
let mapOptions = {'center': [34.0709,-118.444],'zoom':5}

// use the variables
const map = L.map('the_map').setView(mapOptions.center, mapOptions.zoom);

L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
    attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
}).addTo(map);

// create a function to add markers
function addMarker(lat,lng,title,message){
    console.log(message)
    L.marker([lat,lng]).addTo(map).bindPopup(`<h2>${title}</h2> <h3>${message}</h3>`)
    return message
}

const dataUrl = "https://docs.google.com/spreadsheets/d/e/2PACX-1vT1xCBcV3kIifnoFWNo_YXtDFC_RtC4GDG29LCL2gbbWN0f7mu69owmBrtR__OU7Mw9pLnYDssyVkMk/pub?output=csv"

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
        addMarker(data.lat,data.lng,data["How do you define support within your graduate school experience? How does support relate to your sense of belonging in SEIS and at UCLA?"],data["Please describe your experience using resources to support your graduate school experience. We welcome comments about what you've found to be most helpful, challenges you've had accessing resources, suggestion for new resources, etc."])
    })
}

loadData(dataUrl)
