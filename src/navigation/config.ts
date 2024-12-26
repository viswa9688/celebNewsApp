import { NativeStackNavigationOptions } from '@react-navigation/native-stack';

export const defaultScreenOptions: NativeStackNavigationOptions = {
  headerStyle: {
    backgroundColor: '#fff',
  },
  headerTintColor: '#FF2D55',
  headerTitleStyle: {
    fontWeight: '700',
  },
  animation: 'slide_from_right',
};