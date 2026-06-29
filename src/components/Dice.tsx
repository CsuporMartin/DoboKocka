import { useGLTF } from "@react-three/drei/native";
import { forwardRef } from "react";

const Dice = forwardRef(function Dice(props, ref) {
  const gltf = useGLTF(require("../../assets/models/dice.glb"));
  return <primitive ref={ref} {...props} object={gltf.scene} />;
});

export default Dice;
