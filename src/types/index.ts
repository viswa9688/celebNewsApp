export interface NewsItem {
  id: string;
  title: string;
  description: string;
  imageUrl: string;
  isVideo: boolean;
  fullContent: string;
}

export interface CardItem {
  id: string;
  children: React.ReactNode;
}