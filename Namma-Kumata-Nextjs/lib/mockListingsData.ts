// Mock listings data with English and Kannada versions

export interface Listing {
  id: string;
  name: string;
  businessName: string;
  specialty: string;
  address: string;
  phone: string;
  rating: number;
  reviewCount: number;
  image: string;
  distance: string;
  description: string;
  email: string;
  hours: string;
}

export interface Review {
  id: number;
  name: string;
  rating: number;
  comment: string;
  date: string;
}

// English Listings
export const listingsEN: Listing[] = [
  {
    id: '1',
    name: 'Dr. Suresh Kumar',
    businessName: 'Kumta Dental Clinic',
    specialty: 'Dentist',
    address: 'Main Road, Kumta',
    phone: '+91 98765 43210',
    rating: 4.8,
    reviewCount: 145,
    image: 'https://images.unsplash.com/photo-1629909613654-28e377c37b09?w=400',
    distance: '0.5 km',
    description: 'Experienced dental care with modern equipment. We provide comprehensive dental services including routine checkups, cleanings, fillings, root canals, and cosmetic dentistry. Our clinic is equipped with the latest technology to ensure painless and effective treatment.',
    email: 'suresh@kumtadental.com',
    hours: 'Mon-Sat: 9:00 AM - 8:00 PM',
  },
  {
    id: '2',
    name: 'Dr. Priya Shetty',
    businessName: 'Smile Care Dental',
    specialty: 'Dentist',
    address: 'Market Street, Kumta',
    phone: '+91 98765 43211',
    rating: 4.6,
    reviewCount: 98,
    image: 'https://images.unsplash.com/photo-1606811971618-4486d14f3f99?w=400',
    distance: '1.2 km',
    description: 'Your smile is our priority. We offer a full range of dental services in a comfortable and friendly environment. Specialized in children\'s dentistry, orthodontics, and teeth whitening.',
    email: 'priya@smilecare.com',
    hours: 'Mon-Sat: 10:00 AM - 7:00 PM',
  },
  {
    id: '3',
    name: 'Dr. Anil Naik',
    businessName: 'Perfect Teeth Clinic',
    specialty: 'Dentist',
    address: 'Beach Road, Kumta',
    phone: '+91 98765 43212',
    rating: 4.9,
    reviewCount: 203,
    image: 'https://images.unsplash.com/photo-1622253692010-333f2da6031d?w=400',
    distance: '2.0 km',
    description: 'Excellence in dental care for over 15 years. We combine traditional expertise with modern technology to provide the best dental solutions. Specializing in dental implants, veneers, and smile makeovers.',
    email: 'anil@perfectteeth.com',
    hours: 'Mon-Sun: 9:00 AM - 9:00 PM',
  },
];

// Kannada Listings
export const listingsKN: Listing[] = [
  {
    id: '1',
    name: 'ಡಾ. ಸುರೇಶ್ ಕುಮಾರ್',
    businessName: 'ಕುಮಟ ಡೆಂಟಲ್ ಕ್ಲಿನಿಕ್',
    specialty: 'Dentist',
    address: 'ಮುಖ್ಯ ರಸ್ತೆ, ಕುಮಟ',
    phone: '+91 98765 43210',
    rating: 4.8,
    reviewCount: 145,
    image: 'https://images.unsplash.com/photo-1629909613654-28e377c37b09?w=400',
    distance: '0.5 ಕಿ.ಮೀ',
    description: 'ಆಧುನಿಕ ಸಲಕರಣೆಗಳೊಂದಿಗೆ ಅನುಭವಿ ದಂತ ಚಿಕಿತ್ಸೆ. ನಾವು ನಿಯಮಿತ ತಪಾಸಣೆ, ಸ್ವಚ್ಛತೆ, ಭರ್ತಿ, ರೂಟ್ ಕೆನಾಲ್ ಮತ್ತು ಸೌಂದರ್ಯ ದಂತ ಚಿಕಿತ್ಸೆ ಸೇರಿದಂತೆ ಸಮಗ್ರ ದಂತ ಸೇವೆಗಳನ್ನು ಒದಗಿಸುತ್ತೇವೆ. ನೋವುರಹಿತ ಮತ್ತು ಪರಿಣಾಮಕಾರಿ ಚಿಕಿತ್ಸೆಯನ್ನು ಖಾತ್ರಿಪಡಿಸಲು ನಮ್ಮ ಕ್ಲಿನಿಕ್ ಇತ್ತೀಚಿನ ತಂತ್ರಜ್ಞಾನದಿಂದ ಸುಸಜ್ಜಿತವಾಗಿದೆ.',
    email: 'suresh@kumtadental.com',
    hours: 'ಸೋಮ-ಶನಿ: ಬೆಳಿಗ್ಗೆ 9:00 - ರಾತ್ರಿ 8:00',
  },
  {
    id: '2',
    name: 'ಡಾ. ಪ್ರಿಯಾ ಶೆಟ್ಟಿ',
    businessName: 'ಸ್ಮೈಲ್ ಕೇರ್ ಡೆಂಟಲ್',
    specialty: 'Dentist',
    address: 'ಮಾರುಕಟ್ಟೆ ಬೀದಿ, ಕುಮಟ',
    phone: '+91 98765 43211',
    rating: 4.6,
    reviewCount: 98,
    image: 'https://images.unsplash.com/photo-1606811971618-4486d14f3f99?w=400',
    distance: '1.2 ಕಿ.ಮೀ',
    description: 'ನಿಮ್ಮ ನಗು ನಮ್ಮ ಆದ್ಯತೆ. ನಾವು ಆರಾಮದಾಯಕ ಮತ್ತು ಸ್ನೇಹಪರ ವಾತಾವರಣದಲ್ಲಿ ಸಂಪೂರ್ಣ ದಂತ ಸೇವೆಗಳನ್ನು ನೀಡುತ್ತೇವೆ. ಮಕ್ಕಳ ದಂತ ಚಿಕಿತ್ಸೆ, ಆರ್ಥೊಡಾಂಟಿಕ್ಸ್ ಮತ್ತು ಹಲ್ಲು ಬಿಳಿಗೊಳಿಸುವಲ್ಲಿ ಪರಿಣತಿ.',
    email: 'priya@smilecare.com',
    hours: 'ಸೋಮ-ಶನಿ: ಬೆಳಿಗ್ಗೆ 10:00 - ಸಂಜೆ 7:00',
  },
  {
    id: '3',
    name: 'ಡಾ. ಅನಿಲ್ ನಾಯಕ್',
    businessName: 'ಪರ್‌ಫೆಕ್ಟ್ ಟೀತ್ ಕ್ಲಿನಿಕ್',
    specialty: 'Dentist',
    address: 'ಬೀಚ್ ರೋಡ್, ಕುಮಟ',
    phone: '+91 98765 43212',
    rating: 4.9,
    reviewCount: 203,
    image: 'https://images.unsplash.com/photo-1622253692010-333f2da6031d?w=400',
    distance: '2.0 ಕಿ.ಮೀ',
    description: '15 ವರ್ಷಗಳಿಂದ ದಂತ ಚಿಕಿತ್ಸೆಯಲ್ಲಿ ಉತ್ಕೃಷ್ಟತೆ. ಉತ್ತಮ ದಂತ ಪರಿಹಾರಗಳನ್ನು ಒದಗಿಸಲು ನಾವು ಸಾಂಪ್ರದಾಯಿಕ ಪರಿಣತಿಯನ್ನು ಆಧುನಿಕ ತಂತ್ರಜ್ಞಾನದೊಂದಿಗೆ ಸಂಯೋಜಿಸುತ್ತೇವೆ. ದಂತ ಇಂಪ್ಲಾಂಟ್‌ಗಳು, ವೆನಿಯರ್‌ಗಳು ಮತ್ತು ಸ್ಮೈಲ್ ಮೇಕ್‌ಓವರ್‌ಗಳಲ್ಲಿ ವಿಶೇಷತೆ.',
    email: 'anil@perfectteeth.com',
    hours: 'ಸೋಮ-ಭಾನು: ಬೆಳಿಗ್ಗೆ 9:00 - ರಾತ್ರಿ 9:00',
  },
];

// English Reviews
export const reviewsEN: Review[] = [
  { id: 1, name: 'Ramesh Kumar', rating: 5, comment: 'Excellent service and quality products!', date: '2 days ago' },
  { id: 2, name: 'Priya Shetty', rating: 4, comment: 'Good variety, helpful staff.', date: '1 week ago' },
  { id: 3, name: 'Anil Naik', rating: 5, comment: 'Best in Kumta! Highly recommended.', date: '2 weeks ago' },
];

// Kannada Reviews
export const reviewsKN: Review[] = [
  { id: 1, name: 'ರಮೇಶ್ ಕುಮಾರ್', rating: 5, comment: 'ಅತ್ಯುತ್ತಮ ಸೇವೆ ಮತ್ತು ಗುಣಮಟ್ಟದ ಉತ್ಪನ್ನಗಳು!', date: '2 ದಿನಗಳ ಹಿಂದೆ' },
  { id: 2, name: 'ಪ್ರಿಯಾ ಶೆಟ್ಟಿ', rating: 4, comment: 'ಉತ್ತಮ ವೈವಿಧ್ಯತೆ, ಸಹಾಯಕ ಸಿಬ್ಬಂದಿ.', date: '1 ವಾರದ ಹಿಂದೆ' },
  { id: 3, name: 'ಅನಿಲ್ ನಾಯಕ್', rating: 5, comment: 'ಕುಮಟದಲ್ಲಿ ಅತ್ಯುತ್ತಮ! ಹೆಚ್ಚು ಶಿಫಾರಸು ಮಾಡಲಾಗಿದೆ.', date: '2 ವಾರಗಳ ಹಿಂದೆ' },
];

// Helper function to get listings based on language
export function getListings(language: 'en' | 'kn'): Listing[] {
  return language === 'kn' ? listingsKN : listingsEN;
}

// Helper function to get reviews based on language
export function getReviews(language: 'en' | 'kn'): Review[] {
  return language === 'kn' ? reviewsKN : reviewsEN;
}
