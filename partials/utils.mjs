export function coerceValue(val) {
  if(val === 0) { return 0; }
  return (!val || val === 'false' || val === 'undefined' || val === 'null' || parseInt(val, 10) === NaN || val === '') ? '' : val === 'true' ? true : val;
}