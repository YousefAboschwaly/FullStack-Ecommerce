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

// Validation rules
export  const productValidation = {
  title: {
    required: "Title is required",
    minLength: { value: 3, message: "Title must be at least 3 characters" },
    maxLength: {
      value: 100,
      message: "Title must be less than 100 characters",
    },
  },
  description: {
    required: "Description is required",
    minLength: {
      value: 10,
      message: "Description must be at least 10 characters",
    },
    maxLength: {
      value: 500,
      message: "Description must be less than 500 characters",
    },
  },
  price: {
    required: "Price is required",
    min: { value: 0.01, message: "Price must be greater than 0" },
    max: { value: 999999, message: "Price must be less than 999999" },
  },
  stock: {
    required: "Stock is required",
    min: { value: 0, message: "Stock cannot be negative" },
    max: { value: 999999, message: "Stock must be less than 999999" },
  },
  category: {
    required: "Category is required",
  },
};