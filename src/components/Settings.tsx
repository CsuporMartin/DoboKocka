import { Image, Pressable, Text, View } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";

const cardImages: { [key: string]: any } = {
  kinezet: require("@/assets/images/time.png"),
  animacio: require("@/assets/images/time.png"),
  mod: require("@/assets/images/time.png"),
  megjelenes: require("@/assets/images/time.png"),
};

const CardHeader = ({ title, image }: { title: string; image: any }) => {
  return (
    <View className="flex-row items-center gap-2">
      <Image source={cardImages[image]} className="w-8 h-8" />
      <Text className="font-bold text-xl">{title}</Text>
    </View>
  );
};

const Settings = ({ closeSettings }: { closeSettings: () => void }) => {
  return (
    <SafeAreaView>
      <View className="h-screen p-5 bg-background">
        <View className="flex-row items-center">
          <Pressable onPress={() => closeSettings()}>
            <Image
              source={require("@/assets/images/arrow-back.png")}
              className="w-10 h-10"
            />
          </Pressable>
          <Text className="font-bold text-3xl w-full text-center pr-20">
            Beállítások
          </Text>
        </View>

        <View className="card">
          <CardHeader title="Kocka kinézete" image="kinezet" />
          <View></View>
        </View>
      </View>
    </SafeAreaView>
  );
};

export default Settings;
