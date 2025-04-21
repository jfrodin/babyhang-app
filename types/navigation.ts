// types/navigation.ts

// Den här typen definierar alla skärmar i appens stack-navigering.
// Används för att få typsäker navigation (t.ex. navigation.navigate("Login"))
export type RootStackParamList = {
    Login: undefined;     // Login-skärm, inga parametrar
    Register: undefined;  // Register-skärm, inga parametrar
    Home: undefined;      // Huvudskärm efter inloggning
  };
  