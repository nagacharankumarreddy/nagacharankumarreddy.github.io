/**
 * Minimal, dependency-free parser for the narrow YAML subset this project needs:
 * flat `key: value` scalars plus one block-list form (`key:` followed by `  - item` lines).
 * Used for both Markdown front matter blocks and whole learning-path YAML files.
 */
export const parseSimpleYaml = (source: string): Record<string, string | string[]> => {
  const data: Record<string, string | string[]> = {};
  const lines = source.split(/\r?\n/);
  const unquote = (value: string) => value.trim().replace(/^["']|["']$/g, "");

  let i = 0;
  while (i < lines.length) {
    const line = lines[i];
    const keyMatch = line.match(/^([a-zA-Z0-9_-]+):\s*(.*)$/);

    if (!keyMatch) {
      i += 1;
      continue;
    }

    const [, key, inlineValue] = keyMatch;

    if (inlineValue.trim() === "") {
      const items: string[] = [];
      let j = i + 1;
      while (j < lines.length) {
        const itemMatch = lines[j].match(/^\s*-\s*(.+)$/);
        if (!itemMatch) break;
        items.push(unquote(itemMatch[1]));
        j += 1;
      }

      if (items.length > 0) {
        data[key] = items;
        i = j;
        continue;
      }

      i += 1;
      continue;
    }

    if (/^\[.*\]$/.test(inlineValue.trim())) {
      data[key] = inlineValue
        .trim()
        .replace(/^\[|\]$/g, "")
        .split(",")
        .map(unquote)
        .filter(Boolean);
      i += 1;
      continue;
    }

    data[key] = unquote(inlineValue);
    i += 1;
  }

  return data;
};
