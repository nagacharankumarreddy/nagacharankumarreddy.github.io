const WORDS_PER_MINUTE = 200;

export const estimateReadingTimeMinutes = (body: string): number => {
  const wordCount = body.trim().split(/\s+/).filter(Boolean).length;
  return Math.max(1, Math.round(wordCount / WORDS_PER_MINUTE));
};
