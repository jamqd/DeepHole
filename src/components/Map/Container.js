import React from 'react';
import {Map, InfoWindow, Marker, GoogleApiWrapper, HeatMap} from 'google-maps-react';
import firebase from '../Firebase/Firebase.js';

export class MapContainer extends React.Component {

    constructor() {
      super();
      this.state = {
        "points": []
      }
    }

    componentDidMount() {
        this.getPoints();
    }

  render() {
    if (!this.props.loaded) return <div>Loading...</div>;

    const style = {
        width: '100vw',
        height: '100vh'
    };
    // const points = [
    //     {lat: 34.073511925420014, lng: -118.45002831568814},
    //     {lat: 34.073511925420014, lng: -119.45002831568814}
    // ];
    console.log("POINTS: ", this.state["points"]);

    return (
        <Map google={this.props.google}
             zoom={14}
             center={{
                lat: 34.064982,
                lng: -118.445467
             }}>
             <HeatMap
                opacity={0.3}
                positions={this.state["points"]}
                radius={20} />
        </Map>
    );
  }

  getPoints() {
      const itemsRef = firebase.database().ref('coordinates');
      var positions = [];
      itemsRef.on('value', (snapshot) => {
          snapshot.forEach((child) => {
              // positions.push(new this.props.google.maps.LatLng(temp[0], temp[1]));
              positions.push({lat: child.val()["lat"], lng: child.val()["lng"]});
          });
          const points = [
              {lat: 34.073511925420014, lng: -118.45002831568814},
              {lat: 34.073511925420014, lng: -119.45002831568814}
          ];
          this.setState({"points": points});
          this.forceUpdate();
      });
      return positions
  }
}

export default GoogleApiWrapper({
  apiKey: "AIzaSyD7vbX_dhoVAHODMIDBGwT5-pjCqMhvV6A",
  libraries: ["visualization"]
})(MapContainer)

// export class Container extends React.Component {
//   render() {
//     const style = {
//         width: '100vw',
//         height: '100vh'
//     };
//     return (
//         <div style={style}>
//             <Map google={this.props.google} />
//         </div>
//     )
//   }
// }
//
// export default GoogleApiComponent({
//   apiKey: "AIzaSyD7vbX_dhoVAHODMIDBGwT5-pjCqMhvV6A"
// })(Container)
