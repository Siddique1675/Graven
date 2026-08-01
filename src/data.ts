import { BeatData, DrawingProject } from './types';

export const BEATS_DATA: BeatData[] = [
  {
    id: 'sheet',
    kicker: '01 · THE SHEET',
    heading: 'A blank field.',
    sub: 'It starts with nothing but a border and a title block — the whole object still only an intention.',
    specs: [
      { label: 'SIZE', value: 'A1' },
      { label: 'MEDIUM', value: 'vellum' },
      { label: 'MARKS', value: '0' },
    ],
    progressRange: [0.06, 0.28],
    position: 'left',
  },
  {
    id: 'frame',
    kicker: '02 · THE FRAME',
    heading: 'Lines find their order.',
    sub: 'Construction lines lay down the geometry — axes, centres, and the bones the drawing will hang on.',
    specs: [
      { label: 'AXES', value: '3' },
      { label: 'TOLERANCE', value: '±0.1mm' },
      { label: 'PROJECTION', value: 'first-angle' },
    ],
    progressRange: [0.30, 0.52],
    position: 'right',
  },
  {
    id: 'section',
    kicker: '03 · THE SECTION',
    heading: 'Cut it open.',
    sub: 'A section reveals the inside — hatching, wall thickness, and how every part meets the next.',
    specs: [
      { label: 'CUT', value: 'A–A' },
      { label: 'HATCH', value: '45°' },
      { label: 'WALL', value: '2.4mm' },
    ],
    progressRange: [0.54, 0.76],
    position: 'left',
  },
  {
    id: 'build',
    kicker: '04 · THE BUILD',
    heading: 'Ready to make.',
    highlightWord: 'make',
    sub: 'Fully dimensioned, checked, and signed. The line becomes a thing you can hold.',
    specs: [
      { label: 'STATUS', value: 'released' },
      { label: 'CHECKED', value: 'yes' },
      { label: 'SHEETS', value: '6' },
    ],
    progressRange: [0.78, 1.00],
    position: 'center',
  },
];

export const STUDIO_PROJECTS: DrawingProject[] = [
  {
    id: 'proj-01',
    sheetNo: 'DW-704-A',
    title: 'Monolith Precision Enclosure',
    category: 'Industrial Electronics',
    scale: '1:1.5',
    year: '2026',
    tolerance: '±0.05mm',
    description: 'Machined aerospace aluminum housing with continuous chamfered edge lines and thermal venting channels.',
    specs: {
      Material: '6061-T6 Aluminum',
      Finish: 'Matted Anodize #02',
      Fasteners: 'Flush M2.5 Torx',
      Mass: '420g',
    },
    details: [
      'Internal acoustic dampening cavity',
      'Dual-pass o-ring seal channel',
      'Laser-etched dimension markers',
    ],
  },
  {
    id: 'proj-02',
    sheetNo: 'DW-812-B',
    title: 'Kinetik Optical Mount Assembly',
    category: 'Precision Mechanics',
    scale: '2:1',
    year: '2025',
    tolerance: '±0.02mm',
    description: 'High-rigidity kinematically constrained optomechanical alignment stage for laser lab equipment.',
    specs: {
      Material: 'Grade 5 Titanium',
      Bearing: 'Ceramic Ball Contact',
      Adjustment: '0.25 Pitch Fine Thread',
      Mass: '185g',
    },
    details: [
      'Zero-backlash flexure joints',
      'Integrated wire EDM springs',
      'Hardened steel contact pads',
    ],
  },
  {
    id: 'proj-03',
    sheetNo: 'DW-901-C',
    title: 'Vapour-Phase Heat Exchanger',
    category: 'Thermodynamics',
    scale: '1:2',
    year: '2026',
    tolerance: '±0.10mm',
    description: 'Micro-channeled diffusion bonded cold plate design optimizing fluid velocity and delta T distribution.',
    specs: {
      Material: 'C10100 Oxygen-Free Copper',
      Bonding: 'Vacuum Diffusion',
      Pressure: '12 BAR Rated',
      Mass: '1,150g',
    },
    details: [
      '450 micro-skived cooling fins',
      'Symmetric inlet manifold split',
      'Pressure testing port ISO G1/4',
    ],
  },
];
