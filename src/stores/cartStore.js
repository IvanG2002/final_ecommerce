import create from 'zustand';

const useCartStore = create((set) => ({
    cart: [],
    addToCart: (product) => set((state) => {
        const existingProduct = state.cart.find(item => item.id === product.id);
        if (existingProduct) {
        return {
            cart: state.cart.map(item =>
            item.id === product.id ? { ...item, quantity: item.quantity + 1 } : item
            ),
        };
        } else {
        return { cart: [...state.cart, { ...product, quantity: 1 }] };
        }
    }),
    removeFromCart: (productId) => set((state) => ({
        cart: state.cart.filter((item) => item.id !== productId),
    })),
    clearCart: () => set({ cart: [] }),
    updateQuantity: (productId, quantity) => set((state) => ({
        cart: state.cart.map((item) =>
        item.id === productId ? { ...item, quantity } : item
        ),
    })),
}));

export default useCartStore;
