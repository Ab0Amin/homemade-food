import { StyleSheet, ScrollView } from "react-native";

import EditScreenInfo from "@/components/EditScreenInfo";
import { Text, View } from "@/components/Themed";
import { DatabaseTestCard } from "@/components/ui";
import { useLocalization } from "@/constants/localization";
import { useThemeColors, spacing } from "@/constants/Theme";

export default function TabOneScreen() {
  const { t } = useLocalization();
  const { colors } = useThemeColors();

  return (
    <ScrollView
      style={[styles.container, { backgroundColor: colors.background }]}
    >
      <View style={styles.content}>
        <Text style={[styles.title, { color: colors.foreground }]}>
          {t("navigation.home")}
        </Text>

        <DatabaseTestCard />

        <View
          style={styles.separator}
          lightColor="#eee"
          darkColor="rgba(255,255,255,0.1)"
        />
        <EditScreenInfo path="app/(tabs)/index.tsx" />
      </View>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  content: {
    padding: spacing.lg,
    alignItems: "center",
  },
  title: {
    fontSize: 20,
    fontWeight: "bold",
    marginBottom: spacing.lg,
  },
  separator: {
    marginVertical: 30,
    height: 1,
    width: "80%",
  },
});
