$(document).ready(function() {

    var map = L.map('map').setView([51.505, -0.09], 13);

    L.tileLayer('http://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
        attribution: 'Map data &copy; <a href="http://openstreetmap.org">OpenStreetMap</a> contributors, <a href="http://creativecommons.org/licenses/by-sa/2.0/">CC-BY-SA</a>',
        maxZoom: 18
    }).addTo(map);

    map.locate({
        setView: true,
        maxZoom: 16
    });

    function onLocationFound(e) {
        var radius = e.accuracy / 2;

        L.marker(e.latlng).addTo(map)
            .bindPopup("You are within " + radius + " meters from this point").openPopup();

        L.circle(e.latlng, radius).addTo(map);
    }

    map.on('locationfound', onLocationFound);

    function onLocationError(e) {
        alert(e.message);
    }

    map.on('locationerror', onLocationError);

    var parkStyle = {
        weight: 2,
        color: "#999",
        opacity: 1,
        fillColor: "#B0DE5C",
        fillOpacity: 0.65
    };

    var greenWayStyle = {
        weight: 3,
        color: "#666",
        opacity: 1,
        fillColor: "#85460E",
        fillOpacity: 0.65
    };
    var districtStyle = {
        weight: 2,
        color: "#999",
        opacity: 1,
        fillColor: "#724B6B",
        fillOpacity: 0.65
    };
    $.getJSON($('link[rel="parks"]').attr("href"), function(data) {
        var geojson = L.geoJson(data, {
            style: parkStyle,
            onEachFeature: function(feature, layer) {
                layer.bindPopup('Park Name: ' + feature.properties.parkname);
            }
        });
        map.fitBounds(geojson.getBounds());
        geojson.addTo(map);
    });
    $.getJSON($('link[rel="greenways"]').attr("href"), function(data) {
        var geojson = L.geoJson(data, {
            style: greenWayStyle,
            onEachFeature: function(feature, layer) {
                layer.bindPopup('Type: ' + feature.properties.segmenttype);
            }
        });
        map.fitBounds(geojson.getBounds());
        geojson.addTo(map);
    });
    $.getJSON($('link[rel="arts"]').attr("href"), function(data) {
        var geojson = L.geoJson(data, {
            onEachFeature: function(feature, layer) {
                layer.bindPopup(
                    '<b>Name: ' + feature.properties.name + '</b><br>' + 'Location: ' + feature.properties.location + '<br>' + 'Type: ' + feature.properties.type);
            }
        });
        map.fitBounds(geojson.getBounds());
        geojson.addTo(map);
    });
    $.getJSON($('link[rel="districts"]').attr("href"), function(data) {
        var geojson = L.geoJson(data, {
            style: districtStyle,
            onEachFeature: function(feature, layer) {
                layer.bindPopup('Historical District Name: ' + feature.properties.name);
            }
        });
        map.fitBounds(geojson.getBounds());
        geojson.addTo(map);
    });
});