export const getScale = (map, turf, units) => {
  const inchesPerMeter = 39.37;
  const screenDPI = 96.0;
  const bounds = map.getBounds();
  const size = map.getCanvas();
  // eslint-disable-next-line no-underscore-dangle
  const distance = turf.distance(turf.point([bounds._ne.lng, bounds._ne.lat]), turf.point([bounds._ne.lng, bounds._sw.lat]), { units });
  const scaleValue = Math.floor((Math.abs(distance * 1000) / size.width) * inchesPerMeter * screenDPI);
  return scaleValue;
};

export const setDrawMode = (mode, map) => {
  switch (mode) {
    case 'drawPoint':
      map.changeMode('draw_point_custom');
      break;
    case 'drawLine':
      map.changeMode('draw_line_string_custom');
      break;
    case 'drawLinePencil':
      map.changeMode('draw_line_string_pencil');
      break;
    case 'drawPolygon':
      map.changeMode('draw_polygon_custom');
      break;
    case 'drawPolygonPencil':
      map.changeMode('draw_polygon_pencil');
      break;
    case 'drawRectangle':
      map.changeMode('draw_rectangle');
      break;
    case 'drawRectangleAssisted':
      map.changeMode('draw_rectangle_assisted');
      break;
    // case 'drawCircle':
    //   // надо ограничить масштаб, при зуме 18 карты, круг не круг
    //   map.changeMode('draw_circle', { initialRadiusInKm: (getScaleStr() / 100000).toFixed(6) });
    //   break;
    // case 'snapVertex':
    //   setSnapModes('vertex', snapValue);
    //   break;
    // case 'snapEdge':
    //   setSnapModes('edge', snapValue);
    //   break;
    // case 'mesuareLine': {
    //   setIsMesuaring(true);
    //   map.deleteAll();
    //   this.popup = new mapBox.Popup({ closeOnClick: false });
    //   this.popup.on('close', () => {
    //     map.deleteAll();
    //   });
    //   map.changeMode('draw_line_string');
    //   break;
    // }
    // case 'mesuareArea': {
    //   setIsMesuaring(true);
    //   map.deleteAll();
    //   this.popup = new mapBox.Popup({ closeOnClick: false });
    //   this.popup.on('close', () => {
    //     map.deleteAll();
    //   });
    //   map.changeMode('draw_polygon');
    //   break;
    // }
    case 'copyObj': {
      const { features } = map.getSelected();
      if (features.length > 0) {
        this.copyObjArr = [...features];
      }
      break;
    }
    case 'pasteObj': {
      if (this.copyObjArr.length > 0) {
        const { features } = map.getAll();
        map.set({
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
      const { features } = map.getSelected();
      const all = map.getAll().features;
      if (features.length > 0) {
        this.copyObjArr = features;
        map.set({
          type: 'FeatureCollection',
          features: all.filter(af => features.filter(ff => ff.id === af.id).length === 0),
        });
      }
      break;
    }
    case 'deleteObj': {
      const { features } = map.getSelected();
      const all = map.getAll().features;
      if (features.length > 0) {
        map.set({
          type: 'FeatureCollection',
          features: all.filter(af => features.filter(ff => ff.id === af.id).length === 0),
        });
      }
      break;
    }
    case 'drawStop': {
      map.changeMode('simple_select');
      map.deleteAll();
      break;
    }
    case 'drawClear': {
      map.changeMode('simple_select');
      map.deleteAll();
      break;
    }
    case 'deleteLastPoint': {
      if (map.getMode().indexOf('draw_') === 0 && map.getAll().features.length > 0) {
        const { features } = map.getAll();
        const newFeature = this.delLastCoords(features[features.length - 1]);
        features[features.length - 1] = newFeature;
        map.set({ type: 'FeatureCollection', features });
      }
      break;
    }
    default: {
      break;
    }
  }
};
