class Graph {
  V: number;
  //adjacent list
  adj: Array<Array<number>>;
  /**
   *
   * @param v number of vertices
   */
  constructor(v: number) {
    this.V = v;
    this.adj = new Array(v);
    for (let i = 0; i < v; i++) {
      this.adj[i] = new Array();
    }
  }

  /**
   * add unidirectional edge
   * @param u
   * @param v
   */
  addEdge(u: number, v: number): void {
    this.adj[u].push(v);
    this.adj[v].push(u);
  }

  /**
   *
   * @param src start
   * @param des end
   * @returns shortest path
   */
  shortestPath(src: number, des: number): Array<number> {
    let queue: number[][] = [];
    queue.push([0, src]);
    let dist = new Array(this.V).fill(Number.MAX_SAFE_INTEGER);
    let parent = new Array(this.V).map((_, index) => index + 1);

    dist[src] = 0;
    while (queue.length > 0) {
      let u = queue[0][1];
      queue.shift();
      for (let i = 0; i < this.adj[u].length; i++) {
        let v = this.adj[u][i];
        if (dist[v] > dist[u] + 1) {
          dist[v] = dist[u] + 1;
          parent[v] = u;

          queue.push([dist[v], v]);
          queue.sort((a, b) => {
            if (a[0] == b[0]) return a[1] - b[1];
            return a[0] - b[0];
          });
        }
      }
      if (u === des) break;
    }
    let path: Array<number> = [];
    if (dist[des] == Number.MAX_SAFE_INTEGER) {
      path.push(-1);
    } else {
      let node = des;
      // o(N)
      while (parent[node] != node) {
        path.push(node);
        node = parent[node];
      }
    }
    console.log(
      "src: ",
      src,
      ", des:",
      des,
      ", distance: ",
      dist[des],
      ", path: ",
      path
    );
    return path;
  }
}
