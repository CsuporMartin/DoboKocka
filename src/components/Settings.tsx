import { Image } from "expo-image";
import { useEffect, useState } from "react";
import { Pressable, Text, View } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import ColorPicker, {
    HueSlider,
    Panel1,
    Preview,
} from "reanimated-color-picker";

const cardImages: { [key: string]: any } = {
  kinezet: require("@/assets/images/appearance.svg"),
  animacio: require("@/assets/images/time.svg"),
  mod: require("@/assets/images/mode.svg"),
  megjelenes: require("@/assets/images/light.svg"),
};

const CardHeader = ({ title, image }: { title: string; image: any }) => {
  return (
    <View className="flex-row items-center gap-2 mb-5">
      <Image source={cardImages[image]} style={{ width: 30, height: 30 }} />
      <Text className="font-bold text-xl">{title}</Text>
    </View>
  );
};

const CurrentMarker = () => (
  <View className="absolute bg-white rounded-full z-10 right-1 -top-2">
    <Image
      source={require("@/assets/images/check-mark.svg")}
      style={{ width: 25, height: 25 }}
    />
  </View>
);

const Settings = ({
  closeSettings,
  getAnimationSpeed,
}: {
  closeSettings: () => void;
  getAnimationSpeed: (speed: number) => void;
}) => {
  const [initalColor, setInitalColor] = useState<string>("#ffffff");
  const [animationSpeed, setAnimationSpeed] = useState<number>(1);
  const [numberOfDice, setNumberOfDice] = useState<number>(1);
  const [appearance, setAppearance] = useState<string>("light");

  const onSelectColor = ({ hex }: any) => {
    "worklet";
    // do something with the selected color.
    console.log(hex);
  };

  useEffect(() => {
    getAnimationSpeed(animationSpeed);
  }, [animationSpeed]);

  return (
    <SafeAreaView>
      <View className="min-h-screen p-5 bg-background">
        <View className="flex-row items-center mb-5">
          <Pressable onPress={() => closeSettings()}>
            <Image
              source={require("@/assets/images/arrow-back.png")}
              style={{ width: 30, height: 30 }}
            />
          </Pressable>
          <Text className="font-bold text-3xl w-full text-center pr-20">
            Beállítások
          </Text>
        </View>

        <View className="bg-white rounded-2xl p-5 mb-3">
          <CardHeader title="Kocka kinézete" image="kinezet" />
          <View>
            <ColorPicker value={initalColor} onComplete={onSelectColor}>
              <Preview style={{ margin: 10, height: 50 }} />
              <Panel1
                style={{ margin: 10 }}
                boundedThumb
                thumbSize={25}
                thumbShape="circle"
                thumbStyle={{ borderWidth: 0, borderColor: "white" }}
                thumbInnerStyle={{ borderWidth: 2, borderColor: "white" }}
              />
              <HueSlider
                style={{ margin: 10 }}
                thumbColor="transparent"
                boundedThumb
                thumbSize={25}
                thumbShape="circle"
                thumbStyle={{ borderWidth: 0, borderColor: "white" }}
                thumbInnerStyle={{ borderWidth: 2, borderColor: "white" }}
                thumbScaleAnimationValue={1.1}
              />
            </ColorPicker>
          </View>
        </View>

        <View className="bg-white rounded-2xl p-5 mb-3">
          <CardHeader title="Animáció sebessége" image="animacio" />
          <View className="flex-row items-center justify-between rounded-full border border-black h-10 bg-gray-100">
            <Pressable
              className={`${animationSpeed == 0.5 ? "bg-primary" : "bg-transparent"} rounded-full w-1/3 h-10`}
              onPress={() => setAnimationSpeed(0.5)}
            >
              <Text
                className={`${animationSpeed == 0.5 ? "text-white" : "text-primary"} font-bold text-center leading-10`}
              >
                Gyors
              </Text>
            </Pressable>
            <Pressable
              className={`${animationSpeed == 1 ? "bg-primary" : "bg-transparent"} rounded-full w-1/3 h-10`}
              onPress={() => setAnimationSpeed(1)}
            >
              <Text
                className={`${animationSpeed == 1 ? "text-white" : "text-primary"} font-bold text-center leading-10`}
              >
                Normál
              </Text>
            </Pressable>
            <Pressable
              className={`${animationSpeed == 2 ? "bg-primary" : "bg-transparent"} rounded-full w-1/3 h-10`}
              onPress={() => setAnimationSpeed(2)}
            >
              <Text
                className={`${animationSpeed == 2 ? "text-white" : "text-primary"} font-bold text-center leading-10`}
              >
                Lassú
              </Text>
            </Pressable>
          </View>
          <View className="flex-row items-center justify-between mt-2">
            <Text
              className={`${animationSpeed == 0.5 ? "text-primary" : "text-neutral-500"} w-1/3 text-center font-medium`}
            >
              0.5 mp
            </Text>
            <Text
              className={`${animationSpeed == 1 ? "text-primary" : "text-neutral-500"} w-1/3 text-center font-medium`}
            >
              1 mp
            </Text>
            <Text
              className={`${animationSpeed == 2 ? "text-primary" : "text-neutral-500"} w-1/3 text-center font-medium`}
            >
              2 mp
            </Text>
          </View>
        </View>

        <View className="bg-white rounded-2xl p-5 mb-3">
          <CardHeader title="Kockák száma" image="mod" />
          <View className="flex-row items-center justify-between w-1/2 mx-auto">
            <Pressable
              className="bg-gray-100 p-2 border border-gray-400 rounded-lg"
              onPress={() => {
                if (numberOfDice > 1) {
                  setNumberOfDice((prev) => prev - 1);
                }
              }}
            >
              <Image
                source={require("@/assets/images/minus.svg")}
                style={{ width: 25, height: 25 }}
              />
            </Pressable>
            <Text className="text-3xl font-bold">
              {numberOfDice.toString()}
            </Text>
            <Pressable
              className="bg-gray-100 p-2 border border-gray-400 rounded-lg"
              onPress={() => {
                if (numberOfDice < 9) {
                  setNumberOfDice((prev) => prev + 1);
                }
              }}
            >
              <Image
                source={require("@/assets/images/plus.svg")}
                style={{ width: 25, height: 25 }}
              />
            </Pressable>
          </View>
        </View>

        <View className="bg-white rounded-2xl p-5 mb-3">
          <CardHeader title="Megjelenés" image="megjelenes" />
          <View className="flex-row items-center justify-between">
            <Pressable
              className="w-1/3 px-2 relative"
              onPress={() => {
                setAppearance("light");
              }}
            >
              {appearance == "light" && <CurrentMarker />}
              <View
                className={`${appearance == "light" ? "border-neutral-700" : "border-gray-200"} flex-col items-center justify-center bg-gray-100 border rounded-lg p-2`}
              >
                <Image
                  source={require("@/assets/images/light.svg")}
                  style={{ width: 25, height: 25 }}
                />
                <Text className="text-primary font-bold text-sm mt-2">
                  Világos
                </Text>
              </View>
            </Pressable>
            <Pressable
              className="w-1/3 px-2 relative"
              onPress={() => {
                setAppearance("dark");
              }}
            >
              {appearance == "dark" && <CurrentMarker />}
              <View
                className={`${appearance == "dark" ? "border-neutral-700" : "border-gray-200"} flex-col items-center justify-center bg-gray-100 border rounded-lg p-2`}
              >
                <Image
                  source={require("@/assets/images/dark.svg")}
                  style={{ width: 25, height: 25 }}
                />
                <Text className="text-primary font-bold text-sm mt-2">
                  Sötét
                </Text>
              </View>
            </Pressable>
            <Pressable
              className="w-1/3 px-2 relative"
              onPress={() => {
                setAppearance("automatic");
              }}
            >
              {appearance == "automatic" && <CurrentMarker />}
              <View
                className={`${appearance == "automatic" ? "border-neutral-700" : "border-gray-200"} flex-col items-center justify-center bg-gray-100 border rounded-lg p-2`}
              >
                <Image
                  source={require("@/assets/images/automatic.svg")}
                  style={{ width: 25, height: 25 }}
                />
                <Text className="text-primary font-bold text-sm mt-2">
                  Automatikus
                </Text>
              </View>
            </Pressable>
          </View>
        </View>
      </View>
    </SafeAreaView>
  );
};

export default Settings;
