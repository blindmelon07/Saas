import { useTheme } from '@/context/ThemeContext';
import { useThemeColors } from '@/hooks/useThemeColors';
import { LinearGradient } from 'expo-linear-gradient';
import { router } from 'expo-router';
import React from 'react';
import { Image, SafeAreaView, Text, TouchableOpacity, View } from 'react-native';

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
          style={{ width: 100, height: 100, marginBottom: 24 }}
          resizeMode="contain"
        />
        <Text
          className={`text-28 font-bold text-center mb-3 ${
            currentTheme === 'dark' ? 'text-white' : 'text-gray-900'
          }`}
        >
          HairCut App
        </Text>
        <Text
          className={`text-base text-center mb-6 ${
            currentTheme === 'dark' ? 'text-gray-300' : 'text-gray-700'
          }`}
        >
          Welcome to the HairCut App! Here you can select colors, choose photos, generate fills, and remove objects with ease.
        </Text>

        {features.map((feature, index) => (
          <View key={index} className="flex-row items-center mb-3">
            <Text className="mr-3 text-2xl">{feature.icon}</Text>
            <View>
              <Text className="text-base font-medium text-gray-700 dark:text-gray-200">{feature.text}</Text>
              <Text className="text-sm text-gray-500 dark:text-gray-400">{feature.description}</Text>
            </View>
          </View>
        ))}

        <View className="w-full p-5">
          <TouchableOpacity
            className="h-[54px] rounded-xl border-[1.5px] justify-center items-center mb-4"
            style={{ borderColor: colors.primary }}
            onPress={() => router.push('/sign-in')}
          >
            <Text className="font-medium text-gray-800 dark:text-white">Sign In</Text>
          </TouchableOpacity>

          <LinearGradient
            colors={['#FF6B6B', '#FFD93D']}
            start={{ x: 0, y: 0 }}
            end={{ x: 1, y: 1 }}
            style={{
              borderRadius: 12,
              marginBottom: 16,
              height: 54,
             
            }}
          >
            <TouchableOpacity
              className="items-center justify-center flex-1"
              onPress={() => router.push('/signup')}>
            <Text className="font-medium text-white">Create Account</Text>
            </TouchableOpacity>
          </LinearGradient>
        </View>
        <Text>
          Transform your hair with our app!
        </Text>
      </View>
    </SafeAreaView>
  );
};

export default WelcomeScreen;
