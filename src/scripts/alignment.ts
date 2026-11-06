/**
 * Geometry for the signature "alignment system" visual.
 * Pure functions, shared by the server render (static resolved state)
 * and the client script (scroll-linked alignment).
 *
 * Each strand is two cubic Bézier segments: P0 C1 C2 P3 C4 C5 P6.
 * `scattered` is the opening state; `aligned` is the resolved state.
 */

type Pt = readonly [number, number];
export interface Strand {
  id: string;
  label: string;
  accent: boolean;
  scattered: readonly Pt[];
  aligned: readonly Pt[];
}

/** Visible region of the drawing. Geometry is authored on a 1000-wide grid
 *  and compressed horizontally into the right side of the hero. */
export const VIEWBOX = "400 0 600 700";
const fit = (pts: Pt[]): Pt[] => pts.map(([x, y]) => [400 + x * 0.6, y] as Pt);

// Lane offsets keep each strand distinct inside the shared direction.
const lane = (o: number): Pt[] => fit([
  [40, 560 + o * 2.6],
  [300, 560 + o * 2.6],
  [420, 420 + o * 1.1],
  [600, 352 + o],
  [740, 300 + o],
  [850, 216 + o],
  [990, 150 + o],
]);

export const STRANDS: readonly Strand[] = [
  {
    id: "people",
    label: "People",
    accent: true,
    scattered: fit([
      [220, 120], [380, 110], [480, 260], [560, 330],
      [640, 400], [700, 470], [770, 560],
    ]),
    aligned: lane(-36),
  },
  {
    id: "processes",
    label: "Processes",
    accent: false,
    scattered: fit([
      [80, 620], [200, 600], [260, 460], [360, 380],
      [460, 300], [520, 200], [650, 120],
    ]),
    aligned: lane(-12),
  },
  {
    id: "technology",
    label: "Technology",
    accent: false,
    scattered: fit([
      [420, 60], [470, 190], [600, 200], [700, 300],
      [800, 400], [860, 520], [970, 560],
    ]),
    aligned: lane(12),
  },
  {
    id: "data",
    label: "Data",
    accent: false,
    scattered: fit([
      [60, 400], [220, 360], [320, 520], [520, 500],
      [700, 480], [820, 300], [970, 300],
    ]),
    aligned: lane(36),
  },
];

const ease = (t: number) => (t < 0.5 ? 4 * t * t * t : 1 - Math.pow(-2 * t + 2, 3) / 2);

/** Point list for progress p (0 = scattered, 1 = aligned), with optional drift. */
export function strandPoints(s: Strand, p: number, drift = 0, phase = 0): Pt[] {
  const t = ease(Math.min(1, Math.max(0, p)));
  return s.aligned.map((a, i) => {
    const b = s.scattered[i];
    const wobble = drift * Math.sin(phase + i * 1.3) * (i === 0 ? 0.3 : 1);
    return [b[0] + (a[0] - b[0]) * t, b[1] + (a[1] - b[1]) * t + wobble] as Pt;
  });
}

export function strandPath(s: Strand, p: number, drift = 0, phase = 0): string {
  const q = strandPoints(s, p, drift, phase).map(([x, y]) => `${x.toFixed(1)} ${y.toFixed(1)}`);
  return `M${q[0]}C${q[1]} ${q[2]} ${q[3]}C${q[4]} ${q[5]} ${q[6]}`;
}

/** Label anchor sits just above the start of each strand. */
export function labelPos(s: Strand, p: number): Pt {
  const [x, y] = strandPoints(s, p)[0];
  return [x + 4, y - 14];
}
