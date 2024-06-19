export interface NotificationData {
  _id: string;
  createdAt: string;
  isRead: boolean;
  message: {
    body: string;
    data: { id: string };
    title: string;
  };
  reactionType: string;
  resourceData: {
    id: string;
    image: string;
  };
  type: "message-chat" | "message-saved-chatroom";
}
