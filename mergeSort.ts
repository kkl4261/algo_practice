/**
 * Merge two sorted arrays in place
 * @param nums1 first sorted array
 * @param m length of nums1
 * @param nums2 second sorted array
 * @param n  length of nums2
 */
function merge(nums1, m, nums2, n) {
  let i = m - 1;
  let j = n - 1;
  let k = m + n - 1; //insert from end

  while (j >= 0) {
    //process stops when nums2 is processed
    if (i >= 0 && nums1[i] > nums2[j]) {
      nums1[k--] = nums1[i--]; //put num1 element and move 1 index forward
    } else {
      nums1[k--] = nums2[j--]; //put num2 element and move 1 index forward
    }
  }
}
