export function sortSuggestions(parsed: any) {
  const priority = {
    High: 3,
    Medium: 2,
    Low: 1,
  };

  parsed.overallSuggestions.sort(
    (a: any, b: any) =>
      (priority[b.priority as keyof typeof priority] ?? 0) -
      (priority[a.priority as keyof typeof priority] ?? 0),
  );

  parsed.rewriteSuggestions.sort(
    (a: any, b: any) =>
      (priority[b.priority as keyof typeof priority] ?? 0) -
      (priority[a.priority as keyof typeof priority] ?? 0),
  );
}

export function removeDuplicateSuggestions(parsed: any) {
  parsed.overallSuggestions = parsed.overallSuggestions.filter(
    (item: any, index: number, self: any[]) =>
      index ===
      self.findIndex(
        (x) => x.title?.toLowerCase() === item.title?.toLowerCase(),
      ),
  );

  parsed.rewriteSuggestions = parsed.rewriteSuggestions.filter(
    (item: any, index: number, self: any[]) =>
      index ===
      self.findIndex((x) => x.before === item.before && x.after === item.after),
  );
}
