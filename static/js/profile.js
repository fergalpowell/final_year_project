var mapDiv = document.createElement("div");
mapDiv.id = "map";
document.body.appendChild(mapDiv);
var route = [];

var map = L.map('map', { zoomControl:true }).setView([53.3477, -6.2632], 12);

L.tileLayer('http://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
    attribution: 'Map data &copy; <a href="http://openstreetmap.org">OpenStreetMap</a> contributors, <a href="http://creativecommons.org/licenses/by-sa/2.0/">CC-BY-SA</a>, Imagery © <a href="http://mapbox.com">Mapbox</a>',
    maxZoom: 18
}).addTo(map);

var jsondata =[
    {
        "owner": "Fergal Powell",
        "serial_number": "MU28438",
        "tracking_device_numer": "0876613438",
        "bike_model": "Btwin Triban",
        "bike_colour": "Black/Grey, Blue Grips",
        "tracking_device_numer": "0876613438",

    }
];



function GetProfile(){
    $.getJSON("http://127.0.0.1:8000/profile/profile-data/", function (data) {
        console.log(JSON.stringify(data))
        $('#table').bootstrapTable({
            data: jsondata
        });
    });
}

window.onload = LoadProfile();

function LoadProfile(){
    GetRoute();
}

function GetRoute(){
    let name = '';
    let created_at;
    nWps = route.length;
    $.getJSON("http://45.77.102.53/profile/route-data/", function (data) {
        // Add GeoJSON layer
        L.geoJson(data, {
            onEachFeature: function (feature) {
                console.log(feature);
                feature.geometry.coordinates.forEach(function (value) {
                    route.push(value);
                });
                name = feature.properties.name;
                created_at = new Date(feature.properties.date_time);
            }
        });
        control = L.Routing.control({
            plan: L.Routing.plan(route, {
                createMarker: function (i, wp) {
                    if (i === 0) {
                        return L.marker(wp.latLng);
                    } else {
                        return L.marker(wp.latLng).bindPopup('Route: ' + name + '<br>' + 'Created: ' + String(created_at));
                    }
                }
            }),
            show: true,
            routeWhileDragging: false,
            draggable: false,
            showAlternatives: false,
        }).addTo(map);
    });
}