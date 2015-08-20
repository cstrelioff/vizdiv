/*
 * wc.js
 * Copyright (C) 2015 Christopher C. Strelioff <chris.strelioff@gmail.com>
 *
 * Distributed under terms of the MIT license.
 */

// set up the map
var map = L.map('map').setView([37.77, -122.24], 11);

var mapQuestAttr = 'Tiles Courtesy of <a href="http://www.mapquest.com/">MapQuest</a> &mdash; ';
var osmDataAttr = 'Map data &copy; <a href="http://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors';
var mopt = {
    url: 'http://otile{s}.mqcdn.com/tiles/1.0.0/osm/{z}/{x}/{y}.jpeg',
    options: {attribution:mapQuestAttr + osmDataAttr, subdomains:'1234'}
  };

var osm = L.tileLayer("http://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png",{attribution:osmDataAttr});
var mq = L.tileLayer(mopt.url, mopt.options);
mq.addTo(map);

function popUp(f,l){
    var out = [];
    if (f.properties){
        for(key in f.properties){
            out.push(key+": "+f.properties[key]);
        }
        l.bindPopup(out.join("<br />"));
    }
}

//var jsonTest = new L.GeoJSON.AJAX("data/AlamedaUnifiedSchools.json",
//                                  {onEachFeature: popUp}).addTo(map);
var jsonTest = new L.GeoJSON.AJAX("data/AlamedaUnifiedSchools.json").addTo(map);

var baseMaps = {
    "Map Quest": mq,
    "Open Street Map": osm
};

var overlays={
"json":jsonTest,
}

var lc = L.control.layers(baseMaps, overlays);
lc.addTo(map);
