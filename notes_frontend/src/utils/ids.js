 /**
  * PUBLIC_INTERFACE
  * Generate a simple unique ID string.
  * Uses time and random to reduce collision probability.
  */
export function uid() {
  const rand = Math.random().toString(36).slice(2, 8);
  return `${Date.now().toString(36)}_${rand}`;
}
