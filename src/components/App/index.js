import React from 'react';
import './index.css';
import MapContainer from '../Map/Container.js'

const App = () => (
    <div class="container-fluid">
        <div class="row">
          <div id="data-column" class="col-sm-3 col-md-3 col-lg-3">
                <h2>Recent Reports</h2>
                <ul class="list-group">
                  <li class="list-group-item">Test #1</li>
                  <li class="list-group-item">Test #2</li>
                  <li class="list-group-item">Test #3</li>
                  <li class="list-group-item">Test #4</li>
                  <li class="list-group-item">Test #5</li>
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

export default App;
