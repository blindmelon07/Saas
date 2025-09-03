import { useThemeColors } from '@/hooks/useThemeColors';
import { LinearGradient } from 'expo-linear-gradient';
import React, { ReactNode } from 'react';
import { StyleSheet, Text, TouchableOpacity, View, ViewStyle } from 'react-native';


interface GradientCardProps { 
    onPress: () => void;
    gradientColors?: readonly [string, string, ...string[]];
    children: ReactNode;
    badgeText?: string;
    badgeVisible?: boolean;
    style?: ViewStyle;
    disabled?: boolean;
    shadowColor?: string;

}
const GradientCard: React.FC<GradientCardProps> = ({
    onPress,
    gradientColors,
    children,
    badgeText = 'Popular',
    badgeVisible = false,
    style,
    disabled = false,
    shadowColor,
}) => {
    const colors = useThemeColors();
    const defaultColors: readonly [string, string, ...string[]] = [colors.card, colors.surface];
    const cardGradient = gradientColors || defaultColors;
    const cardShadowColor = shadowColor || colors.primary;
    return (
        <TouchableOpacity
        onPress={onPress}
        disabled={disabled}
        className="mb-4"
        style={[
            styles.container,
            {
                shadowColor: cardShadowColor,
            },
            style,
        ]}
        >
            <LinearGradient
                colors={cardGradient}
                start={{ x: 0, y: 0 }}
                end={{ x: 1, y: 1 }}
                className="p-6 border border-gray-200
                dark:border-gray-700"
                style={styles.gradient}
            >
                {badgeVisible && (
                    <View
                        className="absolute top-0 right-0 px-3 py-1
                        rounded-bl-2xl"
                        style={{backgroundColor: colors.primary}}>
                            <Text className="text-white text-sm font-semibold">
                                {badgeText}
                            </Text>
                    </View>
                )}
                {children}
            </LinearGradient>
       
        </TouchableOpacity>
    );

};
const styles = StyleSheet.create({
    container: {
        textShadowOffset: { width: 0, height: 0 },
        shadowOpacity: 0.2,
        shadowRadius: 10,
        elevation: 5,
    },
    gradient: {
        borderRadius: 24,
        overflow: 'hidden',
    },
});
export default GradientCard;