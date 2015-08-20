/*
 * wc.js
 * Copyright (C) 2015 Christopher C. Strelioff <chris.strelioff@gmail.com>
 *
 * Distributed under terms of the MIT license.
 */
var map = L.map('map').setView([37.77, -122.04], 9);

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
    l.bindPopup("[" + f.properties["DISTRICT_I"] + "] " +
                f.properties["DIST_NAME"])
}

var jsonSchools = new L.GeoJSON.AJAX("data/UnifiedSchool.json",
                                     {onEachFeature: popUp});
jsonSchools.addTo(map);

var baseMaps = {
    "Map Quest": mq,
    "Open Street Map": osm
};

var overlays={
"json": jsonSchools,
}

var lc = L.control.layers(baseMaps, overlays);
lc.addTo(map);
