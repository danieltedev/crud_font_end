export interface Toast {
  html?: string;
  displayLength?: number;
  inDuration?: number;
  outDuration?: number;
  classes?: string;
  activationPercent?: number;
  completeCallback?: void;
}
