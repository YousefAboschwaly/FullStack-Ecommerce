import {  onCloseCart, selectGlobal } from "@/app/services/globalSlice";
import { useThemeColors } from "@/hooks/useThemeColors";
import {
  Box,
  Button,
  CloseButton,
  Drawer,
  HStack,
  IconButton,
  Image,
  Portal,
  Text,
  VStack,
} from "@chakra-ui/react";
import { Minus, Plus, ShoppingBag, Trash2 } from "lucide-react";
import { useDispatch, useSelector } from "react-redux";



// Mock cart items - replace with your actual cart data
const mockCartItems = [
  {
    id: 1,
    name: "Wireless Headphones",
    price: 99.99,
    quantity: 1,
    image: "https://images.unsplash.com/photo-1505740420928-5e560c06d30e?w=80&h=80&fit=crop",
  },
  {
    id: 2,
    name: "Smart Watch",
    price: 249.99,
    quantity: 2,
    image: "https://images.unsplash.com/photo-1523275335684-37898b6baf30?w=80&h=80&fit=crop",
  },
  {
    id: 3,
    name: "Laptop Stand",
    price: 49.99,
    quantity: 1,
    image: "https://images.unsplash.com/photo-1527864550417-7fd91fc51a46?w=80&h=80&fit=crop",
  },
];

const CartDrawer = () => {
  const {
    bgCard,
    bgCardHover,
    textPrimary,
    textMuted,
    borderDefault,
    accentPrimary,
    buttonPrimary,
    buttonText,
    statusError,
  } = useThemeColors();

  const dispatch = useDispatch()
  const {isOpen} = useSelector(selectGlobal)
  
  const onClose  =()=> dispatch(onCloseCart())

  const subtotal = mockCartItems.reduce(
    (sum, item) => sum + item.price * item.quantity,
    0
  );

  return (
    <Drawer.Root
      open={isOpen}
      onOpenChange={(details) => {
        if (!details.open) onClose();
      }}
      placement="end"
    >
      <Portal>
        <Drawer.Backdrop bg="blackAlpha.600" />
        <Drawer.Positioner>
          <Drawer.Content
            bg={bgCard}
            maxW={{ base: "100%", sm: "400px" }}
            w="full"
          >
            <Drawer.Header
              borderBottom="1px solid"
              borderColor={borderDefault}
              p={4}
            >
              <HStack gap={2}>
                <ShoppingBag size={24} color={accentPrimary} />
                <Drawer.Title
                  fontSize="lg"
                  fontWeight="bold"
                  color={textPrimary}
                >
                  Shopping Cart
                </Drawer.Title>
                <Box
                  bg={accentPrimary}
                  color={buttonText}
                  fontSize="xs"
                  fontWeight="bold"
                  borderRadius="full"
                  px={2}
                  py={0.5}
                >
                  {mockCartItems.length}
                </Box>
              </HStack>
              <Drawer.CloseTrigger asChild>
                <CloseButton
                  size="sm"
                  position="absolute"
                  top={4}
                  right={4}
                  color={textMuted}
                  _hover={{ bg: bgCardHover }}
                />
              </Drawer.CloseTrigger>
            </Drawer.Header>

            <Drawer.Body p={4} overflowY="auto">
              {mockCartItems.length === 0 ? (
                <VStack py={12} gap={4}>
                  <ShoppingBag size={64} color={textMuted} />
                  <Text color={textMuted} fontSize="lg">
                    Your cart is empty
                  </Text>
                  <Button
                    bg={buttonPrimary}
                    color={buttonText}
                    _hover={{ opacity: 0.9 }}
                    onClick={onClose}
                  >
                    Continue Shopping
                  </Button>
                </VStack>
              ) : (
                <VStack gap={4} align="stretch">
                  {mockCartItems.map((item) => (
                    <Box
                      key={item.id}
                      p={3}
                      borderRadius="lg"
                      border="1px solid"
                      borderColor={borderDefault}
                      _hover={{ borderColor: accentPrimary }}
                      transition="border-color 0.2s"
                    >
                      <HStack gap={3} align="start">
                        <Image
                          src={item.image}
                          alt={item.name}
                          w="70px"
                          h="70px"
                          borderRadius="md"
                          objectFit="cover"
                        />
                        <Box flex={1}>
                          <Text
                            fontWeight="600"
                            fontSize="sm"
                            color={textPrimary}
                            lineClamp={2}
                          >
                            {item.name}
                          </Text>
                          <Text
                            fontSize="sm"
                            fontWeight="bold"
                            color={accentPrimary}
                            mt={1}
                          >
                            ${item.price.toFixed(2)}
                          </Text>

                          {/* Quantity Controls */}
                          <HStack mt={2} justify="space-between">
                            <HStack
                              border="1px solid"
                              borderColor={borderDefault}
                              borderRadius="md"
                              p={1}
                            >
                              <IconButton
                                aria-label="Decrease quantity"
                                size="xs"
                                variant="ghost"
                                color={textMuted}
                                _hover={{ bg: bgCardHover }}
                              >
                                <Minus size={14} />
                              </IconButton>
                              <Text
                                fontSize="sm"
                                fontWeight="600"
                                color={textPrimary}
                                minW="24px"
                                textAlign="center"
                              >
                                {item.quantity}
                              </Text>
                              <IconButton
                                aria-label="Increase quantity"
                                size="xs"
                                variant="ghost"
                                color={textMuted}
                                _hover={{ bg: bgCardHover }}
                              >
                                <Plus size={14} />
                              </IconButton>
                            </HStack>

                            <IconButton
                              aria-label="Remove item"
                              size="sm"
                              variant="ghost"
                              color={statusError}
                              _hover={{ bg: "red.50" }}
                            >
                              <Trash2 size={16} />
                            </IconButton>
                          </HStack>
                        </Box>
                      </HStack>
                    </Box>
                  ))}
                </VStack>
              )}
            </Drawer.Body>

            {mockCartItems.length > 0 && (
              <Drawer.Footer
                p={4}
                borderTop="1px solid"
                borderColor={borderDefault}
                flexDirection="column"
                gap={3}
              >
                <HStack justify="space-between" w="full">
                  <Text color={textMuted} fontSize="sm">
                    Subtotal
                  </Text>
                  <Text fontWeight="bold" color={textPrimary}>
                    ${subtotal.toFixed(2)}
                  </Text>
                </HStack>
                <HStack justify="space-between" w="full">
                  <Text color={textMuted} fontSize="sm">
                    Shipping
                  </Text>
                  <Text fontWeight="600" color={accentPrimary}>
                    FREE
                  </Text>
                </HStack>
                <Box h="1px" bg={borderDefault} w="full" />
                <HStack justify="space-between" w="full">
                  <Text fontWeight="bold" color={textPrimary}>
                    Total
                  </Text>
                  <Text fontWeight="bold" fontSize="xl" color={accentPrimary}>
                    ${subtotal.toFixed(2)}
                  </Text>
                </HStack>
                <Button
                  w="full"
                  bg={buttonPrimary}
                  color={buttonText}
                  size="lg"
                  _hover={{ opacity: 0.9 }}
                  mt={2}
                >
                  Checkout
                </Button>
                <Button
                  w="full"
                  variant="ghost"
                  color={textMuted}
                  _hover={{ bg: bgCardHover }}
                  onClick={onClose}
                >
                  Continue Shopping
                </Button>
              </Drawer.Footer>
            )}
          </Drawer.Content>
        </Drawer.Positioner>
      </Portal>
    </Drawer.Root>
  );
};

export default CartDrawer;
