export const normalizeText = (text:string) => {
  if (text.length > 97) {
    return `${text.slice(0, 97)}...`;
  }

  return text;
}