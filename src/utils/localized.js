// Many mock content records (e.g. products) only carry English & Persian
// translations. For the other languages we fall back to English so the UI
// never shows a blank string.
export function localize(field, locale) {
  if (!field) return ''
  return field[locale] ?? field.en ?? ''
}
