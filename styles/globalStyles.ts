// styles/globalStyles.ts
import { StyleSheet } from "react-native";
import { colors, spacing, fonts, sizes } from "./theme";

export const globalStyles = StyleSheet.create({
  containerCenter: {
    flex: 1,
    backgroundColor: colors.background,
    justifyContent: "center",
    paddingHorizontal: spacing.lg,
    alignItems: "center",
  },
  babyIcon: {
    width: 150,
    height: 150,
    borderRadius: 75,
    marginBottom: spacing.md,
    borderWidth: 2,
    borderColor: colors.accent,
  },
  titleText: {
    fontSize: sizes.title,
    fontWeight: "bold",
    color: colors.heading,
    textAlign: "center",
  },
  signatureText: {
    fontSize: sizes.text,
    fontFamily: fonts.script,
    color: colors.signature,
    marginBottom: spacing.lg,
  },
  inputField: {
    backgroundColor: colors.inputBackground,
    padding: spacing.md,
    borderRadius: 10,
    marginBottom: spacing.sm,
    fontSize: sizes.text,
    color: colors.text,
    width: "100%",
  },
  button: {
    backgroundColor: colors.accent,
    paddingVertical: spacing.md,
    borderRadius: 10,
    alignItems: "center",
    marginTop: spacing.sm,
    width: "100%",
  },
  buttonText: {
    color: "#fff",
    fontSize: sizes.text,
    fontWeight: "bold",
  },
});
