import type { NativeStackScreenProps } from '@react-navigation/native-stack';
import type { NewsItem } from './index';

export type RootStackParamList = {
  NewsFeed: undefined;
  NewsDetail: {
    id: string;
    newsItems: NewsItem[];
    index: number;
  };
};

export type NewsDetailScreenProps = NativeStackScreenProps<
  RootStackParamList,
  'NewsDetail'
>;

export type NewsFeedScreenProps = NativeStackScreenProps<
  RootStackParamList,
  'NewsFeed'
>;