import { createContentLoader } from 'vitepress';

export interface Post {
  title: string;
  url: string;
  date: {
    time: number;
    string: string;
  };
  description?: string;
  tags: string[];
}

declare const data: Post[];
export { data };

export default createContentLoader('blog/*.md', {
  transform(raw) {
    return raw
      .filter(({ url }) => url !== '/blog/')
      .map(({ frontmatter, url }) => {
        const date = new Date(frontmatter.date);
        return {
          title: frontmatter.title,
          url,
          date: {
            time: date.getTime(),
            string: date.toISOString().slice(0, 10)
          },
          description: frontmatter.description,
          tags: frontmatter.tags ?? []
        };
      })
      .sort((a, b) => b.date.time - a.date.time);
  }
});
