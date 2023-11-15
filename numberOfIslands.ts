/**
 *
 * @param grid
 * @param i x-coordinate of start node
 * @param j y-coordinate of start node
 * @returns
 */
function travel(grid: string[][], i: number, j: number) {
  if (
    i < 0 ||
    i >= grid.length ||
    j < 0 ||
    j >= grid[i].length ||
    grid[i][j] == "0"
  ) {
    return;
  }
  grid[i][j] = "0";
  travel(grid, i + 1, j);
  travel(grid, i - 1, j);
  travel(grid, i, j + 1);
  travel(grid, i, j - 1);
}

/**
 * Find number of islands on grid
 * @param grid
 * @returns
 */
function numIslands(grid: string[][]) {
  let count = 0;
  for (let i = 0; i < grid.length; i++) {
    for (let j = 0; j < grid[i].length; j++) {
      if (grid[i][j] == "1") {
        count += 1;
        travel(grid, i, j);
      }
    }
  }
  return count;
}
