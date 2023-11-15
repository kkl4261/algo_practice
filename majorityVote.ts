function majorityElement(nums: number[]) {
  let count = 0,
    result;

  for (const num of nums) {
    if (count === 0) {
      //current elem successfully outvote elected elem
      result = num;
    }

    count += result === num ? 1 : -1;
  }
  return result;
}
