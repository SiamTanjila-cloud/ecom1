export const API_BASE_URL = import.meta.env.VITE_API_URL || 'http://localhost:3001/api';

export const USER_ROLES = {
  ADMIN: 'ADMIN',
  VENDOR: 'VENDOR',
  CUSTOMER: 'CUSTOMER'
};

export const ORDER_STATUS = {
  PENDING: 'PENDING',
  CONFIRMED: 'CONFIRMED',
  PROCESSING: 'PROCESSING',
  SHIPPED: 'SHIPPED',
  DELIVERED: 'DELIVERED',
  CANCELLED: 'CANCELLED',
  REFUNDED: 'REFUNDED'
};

export const PAYMENT_STATUS = {
  PENDING: 'PENDING',
  PAID: 'PAID',
  FAILED: 'FAILED',
  REFUNDED: 'REFUNDED',
  PARTIALLY_REFUNDED: 'PARTIALLY_REFUNDED'
};

export const PRODUCT_SORT_OPTIONS = [
  { value: 'name-asc', label: 'Name A-Z' },
  { value: 'name-desc', label: 'Name Z-A' },
  { value: 'price-asc', label: 'Price Low to High' },
  { value: 'price-desc', label: 'Price High to Low' },
  { value: 'rating-desc', label: 'Highest Rated' },
  { value: 'created-desc', label: 'Newest First' }
];

export const CURRENCIES = [
  { code: 'USD', symbol: '$', name: 'US Dollar' },
  { code: 'EUR', symbol: '€', name: 'Euro' },
  { code: 'GBP', symbol: '£', name: 'British Pound' },
  { code: 'JPY', symbol: '¥', name: 'Japanese Yen' },
  { code: 'CAD', symbol: 'C$', name: 'Canadian Dollar' }
];

export const LANGUAGES = [
  { code: 'en', name: 'English' },
  { code: 'es', name: 'Spanish' },
  { code: 'fr', name: 'French' },
  { code: 'de', name: 'German' },
  { code: 'it', name: 'Italian' }
];

export const THEME_PRESETS = {
  modern: {
    primaryColor: '#3b82f6',
    secondaryColor: '#64748b',
    accentColor: '#f59e0b',
    backgroundColor: '#ffffff',
    textColor: '#1f2937',
    fontFamily: 'Inter, sans-serif',
    borderRadius: 8,
    buttonStyle: 'rounded',
    headerStyle: 'modern',
    footerLayout: 'detailed',
    layoutType: 'grid'
  },
  classic: {
    primaryColor: '#1f2937',
    secondaryColor: '#6b7280',
    accentColor: '#dc2626',
    backgroundColor: '#f9fafb',
    textColor: '#111827',
    fontFamily: 'Georgia, serif',
    borderRadius: 4,
    buttonStyle: 'square',
    headerStyle: 'classic',
    footerLayout: 'simple',
    layoutType: 'list'
  },
  minimal: {
    primaryColor: '#000000',
    secondaryColor: '#6b7280',
    accentColor: '#10b981',
    backgroundColor: '#ffffff',
    textColor: '#374151',
    fontFamily: 'Helvetica, sans-serif',
    borderRadius: 0,
    buttonStyle: 'square',
    headerStyle: 'minimal',
    footerLayout: 'minimal',
    layoutType: 'grid'
  }
};

export const PAGE_CONTENT_TYPES = [
  { type: 'hero', label: 'Hero Section', icon: 'Image' },
  { type: 'banner', label: 'Banner', icon: 'Layout' },
  { type: 'products', label: 'Product Grid', icon: 'Grid3x3' },
  { type: 'text', label: 'Text Block', icon: 'Type' },
  { type: 'image', label: 'Image', icon: 'Image' },
  { type: 'testimonials', label: 'Testimonials', icon: 'MessageSquare' },
  { type: 'features', label: 'Features', icon: 'Star' }
];

export const CHART_COLORS = [
  '#3b82f6',
  '#10b981',
  '#f59e0b',
  '#ef4444',
  '#8b5cf6',
  '#06b6d4',
  '#84cc16',
  '#f97316'
];

export const PAGINATION_LIMITS = [10, 25, 50, 100];

export const IMAGE_UPLOAD_CONFIG = {
  maxSize: 5 * 1024 * 1024, // 5MB
  allowedTypes: ['image/jpeg', 'image/png', 'image/webp'],
  maxFiles: 10
};

export const VALIDATION_RULES = {
  email: /^[^\s@]+@[^\s@]+\.[^\s@]+$/,
  phone: /^\+?[\d\s\-\(\)]+$/,
  password: {
    minLength: 8,
    requireUppercase: true,
    requireLowercase: true,
    requireNumbers: true,
    requireSpecialChars: false
  }
};