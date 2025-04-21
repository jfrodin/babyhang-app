// screens/HomeScreen.tsx

import React from "react";
import { View, Text, Image, Pressable } from "react-native";
import { globalStyles } from "../styles/globalStyles";
import { colors } from "../styles/theme";

// Navigation prop
export default function HomeScreen({ navigation }: any) {
  return (
    <View style={globalStyles.containerCenter}>
      {/* Ikon */}
      <Image
        source={require("../assets/baby-icon.png")}
        style={globalStyles.babyIcon}
        resizeMode="contain"
      />

      {/* Titel */}
      <Text style={globalStyles.titleText}>Hej och välkommen till Babyhäng! 👶</Text>

      {/* Info */}
      <Text style={{ color: colors.text, marginTop: 20, marginBottom: 10 }}>
        Här kommer du kunna skapa och hitta event nära dig.
      </Text>

      {/* Navigera till profilsida */}
      <Pressable onPress={() => navigation.navigate("Profile")}>
        <Text style={{ color: colors.heading, marginTop: 30 }}>
          Gå till din profil
        </Text>
      </Pressable>
    </View>
  );
}
