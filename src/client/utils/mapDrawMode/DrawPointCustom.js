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

let objClosest = {
  distance: null,
  coords: null
};

const DrawPointCustom = {
  onSetup: function() {
    const point = this.newFeature({
      type: "Feature",
      properties: {},
      geometry: {
        type: "Point",
        coordinates: []
      }
    });

    this.addFeature(point);
    this.clearSelectedFeatures();
    this.updateUIClasses({ mouse: "add" });
    this.activateUIButton("point");

    this.setActionableState({
      trash: true
    });

    return { point };
  },

  stopDrawingAndRemove: function(state) {
    this.deleteFeature([state.point.id], { silent: true });
    this.changeMode("simple_select");
  },

  onMouseMove: function (state, e) {
    if (window.snapMapDraw) {
      const { type, distance } = window.snapMapDraw;
      this.getSnap(state, e, type, distance);
    }
    state.point.updateCoordinate(state.currentVertexPosition, e.lngLat.lng, e.lngLat.lat);
  },

  onClick: function(state, e) {
    this.updateUIClasses({ mouse: "move" });

    if (objClosest.coords) {
      state.point.updateCoordinate('', objClosest.coords[0], objClosest.coords[1]);
    } else {
      state.point.updateCoordinate('', e.lngLat.lng, e.lngLat.lat);
    }
    this.map.fire("draw.create", {
      features: [state.point.toGeoJSON()]
    });
    this.changeMode("simple_select", { featureIds: [state.point.id] });
  },
  
  onStop: function(state) {
    this.activateUIButton();
    if (!state.point.getCoordinate().length) {
      this.deleteFeature([state.point.id], { silent: true });
    }
  },
  
  toDisplayFeatures: function(state, geojson, display) {
    const isActivePoint = geojson.properties.id === state.point.id;
    geojson.properties.active = (isActivePoint) ? "true" : "false";
    if (!isActivePoint) return display(geojson);

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
    }
    if (geojson.geometry.coordinates.length === 0) return;
  },
  
  onTrash: function (state) {
    this.stopDrawingAndRemove;
  },
  
  onKeyUp: function(state, e) {
    if (CommonSelectors.isEscapeKey(e) || CommonSelectors.isEnterKey(e)) {
      return this.stopDrawingAndRemove(state, e);
    }
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

export default DrawPointCustom;
