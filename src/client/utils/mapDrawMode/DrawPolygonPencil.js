/* eslint-disable */
const doubleClickZoom = {
  enable: ctx => {
    setTimeout(() => {
      if (
        !ctx.map ||
        !ctx.map.doubleClickZoom ||
        !ctx._ctx ||
        !ctx._ctx.store ||
        !ctx._ctx.store.getInitialConfigValue
      )
        return;
      if (!ctx._ctx.store.getInitialConfigValue("doubleClickZoom")) return;
      ctx.map.doubleClickZoom.enable();
    }, 0);
  },
  disable: (ctx) => {
    setTimeout(() => {
      if (!ctx.map || !ctx.map.doubleClickZoom) return;
      ctx.map.doubleClickZoom.disable();
    }, 0);
  }
};

const dragPan = {
  enable: (ctx) => {
    setTimeout(() => {
      if (!ctx.map || !ctx.map.dragPan) return;
      ctx.map.dragPan.enable();
    }, 0);
  },
  disable: (ctx) => {
    setTimeout(() => {
      if (!ctx.map || !ctx.map.dragPan) return;
      ctx.map.dragPan.disable();
    }, 0);
  }
}

const DrawPolygonPencil = {
  onSetup: function (opts) {
    const polygon = this.newFeature({
      type: "Feature",
      properties: {},
      geometry: {
        type: "Polygon",
        coordinates: [
          []
        ]
      }
    });
    this.addFeature(polygon);
    this.clearSelectedFeatures();
    doubleClickZoom.disable(this);
    this.updateUIClasses({
      mouse: "add"
    });
    this.setActionableState({
      trash: true
    });
    return {
      polygon,
      currentVertexPosition: 0
    };
  },

  onTap: function (state, e) {
    this.onMouseDown(state, e);
  },
  onTouchMove: function (state) {
    this.onDrag(state);
  },
  onTouchEnd: function (state) {
    this.onMouseUp(state);
  },
  onMouseDown: function (state, e) {
    dragPan.disable(this);
  },
  onDrag: function (state, e) {
    this.updateUIClasses({
      mouse: "add"
    });
    state.polygon.updateCoordinate(`0.${state.currentVertexPosition}`, e.lngLat.lng, e.lngLat.lat);
    state.currentVertexPosition++;
  },
  onMouseUp: function (state) {
    dragPan.enable(this);
    this.changeMode("simple_select", {}, {
      silent: true
    });
  },

  toDisplayFeatures: function (state, geojson, display) {
    const isActiveLine = geojson.properties.id === state.polygon.id;
    geojson.properties.active = isActiveLine ? "true" : "false";
    if (!isActiveLine) return display(geojson);

    if (geojson.geometry.coordinates.length === 0) return;
    const coordinateCount = geojson.geometry.coordinates[0].length;
    if (coordinateCount < 3) {
      return;
    }
    return display(geojson);
  },
  onTrash: function (state) {
    this.deleteFeature([state.polygon.id], {
      silent: true
    });
    this.changeMode("simple_select");
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
};

export default DrawPolygonPencil;