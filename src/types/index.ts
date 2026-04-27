// Global type definitions for the application

export interface HelmetProps {
  title: string;
}

export interface BreadcrumbItem {
  label: string;
  href?: string;
}

export interface BreadcrumbProps {
  title: string;
  items?: BreadcrumbItem[];
}

export interface BlogPost {
  id: string;
  title: string;
  content: string;
  author: string;
  date: string;
  image?: string;
  excerpt?: string;
}

export interface Service {
  id: string;
  name: string;
  description: string;
  icon?: string;
  image?: string;
}

export interface Testimonial {
  id: string;
  name: string;
  position?: string;
  content: string;
  rating: number;
  avatar?: string;
}

export interface TeamMember {
  id: string;
  name: string;
  position: string;
  bio?: string;
  image?: string;
  socialLinks?: {
    facebook?: string;
    twitter?: string;
    linkedin?: string;
    instagram?: string;
  };
}

export interface ContactInfo {
  phone: string;
  email: string;
  address: string;
  coordinates?: {
    lat: number;
    lng: number;
  };
}

export interface NavigationItem {
  label: string;
  href: string;
  children?: NavigationItem[];
}

// Form interfaces
export interface ContactFormData {
  name: string;
  email: string;
  phone?: string;
  subject: string;
  message: string;
}

// Component prop interfaces
export interface SelectOption {
  value: string | number;
  label: string;
}

export interface InputProps {
  label?: string;
  placeholder?: string;
  required?: boolean;
  error?: string;
}

export interface ButtonProps {
  variant?: 'primary' | 'secondary' | 'outline';
  size?: 'sm' | 'md' | 'lg';
  disabled?: boolean;
  loading?: boolean;
  onClick?: () => void;
  children: React.ReactNode;
}
