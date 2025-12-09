import { useState } from "react";
import {
  Box,
  Button,
  Heading,
  Input,
  VStack,
  Text,
  IconButton,
  HStack,
  Field,
} from "@chakra-ui/react";
import { AiOutlineEye, AiOutlineEyeInvisible } from "react-icons/ai";
import { Link } from "react-router-dom";
import useThemeColors from "@/hooks/useThemeColors";

export default function Login() {
  const [showPassword, setShowPassword] = useState(false);

  const {
    bgMain,
    bgCard,
    shadowCard,
    borderDefault,
    accentPrimary,
    accentPrimaryHover,
    textPrimary,
    textMuted,
    buttonText,
    bgInput,
    borderInput,
    borderInputError,
    borderInputFocus,
    placeholderInput,
  } = useThemeColors();

  return (
    <Box
      minH="100vh"
      bg={bgMain}
      display="flex"
      alignItems="center"
      justifyContent="center"
      p={4}
    >
      <Box
        w="100%"
        maxW="420px"
        bg={bgCard}
        borderRadius="xl"
        boxShadow={shadowCard}
        p={8}
        border="1px solid"
        borderColor={borderDefault}
      >
        {/* Header */}
        <VStack mb={8}>
          <Heading size="lg" color={textPrimary} textAlign="center">
            Login to Your Account
          </Heading>
        </VStack>

        {/* FORM (no validation – ready for react-hook-form) */}
        <VStack as="form" gap={6}>
          {/* EMAIL FIELD */}
          <Field.Root invalid={true}>
            <Field.Label>
              Email Address <Field.RequiredIndicator />
            </Field.Label>

            <Input
              type="email"
              placeholder="Enter your email"
              bg={bgInput}
              border="2px solid"
              _invalid={{ borderColor: borderInputError }}
              borderColor={borderInput}
              _placeholder={{ color: placeholderInput }}
              color={textPrimary}
              _hover={{ borderColor: borderInputFocus }}
              _focus={{
                borderColor: borderInputFocus,
                boxShadow: `0 0 0 1px ${borderInputFocus}`,
              }}
              h="48px"
              borderRadius="lg"
            />

          </Field.Root>

          {/* PASSWORD FIELD */}
          <Field.Root>
            <Field.Label>
              Password <Field.RequiredIndicator />
            </Field.Label>

            <Box position="relative" width={"full"}>
              <Input
                type={showPassword ? "text" : "password"}
                placeholder="Enter your password"
                bg={bgInput}
                border="2px solid"
                _invalid={{ borderColor: borderInputError }}
                borderColor={borderInput}
                _placeholder={{ color: placeholderInput }}
                color={textPrimary}
                _hover={{ borderColor: borderInputFocus }}
                _focus={{
                  borderColor: borderInputFocus,
                  boxShadow: `0 0 0 1px ${borderInputFocus}`,
                }}
                h="48px"
                borderRadius="lg"
                pr="48px"
              />

              <IconButton
                aria-label="toggle password"
                onClick={() => setShowPassword(!showPassword)}
                variant="ghost"
                size="md"
                position="absolute"
                right={1}
                top="50%"
                transform="translateY(-50%)"
                color={textMuted}
                _hover={{ bg: "transparent", color: accentPrimary }}
              >
                {showPassword ? (
                  <AiOutlineEyeInvisible size={20} />
                ) : (
                  <AiOutlineEye size={20} />
                )}
              </IconButton>
            </Box>

          </Field.Root>

          {/* Forgot Password */}
          <HStack justifyContent="flex-end" w="100%">
            <Link to="/forgot-password" style={{ textDecoration: "none" }}>
              <Text
                color={accentPrimary}
                fontSize="sm"
                fontWeight="medium"
                _hover={{ textDecoration: "underline" }}
              >
                Forgot password?
              </Text>
            </Link>
          </HStack>

          {/* Submit */}
          <Button
            type="submit"
            w="100%"
            h="48px"
            bg={accentPrimary}
            color={buttonText}
            borderRadius="lg"
            fontWeight="semibold"
            _hover={{ bg: accentPrimaryHover }}
            transition="all 0.2s"
          >
            Sign In
          </Button>
        </VStack>

        {/* FOOTER */}
        <HStack justifyContent="center" mt={6}>
          <Text color={textMuted}>Don't have an account?</Text>
          <Link to="/register" style={{ textDecoration: "none" }}>
            <Text
              color={accentPrimary}
              fontWeight="semibold"
              _hover={{ textDecoration: "underline" }}
            >
              Sign up
            </Text>
          </Link>
        </HStack>
      </Box>
    </Box>
  );
}
