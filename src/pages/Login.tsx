/* eslint-disable @typescript-eslint/no-explicit-any */
import { toaster } from "@/components/ui/toaster";
import useThemeColors from "@/hooks/useThemeColors";
import { loginSchema } from "@/validation";
import {
  Box,
  Button,
  Field,
  Heading,
  HStack,
  IconButton,
  Input,
  Text,
  VStack
} from "@chakra-ui/react";
import { useState } from "react";
import { useForm } from "react-hook-form";
import { AiOutlineEye, AiOutlineEyeInvisible } from "react-icons/ai";
import { Link } from "react-router-dom";
import { useLoginMutation } from "../app/services/authApi";


interface IFormInput {
  identifier: string;
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

  const onSubmit =  async(data: IFormInput) => {

     try {
    const response = await login(data).unwrap();  
    console.log(response); 
    toaster.success({
      title: "Login successful",
      description: `Welcome ${response.user.username}`,
      duration: 3000,
      closable: true,
    });
    localStorage.setItem("token", response.jwt);
  } catch (err: any) {
    let message = "Login failed";
    if (err?.data?.error?.message) message = err.data.error.message;
    else if (err?.message) message = err.message;

    toaster.error({
      title: "Login failed",
      description: message,
      duration: 5000,
      closable: true,
    });
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
          <Field.Root invalid={!!errors.identifier}>
            <Field.Label>
              Email Address <Field.RequiredIndicator />
            </Field.Label>

            <Input
              type="email"
              {...register("identifier", email)}
              placeholder="Enter your email"
              bg={bgInput}
              border="2px solid"
              borderColor={errors.identifier ? borderInputError : borderInput}
              _placeholder={{ color: placeholderInput }}
              color={textPrimary}
              _hover={{
                borderColor: errors.identifier ? borderInputError : borderInputFocus,
              }}
              _focus={{
                borderColor: errors.identifier ? borderInputError : borderInputFocus,
                boxShadow: `0 0 0 1px ${
                  errors.identifier ? borderInputError : borderInputFocus
                }`,
              }}
              h="48px"
              borderRadius="lg"
            />

            {errors.identifier && (
              <Field.ErrorText>{errors.identifier.message}</Field.ErrorText>
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
            loading={isLoading}
      
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
