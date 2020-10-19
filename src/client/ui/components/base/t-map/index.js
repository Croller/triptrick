import React, { useState, useEffect } from 'react';
import * as turf from '@turf/turf';
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
} from './utils';
import 'mapbox-gl/dist/mapbox-gl.css';
import '@mapbox/mapbox-gl-draw/dist/mapbox-gl-draw.css';
import {
  Wrapper,
  Scale,
  Coordinates,
} from './styled';

export const Map = ({
  height = '100%',
  width = '100%',
  toolMode = null,
  className = '',
}) => {
  const snapValue = 8;
  const [map, setMap] = useState(null);
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
  // const handleSubmit = (e) => {
  //   e.preventDefault();
  //   onSubmit();
  // };

  const mapLoad = () => {
    map.resize();
    setScale(getScale(map, turf));
  };

  const mapEvent = () => {
    map.on('load', () => {
      setIsLoad(true);
    });
    map.on('styledata', () => {
      setIsLoad(true);
    });
    map.on('click', () => {
      // get all layer by coordinates and emit event
      // if (!isDrawing) {
      //   mapClick(onClick(e));
      // }
      // setSubstrateShow(false);
      // if (isMesuaring) {
      //   onMesuare();
      // }
      // window.console.log(map.getStyle().sources);
      // window.console.log(map.getStyle().layers);
    });
    map.on('mousemove', (e) => {
      setCoords({ x: e.lngLat.lat, y: e.lngLat.lng });
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
    map.on('draw.create', () => {

    });
    map.on('draw.update', () => {
      // window.console.log(e);
    });
  };

  useEffect(() => {
    mapGL.accessToken = config.token;
    setMap(new mapGL.Map(config.init));
  }, []);

  useEffect(() => {
    if (map) {
      // map event
      mapEvent();
      // add dram func with modes
      const draw = new MapboxDraw({
        displayControlsDefault: false,
        controls: {},
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
      map.addControl(draw);
      // add listner
      const that = this;
      window.addEventListener('keydown', (e) => {
        switch (true) {
          case e.keyCode === 27:
            that.setTool({ type: 'cancel' });
            break;
          case e.keyCode === 46:
            that.setTool({ type: 'delete' });
            break;
          default:
            break;
        }
      });
    }
  }, [map]);

  // useEffect(() => {
  //   if (toolMode) {
  //     setTool(toolMode);
  //   }
  // }, [toolMode]);

  useEffect(() => {
    if (isLoad) {
      mapLoad();
    }
  }, [isLoad]);

  return (
    <Wrapper
      id="mapbox"
      height={height}
      width={width}
      className={`t-map ${className}`}
    >
      <Scale>{`1 : ${scale}`}</Scale>
      <Coordinates>{`${coords.x.toFixed(6)} ${coords.y.toFixed(6)}`}</Coordinates>
    </Wrapper>
  );
};
