// screens/LoginScreen.tsx

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
import { signInWithEmailAndPassword } from "firebase/auth";
import { auth } from "../firebase/firebase";

// Importerar gemensam stil och färger
import { globalStyles } from "../styles/globalStyles";
import { colors } from "../styles/theme";

// Importerar navigationstyper
import { NativeStackNavigationProp } from "@react-navigation/native-stack";
import { RootStackParamList } from "../types/navigation"; // skapa denna om du inte gjort det

// Navigation-props för stacknavigering
type Props = {
  navigation: NativeStackNavigationProp<RootStackParamList, "Login">;
};

export default function LoginScreen({ navigation }: Props) {
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

  // Hanterar inloggning via Firebase Auth
  const handleLogin = async () => {
    setLoading(true);
    try {
      // Försöker logga in användaren
      const userCredential = await signInWithEmailAndPassword(auth, email, password);
      navigation.navigate("Home"); // 👈 Navigera vidare efter inloggning

    } catch (error: any) {
      // Fel vid inloggning
      Alert.alert("Fel vid inloggning", error.message);
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

      {/* Titel och signatur */}
      <Text style={globalStyles.titleText}>Välkommen till Babyhäng</Text>
      <Text style={globalStyles.signatureText}>Skapad av Joakim Frödin</Text>

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

      {/* Laddar eller visar login-knapp */}
      {loading ? (
        <ActivityIndicator size="large" color={colors.accent} />
      ) : (
        <Pressable style={globalStyles.button} onPress={handleLogin}>
          <Text style={globalStyles.buttonText}>Logga in</Text>
        </Pressable>
      )}

      {/* Länk till registrering, vänsterjusterad */}
      <TouchableOpacity
        onPress={() => navigation.navigate("Register")}
        style={{ alignSelf: "flex-start", marginTop: 10 }}
      >
        <Text style={{ color: colors.heading, fontSize: 14 }}>
          Inget konto? Registrera dig här
        </Text>
      </TouchableOpacity>
    </View>
  );
}
