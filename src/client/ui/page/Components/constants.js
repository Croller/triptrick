export const CHECKBOX_DATA = [
  { id: 1, name: 'CheckBox 1' },
  { id: 2, name: 'CheckBox 2' },
  { id: 3, name: 'CheckBox 3' },
];

export const RADIO_DATA = [
  { id: 1, name: 'Radio 1' },
  { id: 2, name: 'Radio 2' },
  { id: 3, name: 'Radio 3' },
];

export const SELECTED_DATA = [
  { id: 1, name: 'Option 1' },
  { id: 4, name: 'Option 4' },
];

export const SELECT_DATA = [
  { id: 1, name: 'Option 1' },
  { id: 2, name: 'Option 2' },
  { id: 3, name: 'Option 3' },
  { id: 4, name: 'Option 4' },
  { id: 5, name: 'Option 5' },
];

export const MAP_LAYERS_DATA = [
  {
    type: 'FeatureCollection',
    properties: {
      id: 'DDD',
      type: 'geojson',
      options: {
        is_visible: true,
      },
    },
    features: [
      {
        type: 'Feature',
        properties: {
          uuid: '22323232acacewvevwv',
          id: '22323232acacewvevwv',
          name: 'test_1',
          test: null,
          arr: [0, 0],
        },
        geometry: {
          coordinates: [[[-350.4880733462305, 53.0517391574231], [-252.7536983462298, 53.0517391574231], [-252.7536983462298, 29.741426474348657], [-350.4880733462305, 29.741426474348657], [-350.4880733462305, 53.0517391574231]]],
          type: 'Polygon',
        },
      },
      {
        type: 'Feature',
        properties: {
          uuid: '22323232acadwwccewvevwv',
          id: '22323232acacewwdwdqdvevwv',
          name: 'test_2',
          test: null,
          arr: [0, 0],
        },
        geometry: {
          coordinates: [[[-290.64968750000463, 63.23362856183911], [-270.2590625000045, 63.23362856183911], [-270.2590625000045, 57.70414859810333], [-290.64968750000463, 57.70414859810333], [-290.64968750000463, 63.23362856183911]]],
          type: 'Polygon',
        },
      },
    ],
  },
];
