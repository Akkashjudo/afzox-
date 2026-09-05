/**
 * Brand-name formatting. Deliberately its own module with no data imports, so
 * client components can use it without pulling the catalogue JSON into the
 * browser bundle.
 */

/**
 * Prefix a collection or series name with the brand, once.
 *
 * "HS Series" needs the prefix; "AFZOX Series" already carries it, and
 * prefixing blindly produced headings and alt text reading "AFZOX AFZOX
 * Series". Use this anywhere a collection name is shown next to the brand.
 */
export function brandName(name: string): string {
  return name.startsWith('AFZOX') ? name : `AFZOX ${name}`;
}
