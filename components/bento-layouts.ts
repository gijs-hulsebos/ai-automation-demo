// Authored grid partitions: [tile, first column, first row, column span, row span].
type Placement = readonly [string, number, number, number, number];
const desktop = [
'a a b d d e e e g g g s',
'a a c d d f r r g g g s',
'a a c tarvos tarvos tarvos tarvos tarvos tarvos j k k',
'h i i tarvos tarvos tarvos tarvos tarvos tarvos j k k',
'm i i tarvos tarvos tarvos tarvos tarvos tarvos j l l',
'm n n n o p p p t j l l',
'm q q q q u u v w w l l',
];
const tablet = ['tarvos tarvos tarvos tarvos','tarvos tarvos tarvos tarvos','a a b c','a a d d','e e f r','g g g s','h i i s','x k l l','j m l l','n n o o','p p t t','q q u u','v v w w'];
const mobile = ['tarvos tarvos','a b','a c','d e','f r','g g','s h','s i','x k','j l','m n','o p','t t','q q','u v','w w'];
// All unchanged cells keep their original placement. These are explicit,
// local designs, not an automatic packing algorithm.
const variants: Record<string, readonly Placement[]> = {
 x: [['x',10,3,3,1],['k',11,4,2,1],['j',10,4,1,3]],
 a: [['a',1,1,3,2],['b',1,3,1,1],['c',2,3,2,1]],
 b: [['b',1,1,3,2],['a',1,3,2,1],['c',3,3,1,1]],
 c: [['a',1,1,2,1],['b',3,1,1,1],['c',1,2,3,2]],
 d: [['d',4,1,3,2],['e',7,1,2,1],['f',7,2,1,1],['r',8,2,1,1]],
 e: [['e',4,1,5,1],['d',4,2,2,1],['f',6,2,1,1],['r',7,2,2,1]],
 f: [['d',4,1,2,2],['e',6,1,3,1],['f',6,2,2,1],['r',8,2,1,1]],
 r: [['d',4,1,2,1],['e',6,1,3,1],['f',4,2,1,1],['r',5,2,4,1]],
 g: [['e',6,1,2,1],['r',7,2,1,1],['g',8,1,4,2]],
 s: [['g',9,1,2,2],['s',11,1,2,2]],
 h: [['h',1,4,3,1],['i',2,5,2,1]],
 i: [['i',1,4,3,2],['h',1,6,1,1],['m',1,7,1,1]],
 m: [['h',1,4,2,1],['i',3,4,1,2],['m',1,5,2,3],['n',3,6,2,1],['q',3,7,3,1]],
 j: [['j',10,3,2,4],['k',12,3,1,2],['l',12,5,1,3],['w',9,7,3,1]],
 k: [['k',10,3,3,2],['j',10,5,1,2]],
 l: [['l',10,5,3,3],['j',10,3,1,2],['w',9,7,1,1]],
 n: [['n',2,6,4,1],['q',2,7,3,1],['o',5,7,1,1]],
 o: [['o',4,6,2,2],['n',2,6,2,1],['q',2,7,2,1]],
 q: [['q',2,6,3,2],['n',5,6,1,1],['o',5,7,1,1]],
 p: [['p',6,6,4,1],['t',9,7,1,1],['w',10,7,1,1]],
 t: [['t',8,6,2,2],['p',6,6,2,1],['v',10,6,1,1],['w',10,7,1,1],['j',10,3,1,3]],
 u: [['u',6,6,3,2],['p',9,6,1,1],['t',10,6,1,1],['v',9,7,1,1],['w',10,7,1,1],['j',10,3,1,3]],
 v: [['v',8,6,2,2],['p',6,6,2,1],['t',10,6,1,1],['w',10,7,1,1],['j',10,3,1,3]],
 w: [['w',9,6,2,2],['p',6,6,2,1],['t',8,6,1,1],['j',10,3,1,3]],
};
// Detail partitions for populated cards: reserve at least two rows for reading.
// Only the named neighbourhood is rearranged; the base sketch remains unchanged.
Object.assign(variants, {
 r: [['r',4,1,5,2],['d',9,1,2,1],['e',11,1,1,1],['f',9,2,1,1],['g',10,2,2,1]],
 i: [['i',1,4,3,3],['h',1,7,1,1],['m',2,7,1,1],['n',3,7,2,1],['q',5,7,1,1],['o',4,6,2,1]],
 e: [['e',4,1,5,2],['d',9,1,2,1],['f',11,1,1,1],['r',9,2,1,1],['g',10,2,2,1]],
 f: [['f',4,1,5,2],['d',9,1,2,1],['e',11,1,1,1],['r',9,2,1,1],['g',10,2,2,1]],
 n: [['n',2,6,4,2],['o',6,6,1,1],['p',7,6,3,1],['t',10,6,1,1],['q',6,7,2,1],['u',8,7,1,1],['v',9,7,1,1],['w',10,7,1,1]],
 q: [['q',2,6,4,2],['n',6,6,2,1],['o',8,6,1,1],['p',9,6,2,1],['t',6,7,1,1],['u',7,7,2,1],['v',9,7,1,1],['w',10,7,1,1]],
 p: [['p',6,6,5,2],['n',2,6,2,1],['o',4,6,1,1],['t',5,6,1,1],['q',2,7,1,1],['u',3,7,1,1],['v',4,7,1,1],['w',5,7,1,1]],
 w: [['w',6,6,5,2],['n',2,6,2,1],['o',4,6,1,1],['t',5,6,1,1],['q',2,7,1,1],['u',3,7,1,1],['v',4,7,1,1],['p',5,7,1,1]],
 t: [['t',6,6,5,2],['n',2,6,2,1],['o',4,6,1,1],['p',5,6,1,1],['q',2,7,1,1],['u',3,7,1,1],['v',4,7,1,1],['w',5,7,1,1]],
 v: [['v',6,6,5,2],['n',2,6,2,1],['o',4,6,1,1],['t',5,6,1,1],['q',2,7,1,1],['u',3,7,1,1],['p',4,7,1,1],['w',5,7,1,1]],
} satisfies Record<string, readonly Placement[]>);
// All 24 surrounding tiles occupy one cell; Tarvos fills only the interior.
const tarvosDesktop = [
 'a b c d e x r g s',
 'f tarvos tarvos tarvos tarvos tarvos tarvos tarvos k',
 'h tarvos tarvos tarvos tarvos tarvos tarvos tarvos j',
 'i tarvos tarvos tarvos tarvos tarvos tarvos tarvos l',
 'm n o p q u v t w',
];
// Rotate the grid proportions on narrow screens, preserving the same 24-cell
// perimeter and a usable width for the central detail panel.
const tarvosMobile = [
 'a d e x s',
 'b tarvos tarvos tarvos g',
 'c tarvos tarvos tarvos r',
 'f tarvos tarvos tarvos k',
 'h tarvos tarvos tarvos j',
 'i tarvos tarvos tarvos l',
 'm tarvos tarvos tarvos t',
 'n tarvos tarvos tarvos w',
 'o p q u v',
];
const areas = (rows: string[]) => rows.map(row => '"' + row + '"').join(' ');

export function expandedLayout(id: string, screen: 'desktop' | 'tablet' | 'mobile') {
 if (id === 'tarvos') return {
  gridTemplateAreas: areas(screen === 'mobile' ? tarvosMobile : tarvosDesktop),
  gridTemplateColumns: 'repeat(' + (screen === 'mobile' ? 5 : 9) + ', minmax(0, 1fr))',
  gridTemplateRows: screen === 'mobile' ? 'repeat(9, 76px)' : 'repeat(5, minmax(0, 1fr))',
  ...(screen === 'tablet' ? { aspectRatio: '1.2' } : {}),
 };
 if (screen !== 'desktop') {
  const rows = screen === 'mobile' ? mobile : tablet;
  const selectedRow = rows.findIndex(row => row.split(' ').includes(id));
  return { gridTemplateRows: rows.map((_, i) => ((i === 0 ? (screen === 'mobile' ? 240 : 180) : 120) + (i === selectedRow ? 220 : 0)) + 'px').join(' ') };
 }
 const cells = desktop.map(row => row.split(' '));
 for (const [tile, x, y, width, height] of variants[id]) {
  for (let row = y - 1; row < y - 1 + height; row++) {
   for (let col = x - 1; col < x - 1 + width; col++) cells[row][col] = tile;
  }
 }
 // Keep the new upper tile separate in every existing neighbourhood variant.
 // Its boundary follows the first row of the original J region.
 if (!cells.some(row => row.includes('x'))) {
  const top = cells.findIndex(row => row.includes('j'));
  cells[top] = cells[top].map(tile => tile === 'j' ? 'x' : tile);
 }
 return { gridTemplateAreas: areas(cells.map(row => row.join(' '))) };
}
