// // Create the map object with options
// var myMap = L.map("map", {
//     center: [37.09, -95.71], // Initial map center
//     zoom: 5 // Initial zoom level
//   });
  
//   // Add OpenStreetMap tile layer to the map
//   L.tileLayer("https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png", {
//     attribution: "Map data &copy; <a href='https://www.openstreetmap.org/copyright'>OpenStreetMap</a> contributors"
//   }).addTo(myMap);
  
//   // Define the URL for the USGS GeoJSON feed
//   var geojsonUrl = "https://earthquake.usgs.gov/earthquakes/feed/v1.0/summary/all_week.geojson";
  
//   // Function to determine the marker size based on the earthquake's magnitude
//   function markerSize(magnitude) {
//     return magnitude * 4; // Adjust the multiplier as needed
//   }
  
//   // Function to determine the marker color based on the earthquake's depth
//   function markerColor(depth) {
//     return depth > 90 ? '#ff0000' :
//            depth > 70 ? '#ff6600' :
//            depth > 50 ? '#ff9900' :
//            depth > 30 ? '#ffcc00' :
//            depth > 10 ? '#ffff00' :
//                         '#ccff33';
//   }
  
//   // Load the GeoJSON data with D3
//   d3.json(geojsonUrl).then(function(data) {
//     // Create GeoJSON layer and add it to the map
//     L.geoJson(data, {
//       // For each feature (earthquake), create a marker
//       pointToLayer: function(feature, latlng) {
//         return L.circleMarker(latlng, {
//           radius: markerSize(feature.properties.mag), // Set marker size
//           fillColor: markerColor(feature.geometry.coordinates[2]), // Set marker color
//           color: "#000", // Border color
//           weight: 1, // Border width
//           opacity: 1,
//           fillOpacity: 0.8
//         });
//       },
//       // Create popups
//       onEachFeature: function(feature, layer) {
//         layer.bindPopup("<h4>Location: " + feature.properties.place +
//           "</h4><hr><p>Magnitude: " + feature.properties.mag +
//           "<br>Depth: " + feature.geometry.coordinates[2] + " km</p>");
//       }
//     }).addTo(myMap);
//   });
  
//   // Adding legend to the map
//   var legend = L.control({position: 'bottomright'});
  
//   legend.onAdd = function (map) {
//     var div = L.DomUtil.create('div', 'info legend'),
//         depths = [-10, 10, 30, 50, 70, 90],
//         labels = [];
  
//     // Generate a label with a colored square for each interval
//     for (var i = 0; i < depths.length; i++) {
//         div.innerHTML +=
//             '<i style="background:' + markerColor(depths[i] + 1) + '"></i> ' +
//             depths[i] + (depths[i + 1] ? '&ndash;' + depths[i + 1] + ' km<br>' : '+ km');
//     }
//     return div;
//   };
  
//   legend.addTo(myMap);
  

  // Create the map object with options
var myMap = L.map("map", {
    center: [37.09, -95.71], // Initial map center
    zoom: 5 // Initial zoom level
  });
  
  // Add OpenStreetMap tile layer to the map
  L.tileLayer("https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png", {
    attribution: "Map data &copy; <a href='https://www.openstreetmap.org/copyright'>OpenStreetMap</a> contributors"
  }).addTo(myMap);
  
  // Define the URL for the USGS GeoJSON feed
  var geojsonUrl = "https://earthquake.usgs.gov/earthquakes/feed/v1.0/summary/all_week.geojson";
  
  // Function to determine the marker size based on the earthquake's magnitude
  function markerSize(magnitude) {
    return magnitude * 4; // Adjust the multiplier as needed
  }
  
  // Function to determine the marker color based on the earthquake's depth
  function depthColor(depth) {
    return depth > 90 ? '#EA2C2C' :
           depth > 70 ? '#EA822C' :
           depth > 50 ? '#EE9C00' :
           depth > 30 ? '#EECC00' :
           depth > 10 ? '#D4EE00' :
                        '#98EE00';
  }
  
  // Load the GeoJSON data with D3
  d3.json(geojsonUrl).then(function(data) {
    // Create GeoJSON layer and add it to the map
    L.geoJson(data, {
      // For each feature (earthquake), create a marker
      pointToLayer: function(feature, latlng) {
        return L.circleMarker(latlng, {
          radius: markerSize(feature.properties.mag), // Set marker size
          fillColor: depthColor(feature.geometry.coordinates[2]), // Set marker color
          color: "#000", // Border color
          weight: 1, // Border width
          opacity: 1,
          fillOpacity: 0.8
        });
      },
      // Create popups
      onEachFeature: function(feature, layer) {
        layer.bindPopup("<h4>Location: " + feature.properties.place +
          "</h4><hr><p>Magnitude: " + feature.properties.mag +
          "<br>Depth: " + feature.geometry.coordinates[2] + " km</p>");
      }
    }).addTo(myMap);
  });
  
// Adding legend to the map
var legend = L.control({ position: 'bottomright' });

legend.onAdd = function (map) {
    var div = L.DomUtil.create('div', 'info legend'),
        grades = [-10, 10, 30, 50, 70, 90], // depth ranges
        labels = [],
        from, to;

    // Loop through our depth intervals and generate a label with a colored square for each interval
    for (var i = 0; i < grades.length; i++) {
        from = grades[i];
        to = grades[i + 1];

        labels.push(
            '<i style="background:' + depthColor(from + 1) + '; width:18px; height:18px; float:left; margin-right:8px; opacity:0.7;"></i> ' +
            from + (to ? '&ndash;' + to + ' km' : '+ km'));
    }

    div.innerHTML = labels.join('<br>');
    return div;
};

legend.addTo(myMap);

  