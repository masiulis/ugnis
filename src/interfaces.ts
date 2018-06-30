export enum FontSizeName {
  XS = 'XS',
  S = 'S',
  M = 'M',
  L = 'L',
  XL = 'XL',
}

export enum RouterPaths {
  'default' = 'default',
  'fonts' = 'fonts',
  'colors' = 'colors',
  'component' = 'component',
}

interface Router {
  path: RouterPaths;
  componentId?: string;
}

interface Node {
  type: 'box' | 'text' | 'input' | 'image' | 'component';
}

interface Component {
  name: string;
  nodes: Node[];
}

interface Color {
  name: string;
  hexValue: string;
}

interface Spacing {
  name: string;
  size: number;
}

interface FontSize {
  name: string;
  fontSize: string;
  lineHeight: string;
}

interface Font {
  fontName: string;
  fontUrl: string;
  sizes: { [size in FontSizeName]: FontSize };
}

export interface State {
  router: Router;
  components: { [id: string]: Component };
  componentList: string[];
  colors: Color[];
  spacing: Spacing[];
  font: Font;
}
