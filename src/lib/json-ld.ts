/**
 * Serialise a value to JSON for embedding in a <script type="application/ld+json"> tag.
 *
 * Escapes `<` to `\u003c` so any string containing HTML cannot break out of the
 * <script> block via `</script>`. Defence in depth — current callers pass trusted
 * module-level constants or bundled dictionary content, but the escape makes the
 * pattern safe even if dynamic values are added later.
 */
export function serializeJsonLd(data: unknown): string {
  return JSON.stringify(data).replace(/</g, "\\u003c");
}
