export type NodeId = "hospital" | "junctionA" | "junctionB" | "junctionC" | "patient";

export type GraphNode = {
  id: NodeId;
  label: string;
  x: number;
  y: number;
};

export const graphNodes: GraphNode[] = [
  { id: "hospital", label: "Hospital", x: 15, y: 72 },
  { id: "junctionA", label: "Junction A", x: 33, y: 56 },
  { id: "junctionB", label: "Junction B", x: 52, y: 62 },
  { id: "junctionC", label: "Junction C", x: 68, y: 42 },
  { id: "patient", label: "Patient", x: 84, y: 24 }
];

const edges: Record<NodeId, Partial<Record<NodeId, number>>> = {
  hospital: { junctionA: 2.1, junctionB: 4.2 },
  junctionA: { hospital: 2.1, junctionB: 1.9, junctionC: 5.4 },
  junctionB: { hospital: 4.2, junctionA: 1.9, junctionC: 2.8, patient: 6.2 },
  junctionC: { junctionA: 5.4, junctionB: 2.8, patient: 2.4 },
  patient: { junctionB: 6.2, junctionC: 2.4 }
};

export function dijkstra(start: NodeId, target: NodeId) {
  const distances = new Map<NodeId, number>();
  const previous = new Map<NodeId, NodeId | null>();
  const queue = new Set<NodeId>(graphNodes.map((node) => node.id));

  graphNodes.forEach((node) => {
    distances.set(node.id, node.id === start ? 0 : Number.POSITIVE_INFINITY);
    previous.set(node.id, null);
  });

  while (queue.size) {
    const current = [...queue].sort((a, b) => (distances.get(a) ?? 0) - (distances.get(b) ?? 0))[0];
    queue.delete(current);
    if (current === target) break;

    Object.entries(edges[current]).forEach(([neighbor, weight]) => {
      if (!queue.has(neighbor as NodeId)) return;
      const nextDistance = (distances.get(current) ?? 0) + (weight ?? 0);
      if (nextDistance < (distances.get(neighbor as NodeId) ?? Number.POSITIVE_INFINITY)) {
        distances.set(neighbor as NodeId, nextDistance);
        previous.set(neighbor as NodeId, current);
      }
    });
  }

  const path: NodeId[] = [];
  let cursor: NodeId | null = target;
  while (cursor) {
    path.unshift(cursor);
    cursor = previous.get(cursor) ?? null;
  }

  return { path, distance: distances.get(target) ?? 0 };
}

export function pathToPoints(path: NodeId[]) {
  return path.map((id) => graphNodes.find((node) => node.id === id)!);
}
