import { ref, deleteObject } from "firebase/storage";
import { storage } from "@/lib/firebase/client";

export async function deleteMedia(path: string): Promise<void> {
  const storageRef = ref(storage, path);
  await deleteObject(storageRef);
}
