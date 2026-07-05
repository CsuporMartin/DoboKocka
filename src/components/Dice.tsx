import { useGLTF } from "@react-three/drei/native";
import { forwardRef, useEffect } from "react";

const Dice = forwardRef(function Dice({ onLoaded, ...props }: any, ref) {
  const gltf = useGLTF(require("../../assets/models/dice.glb"));

  useEffect(() => {
    if (gltf?.scene) {
      onLoaded?.();
    }
  }, [gltf, onLoaded]);

  return <primitive ref={ref} {...props} object={gltf.scene} />;
});

export default Dice;
