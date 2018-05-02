var mapDiv = document.createElement("div");
mapDiv.id = "map";
document.body.appendChild(mapDiv);

var attr_osm = 'Map data &copy; <a href="http://openstreetmap.org/">OpenStreetMap</a> contributors',
attr_overpass = 'POI via <a href="http://www.overpass-api.de/">Overpass API</a>';

var osm = new L.TileLayer('http://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {opacity: 0.7, attribution: [attr_osm, attr_overpass].join(', ')});
var map = L.map('map', { zoomControl:true }).addLayer(osm).setView([53.3477, -6.2632], 12);
var route = [];
let closestStations = L.markerClusterGroup();
var highSecurtiy = false;
standsURL = 'https://www.overpass-api.de/api/interpreter?' +
        'data=[out:json][timeout:60];' +
        'area["boundary"~"administrative"]["name"~"Dublin"];' +
        'node(area)["amenity"~"bicycle_parking"];' +
        'out;';

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

var homeIcon = L.ExtraMarkers.icon({
    icon: 'fa-home',
    iconColor: 'white',
    markerColor: 'blue',
    shape: 'circle',
    prefix: 'fa'
});

var shopIcon = L.ExtraMarkers.icon({
    icon: 'fa-wrench',
    iconColor: 'white',
    markerColor: 'yellow',
    shape: 'circle',
    prefix: 'fa'
});

markerClusters = L.markerClusterGroup();
var geojson = {
      type: "FeatureCollection",
      features: [],
    };

DisplayResources();

function GetStands(){
    $.ajax({
        url:
            'https://www.overpass-api.de/api/interpreter?' +
            'data=[out:json][timeout:60];' +
            'area["boundary"~"administrative"]["name"~"Dublin"];' +
            'node(area)["amenity"~"bicycle_parking"];' +
            'out;',
        dataType: 'json',
        type: 'GET',
        async: true,
        crossDomain: true
    }).done(function(data) {
        console.log(data);

        for (let i = 0; i < data.elements.length; i++) {
            geojson.features.push({
                "type": "Feature",
                "geometry": {
                    "type": "Point",
                    "coordinates": [data.elements[i].lat, data.elements[i].lon]
                }
            });
        }

        console.log(geojson);
        new L.GeoJSON(geojson, {
            onEachFeature: function(feature, layer) {
                var m = L.marker(feature.geometry.coordinates, {
                    icon: lockIcon
                })
                markerClusters.addLayer( m );
            }
        });
        map.addLayer( markerClusters );
    }).fail(function(error) {
        console.log(error);
        console.log( "error" );
    }).always(function() {
        console.log( "complete" );
    });
}

function GetShops(){
    $.ajax({
        url:
            'https://www.overpass-api.de/api/interpreter?' +
            'data=[out:json][timeout:60];' +
            'area["boundary"~"administrative"]["name"~"Dublin"];' +
            'node(area)["shop"~"bicycle"];' +
            'out;',
        dataType: 'json',
        type: 'GET',
        async: true,
        crossDomain: true
    }).done(function(data) {
        console.log(data);

        for (let i = 0; i < data.elements.length; i++) {
            geojson.features.push({
                "type": "Feature",
                "geometry": {
                    "type": "Point",
                    "coordinates": [data.elements[i].lat, data.elements[i].lon]
                }
            });
        }

        console.log(geojson);
        new L.GeoJSON(geojson, {
            onEachFeature: function(feature, layer) {
                var m = L.marker(feature.geometry.coordinates, {
                    icon: shopIcon
                })
                markerClusters.addLayer( m );
            }
        });
        map.addLayer( markerClusters );
    }).fail(function(error) {
        console.log(error);
        console.log( "error" );
    }).always(function() {
        console.log( "complete" );
    });
}

function DisplayResources(){
    GetStands();
    GetShops();
}

function SettingsReset(){
    highSecurtiy = false;
    map.removeLayer(markerClusters);
}

function SetSecurityHigh(){
    highSecurtiy = true;
    map.removeLayer(markerClusters);
    DisplayStations();
}

function SetSecurityLow(){
    highSecurtiy = false;
    map.removeLayer(markerClusters);
    DisplayStations();
}

function Locate(){
    map.locate({setView: true, maxZoom: 13});
    map.on('locationfound', onLocationFound);
}

function onLocationFound(e){
    if(route.length > 0) {
        destMarker = new L.marker(e.latlng, {
            draggable: false,
            icon: destinationIcon
        }).bindPopup("You are here!").addTo(map);
        destMarker.openPopup();
        route[1] = (e.latlng);
    }
    else
        {
            startMarker = new L.marker(e.latlng, {
                draggable: false,
                icon: startIcon
            }).bindPopup("You are here!").addTo(map);
            startMarker.openPopup();
            route[0] = (e.latlng);
        }
}

function SelectOnMap(){
    if(route.length > 0){
        var latlng = startMarker.getLatLng();
        var point = map.latLngToContainerPoint(latlng);
        var newPoint = L.point(point.x, point.y + 10);
        var newLatLng = map.containerPointToLatLng(newPoint);
        destMarker = new L.marker(newLatLng, {
            draggable: true,
            icon: destinationIcon
        }).bindPopup("Drag to desired location").addTo(map);
        destMarker.openPopup();
        destMarker.on("drag", function(e) {
            map.panTo(destMarker.getLatLng());
        });
        destMarker.on('dragend', function(event){
            route[1] = (destMarker.getLatLng());
        });
    }
    else {
        startMarker = new L.marker(map.getCenter(), {
            draggable: true,
            icon: startIcon
        }).bindPopup("Drag to desired location").addTo(map);
        startMarker.openPopup();
        startMarker.on("drag", function(e) {
            map.panTo(startMarker.getLatLng());
        });
        startMarker.on('dragend', function(event){
            route[0] = (startMarker.getLatLng());
        });
    }
}

function Create(){
    if(route.length > 1){
        Route();
    }
    show();
    map.removeLayer(startMarker);
    map.removeLayer(destMarker);
}

function show(){
    document.getElementById("save-route-input").style.visibility="visible";
    document.getElementById("save-route-button").style.visibility="visible";
}

function hide(){
    document.getElementById("save-route-input").style.visibility="hidden";
    document.getElementById("save-route-button").style.visibility="hidden";
}

function MapReset(){
    route = [];
    map.eachLayer(function (layer) {
        map.removeLayer(layer);
    });
    map.removeControl(control);
    map.addLayer(osm).setView([53.3477, -6.2632], 12);

    map.addLayer( markerClusters );
}

function Route() {
    control = L.Routing.control({
        waypoints: [
            route[0],
            route[1]
        ],
        icon: lockIcon,
        show: true,
        routeWhileDragging: false,
        draggable: false,
        showAlternatives: false,
    }).addTo(map);
    map.removeLayer(markerClusters);
    let shortestDistance = 200.0;
    markerClusters.eachLayer(function(layer){
        if(layer._latlng.distanceTo(route[1]) < shortestDistance ) {
            console.log(layer);
            closestStations.addLayer(layer);
        }
    });
    console.log(closestStations)
    map.addLayer(closestStations);
}

function Collapse(){
    $('#dest').collapse("hide");
}

$('#parking').click(function() {
    console.log("radio checked");
    map.remove(markerClusters);
    markerClusters.clearLayers();
   if($('#parking').is(':checked')) { GetStands(); }
   if($('#repair').is(':checked')) { GetStands(); }
   if($('#garda').is(':checked')) { GetStands(); }
});

function getCookie(name) {
    var cookieValue = null;
    if (document.cookie && document.cookie !== '') {
        var cookies = document.cookie.split(';');
        for (var i = 0; i < cookies.length; i++) {
            var cookie = jQuery.trim(cookies[i]);
            // Does this cookie string begin with the name we want?
            if (cookie.substring(0, name.length + 1) === (name + '=')) {
                cookieValue = decodeURIComponent(cookie.substring(name.length + 1));
                break;
            }
        }
    }
    return cookieValue;
}

function csrfSafeMethod(method) {
    // these HTTP methods do not require CSRF protection
    return (/^(GET|HEAD|OPTIONS|TRACE)$/.test(method));
}

function SaveRoute(){
    console.log(route);

    var csrftoken = getCookie('csrftoken');

    $.ajaxSetup({
        beforeSend: function(xhr, settings) {
            if (!csrfSafeMethod(settings.type) && !this.crossDomain) {
                xhr.setRequestHeader("X-CSRFToken", csrftoken);
            }
        }
    });

    console.log(document.getElementById("save-route-input").value);
    $.ajax({
        url: "http://45.77.102.53/plan/save-route/",
        type: "POST",
        dataType: "json",
        data: {
            name: document.getElementById("save-route-input").value,
            route: JSON.stringify(route)
        },
    });

    hide();
}