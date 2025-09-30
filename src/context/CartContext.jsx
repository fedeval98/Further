"use client";
import { createContext, useContext, useEffect, useMemo, useState } from "react";


const CartCtx = createContext(null);
const LS_KEY = "cart_v1";


export function CartProvider({ children }) {
const [items, setItems] = useState([]);
const [isOpen, setIsOpen] = useState(false);


// Carga el local storage
useEffect(() => {
try {
const raw = localStorage.getItem(LS_KEY);
if (raw) setItems(JSON.parse(raw));
} catch {}
}, []);


// Persistencia por si se cambia
useEffect(() => {
try {
localStorage.setItem(LS_KEY, JSON.stringify(items));
} catch {}
}, [items]);


const totalQty = useMemo(() => items.reduce((acc, it) => acc + it.qty, 0), [items]);
const totalPrice = useMemo(() => items.reduce((acc, it) => acc + it.price * it.qty, 0), [items]);


const api = useMemo(
() => ({
items,
isOpen,
totalQty,
totalPrice,
open: () => setIsOpen(true),
close: () => setIsOpen(false),
add: (item) => {
setItems((prev) => {
const exists = prev.find((p) => p.id === item.id);
if (exists) return prev.map((p) => (p.id === item.id ? { ...p, qty: p.qty + 1 } : p));
return [...prev, { ...item, qty: 1 }];
});
setIsOpen(true);
},
increment: (id) =>
setItems((prev) => prev.map((p) => (p.id === id ? { ...p, qty: p.qty + 1 } : p))),
decrement: (id) =>
setItems((prev) => {
const it = prev.find((p) => p.id === id);
if (!it) return prev;
if (it.qty - 1 <= 0) return prev.filter((p) => p.id !== id);
return prev.map((p) => (p.id === id ? { ...p, qty: p.qty - 1 } : p));
}),
remove: (id) => setItems((prev) => prev.filter((p) => p.id !== id)),
clear: () => setItems([]),
}),
[items, isOpen, totalQty, totalPrice]
);


return <CartCtx.Provider value={api}>{children}</CartCtx.Provider>;
}


export function useCart() {
const ctx = useContext(CartCtx);
if (!ctx) throw new Error("useCart must be used within CartProvider");
return ctx;
}