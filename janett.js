var map = L.map('map').setView([51.505, -0.09], 13);
L.tileLayer('https://tile.openstreetmap.org/{z}/{x}/{y}.png', {
    maxZoom: 19,
    attribution: '&copy; <a href="http://www.openstreetmap.org/copyright">OpenStreetMap</a>'
}).addTo(map);

var markers = L.markerClusterGroup();
map.addLayer(markers);

// Function to load or reload markers
function loadMarkers() {
    fetch('data/query.json?nocache=' + (new Date()).getTime())
    .then(response => response.json())
    .then(data => {
        markers.clearLayers(); // ✅ Clear previous markers

        data.forEach(element => {
            console.log(element.eventLabel);
            let posStr = element.coords.slice(6, -1).split(" ");
            console.log(posStr);
            var m = L.marker([parseFloat(posStr[1]), parseFloat(posStr[0])]);

            var imgText = (element.hasOwnProperty("sampleImage"))
                ? `<img src="${element.sampleImage}" style="float:right;width:100%;height:auto;">`
                : "";

            m.bindPopup(`<b>${element.eventLabel}</b> <a href="${element.articleLink}">Article</a>${imgText}<br>${element.description}`);
            markers.addLayer(m);
        });
    });
}

// Initial load
loadMarkers();
