export const loginSchema = {
  email: {
    required: "Email is required.",
    pattern: {
      value: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i,
      message: "Not a valid email address.",
    },
  },
  password: {
    required: "Password is required.",
    minLength: {
      value: 6,
      message: "Password should be at least 6 characters.",
    },
  },
};
