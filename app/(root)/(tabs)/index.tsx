import { Link } from "expo-router";
import { View } from "react-native";

export default function Index() {
  return (
    <View className="flex-1 items-center justify-center gap-4 bg-white">
      <Link href={"/explore"}>explore</Link>
      <Link href={"/profile"}>profile</Link>
      <Link href={"/signin"}>sign-in</Link>
      <Link href={"/properties/1"}>properties</Link>
    </View>
  );
}
