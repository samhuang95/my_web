export interface Article {
  _id: string;
  article_id: string;
  title: string;
  eng_title: string;
  article_tag: string;
  state: string;
  cover_url: string;
  summary: string;
  content: string;
  created_at: string;
  updated_at: string;
}

export interface createArticleType {
  title: string;
  eng_title: string;
  article_tag: string;
  state: string;
  cover_url: string;
  summary: string;
  content: string;
}

export interface updateArticleType {
  title?: string;
  eng_title?: string;
  article_tag?: string;
  state?: string;
  cover_url?: string;
  summary?: string;
  content?: string;
  updated_at?: string;
}
