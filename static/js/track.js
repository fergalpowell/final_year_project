var mapDiv = document.createElement("div");
mapDiv.id = "map";
document.body.appendChild(mapDiv);

var map = L.map('map', { zoomControl:true }).setView([53.3477, -6.2632], 12);

var lockIcon = L.ExtraMarkers.icon({
    icon: 'fa-lock',
    iconColor: 'white',
    markerColor: 'blue',
    shape: 'circle',
    prefix: 'fa'
});

var destinationIcon = L.ExtraMarkers.icon({
    icon: 'fa-flag-checkered',
    iconColor: 'white',
    markerColor: 'red',
    shape: 'circle',
    prefix: 'fa'
});

var startIcon = L.ExtraMarkers.icon({
    icon: 'fa-bicycle',
    iconColor: 'white',
    markerColor: 'green',
    shape: 'circle',
    prefix: 'fa'
});

var workIcon = L.ExtraMarkers.icon({
    icon: 'fa-briefcase',
    iconColor: 'white',
    markerColor: 'blue',
    shape: 'circle',
    prefix: 'fa'
});

var homeIcon = L.ExtraMarkers.icon({
    icon: 'fa-home',
    iconColor: 'white',
    markerColor: 'blue',
    shape: 'circle',
    prefix: 'fa'
});

L.tileLayer('http://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
    attribution: 'Map data &copy; <a href="http://openstreetmap.org">OpenStreetMap</a> contributors, <a href="http://creativecommons.org/licenses/by-sa/2.0/">CC-BY-SA</a>, Imagery © <a href="http://mapbox.com">Mapbox</a>',
    maxZoom: 18
}).addTo(map);

let current_data_url = 'http://127.0.0.1:8000/track/current-location-data/';
let work_data_url = 'http://127.0.0.1:8000/track/work-location-data/';
let home_data_url = 'http://127.0.0.1:8000/track/home-location-data/';
let journey = [];
let journey_data = [];
let control = L.Routing.control({
        show: false,
        routeWhileDragging: false,
        draggable: false,
        showAlternatives: false,
    });

function GetLocations(){
    GetLocation(work_data_url, 1);
    GetLocation(home_data_url, 2);
    GetLocation(current_data_url, 0);
}

GetLocations();

function GetJourney(url) {
    $.getJSON(url, function (data) {
        L.geoJson(data, {
            onEachFeature: function (feature) {
                journey_data.push(feature);
            }
        });
        var table = document.createElement('table');
        table.className = 'table';
        var tbody = document.createElement('tbody');
        for (var i = 0; i < journey_data.length; i++){
            var tr = document.createElement('tr');
            var td = document.createElement('td');
            let date_slice = new Date(journey_data[i].properties.date_time);
            td.innerHTML = String(date_slice).slice(0,21) + " ";
            let button = document.createElement('button');
            button.className = "btn btn-primary";
            button.innerHTML = "Show";
            let index = i;
            button.onclick = function(){ShowJourney(index)};
            td.appendChild(button);
            tr.appendChild(td);

            tbody.appendChild(tr);
        }
        table.appendChild(tbody);
        var output = document.getElementById('journey-table');
        output.appendChild(table);
    });
}

function ShowJourney(index) {
    console.log(journey_data);
    control.setWaypoints(journey_data[index].geometry.coordinates);
    control.addTo(map);
}

function GetLocation(url, type) {
    let label = "Home";
    let cirlceRadius = 30;
    if(type === 1){
        label = "Work";
        cirlceRadius = 75;
    }
    // Download GeoJSON via Ajax
    $.getJSON(url, function (data) {
        // Add GeoJSON layer
        L.geoJson(data, {
            onEachFeature: function (feature, layer) {
                if( type === 0){
                    let m = L.marker(feature.geometry.coordinates, {
                        icon: startIcon
                    }).bindPopup("Coordinates:" + String(feature.geometry.coordinates));
                    map.addLayer(m);
                }
                else{
                    let circle = L.circle(feature.geometry.coordinates, {
                        color: 'white',
                        fillColor: 'blue',
                        fillOpacity: 0.5,
                        radius: cirlceRadius
                    }).bindTooltip(label, {permanent: true, offset: [0, 0], fillColor: 'black'});
                    map.addLayer(circle);
                }
            }
        });
    });
}

function Locate(url) {
    var zoom = 17;
    $.getJSON(url, function (data) {
        // Add GeoJSON layer
        L.geoJson(data, {
            onEachFeature: function (feature) {
                map.setView(feature.geometry.coordinates, zoom);
                let coord = document.createTextNode("Coordinates: " + String(feature.geometry.coordinates));
                let results = document.getElementsByClassName("results");
                while (results[0].firstChild) {
                    results[0].removeChild(results[0].firstChild);
                }
                results[0].appendChild(coord);
            }
        });
    });
}





