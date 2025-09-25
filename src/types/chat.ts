
export interface Conversation {
  id: string;
  participants: string[]; // Array of user UIDs
  lastMessage: string;
  lastMessageTimestamp: any; // Firestore ServerTimestamp
}

export interface Message {
  id: string;
  conversationId: string;
  senderId: string;
  text: string;
  timestamp: any; // Firestore ServerTimestamp
}
