type ClassValue = string | number | null | undefined | false;

/**
 * Merges class names, dropping falsy values. Intentionally lightweight
 * (no tailwind-merge/clsx) to avoid adding dependencies at this stage.
 */
export function cn(...classes: ClassValue[]): string {
  return classes.filter(Boolean).join(" ");
}
