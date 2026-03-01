import { create } from 'zustand';
import { persist } from 'zustand/middleware';
import { storage, applyTheme } from '../utils';
import { authAPI, cartAPI, userAPI } from '../services/api';
import { THEME_PRESETS } from '../constants';

// Auth Store
export const useAuthStore = create(
  persist(
    (set, get) => ({
      user: null,
      isAuthenticated: false,
      isLoading: false,
      error: null,

      login: async (credentials) => {
        set({ isLoading: true, error: null });
        try {
          const response = await authAPI.login(credentials);
          const { user, accessToken, refreshToken } = response.data.data;
          
          storage.set('accessToken', accessToken);
          storage.set('refreshToken', refreshToken);
          
          set({ 
            user, 
            isAuthenticated: true, 
            isLoading: false 
          });
          
          return { success: true };
        } catch (error) {
          const message = error.response?.data?.message || 'Login failed';
          set({ error: message, isLoading: false });
          return { success: false, error: message };
        }
      },

      register: async (userData) => {
        set({ isLoading: true, error: null });
        try {
          const response = await authAPI.register(userData);
          const { user, accessToken, refreshToken } = response.data.data;
          
          storage.set('accessToken', accessToken);
          storage.set('refreshToken', refreshToken);
          
          set({ 
            user, 
            isAuthenticated: true, 
            isLoading: false 
          });
          
          return { success: true };
        } catch (error) {
          const message = error.response?.data?.message || 'Registration failed';
          set({ error: message, isLoading: false });
          return { success: false, error: message };
        }
      },

      logout: async () => {
        try {
          await authAPI.logout();
        } catch (error) {
          console.error('Logout error:', error);
        } finally {
          storage.remove('accessToken');
          storage.remove('refreshToken');
          set({ 
            user: null, 
            isAuthenticated: false, 
            error: null 
          });
        }
      },

      updateProfile: async (data) => {
        set({ isLoading: true, error: null });
        try {
          const response = await userAPI.updateProfile(data);
          const updatedUser = response.data.data;
          
          set({ 
            user: updatedUser, 
            isLoading: false 
          });
          
          return { success: true };
        } catch (error) {
          const message = error.response?.data?.message || 'Profile update failed';
          set({ error: message, isLoading: false });
          return { success: false, error: message };
        }
      },

      clearError: () => set({ error: null }),
    }),
    {
      name: 'auth-store',
      partialize: (state) => ({ 
        user: state.user, 
        isAuthenticated: state.isAuthenticated 
      }),
    }
  )
);

// Cart Store
export const useCartStore = create(
  persist(
    (set, get) => ({
      items: [],
      subtotal: 0,
      tax: 0,
      shipping: 0,
      discount: 0,
      total: 0,
      couponCode: null,
      isLoading: false,

      calculateTotals: () => {
        const { items, discount } = get();
        const subtotal = items.reduce((sum, item) => sum + (item.price * item.quantity), 0);
        const tax = subtotal * 0.1; // 10% tax
        const shipping = subtotal > 100 ? 0 : 10; // Free shipping over $100
        const total = subtotal + tax + shipping - discount;

        set({ subtotal, tax, shipping, total });
      },

      addItem: async (product, variantId = null, quantity = 1) => {
        set({ isLoading: true });
        try {
          const response = await cartAPI.addToCart({
            productId: product.id,
            variantId,
            quantity
          });

          const { items } = response.data.data;
          set({ items, isLoading: false });
          get().calculateTotals();
          
          return { success: true };
        } catch (error) {
          set({ isLoading: false });
          return { success: false, error: error.response?.data?.message };
        }
      },

      updateItem: async (itemId, quantity) => {
        set({ isLoading: true });
        try {
          const response = await cartAPI.updateCartItem(itemId, { quantity });
          const { items } = response.data.data;
          
          set({ items, isLoading: false });
          get().calculateTotals();
          
          return { success: true };
        } catch (error) {
          set({ isLoading: false });
          return { success: false, error: error.response?.data?.message };
        }
      },

      removeItem: async (itemId) => {
        set({ isLoading: true });
        try {
          await cartAPI.removeFromCart(itemId);
          const { items } = get();
          const updatedItems = items.filter(item => item.id !== itemId);
          
          set({ items: updatedItems, isLoading: false });
          get().calculateTotals();
          
          return { success: true };
        } catch (error) {
          set({ isLoading: false });
          return { success: false, error: error.response?.data?.message };
        }
      },

      applyCoupon: async (code) => {
        set({ isLoading: true });
        try {
          const response = await cartAPI.applyCoupon(code);
          const { discount } = response.data.data;
          
          set({ 
            couponCode: code, 
            discount, 
            isLoading: false 
          });
          get().calculateTotals();
          
          return { success: true };
        } catch (error) {
          set({ isLoading: false });
          return { success: false, error: error.response?.data?.message };
        }
      },

      removeCoupon: async () => {
        try {
          await cartAPI.removeCoupon();
          set({ couponCode: null, discount: 0 });
          get().calculateTotals();
        } catch (error) {
          console.error('Remove coupon error:', error);
        }
      },

      clearCart: async () => {
        try {
          await cartAPI.clearCart();
          set({ 
            items: [], 
            subtotal: 0, 
            tax: 0, 
            shipping: 0, 
            discount: 0, 
            total: 0, 
            couponCode: null 
          });
        } catch (error) {
          console.error('Clear cart error:', error);
        }
      },

      loadCart: async () => {
        set({ isLoading: true });
        try {
          const response = await cartAPI.getCart();
          const cart = response.data.data;
          
          set({ 
            items: cart.items || [],
            couponCode: cart.couponCode,
            discount: cart.discount || 0,
            isLoading: false 
          });
          get().calculateTotals();
        } catch (error) {
          set({ isLoading: false });
          console.error('Load cart error:', error);
        }
      },
    }),
    {
      name: 'cart-store',
      partialize: (state) => ({ 
        items: state.items,
        couponCode: state.couponCode,
        discount: state.discount
      }),
    }
  )
);

// Theme Store
export const useThemeStore = create(
  persist(
    (set, get) => ({
      currentTheme: THEME_PRESETS.modern,
      customThemes: [],

      setTheme: (theme) => {
        set({ currentTheme: theme });
        applyTheme(theme);
      },

      updateTheme: (updates) => {
        const { currentTheme } = get();
        const updatedTheme = { ...currentTheme, ...updates };
        set({ currentTheme: updatedTheme });
        applyTheme(updatedTheme);
      },

      saveCustomTheme: (name, theme) => {
        const { customThemes } = get();
        const newTheme = { id: Date.now().toString(), name, ...theme };
        set({ customThemes: [...customThemes, newTheme] });
      },

      deleteCustomTheme: (themeId) => {
        const { customThemes } = get();
        set({ customThemes: customThemes.filter(theme => theme.id !== themeId) });
      },

      resetToDefault: () => {
        const defaultTheme = THEME_PRESETS.modern;
        set({ currentTheme: defaultTheme });
        applyTheme(defaultTheme);
      },
    }),
    {
      name: 'theme-store',
    }
  )
);

// UI Store
export const useUIStore = create((set) => ({
  // Sidebar
  sidebarOpen: false,
  setSidebarOpen: (open) => set({ sidebarOpen: open }),
  toggleSidebar: () => set((state) => ({ sidebarOpen: !state.sidebarOpen })),

  // Mobile menu
  mobileMenuOpen: false,
  setMobileMenuOpen: (open) => set({ mobileMenuOpen: open }),
  toggleMobileMenu: () => set((state) => ({ mobileMenuOpen: !state.mobileMenuOpen })),

  // Search
  searchOpen: false,
  setSearchOpen: (open) => set({ searchOpen: open }),
  toggleSearch: () => set((state) => ({ searchOpen: !state.searchOpen })),

  // Cart drawer
  cartOpen: false,
  setCartOpen: (open) => set({ cartOpen: open }),
  toggleCart: () => set((state) => ({ cartOpen: !state.cartOpen })),

  // Modals
  modals: {},
  openModal: (modalId, data = null) => set((state) => ({
    modals: { ...state.modals, [modalId]: { open: true, data } }
  })),
  closeModal: (modalId) => set((state) => ({
    modals: { ...state.modals, [modalId]: { open: false, data: null } }
  })),

  // Loading states
  loading: {},
  setLoading: (key, isLoading) => set((state) => ({
    loading: { ...state.loading, [key]: isLoading }
  })),

  // Notifications
  notifications: [],
  addNotification: (notification) => set((state) => ({
    notifications: [...state.notifications, { 
      id: Date.now().toString(), 
      ...notification 
    }]
  })),
  removeNotification: (id) => set((state) => ({
    notifications: state.notifications.filter(n => n.id !== id)
  })),
  clearNotifications: () => set({ notifications: [] }),
}));

// Wishlist Store
export const useWishlistStore = create(
  persist(
    (set, get) => ({
      items: [],
      isLoading: false,

      addItem: async (product, variantId = null) => {
        set({ isLoading: true });
        try {
          const response = await wishlistAPI.addToWishlist(product.id, variantId);
          const { items } = response.data.data;
          
          set({ items, isLoading: false });
          return { success: true };
        } catch (error) {
          set({ isLoading: false });
          return { success: false, error: error.response?.data?.message };
        }
      },

      removeItem: async (itemId) => {
        set({ isLoading: true });
        try {
          await wishlistAPI.removeFromWishlist(itemId);
          const { items } = get();
          const updatedItems = items.filter(item => item.id !== itemId);
          
          set({ items: updatedItems, isLoading: false });
          return { success: true };
        } catch (error) {
          set({ isLoading: false });
          return { success: false, error: error.response?.data?.message };
        }
      },

      isInWishlist: (productId, variantId = null) => {
        const { items } = get();
        return items.some(item => 
          item.productId === productId && 
          (variantId ? item.variantId === variantId : !item.variantId)
        );
      },

      loadWishlist: async () => {
        set({ isLoading: true });
        try {
          const response = await wishlistAPI.getWishlist();
          const wishlist = response.data.data;
          
          set({ 
            items: wishlist.items || [],
            isLoading: false 
          });
        } catch (error) {
          set({ isLoading: false });
          console.error('Load wishlist error:', error);
        }
      },

      clearWishlist: async () => {
        try {
          await wishlistAPI.clearWishlist();
          set({ items: [] });
        } catch (error) {
          console.error('Clear wishlist error:', error);
        }
      },
    }),
    {
      name: 'wishlist-store',
      partialize: (state) => ({ items: state.items }),
    }
  )
);