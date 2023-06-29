import { create } from "zustand";

export const useStore = create((set, get) => ({
  nodes: [],
  updateNodeColor: (nodeId, color) => {
    set((state) => ({
      nodes: state.nodes.map((node) => {
        if (node.id === nodeId) {
          return {
            ...node,
            data: {
              ...node.data,
              color: color,
            },
          };
        }
        return node;
      }),
    }));
  },
}));

export default useStore;
