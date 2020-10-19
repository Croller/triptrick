/* eslint-disable */
import * as turf from '@turf/turf';

const doubleClickZoom = {
  enable(ctx) {
    setTimeout(() => {
      if (!ctx.map || !ctx.map.doubleClickZoom || !ctx._ctx || !ctx._ctx.store || !ctx._ctx.store.getInitialConfigValue) return;
      if (!ctx._ctx.store.getInitialConfigValue('doubleClickZoom')) return;
      ctx.map.doubleClickZoom.enable();
    }, 0);
  },
  disable(ctx) {
    setTimeout(() => {
      if (!ctx.map || !ctx.map.doubleClickZoom) return;
      ctx.map.doubleClickZoom.disable();
    }, 0);
  }
};

let ctrlKeyDown = null;
let objClosest = {
  distance: null,
  coords: null
};

const DrawPolygonCustom = {
  onSetup: function(opts) {
    const polygon = this.newFeature({
      type: "Feature",
      properties: {},
      geometry: {
        type: "Polygon",
        coordinates: [[]]
      }
    });
    this.addFeature(polygon);

    this.clearSelectedFeatures();
    doubleClickZoom.disable(this);
    this.updateUIClasses({  mouse: "add" });
    this.setActionableState({
      trash: true
    });
    return {
      polygon,
      currentVertexPosition: 0
    };
  },

  clickAnywhere: function(state, e) {
    if (state.currentVertexPosition > 0 && this.isEventAtCoordinates(e, state.polygon.coordinates[0][state.currentVertexPosition - 1])) {
      return this.changeMode("simple_select", { featureIds: [state.polygon.id] });
    }
    this.updateUIClasses({ mouse: "add" });
    if (ctrlKeyDown) {
      const getpXY3 = this.calculatepXY3(state, e, true);
      if (getpXY3) {
        ctrlKeyDown = false;
        state.polygon.updateCoordinate(`0.${state.currentVertexPosition}`, getpXY3[0], getpXY3[1]);
        state.currentVertexPosition++;
      }
    } else if (objClosest.coords) {
      state.polygon.updateCoordinate(`0.${state.currentVertexPosition}`, objClosest.coords[0], objClosest.coords[1]);
      state.currentVertexPosition++;
    } else {
      state.polygon.updateCoordinate(`0.${state.currentVertexPosition}`, e.lngLat.lng, e.lngLat.lat);
      state.currentVertexPosition++;
      state.polygon.updateCoordinate(`0.${state.currentVertexPosition}`, e.lngLat.lng, e.lngLat.lat);  
    }
  },

  clickOnVertex: function(state) {
    return this.changeMode("simple_select");
  },

  isVertex: function(e) {
    const featureTarget = e.featureTarget;
    if (!featureTarget) return false;
    if (!featureTarget.properties) return false;
    return featureTarget.properties.meta === "vertex";
  },

  isEventAtCoordinates: function(e, coordinates) {
    if (!e.lngLat) return false;
    return e.lngLat.lng === coordinates[0] && e.lngLat.lat === coordinates[1];
  },

  onMouseMove: function(state, e) {
    if (this.isVertex(e)) {
      this.updateUIClasses({ mouse: "pointer"});
    }

    if (window.snapMapDraw) {
      const { type, distance } = window.snapMapDraw;
      this.getSnap(state, e, type, distance);
    }

    if (ctrlKeyDown) {
      const getpXY3 = this.calculatepXY3(state, e, true);
      if (getpXY3) {
        state.polygon.updateCoordinate(`0.${state.currentVertexPosition}`, getpXY3[0], getpXY3[1]);
      }
    } else {
      state.polygon.updateCoordinate(`0.${state.currentVertexPosition}`, e.lngLat.lng, e.lngLat.lat);
    }
  },

  onClick: function(state, e) {
    if (this.isVertex(e)) return this.clickOnVertex(state, e);
    return this.clickAnywhere(state, e);
  },

  onKeyDown: function(state, e) {
    if (e.keyCode === 17) {
      ctrlKeyDown = true;
    }
  },

  onKeyUp: function(state, e) {
    if (e.keyCode === 17) {
      ctrlKeyDown = false;
    }
    if (e.keyCode === 13) {
      this.changeMode("simple_select", { featureIds: [state.polygon.id] });
    } else if (e.keyCode === 27) {
      this.deleteFeature([state.polygon.id], { silent: true });
      this.changeMode("simple_select");
    }
  },

  onStop: function(state) {
    this.updateUIClasses({ mouse: "none" });
    doubleClickZoom.enable(this);
    this.activateUIButton();

    if (this.getFeature(state.polygon.id) === undefined) return;

    state.polygon.removeCoordinate(`0.${state.currentVertexPosition}`);
    if (state.polygon.isValid()) {
      this.map.fire("draw.create", {
        features: [state.polygon.toGeoJSON()]
      });
    } else {
      this.deleteFeature([state.polygon.id], { silent: true });
      this.changeMode("simple_select", {}, { silent: true });
    }
  },

  toDisplayFeatures: function(state, geojson, display) {
    const isActivePolygon = geojson.properties.id === state.polygon.id;
    geojson.properties.active = isActivePolygon ? "true" : "false";
    if (!isActivePolygon) return display(geojson);

    if (objClosest.coords) {
      const { type, distance } = window.snapMapDraw;
      const obj = turf.circle(
        objClosest.coords,
        this.getRadius(objClosest.coords, distance),
        {
          steps: 30,
          units: 'kilometers',
        }
      )
      display({
        type: "Feature",
        properties: geojson.properties,
        geometry: {...obj.geometry}
      });
    };

    if (geojson.geometry.coordinates.length === 0) return;

    const coordinateCount = geojson.geometry.coordinates[0].length;

    if (coordinateCount < 3) {
      return;
    }
    geojson.properties.meta = "Feature";
    display(this.createVertex(state.polygon.id, geojson.geometry.coordinates[0][0], '0.0', false));
    if (coordinateCount > 3) {
      const endPos = geojson.geometry.coordinates[0].length - 3;
      display(this.createVertex(state.polygon.id, geojson.geometry.coordinates[0][endPos], `0.${endPos}`, false));
    }
    if (coordinateCount <= 4) {
      const lineCoordinates = [
        [geojson.geometry.coordinates[0][0][0], geojson.geometry.coordinates[0][0][1]], [geojson.geometry.coordinates[0][1][0], geojson.geometry.coordinates[0][1][1]]
      ];
      display({
        type: "Feature",
        properties: geojson.properties,
        geometry: {
          coordinates: lineCoordinates,
          type: "LineString"
        }
      });
      if (coordinateCount === 3) {
        return;
      }
    }
    
    return display(geojson);
  },

  onTrash: function(state) {
    this.deleteFeature([state.polygon.id], {
      silent: true
    });
    this.changeMode("simple_select");
  },

  createVertex: function(parentId, coordinates, path, selected) {
    return {
      type: "Feature",
      properties: {
        meta: "vertex",
        parent: parentId,
        coord_path: path,
        active: (selected) ? "ture" : "false"
      },
      geometry: {
        type: "Point",
        coordinates: coordinates
      }
    }
  },

  deegrees2meters(px) {
    const x = px[0] * 20037508.34 / 180;
    let y = Math.log(Math.tan((90 + px[1]) * Math.PI / 360)) / (Math.PI / 180);
    y = y * 20037508.34 / 180;
    return [x, y]
  },

  meters2degress(px) {
    const lon = px[0] * 180 / 20037508.34;
    const lat = Math.atan(Math.exp(px[1] * Math.PI / 20037508.34)) * 360 / Math.PI - 90;
    return [lon, lat]
  },

  calculateOrientedAnglePolygon: function(state) {
    const pXY0 = state.polygon.getCoordinate("0.0");
    const pXY0_3857 = this.deegrees2meters(pXY0);
    const pXY1 = state.polygon.getCoordinate("0.1");
    const pXY1_3857 = this.deegrees2meters(pXY1);
    const angleStdGraus = Math.atan2(pXY1_3857[1] - pXY0_3857[1], pXY1_3857[0] - pXY0_3857[0]) * 180 / Math.PI;

    let angleSudGraus = -1.0 * (angleStdGraus + 90);
    const angle = angleSudGraus < 0 ? angleSudGraus + 360 : angleSudGraus;

    state.angle = parseFloat((angle).toFixed(2));

  },

  calculatepXY3: function(state, e, tmp) {
    const coordinates = state.polygon.getCoordinates()[0]
    const pXY0 = state.polygon.getCoordinate(`0.${coordinates.length - 4}`);
    const pXY0_3857 = this.deegrees2meters(pXY0);
    const pXY1 = state.polygon.getCoordinate(`0.${coordinates.length - 3}`);
    const pXY1_3857 = this.deegrees2meters(pXY1);
    let pXY2_3857 = this.deegrees2meters([e.lngLat.lng, e.lngLat.lat]);
    const mouse_3857 = this.deegrees2meters([e.lngLat.lng, e.lngLat.lat]);

    if (pXY0_3857[0] === pXY1_3857[0]) {
      pXY2_3857 = [mouse_3857[0], pXY1_3857[1]];
    } else if (pXY0_3857[1] === pXY1_3857[1]) {
      pXY2_3857 = [pXY1_3857[0], mouse_3857[1]];
    } else {
      const vector1_3857 = (pXY1_3857[1] - pXY0_3857[1]) / (pXY1_3857[0] - pXY0_3857[0]);
      const vector2_3857 = -1.0 / vector1_3857;
      if (Math.abs(vector2_3857) < 1) {
        pXY2_3857[1] = vector2_3857 * (mouse_3857[0] - pXY1_3857[0]) + pXY1_3857[1];
      }
      else {
        pXY2_3857[0] = pXY1_3857[0] + (pXY2_3857[1] - pXY1_3857[1]) / vector2_3857;
      }
    }

    const pXY2G = this.meters2degress(pXY2_3857);
    return pXY2G;
  },

  distancePix: function(px0, px1) {
    return Math.sqrt((px0[0] - px1[0]) ** 2 + (px0[1] - px1[1]) ** 2);
  },

  getRadius: function(coords, distance) {
    const coordsToPx = this.map.project(coords);
    const pxToCoords = this.map.unproject([coordsToPx.x, coordsToPx.y + distance]);
    var options = { units: 'kilometers' };
    return turf.distance(turf.point(coords), turf.point([pxToCoords.lng, pxToCoords.lat]), options);
  },

  getSnap: function(state, e, type, value) {
    // console.log({...this._ctx.store.sources});
    const features = this._ctx.store.sources.cold;
    const featuresFilterd = features.filter((f) => f.properties.id !== 'snap_detector');
    objClosest = {
      distance: null,
      coords: null
    };
    if (features.length > 0) {
      if (type === 'vertex') {
        featuresFilterd.forEach((feature) => {
          const { type, coordinates } = feature.geometry;
          let coordinatesAnalyse = [];
          if (type === 'Polygon' && coordinates[0][0] !== null) {
            coordinatesAnalyse = [...coordinates[0]];
          }
          if (type === 'LineString') {
            coordinatesAnalyse = [...coordinates];
          }
          if (type === 'Point') {
            coordinatesAnalyse = [coordinates];
          }
          if (coordinatesAnalyse.length > 0) {
            coordinatesAnalyse.forEach((coords) => {
              if (coords) {
                const m = this.map.project([e.lngLat.lng, e.lngLat.lat]);
                const c = this.map.project(coords);
                const distance = this.distancePix([m.x, m.y], [c.x, c.y]);
                if (distance >= 0 && distance <= value) {
                  objClosest = { distance, coords };
                }
              }
            });
          }
        });
      }
      if (type === 'edge') {
        const coordsCurrent = turf.point([e.lngLat.lng, e.lngLat.lat]);
        featuresFilterd.forEach((feature) => {
          const { type, coordinates } = feature.geometry;
          let coordinatesAnalyse = [];
          if (type === 'Polygon' || type === 'LineString') {
            if (type === 'Polygon' && coordinates[0][0] !== null) {
              coordinatesAnalyse = [...coordinates[0]];
            }
            if (type === 'LineString') {
              coordinatesAnalyse = [...coordinates];
            }
            coordinatesAnalyse.forEach((c, i) => {
              if (coordinatesAnalyse.length - 1 > i) {
                const lineAnalyse = turf.lineString([coordinatesAnalyse[i], coordinatesAnalyse[i + 1]]);
                const coords = turf.nearestPointOnLine(lineAnalyse, coordsCurrent, { units: 'radians' }).geometry.coordinates
                const m = this.map.project([e.lngLat.lng, e.lngLat.lat]);
                const c = this.map.project(coords);
                const distance = this.distancePix([m.x, m.y], [c.x, c.y]);
                if (distance >= 0 && distance <= value) {
                  objClosest = { distance, coords: coords };
                }
              }
            });
          }
        });
      }
    }
  }
};

export default DrawPolygonCustom;