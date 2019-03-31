import React from 'react';
import {Map, InfoWindow, Marker, GoogleApiWrapper} from 'google-maps-react';

export class MapContainer extends React.Component {
  render() {
    return (
      <Map google={this.props.google} zoom={14}>
      </Map>
    );
  }
}

export default GoogleApiWrapper({
  apiKey: "AIzaSyD7vbX_dhoVAHODMIDBGwT5-pjCqMhvV6A"
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
