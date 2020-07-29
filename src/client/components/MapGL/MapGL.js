import React, { useState, useEffect } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { translate } from 'react-i18next';
import * as mapGL from 'mapbox-gl';
import 'mapbox-gl/dist/mapbox-gl.css';
import './MapGL.scss';

const mapStateToProps = state => ({
  user: state.user,
});

export const MapGL = connect(mapStateToProps)((props) => {
  const { mapConf, mapLayers } = props;
  const [mapBox, setMapBox] = useState(null);
  const [mapInit, setMapInit] = useState(null);
  const [mapLayersOld, setMapLayersOld] = useState([]);

  // let map = null;

  const setLayers = (layers) => {
    if (layers.length > 0) {
      layers.forEach((layer) => {
        mapBox.addLayer(layer, '');
      });
    }
  };

  const filter = (lName) => {
    mapBox.resize();

    if (mapBox.getLayer(lName)) {
      mapBox.setFilter(lName, [
        'all',
        ['!=', 'ISO_A3', ''],
        ['in', 'ISO_A3', 'KAZ', 'CHN', 'GRL'],
      ]);
      mapBox.setPaintProperty(lName, 'fill-color', {
        property: 'ISO_A3',
        type: 'categorical',
        default: '#c6c6c6',
        stops: [
          ['KAZ', '#4fb4e2'],
          ['CHN', '#f1f075'],
          ['GRL', '#f28cb1'],
        ],
      });
    }
  };

  const setPaintProperty = (lName, paint, property, type, color, stops) => {
    mapBox.setPaintProperty(lName, paint, {
      property,
      type,
      default: color,
      stops,
    });
    // mapBox.setPaintProperty(lName, 'fill-color', {
    //   property: 'ISO_A3',
    //   type: 'categorical',
    //   default: '#c6c6c6',
    //   stops: [
    //     ['KAZ', '#4fb4e2'],
    //     ['CHN', '#f1f075'],
    //     ['GRL', '#f28cb1'],
    //   ]
    // });
  };

  const filterByPolygon = (lName, point, bboxSize = null) => {
    let geometry = [];
    if (bboxSize) {
      geometry = [
        [point.x - bboxSize[0] / 2, point.y - bboxSize[1] / 2],
        [point.x + bboxSize[0] / 2, point.y + bboxSize[1] / 2],
      ];
    } else {
      geometry = [point.x, point.y];
    }
    const features = mapBox.queryRenderedFeatures(geometry, { layers: [lName] });
    return features;
  };

  useEffect(() => {
    if (mapConf && mapInit !== mapConf.init) {
      setMapInit(mapConf.init);
      mapGL.accessToken = mapConf.token;
      const map = new mapGL.Map(mapConf.init);
      setMapBox(map);
    }
  }, [mapConf]);

  useEffect(() => {
    if (mapBox) {
      mapBox.on('load', () => {
        mapBox.resize();
        setLayers(mapLayers);
      });

      mapBox.on('click', (e) => {
        const layers = mapBox.queryRenderedFeatures(e.point);
        const features = filterByPolygon('building', e.point, [50, 50]);
        console.log(features);
        const stops = features.map(f => ([f.properties.type, '#4fb4e2']));
        if (stops.length > 0) {
          setPaintProperty('building', 'fill-color', 'type', 'categorical', '#c6c6c6', stops);
          // setPaintProperty('countries', 'fill-color', 'ISO_A3', 'categorical', '#c6c6c6', stops);
        }
        // console.log(mapBox.getStyle().layers);
        // console.log(mapBox.getStyle().sources);
        // console.log(mapBox.unproject([e.point.x, e.point.y]));
        console.log({
          coords: [e.lngLat.lat, e.lngLat.lng],
          layers,
        });
      });

      // mapBox.on('mousemove', (e) => {
      // filterByPolygon('countries', e.point, [100, 100]);
      // });
    }
  }, [mapBox]);

  useEffect(() => {
    if (mapLayers !== mapLayersOld && mapBox) {
      setMapLayersOld(mapLayers);
      mapBox.on('load', () => {
        setLayers(mapLayers);
      });
    }
  }, [mapLayers]);

  return (
    <div className="MapGL">
      <div className="tools">
        <button type="button" onClick={() => filter('countries')}>filter</button>
      </div>
      <div id="mapbox" />
    </div>
  );
});

MapGL.propTypes = {
  mapConf: PropTypes.objectOf(PropTypes.any),
};

MapGL.defaultProps = {
  mapConf: {
    token: 'pk.eyJ1IjoiY3JvbGxlciIsImEiOiJWX0ZXZF9zIn0.lIjITIfJ3v62baoHVIqtqQ',
    init: {
      container: 'mapbox',
      style: 'mapbox://styles/mapbox/light-v10',
      zoom: 2,
      center: [56.952892544604055, 44.44890859362289],
    },
  },
  mapLayers: [
    {
      id: 'dem',
      type: 'line',
      source: {
        type: 'vector',
        url: 'mapbox://mapbox.mapbox-terrain-v2',
        minzoom: 0,
        maxzoom: 19,
      },
      'source-layer': 'contour',
      layout: {
        'line-join': 'round',
        'line-cap': 'round',
      },
      paint: {
        'line-color': '#a3a3a3',
        'line-width': 0.5,
      },
    },
    {
      id: 'countries',
      type: 'fill',
      source: {
        type: 'vector',
        tiles: [
          'http://localhost:8181/api/map/mbtiles/{z}/{x}/{y}.pbf',
        ],
        minzoom: 0,
        maxzoom: 19,
      },
      'source-layer': 'countries',
      paint: {
        'fill-color': {
          property: 'ISO_A3',
          type: 'categorical',
          default: '#c6c6c6',
          stops: [
            ['RUS', '#4fb4e2'],
            ['IND', '#f1f075'],
            ['DZA', '#f28cb1'],
          ],
        },
        'fill-opacity': 0.8,
      },
      filter: [
        'all',
        ['!=', 'ISO_A3', ''],
        ['in', 'ISO_A3', 'RUS', 'IND', 'DZA'],
      ],

    },
  ],
};

export default translate()(MapGL);
