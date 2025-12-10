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
import { useForm } from "react-hook-form";
import { loginSchema } from "@/validation";
import { useLoginMutation } from "../app/services/authApi";

interface IFormInput {
  email: string;
  password: string;
}
export default function Login() {
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
  const [showPassword, setShowPassword] = useState(false);
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<IFormInput>();
  const { email, password } = loginSchema;
  const [login,{isLoading}] = useLoginMutation()

  const onSubmit = async (data: IFormInput) => {
    console.log(data);
    if (Object.keys(errors).length === 0) {
      // Call login API
    await  login({identifier: data.email, password: data.password}); 
    }
  };
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
        <VStack as="form" gap={6} onSubmit={handleSubmit(onSubmit)}>
          {/* EMAIL FIELD */}
          <Field.Root invalid={!!errors.email}>
            <Field.Label>
              Email Address <Field.RequiredIndicator />
            </Field.Label>

            <Input
              type="email"
              {...register("email", email)}
              placeholder="Enter your email"
              bg={bgInput}
              border="2px solid"
              borderColor={errors.email ? borderInputError : borderInput}
              _placeholder={{ color: placeholderInput }}
              color={textPrimary}
              _hover={{
                borderColor: errors.email ? borderInputError : borderInputFocus,
              }}
              _focus={{
                borderColor: errors.email ? borderInputError : borderInputFocus,
                boxShadow: `0 0 0 1px ${
                  errors.email ? borderInputError : borderInputFocus
                }`,
              }}
              h="48px"
              borderRadius="lg"
            />

            {errors.email && (
              <Field.ErrorText>{errors.email.message}</Field.ErrorText>
            )}
          </Field.Root>

          {/* PASSWORD FIELD */}
          <Field.Root invalid={!!errors.password}>
            <Field.Label>
              Password <Field.RequiredIndicator />
            </Field.Label>

            <Box position="relative" width={"full"}>
              <Input
                type={showPassword ? "text" : "password"}
                placeholder="Enter your password"
                {...register("password", password)}
                bg={bgInput}
                border="2px solid"
                borderColor={errors.password ? borderInputError : borderInput}
                _placeholder={{ color: placeholderInput }}
                color={textPrimary}
                _hover={{
                  borderColor: errors.password
                    ? borderInputError
                    : borderInputFocus,
                }}
                _focus={{
                  borderColor: errors.password
                    ? borderInputError
                    : borderInputFocus,
                  boxShadow: `0 0 0 1px ${
                    errors.password ? borderInputError : borderInputFocus
                  }`,
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
            {errors.password && (
              <Field.ErrorText>{errors.password.message}</Field.ErrorText>
            )}
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
            disabled={isLoading}
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
