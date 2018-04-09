var mapDiv = document.createElement("div");
mapDiv.id = "map";
document.body.appendChild(mapDiv);

var attr_osm = 'Map data &copy; <a href="http://openstreetmap.org/">OpenStreetMap</a> contributors',
attr_overpass = 'POI via <a href="http://www.overpass-api.de/">Overpass API</a>';

var osm = new L.TileLayer('http://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {opacity: 0.7, attribution: [attr_osm, attr_overpass].join(', ')});
var map = L.map('map', { zoomControl:true }).addLayer(osm).setView([53.3477, -6.2632], 12);
var route = [];
var highSecurtiy = false;


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

markerClusters = L.markerClusterGroup();
var geojson = {
      type: "FeatureCollection",
      features: [],
    };

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
    console.log( "second success" );
    map.addLayer( markerClusters );
}).fail(function(error) {
    console.log(error);
    console.log( "error" );
}).always(function() {
    console.log( "complete" );
});


function DisplayStations(){
    markerClusters = L.markerClusterGroup();
    console.log("stations")

    //OverPassAPI overlay
    var opl = new L.OverPassLayer({
      query: "(node(BBOX)['amenity'='drinking_water'];);out;",
    });
    console.log(opl)
    map.addLayer(opl);
    fetch("https://www.overpass-api.de/api/interpreter?data=[out:json];node[highway=speed_camera](43.46669501043081,-5.708215989569187,43.588927989569186,-5.605835010430813);out%20meta")
        .then((response) => {
            console.log(response.json())
            return response.json();
        })
        .then((data) => {
            new L.GeoJSON(data, {
                onEachFeature: function(feature, layer){
                    var popup = "<dd>" + "Location: " + feature.properties.location + "</dd>" +
                                    "<dd>" + "Security: " + feature.properties.security + "</dd>" +
                                    "<dd>" + "Type: " + feature.properties.type + "</dd>" +
                                    "<dd>" + "Number of Stands: " + feature.properties.no_stands + "</dd>";
                    var m = L.marker(feature.geometry.coordinates, {
                        icon: lockIcon
                    })
                    .bindPopup( popup );
                    if(highSecurtiy){
                        console.log("High Secuirty");
                        if(feature.properties.security === "High" || feature.properties.security === "high"){
                            markerClusters.addLayer( m );

                        }
                    }
                    else{
                        markerClusters.addLayer( m );
                    }

                }
            })
        });
    map.addLayer( markerClusters );
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
    map.removeLayer(startMarker);
    map.removeLayer(destMarker);
}

function MapReset(){
    route = [];
    map.removeLayer(startMarker);
    map.removeLayer(destMarker);
    map.removeLayer(closestStation);
    map.removeLayer(markerClusters);
    control.getPlan().setWaypoints([]);

    map.setView([53.3477, -6.2632], 12);
    DisplayStations();
}

function Route() {
    control = L.Routing.control({
        waypoints: [
            route[0],
            route[1]
        ],
        icon: lockIcon,
        show: false,
        routeWhileDragging: false,
        draggable: false,
        showAlternatives: false,
    }).addTo(map);
    map.removeLayer(markerClusters);
    var shortestDistance = 100000.0;
    markerClusters.eachLayer(function(layer){
        if(layer._latlng.distanceTo(route[1]) < shortestDistance ) {
            shortestDistance = layer._latlng.distanceTo(route[1]);
            closestStation = layer;
        }
    });

    map.addLayer(closestStation);
    closestStation.openPopup();
}

function Collapse(){
    $('#dest').collapse("hide");
}