/* eslint-disable no-underscore-dangle */
import React, { useState, useEffect, useRef } from 'react';
import * as turf from '@turf/turf';
import 'mapbox-gl/dist/mapbox-gl.css';
import '@mapbox/mapbox-gl-draw/dist/mapbox-gl-draw.css';
import * as mapGL from 'mapbox-gl';
import MapboxDraw from '@mapbox/mapbox-gl-draw';
import DrawRectangle from 'mapbox-gl-draw-rectangle-mode';
import {
  DrawAssistedRectangle,
  DrawPointCustom,
  DrawLinePencil,
  DrawLineCustom,
  DrawPolygonPencil,
  DrawPolygonCustom,
  getScale,
  getJson,
  getPaintLayer,
  setDrawMode,
  paintFeature,
  paintDraw,
} from './utils';
import {
  Wrapper,
  Scale,
  Coordinates,
} from './styled';

export const Map = ({
  height = '100%',
  width = '100%',
  mode = null,
  layers = null,
  onClick = () => {},
  onCreate = () => {},
  className = '',
}) => {
  const ref = useRef(null);
  const snapValue = 8;
  const [map, setMap] = useState(null);
  const [draw, setDraw] = useState(null);
  const [isLoad, setIsLoad] = useState(false);
  const [isDrawing, setIsDrawing] = useState(false);
  const [isMesuaring, setIsMesuaring] = useState(false);
  const [snapMode, setSnapMode] = useState(null);
  const [coords, setCoords] = useState({ x: 0, y: 0 });
  const [scale, setScale] = useState(0);

  const config = {
    token: process.env.REACT_APP_MAPBOX_TOKEN,
    init: {
      container: 'mapbox',
      style: 'mapbox://styles/croller/cjj8xkmu73qh32snzotqzhsdj',
      zoom: 2,
      center: [98.530, 58.810],
      minZoom: 0,
      doubleClickZoom: false,
      dragPan: true,
      dragRotate: false,
      preserveDrawingBuffer: true,
    },
  };

  const getCoords = (e) => ({ x: e.lngLat.lat, y: e.lngLat.lng });

  const getLayer = (e, substr = 'layer') => map.queryRenderedFeatures(e.point)
    .filter(f => f.layer.id.indexOf(substr) > -1)
    .map((feature) => getJson(feature, turf));

  const setMapStyle = (conf) => {
    if (!conf) return null;
    map.setStyle(conf);
  };

  const setZoomTo = (arr) => {
    console.log(turf.featureCollection(arr));
    if (!arr) return null;
    try {
      const bounds = turf.bbox(turf.featureCollection(arr));
      map.fitBounds(bounds, {
        padding: {
          top: 150,
          bottom: 150,
          left: 200,
          right: 200,
        },
      });
    } catch (e) {
      throw e;
    }
  };

  const setLayers = (arr) => {
    if (!arr || arr.length === 0) return null;
    getPaintLayer(arr, paintFeature).forEach((layer, i) => {
      const { id } = layer;
      const prevLayerName = i !== 0 ? id : '';
      const source = map.getSource(id);
      if (map.getLayer(id) || source) {
        source.setData(layer.source.data);
      } else {
        map.addLayer(layer, layer.layerBefore === '' ? prevLayerName : layer.layerBefore);
        map.setLayoutProperty(id, 'visibility', layer.is_visible ? 'visible' : 'none');
        map.on('mousemove', id, () => {
          map.getCanvas().style.cursor = 'pointer';
        });
        map.on('mouseleave', id, () => {
          map.getCanvas().style.cursor = '';
        });
      }
    });
    // setZoomTo(arr.reduce((all, colletion) => [...all, ...colletion.features], []));
  };

  const deleteLayers = (arr) => {
    if (arr === null || arr.length !== 0 || map.getStyle()) return null;
    arr.forEach((layer) => {
      const { id } = layer;
      const layerOnMap = map.getStyle().layers.filter(f => f.id.indexOf(id) === 0);
      if (layerOnMap.length > 0) {
        layerOnMap.forEach((lo) => {
          map.removeLayer(lo.id);
          map.removeSource(lo.id);
        });
        map.resize();
      }
    });
  };

  const mapLoad = () => {
    setTimeout(() => {
      map.resize();
      setScale(getScale(map, turf));
      setLayers(layers);
    }, 1500);
  };

  const mapOn = () => {
    map.on('load', () => {
      setIsLoad(true);
    });
    map.on('styledata', () => {
      setIsLoad(true);
    });
    map.on('click', (e) => {
      if (mode !== null) return null;
      onClick({
        coordinates: getCoords(e),
        layers: getLayer(e),
      });
      // window.console.log(map.getStyle().sources);
      // window.console.log(map.getStyle().layers);
    });
    map.on('mousemove', (e) => {
      setCoords(getCoords(e));
      // if (isMesuaring) {
      //   onMesuare(true);
      // }
    });
    map.on('contextmenu', () => {
      if (isDrawing) {
        // this.setTool({ type: 'deleteLastPoint' });
      }
    });
    map.on('moveend', () => {
      // window.console.log(map.getStyle().sources);
      // window.console.log(map.getStyle().layers);
    });
    map.on('wheel', () => {
      setScale(getScale(map, turf));
    });
    map.on('draw.create', (e) => {
      // setDraw(setDrawMode(draw));
      onCreate(e.features.map((feature) => getJson(feature, turf)));
      onCreate(JSON.stringify(e.features.map((feature) => getJson(feature, turf))));
    });
    map.on('draw.update', (e) => {
      onCreate(e.features.map((feature) => getJson(feature, turf)));
    });
  };

  useEffect(() => {
    mapGL.accessToken = config.token;
    setMap(new mapGL.Map({ ...config.init }));
  }, []);

  useEffect(() => {
    if (map) {
      const initDraw = new MapboxDraw({
        displayControlsDefault: false,
        controls: {},
        styles: paintDraw,
        modes: {
          ...MapboxDraw.modes,
          draw_point_custom: DrawPointCustom,
          draw_line_string_pencil: DrawLinePencil,
          draw_line_string_custom: DrawLineCustom,
          draw_polygon_custom: DrawPolygonCustom,
          draw_polygon_pencil: DrawPolygonPencil,
          draw_rectangle: DrawRectangle,
          draw_rectangle_assisted: DrawAssistedRectangle,
        },
      });
      if (map._controls.length === 2) {
        map.addControl(initDraw);
        setDraw(initDraw);
        console.log('set');
      }
      mapOn();
    }
  }, [map]);
  
  useEffect(() => {
    if (isLoad && draw) {
      setDraw(setDrawMode(draw, mode));
    }
  }, [isLoad, mode]);

  useEffect(() => {
    if (isLoad) {
      mapLoad();
    }
  }, [isLoad, layers]);

  return (
    <Wrapper
      id="mapbox"
      height={height}
      width={width}
      className={`t-map ${className}`}
    >
      <Coordinates>{`X: ${coords.x.toFixed(6)} Y: ${coords.y.toFixed(6)}`}</Coordinates>
      <Scale>{`М 1:${scale}`}</Scale>
    </Wrapper>
  );
};
