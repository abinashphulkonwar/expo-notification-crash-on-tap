import React, { useEffect, useRef } from "react";

import * as Notifications from "expo-notifications";
import { Platform, ToastAndroid } from "react-native";
import * as Device from "expo-device";
import Toast from "react-native-toast-message";
import Constants from "expo-constants";

import { NotificationData } from "./interface";

Notifications.setNotificationHandler({
  handleNotification: async () => ({
    shouldShowAlert: true,
    shouldPlaySound: true,
    shouldSetBadge: false,
  }),
  // handleSuccess: async (id) => {
  //   console.log("success", id);
  // },
  // handleError: async (id) => {
  //   console.log("error", id);
  // },
});

export const showToast = (message: string, duration: number = 200) => {
  try {
    if (!message) message = "Something went wrong";
    if (Platform.OS === "android") ToastAndroid.show(message, duration);
    if (Platform.OS == "ios") Toast.show({ type: "error", text1: message });
  } catch (err) {
    console.log(err);
  }
};

export const NotificationWrapper = ({ children }: React.PropsWithChildren) => {
  const refState = useRef({
    messagesdbIds: [],
  });

  const pushNotificationListner = async (
    notification: Notifications.Notification
  ) => {
    try {
      const event = notification.request.content.data as NotificationData;

      if (
        event.type === "message-chat" ||
        event.type === "message-saved-chatroom"
      ) {
        showToast("New Message", 1000);
      }
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    try {
      (async () => {
        if (Platform.OS === "android") {
          await Notifications.setNotificationChannelAsync("default", {
            name: "default",
            importance: Notifications.AndroidImportance.MAX,
            vibrationPattern: [0, 250, 250, 250],
            lightColor: "#FF231F7C",
          });
        }
        if (Device.isDevice) {
          const { status: existingStatus } =
            await Notifications.getPermissionsAsync();
          let finalStatus = existingStatus;
          if (existingStatus !== "granted") {
            const { status } = await Notifications.requestPermissionsAsync();
            finalStatus = status;
          }
          if (finalStatus !== "granted") {
            Toast.show({
              type: "error",
              text1: "Please give the Permissions",
              text2: "Failed to get push token for push notification! 👋",
            });
            return;
          }
          const projectId =
            Constants?.expoConfig?.extra?.eas?.projectId ??
            Constants?.easConfig?.projectId;

          console.log("projectId: ", projectId);
          const token = (
            await Notifications.getExpoPushTokenAsync({
              projectId: projectId,
            })
          ).data;
          console.log("token: ", token);
        } else {
          Toast.show({
            type: "error",
            text1: "Use physical device",
            text2: "Must use physical device for Push Notifications 👋",
          });
        }
      })();
    } catch (err) {
      console.log(err.message);
    }
  }, []);

  useEffect(() => {
    try {
      const notificationListener =
        Notifications.addNotificationReceivedListener(pushNotificationListner);

      const responseListener =
        Notifications.addNotificationResponseReceivedListener(
          async (response: Notifications.NotificationResponse) => {
            showToast("notification recived", 500);
            if (
              response.actionIdentifier ===
              Notifications.DEFAULT_ACTION_IDENTIFIER
            )
              await pushNotificationListner(response.notification);
          }
        );
      return () => {
        notificationListener.remove();
        responseListener.remove();
      };
    } catch (err) {
      console.log(err);
    }
  }, [pushNotificationListner]);

  return <>{children}</>;
};
