import { collection, CollectionReference, DocumentData } from "firebase/firestore";
import { db } from "./client";
import type { User } from "@/types/user";
import type { Project } from "@/types/project";
import type { Comment } from "@/types/comment";
import type { Transaction } from "@/types/transaction";
import type { Interaction } from "@/types/interaction";
import type { Supporter } from "@/types/supporter";

function typedCollection<T = DocumentData>(path: string) {
  return collection(db, path) as CollectionReference<T>;
}

export const usersCol = typedCollection<User>("users");
export const projectsCol = typedCollection<Project>("projects");
export const commentsCol = typedCollection<Comment>("comments");
export const transactionsCol = typedCollection<Transaction>("transactions");
export const interactionsCol = typedCollection<Interaction>("interactions");
export const supportersCol = typedCollection<Supporter>("supporters");
