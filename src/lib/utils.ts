import { clsx, type ClassValue } from "clsx";
import { twMerge } from "tailwind-merge";
import { supabase } from "./supabase";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export async function uploadMedia(file: File, folder: string) {
  const fileExt = file.name.split(".").pop();
  const filePath = `${folder}/${Date.now()}-${Math.random()}.${fileExt}`;
  const { data, error } = await supabase.storage.from("media").upload(filePath, file);

  if (error) throw error;
  return data.path; // Save this path in your DB
}

export function getMediaUrl(path: string) {
  return supabase.storage.from("media").getPublicUrl(path).data.publicUrl;
}
