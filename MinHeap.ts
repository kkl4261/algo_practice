/**
 * (i -1) / 2 = parent index.
 * (2 * i) + 1 = left child index.
 * (2 * i) + 2 = right child index.
 */

class MinHeap {
  private heap: Array<number>;
  constructor() {
    this.heap = [];
  }

  insert(val: number) {
    this.heap.push(val);
    this.afterInsert();
  }
  private afterInsert() {
    let index = this.heap.length - 1;
    let parentIndex = Math.floor((index - 1) / 2);
    while (index > 0 && this.heap[parentIndex] > this.heap[index]) {
      this.swap(index, parentIndex);
      index = parentIndex;
      parentIndex = Math.floor((index - 1) / 2);
    }
  }

  private swap(a, b) {
    const temp = this.heap[a];
    this.heap[a] = this.heap[b];
    this.heap[b] = temp;
  }

  delete(val: number) {
    let index = this.heap.findIndex((elem) => elem === val);
    if (index === -1) {
      return;
    }
    // Replace index with the last element
    this.heap[index] = this.heap[this.heap.length - 1];
    //remove duplicated last element
    this.heap.pop();
    this.afterDeletion(index);
  }
  /**
   * remove smallest value
   */
  pop() {
    this.delete(this.minimum());
  }
  /**
   * check that every child > new elem at index i. If not, swap. Continue process until the elem < its children.
   * @param i
   */
  private afterDeletion(i: number) {
    while (true) {
      const left = 2 * i + 1;
      const right = 2 * i + 2;
      let min = i;
      if (left < this.heap.length && this.heap[left] < this.heap[min]) {
        min = left;
      }
      if (right < this.heap.length && this.heap[right] < this.heap[min]) {
        min = right;
      }
      if (min !== i) {
        this.swap(min, i);
        i = min;
      } else {
        break;
      }
    }
  }
  minimum() {
    return this.heap[0];
  }
}

function findKthLargest(nums: number[], k: number): number {
  const heap = new MinHeap();

  for (let i = 0; i < k; i++) {
    heap.insert(nums[i]);
  }
  for (let i = k; i < nums.length; i++) {
    if (nums[i] > heap.minimum()) {
      heap.delete(heap.minimum());
      heap.insert(nums[i]);
    }
  }
  return heap.minimum();
}
