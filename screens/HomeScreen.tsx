// screens/HomeScreen.tsx

// Startsidan efter inloggning – översikt och nav
import React from "react";
import { View, Text, Image, StyleSheet } from "react-native";
import { globalStyles } from "../styles/globalStyles";
import { colors, spacing } from "../styles/theme";

// Hemskärm för inloggade användare
export default function HomeScreen() {
  return (
    <View style={globalStyles.containerCenter}>
      {/* Bebisikon – återanvänd från login */}
      <Image
        source={require("../assets/baby-icon.png")}
        style={styles.babyIcon}
        resizeMode="contain"
      />

      {/* Välkomsttitel */}
      <Text style={globalStyles.titleText}>Hej och välkommen till Babyhäng! 👶</Text>

      {/* Underrubrik */}
      <Text style={styles.subtitle}>Här kan du:</Text>

      {/* Lista med saker du kan göra */}
      <Text style={styles.point}>• Skapa event</Text>
      <Text style={styles.point}>• Se vad som händer nära dig</Text>
      <Text style={styles.point}>• Hänga med andra småbarnsföräldrar</Text>
    </View>
  );
}

// Lokala specialstilar – endast om de inte finns globalt än
const styles = StyleSheet.create({
  babyIcon: {
    width: 120,
    height: 120,
    borderRadius: 60,
    marginBottom: spacing.md,
    borderWidth: 2,
    borderColor: colors.accent,
  },
  subtitle: {
    fontSize: 18,
    color: colors.text,
    marginBottom: spacing.sm,
    marginTop: spacing.sm,
  },
  point: {
    fontSize: 16,
    color: colors.text,
    marginBottom: 4,
  },
});
