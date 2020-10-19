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

const DrawLinePencil = {
  onSetup: function (opts) {
    const line = this.newFeature({
      type: "Feature",
      properties: {},
      geometry: {
        type: "LineString",
        coordinates: []
      }
    });
    this.addFeature(line);
    this.clearSelectedFeatures();
    doubleClickZoom.disable(this);
    this.updateUIClasses({
      mouse: "add"
    });
    this.setActionableState({
      trash: true
    });
    return {
      line,
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
    state.line.updateCoordinate(state.currentVertexPosition, e.lngLat.lng, e.lngLat.lat);
    state.currentVertexPosition++;
  },
  onMouseUp: function (state) {
    dragPan.enable(this);
    this.changeMode("simple_select", {}, {
      silent: true
    });
  },


  toDisplayFeatures: function (state, geojson, display) {
    const isActiveLine = geojson.properties.id === state.line.id;
    geojson.properties.active = isActiveLine ? "true" : "false";
    if (!isActiveLine) return display(geojson);
    return display(geojson);
  },
  onTrash: function (state) {
    this.deleteFeature([state.line.id], {
      silent: true
    });
    this.changeMode("simple_select");
  },
  onStop: function (state) {
    doubleClickZoom.enable(this);
    this.activateUIButton();
  
    // check to see if we've deleted this feature
    if (this.getFeature(state.line.id) === undefined) return;
  
    // remove last added coordinate
    state.line.removeCoordinate(`${state.currentVertexPosition}`);
    if (state.line.isValid()) {
      this.map.fire("draw.create", {
        features: [state.line.toGeoJSON()]
      });
    } else {
      this.deleteFeature([state.line.id], { silent: true });
      this.changeMode("simple_select", {}, { silent: true });
    }
  },
};

export default DrawLinePencil;