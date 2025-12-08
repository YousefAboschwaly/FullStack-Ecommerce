import { useColorModeValue } from '@/components/ui/color-mode';
import { themeColors } from '@/constants';

// Custom hook that returns all themed colors using useColorModeValue
export const useThemeColors = () => {
  // Background colors
  const bgMain = useColorModeValue(themeColors.bg.main.light, themeColors.bg.main.dark);
  const bgCard = useColorModeValue(themeColors.bg.card.light, themeColors.bg.card.dark);
  const bgSkeleton = useColorModeValue(themeColors.bg.Skeleton.light, themeColors.bg.Skeleton.dark);
  const bgCardHover = useColorModeValue(themeColors.bg.cardHover.light, themeColors.bg.cardHover.dark);
  const bgOverlay = useColorModeValue(themeColors.bg.overlay.light, themeColors.bg.overlay.dark);
  const bgCardTranslucent = useColorModeValue(themeColors.bg.cardTranslucent.light, themeColors.bg.cardTranslucent.dark);

  // Text colors
  const textPrimary = useColorModeValue(themeColors.text.primary.light, themeColors.text.primary.dark);
  const textSecondary = useColorModeValue(themeColors.text.secondary.light, themeColors.text.secondary.dark);
  const textMuted = useColorModeValue(themeColors.text.muted.light, themeColors.text.muted.dark);

  // Border colors
  const borderDefault = useColorModeValue(themeColors.border.default.light, themeColors.border.default.dark);
  const borderAccent = themeColors.border.accent.light; // Same for both modes
  const borderHover = useColorModeValue(themeColors.border.hover.light, themeColors.border.hover.dark);

  // Accent colors
  const accentPrimary = themeColors.accent.primary;
  const accentPrimaryHover = themeColors.accent.primaryHover;
  const accentSecondary = useColorModeValue(themeColors.accent.secondary.light, themeColors.accent.secondary.dark);

  // Button colors
  const buttonPrimary = useColorModeValue(themeColors.button.primary.light, themeColors.button.primary.dark);
  const buttonPrimaryHover = useColorModeValue(themeColors.button.primaryHover.light, themeColors.button.primaryHover.dark);
  const buttonText = useColorModeValue(themeColors.button.text.light, themeColors.button.text.dark);

  // Skeleton colors
  const skeletonBase = useColorModeValue(themeColors.skeleton.base.light, themeColors.skeleton.base.dark);
  const skeletonShine = useColorModeValue(themeColors.skeleton.shine.light, themeColors.skeleton.shine.dark);

  // Shadow colors
  const shadowCard = useColorModeValue(themeColors.shadow.card.light, themeColors.shadow.card.dark);
  const shadowButton = useColorModeValue(themeColors.shadow.button.light, themeColors.shadow.button.dark);

  // Gradient colors
  const gradientCardBg = useColorModeValue(themeColors.gradient.cardBg.light, themeColors.gradient.cardBg.dark);
  const gradientButton = useColorModeValue(themeColors.gradient.button.light, themeColors.gradient.button.dark);
  const gradientPrice = useColorModeValue(themeColors.gradient.price.light, themeColors.gradient.price.dark);
  const gradientLogo = themeColors.gradient.logo.light; // Same for both modes

  // Add to useThemeColors hook:
const badgeCategoryBg = useColorModeValue(themeColors.badge.category.bg.light, themeColors.badge.category.bg.dark);
const badgeCategoryText = useColorModeValue(themeColors.badge.category.text.light, themeColors.badge.category.text.dark);
const badgeCategoryBorder = useColorModeValue(themeColors.badge.category.border.light, themeColors.badge.category.border.dark);

  // Status colors
  const statusError = themeColors.status.error;
  const statusErrorBg = themeColors.status.errorBg;
  const statusSuccess = themeColors.status.success;
  const statusWarning = themeColors.status.warning;

  return {
    // Backgrounds
    bgMain,
    bgCard,
    bgSkeleton,
    bgCardHover,
    bgOverlay,
    bgCardTranslucent,

    // Text
    textPrimary,
    textSecondary,
    textMuted,

    // Borders
    borderDefault,
    borderAccent,
    borderHover,

    // Accents
    accentPrimary,
    accentPrimaryHover,
    accentSecondary,

    // Buttons
    buttonPrimary,
    buttonPrimaryHover,
    buttonText,

    // Skeleton
    skeletonBase,
    skeletonShine,

    // Shadows
    shadowCard,
    shadowButton,

    // Gradients
    gradientCardBg,
    gradientButton,
    gradientPrice,
    gradientLogo,

    // Badges
    badgeCategoryBg,
    badgeCategoryText,
    badgeCategoryBorder,
    // Status
    statusError,
    statusErrorBg,
    statusSuccess,
    statusWarning,
  };
};

export default useThemeColors;
