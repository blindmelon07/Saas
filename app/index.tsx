import React from 'react';
import { View, Text, Image, TouchableOpacity, SafeAreaView } from 'react-native';
import { useThemeColors } from '@/hooks/useThemeColors';
import { useTheme } from '@/context/ThemeContext';
import { LinearGradient } from 'expo-linear-gradient';

type Feature = {
  icon: string;
  text: string; 
  description: string;
};

const features: Feature[] = [
  { icon: '🍭', text: 'Select Color', description: 'Select Color' },
  { icon: '📷', text: 'Choose photo', description: 'Select photo' },
  { icon: '✨', text: 'Generate Fill', description: 'Generate a fill' },
  { icon: '✂️', text: 'Remove object', description: 'Remove object' },
];

const WelcomeScreen: React.FC = () => {
  const colors = useThemeColors();
  const { currentTheme } = useTheme();

  return (
    <SafeAreaView className={`flex-1 ${currentTheme === 'dark' ? 'bg-gray-900' : 'bg-white'}`}>
      <View className="items-center px-5 py-10">
        <Image
          source={require('@/assets/images/school.png')}
          className="w-[10px] h-[10px] mb-6"
          resizeMode="contain"
        />
        <Text className={`text-28 font-bold text-center mb-3 ${currentTheme === 'dark' ? 'text-white' : 'text-gray-900'}`}>
          HairCut App
        </Text>
        <Text className={`text-base text-center mb-6 ${currentTheme === 'dark' ? 'text-gray-300' : 'text-gray-700'}`}>
          Welcome to the HairCut App! Here you can select colors, choose photos, generate fills, and remove objects with ease.
        </Text>
        {/* Example usage of features */}
        {features.map((feature, index) => (
          <View key={index} className="flex-row items-center mb-3">
            <Text className="text-2xl mr-3">{feature.icon}</Text>
            <View>
              <Text className="font-medium text-base text-gray-700 dark:text-gray-200">{feature.text}</Text>
              <Text className="text-sm text-gray-500 dark:text-gray-400">{feature.description}</Text>
            </View>
          </View>
        ))}
      </View>
    </SafeAreaView>
  );
};

export default WelcomeScreen;
