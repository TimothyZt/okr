export interface IContentRange {
  start: number;
  end: number;
  total: number;
}

export function parseContentRange(
  contentRange?: string | null,
): IContentRange | undefined {
  if (!contentRange) return;

  const matches = contentRange.match(/(\d+)-(\d+)\/(\d+)/);
  if (matches && matches.length === 4) {
    return {
      start: parseInt(matches[1], 10),
      end: parseInt(matches[2], 10),
      total: parseInt(matches[3], 10),
    };
  }
}
