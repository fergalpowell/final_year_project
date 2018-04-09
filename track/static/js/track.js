var map = L.map('map', { zoomControl:true }).setView([53.3477, -6.2632], 12);

var lockIcon = L.ExtraMarkers.icon({
    icon: 'fa-lock',
    iconColor: 'white',
    markerColor: 'blue',
    shape: 'circle',
    prefix: 'fa'
});

var highSecurtiy = false;

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

L.tileLayer('http://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
    attribution: 'Map data &copy; <a href="http://openstreetmap.org">OpenStreetMap</a> contributors, <a href="http://creativecommons.org/licenses/by-sa/2.0/">CC-BY-SA</a>, Imagery © <a href="http://mapbox.com">Mapbox</a>',
    maxZoom: 18
}).addTo(map);

var data_url = 'http://127.0.0.1:8000/track/current-location-data/';

// Download GeoJSON via Ajax
$.getJSON(data_url, function (data) {
    // Add GeoJSON layer
    L.geoJson(data, {
        onEachFeature: function (feature, layer) {
            var popup =  feature.properties.user;
            var m = L.marker(feature.geometry.coordinates, {
                icon: startIcon
            }).bindPopup(popup.toString() + "'s bike is here!");
            map.addLayer(m);
        }
    });
    console.log(data);
});
