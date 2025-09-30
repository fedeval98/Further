"use client";
import { useCart } from "@/context/CartContext";

function formatCurrency(n) {
  try {
    return new Intl.NumberFormat("es-AR", {
      style: "currency",
      currency: "ARS",
      maximumFractionDigits: 0,
    }).format(n);
  } catch {
    return `$${n}`;
  }
}

function QtyControl({ id, qty }) {
  const { increment, decrement } = useCart();
  return (
    <div className="inline-flex items-center gap-2">
      <button
        onClick={() => decrement(id)}
        className="h-8 w-8 rounded-md border border-red-400 text-red-600 text-lg leading-none hover:bg-red-50 focus:outline-none focus:ring-2 focus:ring-red-400"
        aria-label="Restar"
      >
        –
      </button>
      <span className="min-w-6 text-center font-medium text-black">{qty}</span>
      <button
        onClick={() => increment(id)}
        className="h-8 w-8 rounded-md border border-green-600 text-green-700 text-lg leading-none hover:bg-green-50 focus:outline-none focus:ring-2 focus:ring-green-600"
        aria-label="Sumar"
      >
        +
      </button>
    </div>
  );
}

function AddButton({ item }) {
  const { add } = useCart();
  return (
    <button
      onClick={() => add(item)}
      className="rounded-lg bg-indigo-600 px-4 py-2 text-sm font-semibold text-white hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-indigo-500"
    >
      Add to cart
    </button>
  );
}

function Drawer() {
  const { isOpen, close, items, remove, clear, totalPrice } = useCart();

  return (
    <div
      className={`fixed inset-0 z-50 ${
        isOpen ? "pointer-events-auto" : "pointer-events-none"
      }`}
      aria-hidden={!isOpen}
    >
      {/* Backdrop */}
      <div
        onClick={close}
        className={`absolute inset-0 bg-black/30 transition-opacity ${
          isOpen ? "opacity-100" : "opacity-0"
        }`}
      />

      {/* Panel */}
      <aside
        role="dialog"
        aria-modal="true"
        aria-labelledby="cart-title"
        className={`absolute right-0 top-0 h-dvh w-full max-w-md transform bg-white p-6 shadow-xl transition-transform ${
          isOpen ? "translate-x-0" : "translate-x-full"
        }`}
      >
        <div className="flex items-center justify-between">
          <h3 id="cart-title" className="text-lg font-semibold text-black">
            Tu carrito
          </h3>
          <button
            onClick={close}
            className="rounded-md border px-3 py-1.5 font-medium text-black hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-gray-400"
          >
            Cerrar
          </button>
        </div>

        <div className="mt-6 space-y-4">
          {items.length === 0 && (
            <p className="text-sm text-black">Aún no agregaste productos.</p>
          )}

          {items.map((it) => (
            <div
              key={it.id}
              className="flex items-center justify-between gap-3 rounded-xl border p-3"
            >
              <div className="min-w-0 flex-1">
                <p className="truncate font-medium text-black">{it.title}</p>
                <div className="mt-1 flex items-center gap-3 text-sm">
                  <QtyControl id={it.id} qty={it.qty} />
                  <span className="ml-auto font-semibold text-black">
                    {formatCurrency(it.price * it.qty)}
                  </span>
                </div>
              </div>

              <button
                onClick={() => remove(it.id)}
                className="rounded-md border border-red-600 px-2 py-1 text-sm font-medium text-red-700 hover:bg-red-50 focus:outline-none focus:ring-2 focus:ring-red-600"
                aria-label={`Eliminar ${it.title}`}
              >
                Eliminar
              </button>
            </div>
          ))}
        </div>

        {/* Total */}
        <div className="mt-6 flex items-center justify-between border-t pt-4">
          <span className="text-sm font-medium text-black">Total</span>
          <span className="text-lg font-bold text-black">
            {formatCurrency(totalPrice)}
          </span>
        </div>

        <div className="mt-4 flex items-center justify-between">
          <button
            onClick={clear}
            className="rounded-md border px-3 py-2 text-sm font-medium text-black hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-gray-400"
          >
            Vaciar
          </button>
          <button className="rounded-lg bg-indigo-600 px-4 py-2 font-semibold text-white hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-indigo-500">
            Checkout
          </button>
        </div>
      </aside>
    </div>
  );
}

const Cart = { AddButton, Drawer };
export default Cart;
export { AddButton, Drawer };
