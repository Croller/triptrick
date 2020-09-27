import React, { useState, useEffect, useRef } from 'react';
import { translate } from 'react-i18next';
import PropTypes from 'prop-types';
import MapboxDraw from '@mapbox/mapbox-gl-draw';
import * as mapGL from 'mapbox-gl';
import * as turf from '@turf/turf';
import 'mapbox-gl/dist/mapbox-gl.css';
import '@mapbox/mapbox-gl-draw/dist/mapbox-gl-draw.css';
import DrawRectangle from 'mapbox-gl-draw-rectangle-mode';
// import {
//   CircleMode,
//   DragCircleMode,
//   DirectMode,
//   SimpleSelectMode
// } from 'mapbox-gl-draw-circle';
import {
  DrawAssistedRectangle,
  DrawPointCustom,
  DrawLinePencil,
  DrawLineCustom,
  DrawPolygonPencil,
  DrawPolygonCustom,
} from 'client/utils/mapDrawMode';
import { Map } from './styled';

export const MapGL = translate()((props) => {
  const {
    height = null,
    mapLayers,
    mapLoaded,
    mapClick,
    mapCreateFeature,
    mapLayersVisible,
    mapLayersUpdateSource,
    mapLayerDelete,
    toolMode,
    // showMouseCoords,
    // showScale,
    mapZoomTo,
    mapResize,
    className = '',
  } = props;
  const mapRef = useRef();
  const [mapLoad, setMapLoad] = useState(false);
  const [mapBox, setMapBox] = useState(null);
  const [mapDraw, setMapDraw] = useState(null);
  const [substrateShow, setSubstrateShow] = useState(false);
  const [mouseCoords, setMouseCoords] = useState([0, 0]);
  const [scale, setScale] = useState(0);
  const [isDrawing, setIsDrawing] = useState(false);
  const [isMesuaring, setIsMesuaring] = useState(false);
  const snapValue = 8;
  const [snapMode, setSnapMode] = useState(null);

  const mapConf = {
    token: 'pk.eyJ1IjoiY3JvbGxlciIsImEiOiJWX0ZXZF9zIn0.lIjITIfJ3v62baoHVIqtqQ',
    init: {
      container: 'mapbox',
      // style: 'mapbox://styles/croller/cjj8xkmu73qh32snzotqzhsdj',
      style: 'mapbox://styles/croller/ck3tsjkye0dgd1cp62vtxjc3f',
      zoom: 2,
      center: [98.530, 58.810],
      minZoom: 0,
      doubleClickZoom: false,
      dragPan: false,
      dragRotate: false,
      preserveDrawingBuffer: true,
    },
  };

  const getScaleStr = () => {
    const inchesPerMeter = 39.37;
    const screenDPI = 96.0;
    const bounds = mapBox.getBounds();
    const size = mapBox.getCanvas();
    // eslint-disable-next-line no-underscore-dangle
    const distance = turf.distance(turf.point([bounds._ne.lng, bounds._ne.lat]), turf.point([bounds._ne.lng, bounds._sw.lat]), { units: 'kilometers' });
    const scaleValue = Math.floor((Math.abs(distance * 1000) / size.width) * inchesPerMeter * screenDPI);
    return scaleValue;
  };
  const setSnapModes = (type, distance) => {
    if (snapMode && snapMode !== type) {
      setSnapMode(type);
    } else {
      setSnapMode(null);
    }
    window.snapMapDraw = {
      type,
      distance,
    };
  };
  const setTool = (mode) => {
    setIsDrawing(true);
    switch (mode) {
      case 'drawPoint':
        mapDraw.changeMode('draw_point_custom');
        break;
      case 'drawLine':
        mapDraw.changeMode('draw_line_string_custom');
        break;
      case 'drawLinePencil':
        mapDraw.changeMode('draw_line_string_pencil');
        break;
      case 'drawPolygon':
        mapDraw.changeMode('draw_polygon_custom');
        break;
      case 'drawPolygonPencil':
        mapDraw.changeMode('draw_polygon_pencil');
        break;
      case 'drawRectangle':
        mapDraw.changeMode('draw_rectangle');
        break;
      case 'drawRectangleAssisted':
        mapDraw.changeMode('draw_rectangle_assisted');
        break;
      case 'drawCircle':
        // надо ограничить масштаб, при зуме 18 карты, круг не круг
        mapDraw.changeMode('draw_circle', { initialRadiusInKm: (getScaleStr() / 100000).toFixed(6) });
        break;
      case 'snapVertex':
        setSnapModes('vertex', snapValue);
        break;
      case 'snapEdge':
        setSnapModes('edge', snapValue);
        break;
      case 'mesuareLine': {
        setIsMesuaring(true);
        mapDraw.deleteAll();
        this.popup = new mapBox.Popup({ closeOnClick: false });
        this.popup.on('close', () => {
          mapDraw.deleteAll();
        });
        mapDraw.changeMode('draw_line_string');
        break;
      }
      case 'mesuareArea': {
        setIsMesuaring(true);
        mapDraw.deleteAll();
        this.popup = new mapBox.Popup({ closeOnClick: false });
        this.popup.on('close', () => {
          mapDraw.deleteAll();
        });
        mapDraw.changeMode('draw_polygon');
        break;
      }
      case 'copyObj': {
        const { features } = mapDraw.getSelected();
        if (features.length > 0) {
          this.copyObjArr = [...features];
        }
        break;
      }
      case 'pasteObj': {
        if (this.copyObjArr.length > 0) {
          const { features } = mapDraw.getAll();
          mapDraw.set({
            type: 'FeatureCollection',
            features: [
              ...features,
              ...this.copyObjArr.map(cp => ({
                ...cp,
                id: `${cp.id}_copy`,
              })),
            ],
          });
        }
        break;
      }
      case 'cutObj': {
        const { features } = mapDraw.getSelected();
        const all = mapDraw.getAll().features;
        if (features.length > 0) {
          this.copyObjArr = features;
          mapDraw.set({
            type: 'FeatureCollection',
            features: all.filter(af => features.filter(ff => ff.id === af.id).length === 0),
          });
        }
        break;
      }
      case 'deleteObj': {
        const { features } = mapDraw.getSelected();
        const all = mapDraw.getAll().features;
        if (features.length > 0) {
          mapDraw.set({
            type: 'FeatureCollection',
            features: all.filter(af => features.filter(ff => ff.id === af.id).length === 0),
          });
        }
        break;
      }
      case 'drawStop': {
        mapDraw.changeMode('simple_select');
        mapDraw.deleteAll();
        break;
      }
      case 'drawClear': {
        mapDraw.changeMode('simple_select');
        mapDraw.deleteAll();
        break;
      }
      case 'deleteLastPoint': {
        if (mapDraw.getMode().indexOf('draw_') === 0 && mapDraw.getAll().features.length > 0) {
          const { features } = mapDraw.getAll();
          const newFeature = this.delLastCoords(features[features.length - 1]);
          features[features.length - 1] = newFeature;
          mapDraw.set({ type: 'FeatureCollection', features });
        }
        break;
      }
      default: {
        setIsDrawing(false);
        setIsMesuaring(false);
        break;
      }
    }
  };

  const onMesuare = (drawing = false) => {
    const { features } = mapDraw.getAll();
    if (features.length > 0) {
      const feature = features[features.length - 1];
      let coordinates = null;
      let lastText = '';
      let currText = '';
      if (feature.geometry.type === 'LineString') {
        // eslint-disable-next-line prefer-destructuring
        coordinates = feature.geometry.coordinates;
        if (coordinates.length > 1) {
          currText = `<html>${(turf.length(feature, { units: 'kilometers' }) * 100).toFixed(2)} м</html>`;
          if (!drawing && coordinates.length > 2) {
            const prevCoords = coordinates.filter((c, i) => i !== coordinates.length - 1);
            lastText = `<html>${(turf.length(turf.lineString(prevCoords), { units: 'kilometers' }) * 100).toFixed(2)} м</html>`;
            this.setPopUp(coordinates[coordinates.length - 2], lastText);
          }
          if (drawing) {
            this.popup
              .setLngLat(coordinates[coordinates.length - 1])
              .setHTML(currText)
              .addTo(mapBox);
          }
        }
      }
      if (feature.geometry.type === 'Polygon') {
        // eslint-disable-next-line prefer-destructuring
        coordinates = feature.geometry.coordinates;
        if (coordinates[0].length > 2) {
          currText = `<html>${turf.area(feature).toFixed(2)} м<sup>2</sup></html>`;
          if (!drawing && coordinates[0].length > 4) {
            const prevCoords = coordinates[0].filter((c, i) => i !== coordinates[0].length - 2);
            lastText = `<html>${turf.area(turf.polygon([prevCoords])).toFixed(2)} м</html>`;
            this.setPopUp(coordinates[0][coordinates[0].length - 3], lastText);
          }
          if (drawing) {
            this.popup
              .setLngLat(coordinates[0][coordinates[0].length - 2])
              .setHTML(currText)
              .addTo(mapBox);
          }
        }
      }
    }
  };

  const setZoomTo = (features) => {
    try {
      const bounds = turf.bbox(features);
      mapBox.fitBounds(bounds, {
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

  const setMapStyle = (item) => {
    mapBox.setStyle(item.layerConfig);
    this.eventMap();
  };

  const setLayers = (layers) => {
    if (layers !== null && layers.length !== 0) {
      layers.forEach((layer, i) => {
        if ('layerConfig' in layer) {
          const layerName = layer.layerConfig.id;
          if (mapBox.getLayer(layerName) === undefined && mapBox.getSource(layerName) === undefined) {
            let prevLayerName = '';
            if (layers.length > 0 && i > 0) {
              prevLayerName = layers[i - 1].layerConfig.id;
            } else {
              prevLayerName = '';
            }
            mapBox.addLayer(layer.layerConfig, layer.layerBefore === '' ? prevLayerName : layer.layerBefore);
            mapBox.setLayoutProperty(layerName, 'visibility', layer.is_visible ? 'visible' : 'none');
            mapBox.on('mousemove', layerName, () => {
              mapBox.getCanvas().style.cursor = 'pointer';
            });

            mapBox.on('mouseleave', layerName, () => {
              mapBox.getCanvas().style.cursor = '';
            });
            if (layer.layerConfig.source.type === 'geojson') {
              setZoomTo(layer.layerConfig.source.data);
            }
          }
        }
      });
    }
  };

  const setLayersVisibility = (layers) => {
    if (layers !== null && layers.length !== 0) {
      layers.forEach((layer) => {
        if ('id' in layer) {
          const layerName = layer.id;
          const layerOnMap = mapBox.getStyle().layers.filter(f => f.id.indexOf(layerName) === 0);
          if (layerOnMap.length > 0) {
            layerOnMap.forEach((lo) => {
              mapBox.setLayoutProperty(lo.id, 'visibility', layer.is_visible ? 'visible' : 'none');
            });
          }
        }
      });
    }
  };

  const updateLayersSource = (layers) => {
    if (layers !== null && layers.length !== 0) {
      layers.forEach((layer) => {
        if ('id' in layer) {
          const layerName = layer.id;
          const layerOnMap = mapBox.getStyle().layers.filter(f => f.id.indexOf(layerName) === 0);
          if (layerOnMap.length > 0) {
            layerOnMap.forEach((lo) => {
              const source = mapBox.getSource(lo.id);
              if (source.type === 'geojson') {
                mapBox.getSource(lo.id).setData(layer.source);
              }
            });
          }
        }
      });
    }
  };

  const deleteLayers = (layers) => {
    if (layers !== null && layers.length !== 0 && mapBox.getStyle()) {
      layers.forEach((layer) => {
        if ('id' in layer) {
          const layerName = layer.id;
          const layerOnMap = mapBox.getStyle().layers.filter(f => f.id.indexOf(layerName) === 0);
          if (layerOnMap.length > 0) {
            layerOnMap.forEach((lo) => {
              mapBox.removeLayer(lo.id);
              mapBox.removeSource(lo.id);
            });
            mapBox.resize();
          }
        }
      });
    }
  };

  const onMouseMove = (e) => {
    const coords = [e.lngLat.lat, e.lngLat.lng];
    // window.console.log(coords);
    return coords;
  };

  const onLoad = () => {
    mapBox.resize();
    setLayers(mapLayers);
    setScale(getScaleStr());
    // mapBox.addLayer({
    //   id: '1_DMap_layer',
    //   type: 'fill',
    //   source: {
    //     type: 'vector',
    //     tiles: [
    //       'http://192.168.1.196:8081/api/v1/Tiles?layerName=DMap&z=6&x=37&y=21&subtypes=17,18,6,7,19,8,5,9',
    //     ],
    //     minzoom: 5,
    //     maxzoom: 20
    //   },
    //   'source-layer': 'DMap',
    //   layout: {},
    //   paint: {
    //     'fill-color': '#8ea7ff',
    //     'fill-opacity': 0.3,
    //     'fill-outline-color': '#0F6DA5'
    //   },
    // });

    // mapBox.setFilter('DMap_layer', [
    //   'all',
    //   ['==', 'scale_ref', 6],
    // ]);
    // mapBox.setPaintProperty('DMap_layer', 'fill-color', {
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

  const onClick = (e) => {
    const layers = mapBox.queryRenderedFeatures(e.point).filter(f => f.layer.id.indexOf('_layer') > 0);
    return layers;
  };

  const mapOn = () => {
    mapBox.on('load', () => {
      setMapLoad(true);
      mapLoaded();
    });
    mapBox.on('styledata', () => {
      setMapLoad(true);
    });
    mapBox.on('click', (e) => {
      console.log(onClick(e));
      // get all layer by coordinates and emit event
      // if (!isDrawing) {
      //   mapClick(onClick(e));
      // }
      // setSubstrateShow(false);
      // if (isMesuaring) {
      //   onMesuare();
      // }
      // window.console.log(mapBox.getStyle().sources);
      // window.console.log(mapBox.getStyle().layers);
    });
    mapBox.on('mousemove', (e) => {
      // get all layer by coordinates and emit event
      setMouseCoords(onMouseMove(e));
      if (isMesuaring) {
        onMesuare(true);
      }
    });
    mapBox.on('contextmenu', () => {
      if (isDrawing) {
        this.setTool({ type: 'deleteLastPoint' });
      }
    });
    mapBox.on('moveend', () => {
      // window.console.log(mapBox.getStyle().sources);
      // window.console.log(mapBox.getStyle().layers);
    });
    mapBox.on('wheel', () => {
      setScale(getScaleStr());
    });
    mapBox.on('draw.create', (e) => {
      if (isMesuaring) {
        onMesuare(false);
        setIsMesuaring(false);
      }
      if (isDrawing) {
        setIsDrawing(false);
      }
      mapCreateFeature(e.features);
    });
    mapBox.on('draw.update', () => {
      if (isDrawing) {
        // сохранение в истории измененных объектов
        this.historyChangeSave();
      }
      // window.console.log(e);
    });
  };

  useEffect(() => {
    mapGL.accessToken = mapConf.token;
    const map = new mapGL.Map(mapConf.init);
    map.resize();
    setMapBox(map);
  }, []);

  useEffect(() => {
    if (mapBox) {
      mapOn();
    }
  }, [mapBox]);

  // useEffect(() => {
  //   if (toolMode) {
  //     setTool(toolMode);
  //   }
  // }, [toolMode]);

  // useEffect(() => {
  //   if (mapLoad) {
  //     onLoad();
  //   }
  // }, [mapLayers, mapLoad]);

  // useEffect(() => {
  //   if (mapZoomTo) {
  //     setZoomTo(mapZoomTo);
  //   }
  // }, [mapZoomTo]);

  // useEffect(() => {
  //   if (mapLayersVisible.length > 0) {
  //     setLayersVisibility(mapLayersVisible);
  //   }
  // }, [mapLayersVisible]);

  // useEffect(() => {
  //   if (mapLayersUpdateSource.length > 0) {
  //     updateLayersSource(mapLayersUpdateSource);
  //   }
  // }, [mapLayersUpdateSource]);

  // useEffect(() => {
  //   if (mapLayerDelete.length > 0) {
  //     deleteLayers(mapLayerDelete);
  //   }
  // }, [mapLayerDelete]);

  // useEffect(() => {
  //   if (mapBox) {
  //     mapBox.resize();
  //   }
  // }, [mapResize]);

  return (
    <Map id="mapbox" className={className} height={height} />
    // <div id="mapbox" style={{ height }}>
    //   {
    //     substrateShow && 'test'
    //   }
    //   {
    //     showMouseCoords && mouseCoords && (
    //       <div className="mouse-coordinates">
    //         {`x: ${mouseCoords[0].toFixed(6)} y: ${mouseCoords[1].toFixed(6)}`}
    //       </div>
    //     )
    //   }
    //   {
    //     showScale && (
    //       <div className="scale">
    //         {`Масштаб: 1 : ${scale}`}
    //       </div>
    //     )
    //   }
    // </div>
  );
});
