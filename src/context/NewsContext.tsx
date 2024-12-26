import React, { createContext, useContext, useState } from 'react';
import { NewsItem } from '../types';

const mockData: NewsItem[] = [
  {
    id: '1',
    title: 'Shah Rukh Khan "Jawan" Breaks Box Office Records',
    description: 'The latest blockbuster from King Khan sets new benchmarks in Indian cinema.',
    imageUrl: 'https://picsum.photos/800/600',
    isVideo: false,
    fullContent: 'Shah Rukh Khan latest release "Jawan" has shattered all previous box office records, collecting over ₹1000 crores globally.The movie has been praised for its unique storyline and powerful performances.',
  },
  {
    id: '2',
    title: 'Priyanka Chopra Signs Major Hollywood Project',
    description: 'Global star adds another prestigious project to her international portfolio.',
    imageUrl: 'https://picsum.photos/800/601',
    isVideo: true,
    fullContent: 'Priyanka Chopra has signed a major Hollywood project alongside several A-list stars. The project, set to begin filming next month, is being produced by a leading studio.',
  },
  {
    id: '3',
    title: 'Deepika Padukone Fashion Line Launch',
    description: 'Bollywood actress ventures into sustainable fashion with new clothing line.',
    imageUrl: 'https://picsum.photos/800/602',
    isVideo: false,
    fullContent: 'Deepika Padukone has launched her own sustainable fashion line, focusing on contemporary Indian wear with a modern twist. The collection features eco-friendly materials and traditional craftsmanship.',
  },
  {
    id: '4',
    title: 'Samantha  Fashion Line Launch',
    description: 'Bollywood actress ventures into sustainable fashion with new clothing line.',
    imageUrl: 'https://picsum.photos/800/602',
    isVideo: false,
    fullContent: 'Deepika Padukone has launched her own sustainable fashion line, focusing on contemporary Indian wear with a modern twist. The collection features eco-friendly materials and traditional craftsmanship.',
  },
  {
    id: '5',
    title: 'Ranveer Padukone Fashion Line Launch',
    description: 'Bollywood actress ventures into sustainable fashion with new clothing line.',
    imageUrl: 'https://picsum.photos/800/602',
    isVideo: false,
    fullContent: 'Deepika Padukone has launched her own sustainable fashion line, focusing on contemporary Indian wear with a modern twist. The collection features eco-friendly materials and traditional craftsmanship.',
  },
];

interface NewsContextType {
  newsItems: NewsItem[];
  getNewsItem: (id: string) => NewsItem | undefined;
}

const NewsContext = createContext<NewsContextType | undefined>(undefined);

export const NewsProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [newsItems] = useState<NewsItem[]>(mockData);

  const getNewsItem = (id: string) => {
    return newsItems.find(item => item.id === id);
  };

  return (
    <NewsContext.Provider value={{ newsItems, getNewsItem }}>
      {children}
    </NewsContext.Provider>
  );
};

export const useNews = () => {
  const context = useContext(NewsContext);
  if (context === undefined) {
    throw new Error('useNews must be used within a NewsProvider');
  }
  return context;
};