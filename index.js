
// This example requires the Visualization library. Include the libraries=visualization
// parameter when you first load the API. For example:
// <script src="https://maps.googleapis.com/maps/api/js?key=YOUR_API_KEY&libraries=visualization">
var database = firebase.database();
var map, heatmap;
function initMap() {
  map = new google.maps.Map(document.getElementById('map'), {
    zoom: 19,
    center: {lat: 34.064982, lng: -118.445467},
    mapTypeId: 'satellite'
  });
  heatmap = new google.maps.visualization.HeatmapLayer({
    data: getPoints(),
    map: map
  });
  heatmap.set('radius', 25);
}
function changeOpacity() {
  heatmap.set('opacity', heatmap.get('opacity') ? null : 0.1);
}
function getPoints() {
  var points = [];
  /*var query = firebase.database().ref("coordinates").orderByKey();
  query.once("value")
    .then(function(snapshot) {
      snapshot.forEach(function(childSnapshot) {
// key will be "ada" the first time and "alan" the second time
        var key = childSnapshot.key;
// childData will be the actual contents of the child
        var childData = childSnapshot.val();
        points.push(new google.maps.LatLng(0.0, 0.03));
    });
  });*/
  database.ref('coordinates').on('value', (snapshot) => {
    snapshot.forEach((child) => {
        points.push(new google.maps.LatLng(child.val()["lat"], child.val()["lng"]));
     });
  })
  return points;
  //return [new google.maps.LatLng(34.0648, -118.4455), new google.maps.LatLng(34.0649, -118.4454)];
}

// Get recent reports into the table.
$(function() {
    const itemsRef = database.ref("coordinates");
    itemsRef.on('value', (snapshot) => {
        var reports = [];
        snapshot.forEach((child) => {
            reports.push(child.val());
        });
        if (reports.length > 10) {
            reports = reports.splice(-10);
        }
        reports.forEach((report) => {
            $("#table").append(`<li class="list-group-item"> \
                                    <img src=${report.imgURL} height="80" width="80" /> \
                                    <p>${report.lat}, ${report.lng}</p> \
                                </li>`);
        });
    });
});
