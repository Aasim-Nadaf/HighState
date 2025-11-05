import { useLocalSearchParams } from "expo-router";
import React from "react";
import { Text, View } from "react-native";

export default function properties() {
  const { id } = useLocalSearchParams();
  return (
    <View>
      <Text>properties {id}</Text>
    </View>
  );
}
