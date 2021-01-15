export const getScale = (draw, turf, units) => {
  const inchesPerMeter = 39.37;
  const screenDPI = 96.0;
  const bounds = draw.getBounds();
  const size = draw.getCanvas();
  // eslint-disable-next-line no-underscore-dangle
  const distance = turf.distance(turf.point([bounds._ne.lng, bounds._ne.lat]), turf.point([bounds._ne.lng, bounds._sw.lat]), { units });
  const scaleValue = Math.floor((Math.abs(distance * 1000) / size.width) * inchesPerMeter * screenDPI);
  return scaleValue;
};

export const getJson = (feature, turf) => {
  const { properties, geometry } = feature;
  const prop = Object.keys(properties).reduce((obj, key) => {
    let value = properties[key];
    if (typeof value === 'string') {
      if (value.indexOf('[') > -1) {
        value = eval(value);
      }
      if (value === 'null') {
        value = null;
      }
    }
    return { ...obj, [key]: value };
  }, {});
  return turf.feature(geometry, prop);
};

export const getPaintLayer = (arr, paints) => arr.reduce((edited, layer) => {
  const { properties, features } = layer;
  const { id, options } = properties;
  const typeLayer = properties.type || 'geojson';
  if (features.length > 0) {
    const { geometry } = features[0];
    const typePaint = geometry.type;
    const paint = paints[typeLayer][typePaint];
    const paintArr = paint.map((p) => {
      const layerObj = {
        ...p,
        ...options,
        id: `${id}_${p.id}`,
        source: {
          type: typeLayer,
          data: layer,
        },
      };
      if (typeLayer === 'vector') {
        layerObj['source-layer'] = `${id.split('_')[1]}`;
      }
      return layerObj;
    });
    return [...edited, ...paintArr];
  }
  return edited;
}, []);

export const setDrawMode = (draw, mode = 'drawEnd') => {
  switch (mode) {
    case 'drawPoint':
      draw.changeMode('draw_point_custom');
      break;
    case 'drawLine':
      draw.changeMode('draw_line_string_custom');
      break;
    case 'drawLinePencil':
      draw.changeMode('draw_line_string_pencil');
      break;
    case 'drawPolygon':
      draw.changeMode('draw_polygon_custom');
      break;
    case 'drawPolygonPencil':
      draw.changeMode('draw_polygon_pencil');
      break;
    case 'drawRectangle':
      draw.changeMode('draw_rectangle');
      break;
    case 'drawRectangleAssisted':
      draw.changeMode('draw_rectangle_assisted');
      break;
    // case 'drawCircle':
    //   // надо ограничить масштаб, при зуме 18 карты, круг не круг
    //   draw.changeMode('draw_circle', { initialRadiusInKm: (getScaleStr() / 100000).toFixed(6) });
    //   break;
    // case 'snapVertex':
    //   setSnapModes('vertex', snapValue);
    //   break;
    // case 'snapEdge':
    //   setSnapModes('edge', snapValue);
    //   break;
    // case 'mesuareLine': {
    //   setIsMesuaring(true);
    //   draw.deleteAll();
    //   this.popup = new drawBox.Popup({ closeOnClick: false });
    //   this.popup.on('close', () => {
    //     draw.deleteAll();
    //   });
    //   draw.changeMode('draw_line_string');
    //   break;
    // }
    // case 'mesuareArea': {
    //   setIsMesuaring(true);
    //   draw.deleteAll();
    //   this.popup = new drawBox.Popup({ closeOnClick: false });
    //   this.popup.on('close', () => {
    //     draw.deleteAll();
    //   });
    //   draw.changeMode('draw_polygon');
    //   break;
    // }
    case 'copyObj': {
      const { features } = draw.getSelected();
      if (features.length > 0) {
        this.copyObjArr = [...features];
      }
      break;
    }
    case 'pasteObj': {
      if (this.copyObjArr.length > 0) {
        const { features } = draw.getAll();
        draw.set({
          type: 'FeatureCollection',
          features: [
            ...features,
            ...this.copyObjArr.draw(cp => ({
              ...cp,
              id: `${cp.id}_copy`,
            })),
          ],
        });
      }
      break;
    }
    case 'cutObj': {
      const { features } = draw.getSelected();
      const all = draw.getAll().features;
      if (features.length > 0) {
        this.copyObjArr = features;
        draw.set({
          type: 'FeatureCollection',
          features: all.filter(af => features.filter(ff => ff.id === af.id).length === 0),
        });
      }
      break;
    }
    case 'deleteObj': {
      const { features } = draw.getSelected();
      const all = draw.getAll().features;
      if (features.length > 0) {
        draw.set({
          type: 'FeatureCollection',
          features: all.filter(af => features.filter(ff => ff.id === af.id).length === 0),
        });
      }
      break;
    }
    case 'drawEnd': {
      draw.changeMode('simple_select');
      break;
    }
    case 'drawClear': {
      draw.changeMode('simple_select');
      draw.deleteAll();
      break;
    }
    case 'deleteLastPoint': {
      if (draw.getMode().indexOf('draw_') === 0 && draw.getAll().features.length > 0) {
        const { features } = draw.getAll();
        const newFeature = this.delLastCoords(features[features.length - 1]);
        features[features.length - 1] = newFeature;
        draw.set({ type: 'FeatureCollection', features });
      }
      break;
    }
    default: {
      break;
    }
  }
  return draw;
};
