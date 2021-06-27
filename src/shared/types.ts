export type User = {
  self: boolean;
  username: string;
  userId: string;
  connected: boolean;
  messages: string[];
  hasNewMessages: boolean;
};
