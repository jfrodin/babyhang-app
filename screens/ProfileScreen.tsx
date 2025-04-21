// screens/ProfileScreen.tsx

import React, { useEffect, useState } from "react";
import {
  View,
  Text,
  TextInput,
  Pressable,
  Alert,
  ActivityIndicator,
  Image,
  FlatList,
  Platform,
} from "react-native";
import { DateTimePickerAndroid } from "@react-native-community/datetimepicker";
import { format } from "date-fns";

import { auth } from "../firebase/firebase";
import { db } from "../firebase/firebase";
import { doc, setDoc, getDoc } from "firebase/firestore";

import { globalStyles } from "../styles/globalStyles";
import { colors } from "../styles/theme";

// Typ för varje barn
type Child = {
  name: string;
  birthdate: string; // YYYY-MM-DD
};

export default function ProfileScreen({ navigation }: any) {
  const user = auth.currentUser;
  const uid = user?.uid;

  const [loading, setLoading] = useState(true);
  const [name, setName] = useState("");
  const [city, setCity] = useState("");

  const [children, setChildren] = useState<Child[]>([]);

  // Formulärfält för nytt barn
  const [newChildName, setNewChildName] = useState("");
  const [newChildBirthdate, setNewChildBirthdate] = useState<Date | null>(null);

  // Hämtar användardata från Firestore
  useEffect(() => {
    const fetchUserData = async () => {
      if (!uid) return;
      try {
        const userDoc = await getDoc(doc(db, "users", uid));
        if (userDoc.exists()) {
          const data = userDoc.data();
          setName(data.name || "");
          setCity(data.city || "");
          setChildren(data.children || []);
        }
      } catch (error: any) {
        Alert.alert("Fel vid hämtning", error.message);
      } finally {
        setLoading(false);
      }
    };
    fetchUserData();
  }, []);

  // Öppna datumväljaren (endast Android, iOS behöver egen lösning)
  const openDatePicker = () => {
    DateTimePickerAndroid.open({
      value: newChildBirthdate || new Date(),
      mode: "date",
      is24Hour: true,
      onChange: (_event, selectedDate) => {
        if (selectedDate) setNewChildBirthdate(selectedDate);
      },
    });
  };

  // Räkna ut ålder i år + månader
  const calculateAge = (birthdate: string) => {
    const birth = new Date(birthdate);
    const now = new Date();
    let years = now.getFullYear() - birth.getFullYear();
    let months = now.getMonth() - birth.getMonth();
    if (months < 0) {
      years--;
      months += 12;
    }
    return `${years} år${months > 0 ? ` ${months} mån` : ""}`;
  };

  // Lägg till nytt barn i listan
  const handleAddChild = () => {
    if (!newChildName || !newChildBirthdate) {
      Alert.alert("Fyll i alla fält", "Ange både namn och födelsedatum");
      return;
    }
    const newChild: Child = {
      name: newChildName,
      birthdate: format(newChildBirthdate, "yyyy-MM-dd"),
    };
    setChildren([...children, newChild]);
    setNewChildName("");
    setNewChildBirthdate(null);
  };

  // Spara profilen + barn i Firestore
  const handleSave = async () => {
    if (!uid) return;
    try {
      await setDoc(doc(db, "users", uid), {
        name,
        city,
        children,
      });
      Alert.alert("Sparat", "Din profil har uppdaterats.");
    } catch (error: any) {
      Alert.alert("Fel vid sparande", error.message);
    }
  };

  if (loading) {
    return (
      <View style={globalStyles.containerCenter}>
        <ActivityIndicator size="large" color={colors.accent} />
      </View>
    );
  }

  return (
    <View style={globalStyles.containerCenter}>
      <Image
        source={require("../assets/baby-icon.png")}
        style={globalStyles.babyIcon}
        resizeMode="contain"
      />

      <Text style={globalStyles.titleText}>Din profil</Text>
      <Text style={{ color: colors.text, marginBottom: 20 }}>{user?.email}</Text>

      {/* Användarinfo */}
      <TextInput
        style={globalStyles.inputField}
        placeholder="Ditt namn"
        value={name}
        onChangeText={setName}
      />
      <TextInput
        style={globalStyles.inputField}
        placeholder="Stad"
        value={city}
        onChangeText={setCity}
      />

      {/* Lista med barn */}
      <Text style={{ fontWeight: "bold", marginTop: 20, marginBottom: 10 }}>
        Dina barn
      </Text>
      <FlatList
        data={children}
        keyExtractor={(item, index) => index.toString()}
        renderItem={({ item }) => (
          <Text style={{ color: colors.text }}>
            • {item.name} ({calculateAge(item.birthdate)})
          </Text>
        )}
        ListEmptyComponent={<Text style={{ color: "#999" }}>Inga barn tillagda än</Text>}
      />

      {/* Formulär för nytt barn */}
      <TextInput
        style={globalStyles.inputField}
        placeholder="Barnets namn"
        value={newChildName}
        onChangeText={setNewChildName}
      />

      <Pressable
        style={[globalStyles.button, { marginBottom: 10 }]}
        onPress={openDatePicker}
      >
        <Text style={globalStyles.buttonText}>
          {newChildBirthdate
            ? `Födelsedatum: ${format(newChildBirthdate, "yyyy-MM-dd")}`
            : "Välj födelsedatum"}
        </Text>
      </Pressable>

      <Pressable
        style={[globalStyles.button, { marginBottom: 10 }]}
        onPress={handleAddChild}
      >
        <Text style={globalStyles.buttonText}>Lägg till barn</Text>
      </Pressable>

      <Pressable style={globalStyles.button} onPress={handleSave}>
        <Text style={globalStyles.buttonText}>Spara profil</Text>
      </Pressable>
    </View>
  );
}
