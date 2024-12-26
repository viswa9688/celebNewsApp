import type { NativeStackScreenProps } from '@react-navigation/native-stack';

export type RootStackParamList = {
  NewsFeed: undefined;
  NewsDetail: { id: string };
};

export type NewsDetailScreenProps = NativeStackScreenProps<
  RootStackParamList,
  'NewsDetail'
>;

export type NewsFeedScreenProps = NativeStackScreenProps<
  RootStackParamList,
  'NewsFeed'
>;