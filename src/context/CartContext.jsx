import { createContext, useContext, useEffect, useState } from "react";

const CartContext = createContext(null);

const STORAGE_KEY = "mm-cosmetics-cart-v1";

function readSavedCart() {
  try {
    const saved = localStorage.getItem(STORAGE_KEY);

    if (!saved) return [];

    const parsed = JSON.parse(saved);

    if (!Array.isArray(parsed)) return [];

    return parsed
      .filter(
        (item) =>
          item &&
          item.id !== undefined &&
          typeof item.title === "string" &&
          Number.isFinite(Number(item.price)) &&
          Number.isFinite(Number(item.quantity)) &&
          Number(item.quantity) > 0
      )
      .map((item) => ({
        id: item.id,
        title: item.title,
        price: Number(item.price),
        thumbnail: item.thumbnail || item.image || "",
        stock: Number(item.stock) > 0 ? Number(item.stock) : 99,
        quantity: Number(item.quantity),
      }));
  } catch {
    return [];
  }
}

export function CartProvider({ children }) {
  const [cart, setCart] = useState(readSavedCart);

  // Save cart
  useEffect(() => {
    try {
      localStorage.setItem(STORAGE_KEY, JSON.stringify(cart));
    } catch {
      console.log("Cart could not be saved.");
    }
  }, [cart]);

  // Add product
  const addItem = (product, quantity = 1) => {
    const stock = Number(product.stock) > 0 ? Number(product.stock) : 99;

    const qty = Math.max(
      1,
      Math.min(Number(quantity) || 1, stock)
    );

    setCart((previousCart) => {
      const existingProduct = previousCart.find(
        (item) => String(item.id) === String(product.id)
      );

      // Product already exists
      if (existingProduct) {
        return previousCart.map((item) => {
          if (String(item.id) !== String(product.id)) {
            return item;
          }

          return {
            ...item,
            quantity: Math.min(
              item.quantity + qty,
              item.stock || stock
            ),
          };
        });
      }

      // New product
      return [
        ...previousCart,
        {
          id: product.id,
          title: product.title,
          price: Number(product.price),
          thumbnail:
            product.thumbnail ||
            product.image ||
            "",
          stock,
          quantity: qty,
        },
      ];
    });
  };

  // Remove product
  const removeItem = (id) => {
    setCart((previousCart) =>
      previousCart.filter(
        (item) => String(item.id) !== String(id)
      )
    );
  };

  // Update quantity
  const updateQuantity = (id, quantity) => {
    const newQuantity = Number(quantity);

    if (!Number.isFinite(newQuantity) || newQuantity < 1) {
      return;
    }

    setCart((previousCart) =>
      previousCart.map((item) => {
        if (String(item.id) !== String(id)) {
          return item;
        }

        return {
          ...item,
          quantity: Math.min(
            newQuantity,
            item.stock || 99
          ),
        };
      })
    );
  };

  // Clear cart after successful order
  const clearCart = () => {
    setCart([]);
  };

  // Total number of products
  const itemCount = cart.reduce(
    (total, item) => total + Number(item.quantity),
    0
  );

  // Subtotal
  const subtotal = cart.reduce(
    (total, item) =>
      total +
      Number(item.price) * Number(item.quantity),
    0
  );

  return (
    <CartContext.Provider
      value={{
        cart,
        addItem,
        removeItem,
        updateQuantity,
        clearCart,
        itemCount,
        subtotal,
      }}
    >
      {children}
    </CartContext.Provider>
  );
}

export function useCart() {
  const context = useContext(CartContext);

  if (!context) {
    throw new Error(
      "useCart must be used inside CartProvider"
    );
  }

  return context;
}