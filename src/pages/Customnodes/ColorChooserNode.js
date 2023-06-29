import React from "react";
import { Handle, Position, NodeResizer } from "reactflow";

import useStore from "./Store";

function ColorChooserNode({ id, data, selected }) {
  const updateNodeColor = useStore((state) => state.updateNodeColor);

  return (
    <div id={data.id}>
      <NodeResizer
        isVisible={selected}
        color="black"
        minWidth={130}
        minHeight={40}
      />
      <Handle type="target" position={Position.Top} />
      <div
        style={{
          outline: "none",
          display: "inline-block",
          position: "relative",
          minWidth: "130px",
          minHeight: "40px",
          borderRadius: "8px",
        }}
      >
        <input
          type="color"
          defaultValue="#FFFFFF"
          onChange={(evt) => updateNodeColor(id, evt.target.value)}
          // className="nodrag"
          style={{
            zIndex: 0,
            minWidth: "130px",
            minHeight: "40px",
            backgroundColor: "#FFFFFF",
            borderRadius: "8px",
            appearance: "none",
            border: "none",
            outline: "none",
            padding: 0,
            margin: 0,
          }}
        />
        <style>
          {`
            input[type="color"]::-webkit-color-swatch {
              border: none;
            }
          `}
        </style>
        <span
          id={data.id}
          style={{
            position: "absolute",
            top: 0,
            left: 0,
            zIndex: 1,
            padding:'4px',
            
          }}
        >
          {data.label}
        </span>
      </div>
      <Handle type="source" position={Position.Bottom} />
    </div>
  );
}

export default ColorChooserNode;
