import { PerspectiveCamera } from "@react-three/drei/core";
import { Canvas } from "@react-three/fiber/native";
import { Suspense, useRef, useState } from "react";
import { Image, Modal, Pressable, StatusBar, Text, View } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import "../../global.css";
import Dice from "../components/Dice";
import Settings from "../components/Settings";

export default function Index() {
  const dice = useRef(null);

  const [isRolling, setIsRolling] = useState(false);
  const [isSettingsOpen, setIsSettingsOpen] = useState(false);

  const rollDice = () => {
    if (dice.current != null) {
      const x = Math.floor(Math.random() * 6) + 1;
      const y = Math.floor(Math.random() * 6) + 1;
      const z = Math.floor(Math.random() * 6) + 1;
      dice.current.rotation.set(x, y, z);
    }
  };

  return (
    <SafeAreaView>
      <StatusBar barStyle={"dark-content"} />
      <View className="h-screen flex m-5 bg-background">
        <View className="h-15">
          <Pressable onPress={() => setIsSettingsOpen(true)}>
            <Image
              source={require("@/assets/images/settings.png")}
              className="w-10 h-10"
            />
          </Pressable>
        </View>

        <View className="h-[65vh]">
          <Canvas>
            <ambientLight intensity={1.5} />
            <spotLight position={[0, 2, 0]} intensity={7} />
            <PerspectiveCamera makeDefault position={[0, 0, 3]} />
            <Suspense fallback={null}>
              <Dice ref={dice} />
            </Suspense>
          </Canvas>
        </View>

        <View className="h-[10vh]">
          <Pressable
            className="bg-button rounded-full px-15 py-3 flex-row items-center justify-center gap-2 self-center"
            onPress={rollDice}
            disabled={isRolling}
          >
            <Image
              source={require("@/assets/images/dice-white.png")}
              className="w-10 h-10"
            />
            <Text className="text-white font-bold text-2xl">DOBÁS</Text>
          </Pressable>
        </View>

        {isSettingsOpen && (
          <Modal animationType="slide">
            <Settings closeSettings={() => setIsSettingsOpen(false)} />
          </Modal>
        )}
      </View>
    </SafeAreaView>
  );
}
