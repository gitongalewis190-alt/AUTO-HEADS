import { ref, uploadBytesResumable, getDownloadURL } from "firebase/storage";
import { storage } from "@/lib/firebase/client";
import { MAX_IMAGE_SIZE_MB, MAX_VIDEO_SIZE_MB } from "@/lib/utils/constants";

type UploadProgressCallback = (progress: number) => void;

export async function uploadMedia(
  file: File,
  path: string,
  onProgress?: UploadProgressCallback
): Promise<string> {
  const isVideo = file.type.startsWith("video/");
  const maxMB = isVideo ? MAX_VIDEO_SIZE_MB : MAX_IMAGE_SIZE_MB;
  if (file.size > maxMB * 1024 * 1024) {
    throw new Error(`File exceeds ${maxMB}MB limit`);
  }

  return new Promise((resolve, reject) => {
    const storageRef = ref(storage, path);
    const task = uploadBytesResumable(storageRef, file);

    task.on(
      "state_changed",
      (snap) => {
        const pct = (snap.bytesTransferred / snap.totalBytes) * 100;
        onProgress?.(Math.round(pct));
      },
      reject,
      async () => {
        const url = await getDownloadURL(task.snapshot.ref);
        resolve(url);
      }
    );
  });
}
