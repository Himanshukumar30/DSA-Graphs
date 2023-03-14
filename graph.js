class Node {
  constructor(value, adjacent = new Set()) {
    this.value = value;
    this.adjacent = adjacent;
  }
}

class Graph {
  constructor() {
    this.nodes = new Set();
  }

  // this function accepts a Node instance and adds it to the nodes property on the graph
  addVertex(vertex) {
    this.nodes.add(vertex);
  }

  // this function accepts an array of Node instances and adds them to the nodes property on the graph
  addVertices(vertexArray) {
    for (let vertex in vertexArray) {
      this.addVertex(vertex);
    }
  }

  // this function accepts two vertices and updates their adjacent values to include the other vertex
  addEdge(v1, v2) {
    v1.adjacent.add(v2);
    v2.adjacent.add(v1);
  }

  // this function accepts two vertices and updates their adjacent values to remove the other vertex
  removeEdge(v1, v2) {
    v1.adjacent.delete(v2);
    v2.adjacent.delete(v1);
  }

  // This function should remove the node in the array of nodes and also remove all edges that the removed node previously contained.
  removeVertex(vertex) {
    for (let node of this.nodes) {
      if (node.adjacent.has(vertex)) {
        node.adjacent.delete(vertex);
      }
    }
    this.nodes.delete(vertex);
  }

  // this function returns an array of Node values using DFS
  depthFirstSearch(start) {
    let result = [];
    let visited = new Set();

    function traverse(vertex) {
      // If the vertex doesn't exist
      if (!vertex) return null;

      if (!visited.has(vertex)) {
        // store visited vertex
        visited.add(vertex);
        result.push(vertex.value);

        // Look for neighbors
        vertex.adjacent.forEach((neighbor) => {
          if (!visited.has(neighbor)) {
            return traverse(neighbor);
          }
        });
      }
    }

    traverse(start);
    return result;
  }

  // this function returns an array of Node values using BFS
  breadthFirstSearch(start) {
    let result = [];
    let visited = new Set();
    let queue = [start];
    let currentVertex;

    // visited vertex
    visited.add(start);

    while (visited.length) {
      currentVertex = queue.shift();
      result.push(currentVertex.value);

      // Look for neighbors
      currentVertex.adjacent.forEach((neighbor) => {
        if (!visited.has(neighbor)) {
          visited.add(neighbor);
          queue.push(neighbor);
        }
      });
    }
    return result;
  }
}

module.exports = { Graph, Node };
