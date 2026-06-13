export type InteractionType = "call" | "message" | "whatsapp" | "sms" | "email";
export type InteractionStatus = "sent" | "delivered" | "read";

export interface Interaction {
  id: string;
  initiatorId: string;
  recipientId: string;
  projectId: string;
  type: InteractionType;
  message?: string;
  phoneNumber?: string;
  email?: string;
  status?: InteractionStatus;
  createdAt: Date;
}
