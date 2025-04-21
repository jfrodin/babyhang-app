// screens/RegisterScreen.tsx

// Importerar React och hooks
import React, { useState } from "react";
import {
  View,
  Text,
  TextInput,
  Pressable,
  ActivityIndicator,
  Alert,
  Image,
  TouchableOpacity,
} from "react-native";

// Importerar font och Firebase-auth
import { useFonts, DancingScript_400Regular } from "@expo-google-fonts/dancing-script";
import { createUserWithEmailAndPassword } from "firebase/auth";
import { auth } from "../firebase/firebase";

// Importerar gemensam stil och färger
import { globalStyles } from "../styles/globalStyles";
import { colors } from "../styles/theme";

// Importerar navigationstyper
import { NativeStackNavigationProp } from "@react-navigation/native-stack";
import { RootStackParamList } from "../types/navigation"; // skapa denna om den inte finns

// Navigation-props för stacknavigering
type Props = {
  navigation: NativeStackNavigationProp<RootStackParamList, "Register">;
};

export default function RegisterScreen({ navigation }: Props) {
  // State för formulärfält
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);

  // Laddar fonten
  const [fontsLoaded] = useFonts({
    DancingScript_400Regular,
  });

  // Visa inget om fonten inte laddats än
  if (!fontsLoaded) return null;

  // Hanterar registrering via Firebase Auth
  const handleRegister = async () => {
    setLoading(true);
    try {
      // Skapar nytt konto
      const userCredential = await createUserWithEmailAndPassword(auth, email, password);
      navigation.navigate("Home");

    } catch (error: any) {
      // Fel vid registrering
      Alert.alert("Fel vid registrering", error.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <View style={globalStyles.containerCenter}>
      {/* Bebisikon högst upp */}
      <Image
        source={require("../assets/baby-icon.png")}
        style={globalStyles.babyIcon}
        resizeMode="contain"
      />

      {/* Titel och introduktion */}
      <Text style={globalStyles.titleText}>Skapa konto</Text>
      <Text style={globalStyles.signatureText}>Välkommen till Babyhäng</Text>

      {/* E-postfält */}
      <TextInput
        style={globalStyles.inputField}
        placeholder="E-post"
        value={email}
        onChangeText={setEmail}
        autoCapitalize="none"
        keyboardType="email-address"
        placeholderTextColor={colors.inputPlaceholder}
      />

      {/* Lösenordsfält */}
      <TextInput
        style={globalStyles.inputField}
        placeholder="Lösenord"
        value={password}
        onChangeText={setPassword}
        secureTextEntry
        placeholderTextColor={colors.inputPlaceholder}
      />

      {/* Laddar eller visar registreringsknapp */}
      {loading ? (
        <ActivityIndicator size="large" color={colors.accent} />
      ) : (
        <Pressable style={globalStyles.button} onPress={handleRegister}>
          <Text style={globalStyles.buttonText}>Registrera</Text>
        </Pressable>
      )}

      {/* Länk tillbaka till inloggning, vänsterjusterad */}
      <TouchableOpacity
        onPress={() => navigation.navigate("Login")}
        style={{ alignSelf: "flex-start", marginTop: 10 }}
      >
        <Text style={{ color: colors.heading, fontSize: 14 }}>
          Har du redan ett konto? Logga in här
        </Text>
      </TouchableOpacity>
    </View>
  );
}
