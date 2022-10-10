export interface RatyOptions {
  cancelButton: boolean;
  cancelClass: string;
  cancelHint: string;
  cancelOff: string;
  cancelOn: string;
  cancelPlace: string;
  click: (score: number, element: HTMLElement, evt: MouseEvent) => void;
  half: boolean;
  halfShow: boolean;
  hints: string[];
  iconRange: { range: number; on: string; off: string }[];
  iconRangeSame: boolean;
  mouseout: (score: number, element: HTMLElement, evt: MouseEvent) => void;
  mouseover: (score: number, element: HTMLElement, evt: MouseEvent) => void;
  noRatedMsg: string;
  number: () => number | number;
  numberMax: number;
  path: () => string | string;
  precision: boolean;
  readOnly: () => boolean | boolean;
  round: { down: number; full: number; up: number };
  score: () => number | number;
  scoreName: string;
  single: boolean;
  space: boolean;
  starHalf: string;
  starOff: string;
  starOn: string;
  starType: string;
  target: string;
  targetFormat: string;
  targetKeep: boolean;
  targetScore: string;
  targetText: string;
  targetType: string;
}

export declare class Raty {
  constructor(element: HTMLElement, options?: Partial<RatyOptions>);

  defaultOptions(): Partial<RatyOptions>;

  cancel(click: boolean);

  click(score: number): void;

  move(score: number): void;

  readOnly(readOnly: boolean): void;

  score(): number;
  score(score: number): void

  setScore(score: number): void;
  getScore(): number;

  init(): Raty
}
