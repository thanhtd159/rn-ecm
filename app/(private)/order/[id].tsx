import { Text } from "@lib/ui/text";
import { useLocalSearchParams } from "expo-router";
import { View } from "react-native";

export default function OrderDetail() {
  const { id } = useLocalSearchParams();

  return (
    <View>
      <Text>Order #{id}</Text>
    </View>
  );
}
