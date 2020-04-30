export function hasTouchControls(): boolean {
  return 'ontouchstart' in window
}
