import React from 'react';
import './index.css';
import MapContainer from '../Map/Container.js'
import firebase from '../Firebase/Firebase.js';

class App extends React.Component {
    constructor() {
        super();
        this.state = {
            "recent_reports": []
        };
    }

    componentDidMount() {
        const itemsRef = firebase.database().ref('coordinates');
        itemsRef.on('value', (snapshot) => {
            var reports = [];
            snapshot.forEach((child) => {
                reports.push(child.val());
            });
            if (reports.length > 10) {
                reports = reports.splice(-10);
            }
            this.setState({"recent_reports": reports});
            this.forceUpdate();
        });
    }

    render() {
        return (
            <div class="container-fluid">
                <div class="row">
                  <div id="data-column" class="col-sm-3 col-md-3 col-lg-3">
                        <h2>Recent Reports</h2>
                        <ul class="list-group">
                        {this.state.recent_reports.map((item) => {
                          return (
                            <li class="list-group-item">
                              {item.lat}
                              <img src={item.media} height="80" width="80" />
                            </li>
                          )
                        })}
                        </ul>
                        <div id="full-data">
                            <button type="button" class="btn btn-secondary">More Details</button>
                        </div>
                  </div>

                  <div id="map-column" class="embed-responsive col-sm-9 col-md-9 col-lg-9">
                    <div id="map" class="embed-responsive-item"></div>
                    <MapContainer />
                    <div id="toggle-heat">
                        <button type="button" class="btn btn-light" onclick="changeOpacity()">Toggle Heatmap</button>
                    </div>
                  </div>

                </div>
            </div>
        );
    }

}

export default App;
