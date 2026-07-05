import { PerspectiveCamera } from "@react-three/drei/core";
import { Canvas } from "@react-three/fiber/native";
import { gsap } from "gsap";
import { Suspense, useEffect, useRef, useState } from "react";
import { Image, Modal, Pressable, StatusBar, Text, View } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import "../../global.css";
import Dice from "../components/Dice";
import Settings from "../components/Settings";

export default function Index() {
  const dice = useRef<any>(null);

  const [isRolling, setIsRolling] = useState(false);
  const [isSettingsOpen, setIsSettingsOpen] = useState(false);
  const [isModelLoaded, setIsModelLoaded] = useState(false);
  const [animationSpeed, setAnimationSpeed] = useState<number>(1);

  useEffect(() => {
    console.log(animationSpeed);
  }, [animationSpeed]);

  const startFloat = () => {
    if (!dice.current) return;

    const diceObj = dice.current;

    diceObj.rotation.x = -Math.PI / 5;
    diceObj.rotation.y = Math.PI / 4;

    gsap.to(diceObj.position, {
      y: 0.25,
      duration: 2,
      yoyo: true,
      repeat: -1,
      ease: "sine.inOut",
    });

    gsap.to(diceObj.rotation, {
      y: "+=6.2831853",
      duration: 20,
      repeat: -1,
      ease: "none",
    });
  };

  const diceFaces: { [key: number]: { x: number; y: number; z: number } } = {
    1: { x: Math.PI / 2, y: 0, z: 0 },
    2: { x: 0, y: -Math.PI / 2, z: 0 },
    3: { x: 0, y: Math.PI, z: 0 },
    4: { x: 0, y: 0, z: 0 },
    5: { x: 0, y: Math.PI / 2, z: 0 },
    6: { x: -Math.PI / 2, y: 0, z: 0 },
  };

  const rollDice = () => {
    if (!dice.current) return;

    const result = Math.floor(Math.random() * 6) + 1;

    if (result == 4) {
      gsap.killTweensOf(dice.current.position);
      dice.current.position.y = 0;
      gsap.killTweensOf(dice.current.rotation);
      dice.current.rotation.x = 0;
      dice.current.rotation.y = Math.PI;
      dice.current.rotation.z = 0;
    } else {
      gsap.killTweensOf(dice.current.position);
      dice.current.position.y = 0;
      gsap.killTweensOf(dice.current.rotation);
      dice.current.rotation.x = 0;
      dice.current.rotation.y = 0;
      dice.current.rotation.z = 0;
    }

    setIsRolling(true);

    const diceObj = dice.current;

    const face = diceFaces[result];

    gsap.to(diceObj.rotation, {
      x: face.x + Math.PI * 4,
      y: face.y + Math.PI * 4,
      z: face.z + Math.PI * 4,
      duration: animationSpeed,
      ease: "power3.out",
      onComplete: () => {
        setIsRolling(false);
      },
    });
  };

  useEffect(() => {
    if (isModelLoaded) {
      startFloat();
    }
  }, [isModelLoaded]);

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
            <spotLight position={[0, 0, 3]} intensity={10} />
            <PerspectiveCamera makeDefault position={[0, 0, 3]} />
            <Suspense fallback={null}>
              <Dice ref={dice} onLoaded={() => setIsModelLoaded(true)} />
            </Suspense>
          </Canvas>
        </View>

        <View className="h-[10vh]">
          <Pressable
            className="bg-primary rounded-full px-15 py-3 flex-row items-center justify-center gap-2 self-center"
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
            <Settings
              closeSettings={() => setIsSettingsOpen(false)}
              getAnimationSpeed={() => setAnimationSpeed}
            />
          </Modal>
        )}
      </View>
    </SafeAreaView>
  );
}
