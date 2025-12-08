import { useColorModeValue } from "@/components/ui/color-mode";
import { themeColors } from "@/constants";

export const useThemeColors = () => ({
  bgMain: useColorModeValue(themeColors.bg.main.light, themeColors.bg.main.dark),
  bgCard: useColorModeValue(themeColors.bg.card.light, themeColors.bg.card.dark),
  bgHover: useColorModeValue(themeColors.bg.hover.light, themeColors.bg.hover.dark),
  textPrimary: useColorModeValue(themeColors.text.primary.light, themeColors.text.primary.dark),
  textSecondary: useColorModeValue(themeColors.text.secondary.light, themeColors.text.secondary.dark),
  textMuted: useColorModeValue(themeColors.text.muted.light, themeColors.text.muted.dark),
  borderDefault: useColorModeValue(themeColors.border.default.light, themeColors.border.default.dark),
  borderHover: useColorModeValue(themeColors.border.hover.light, themeColors.border.hover.dark),
});
