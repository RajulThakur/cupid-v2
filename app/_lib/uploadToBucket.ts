import { ref, uploadBytes } from "firebase/storage";
import { storage } from "./firebase";

export async function uploadToBucket(file: File | undefined, id: string) {
  if (!file) return;
  const storageRef = ref(storage, `images/${id}`);
  // Upload the file
  const snapshot = await uploadBytes(storageRef, file);
  console.log("Uploaded file:", snapshot);
  return snapshot;
}
