export type NewsRecord = {
  id: number;
  slug: string;
  title: string;
  category: string;
  publishedAt: string;
  excerpt: string;
  image: string;
};

// I add news only when its wording and publication date are approved by PVE.
export const newsItems: NewsRecord[] = [];
