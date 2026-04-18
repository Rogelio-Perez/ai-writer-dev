import { clsx, type ClassValue } from "clsx";
import { twMerge } from "tailwind-merge";
import readingTime from "reading-time";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export function getReadingTime(content: string): number {
  const stats = readingTime(content);
  return Math.ceil(stats.minutes);
}
