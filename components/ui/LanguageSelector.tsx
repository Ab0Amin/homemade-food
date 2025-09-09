import React from "react";
import { View, StyleSheet, Pressable } from "react-native";
import { Text } from "@/components/Themed";
import { useLocalization } from "@/constants/localization";
import {
  useThemeColors,
  spacing,
  borderRadius,
  typography,
} from "@/constants/Theme";
import type { Language } from "@/constants/localization";

interface LanguageSelectorProps {
  style?: any;
}

export const LanguageSelector: React.FC<LanguageSelectorProps> = ({
  style,
}) => {
  const { language, setLanguage, isRTL } = useLocalization();
  const { colors } = useThemeColors();

  const languages: { code: Language; name: string; nativeName: string }[] = [
    { code: "en", name: "English", nativeName: "English" },
    { code: "ar", name: "Arabic", nativeName: "العربية" },
  ];

  return (
    <View style={[styles.container, style]}>
      {languages.map((lang) => (
        <Pressable
          key={lang.code}
          style={[
            styles.languageButton,
            {
              backgroundColor:
                language === lang.code ? colors.primary : colors.secondary,
              borderColor: colors.border,
            },
          ]}
          onPress={() => setLanguage(lang.code)}
        >
          <Text
            style={[
              styles.languageText,
              {
                color:
                  language === lang.code
                    ? colors.primaryForeground
                    : colors.secondaryForeground,
              },
            ]}
          >
            {lang.nativeName}
          </Text>
        </Pressable>
      ))}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flexDirection: "row",
    gap: spacing.sm,
    justifyContent: "flex-start", // تغيير من center إلى flex-start
    marginVertical: spacing.sm, // تقليل المسافة العمودية
    flexWrap: "wrap", // للسماح بالتفاف في حالة الشاشات الصغيرة
  },
  languageButton: {
    paddingHorizontal: spacing.lg,
    paddingVertical: spacing.md, // زيادة المسافة العمودية قليلاً
    borderRadius: borderRadius.md,
    borderWidth: 1,
    minWidth: 100, // زيادة العرض الأدنى
    alignItems: "center",
  },
  languageText: {
    fontSize: typography.fontSize.base, // زيادة حجم الخط
    fontWeight: "500",
  },
});
