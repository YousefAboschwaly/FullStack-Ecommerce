import { selectCart } from "@/app/services/cartSlice";
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

const apiUrl = import.meta.env.VITE_API_URL || "";





const CartDrawer = () => {
  const {cartProducts} = useSelector(selectCart);
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

  const subtotal = cartProducts.reduce(
    (sum, item) => sum + item.product.price * item.quantity,
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
                  {cartProducts.length}
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
              {cartProducts.length === 0 ? (
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
                  {cartProducts.map((item) => (
                    <Box
                      key={item.product.id}
                      p={3}
                      borderRadius="lg"
                      border="1px solid"
                      borderColor={borderDefault}
                      _hover={{ borderColor: accentPrimary }}
                      transition="border-color 0.2s"
                    >
                      <HStack gap={3} align="start">
                        <Image
                          src={apiUrl+item.product.thumbnail.url}
                          alt={item.product.title}
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
                            {item.product.title}
                          </Text>
                          <Text
                            fontSize="sm"
                            fontWeight="bold"
                            color={accentPrimary}
                            mt={1}
                          >
                            ${item.product.price.toFixed(2)}
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

            {cartProducts.length > 0 && (
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
