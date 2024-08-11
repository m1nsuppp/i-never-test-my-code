export type Article = {
  id: string;
  createdAt: string;
  title: string;
  content: string;
  category: 'frontend' | 'backend' | 'ai' | 'devops';
};
