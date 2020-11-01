function createNode(element) {
  return document.createElement(element);
}

function append(parent, el) {
  return parent.appendChild(el);
}

const ul = document.getElementById("authors");
const url = "https://thingspeak.com/channels/1199738/feed.json";
fetch(url)
  .then((resp) => resp.json())
  .then(function (data) {
    let feeds = data.feeds;
    let channels = data.channel;
    console.log(channels, "dosjflkdo");

  
    console.log(ul);
    return feeds.map(function (feed) {
      let li = createNode("li"),
      h2 = createNode("h2");
    //   img.src = author.picture.medium;
      h2.innerHTML = `${feed.entry_id} ${feed.created_at}`;
    //   append(li, img);
      append(ul, h2);
    //   append(ul, li);
    });
  })
  .catch(function (error) {
    console.log(error);
  });

function getData(url){
  fetch(url)
  .then((resp) => resp.json())
  .then(function (data) {
    let feeds = data.feeds;
    let channels = data.channel;
    console.log(channels, "dosjflkdo");

    return channels;
  })
  .catch(function (error) {
    console.log(error);
  });

}

// generate map

// // exports.__esModule = true;
// var map, heatmap;


// function initMap(){

//   map = new google.maps.Map(document.getElementById("map"), { zoom: 13, center: { lat: 10, lng: 7}, mapTypeId: "satellite",});

//   // heatmap = new google.maps.visualization.HeatmapsLayer({ data: getPoints(), map: map,});

//   heatmap = new google.maps.visualization.HeatmapLayer({
//     data: getPoints(),
//     map: map,
//   });

//   heatmap.set("radius", 40);

// }

// // export { initMap };


// exports.initMap = initMap;

// function getPoints(){
//   return [new google.maps.LatLng(10.5105, 7.4165)];
// }

// function changeGradient(){
//   let gradient = [
//     "rgba(255, 0, 0, 1)",
//   ];

//   heatmap.set("gradient", gradient);
// }



// let map;

// function initMap() {
//   map = new google.maps.Map(document.getElementById("map"), {
//     zoom: 2,
//     center: new google.maps.LatLng(2.8, -187.3),
//     mapTypeId: "terrain",
//   });
//   // Create a <script> tag and set the USGS URL as the source.
//   const script = document.createElement("script");
//   // This example uses a local copy of the GeoJSON stored at
//   // http://earthquake.usgs.gov/earthquakes/feed/v1.0/summary/2.5_week.geojsonp
//   script.src =
//     "https://developers.google.com/maps/documentation/javascript/examples/json/earthquake_GeoJSONP.js";
//   document.getElementsByTagName("head")[0].appendChild(script);
// }

// // Loop through the results array and place a marker for each
// // set of coordinates.
// const eqfeed_callback = function (results) {
//   for (let i = 0; i < results.features.length; i++) {
//     const coords = results.features[i].geometry.coordinates;
//     const latLng = new google.maps.LatLng(coords[1], coords[0]);
//     new google.maps.Marker({
//       position: latLng,
//       map: map,
//     });
//   }
// };



let map;

function initMap() {
  
  var urlr = "https://thingspeak.com/channels/1199738/feed.json";
  var channels = getData(urlr);
  console.log(channels, "thisiis");
  map = new google.maps.Map(document.getElementById("map"), {
    zoom: 2,
    center: { lat: 38.0922, lng: 23.8012},
    mapTypeId: "terrain",
  });
  // Create a <script> tag and set the USGS URL as the source.
  const script = document.createElement("script");
  // This example uses a local copy of the GeoJSON stored at
  // http://earthquake.usgs.gov/earthquakes/feed/v1.0/summary/2.5_week.geojsonp
  script.src =
    "https://developers.google.com/maps/documentation/javascript/examples/json/earthquake_GeoJSONP.js";
  document.getElementsByTagName("head")[0].appendChild(script);
  map.data.setStyle((feature) => {
    const magnitude = feature.getProperty("mag");
    return {
      icon: getCircle(magnitude),
    };
  });
}

function getCircle(magnitude) {
  return {
    path: google.maps.SymbolPath.CIRCLE,
    fillColor: "red",
    fillOpacity: 0.2,
    scale: Math.pow(2, magnitude) / 2,
    strokeColor: "white",
    strokeWeight: 0.5,
  };
}

function eqfeed_callback(results) {
  map.data.addGeoJson(results);
}
