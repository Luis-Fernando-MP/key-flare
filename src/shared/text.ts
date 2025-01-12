export const normalizeCharacter = (char: string) => {
  return char
    .normalize('NFD') // Divide caracteres con acentos y diacríticos
    .replace(/[\u0300-\u036f]/g, '') // Elimina los diacríticos
}
