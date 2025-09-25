
export interface UserProfile {
  uid: string;
  email: string;
  displayName: string;
  photoURL?: string;
  friends: string[]; // Array of friend UIDs
  friendRequests: string[]; // Array of UIDs of users who sent a friend request
}
