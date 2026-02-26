import { createContext, useContext, useState, useCallback } from "react";

export interface CartItem {
  id: string;
  title: string;
  merchant: string;
  image: string;
  currentPrice: number;
  qty: number;
  optionId?: string;
  optionTitle?: string;
}

interface CartContextType {
  items: CartItem[];
  addItem: (item: Omit<CartItem, "qty">) => void;
  removeItem: (id: string, optionId?: string) => void;
  updateQty: (id: string, delta: number, optionId?: string) => void;
  clearCart: () => void;
  itemCount: number;
  total: number;
}

const CartContext = createContext<CartContextType>({} as CartContextType);

export const useCart = () => useContext(CartContext);

export const CartProvider = ({ children }: { children: React.ReactNode }) => {
  const [items, setItems] = useState<CartItem[]>([]);

  const cartKey = (id: string, optionId?: string) => `${id}__${optionId ?? ""}`;

  const addItem = useCallback((item: Omit<CartItem, "qty">) => {
    setItems((prev) => {
      const key = cartKey(item.id, item.optionId);
      const existing = prev.find((i) => cartKey(i.id, i.optionId) === key);
      if (existing) {
        return prev.map((i) =>
          cartKey(i.id, i.optionId) === key ? { ...i, qty: i.qty + 1 } : i
        );
      }
      return [...prev, { ...item, qty: 1 }];
    });
  }, []);

  const removeItem = useCallback((id: string, optionId?: string) => {
    const key = cartKey(id, optionId);
    setItems((prev) => prev.filter((i) => cartKey(i.id, i.optionId) !== key));
  }, []);

  const updateQty = useCallback((id: string, delta: number, optionId?: string) => {
    const key = cartKey(id, optionId);
    setItems((prev) =>
      prev.map((i) =>
        cartKey(i.id, i.optionId) === key
          ? { ...i, qty: Math.max(1, i.qty + delta) }
          : i
      )
    );
  }, []);

  const clearCart = useCallback(() => setItems([]), []);

  const itemCount = items.reduce((sum, i) => sum + i.qty, 0);
  const total = items.reduce((sum, i) => sum + i.currentPrice * i.qty, 0);

  return (
    <CartContext.Provider value={{ items, addItem, removeItem, updateQty, clearCart, itemCount, total }}>
      {children}
    </CartContext.Provider>
  );
};
