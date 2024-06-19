import React from "react";
import { View, Text } from "react-native";
import { NotificationWrapper } from "./notification-wrapper";

export default () => {
  return (
    <NotificationWrapper>
      <View>
        <View style={{ marginTop: 100 }}>
          <Text>Notification Crash on Tap</Text>
        </View>
      </View>
    </NotificationWrapper>
  );
};
