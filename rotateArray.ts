/**
 * rotate nums clockwise by k times
 * @param nums
 * @param k
 * @returns
 */
function rotate(nums: number[], k: number) {
  let starting = nums.length - (k % nums.length);
  if (k == 0 || starting == 0 || nums.length == 0) {
    return;
  }
  const sub = nums.slice(starting);
  nums.splice(starting, k);
  nums.splice(0, 0, ...sub);
}
