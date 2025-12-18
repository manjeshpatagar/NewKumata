/**
 * Subcategory Images Configuration
 * 
 * Maps each subcategory to its corresponding Unsplash image
 * Images are fetched from Unsplash for high-quality, relevant visuals
 */

export interface SubcategoryImage {
  name: string;
  image: string;
  icon: string;
}

export const subcategoryImages: Record<string, SubcategoryImage[]> = {
  shops: [
    {
      name: 'Grocery Stores',
      image: 'https://images.unsplash.com/photo-1604719312566-8912e9227c6a?w=800&q=80',
      icon: '🛒'
    },
    {
      name: 'Medical Stores',
      image: 'https://images.unsplash.com/photo-1576602976047-174e57a47881?w=800&q=80',
      icon: '💊'
    },
    {
      name: 'Furniture Shops',
      image: 'https://images.unsplash.com/photo-1555041469-a586c61ea9bc?w=800&q=80',
      icon: '🪑'
    },
    {
      name: 'Electronics',
      image: 'https://images.unsplash.com/photo-1550009158-9ebf69173e03?w=800&q=80',
      icon: '📱'
    },
    {
      name: 'Fashion & Clothing',
      image: 'https://images.unsplash.com/photo-1441986300917-64674bd600d8?w=800&q=80',
      icon: '👗'
    },
    {
      name: 'Hardware Stores',
      image: 'https://images.unsplash.com/photo-1581578731548-c64695cc6952?w=800&q=80',
      icon: '🔨'
    },
    {
      name: 'Book Stores',
      image: 'https://images.unsplash.com/photo-1507842217343-583bb7270b66?w=800&q=80',
      icon: '📚'
    },
    {
      name: 'Gift Shops',
      image: 'https://images.unsplash.com/photo-1513885535751-8b9238bd345a?w=800&q=80',
      icon: '🎁'
    },
  ],
  temples: [
    {
      name: 'Hindu Temples',
      image: 'https://images.unsplash.com/photo-1668770109988-24fe041e6b8f?w=800&q=80',
      icon: '🕉️'
    },
    {
      name: 'Mosques',
      image: 'https://images.unsplash.com/photo-1564769662533-4f00a87b4056?w=800&q=80',
      icon: '🕌'
    },
    {
      name: 'Churches',
      image: 'https://images.unsplash.com/photo-1548625149-720da10e4479?w=800&q=80',
      icon: '⛪'
    },
    {
      name: 'Other Religious Places',
      image: 'https://images.unsplash.com/photo-1609743522653-52354461eb27?w=800&q=80',
      icon: '🙏'
    },
  ],
  tourism: [
    {
      name: 'Beaches',
      image: 'https://images.unsplash.com/photo-1507525428034-b723cf961d3e?w=800&q=80',
      icon: '🏖️'
    },
    {
      name: 'Historical Sites',
      image: 'https://images.unsplash.com/photo-1564507592333-c60657eea523?w=800&q=80',
      icon: '🏛️'
    },
    {
      name: 'Parks & Gardens',
      image: 'https://images.unsplash.com/photo-1585320806297-9794b3e4eeae?w=800&q=80',
      icon: '🌳'
    },
    {
      name: 'Waterfalls',
      image: 'https://images.unsplash.com/photo-1432405972618-c60b0225b8f9?w=800&q=80',
      icon: '💧'
    },
    {
      name: 'Viewpoints',
      image: 'https://images.unsplash.com/photo-1506905925346-21bda4d32df4?w=800&q=80',
      icon: '🌄'
    },
    {
      name: 'Adventure Activities',
      image: 'https://images.unsplash.com/photo-1533130061792-64b345e4a833?w=800&q=80',
      icon: '🧗'
    },
  ],
  schoolsColleges: [
    {
      name: 'Primary Schools',
      image: 'https://images.unsplash.com/photo-1503676260728-1c00da094a0b?w=800&q=80',
      icon: '🎒'
    },
    {
      name: 'High Schools',
      image: 'https://images.unsplash.com/photo-1509062522246-3755977927d7?w=800&q=80',
      icon: '📖'
    },
    {
      name: 'Pre-University Colleges',
      image: 'https://images.unsplash.com/photo-1541339907198-e08756dedf3f?w=800&q=80',
      icon: '🎓'
    },
    {
      name: 'Degree Colleges',
      image: 'https://images.unsplash.com/photo-1562774053-701939374585?w=800&q=80',
      icon: '🏫'
    },
    {
      name: 'Professional Colleges',
      image: 'https://images.unsplash.com/photo-1523050854058-8df90110c9f1?w=800&q=80',
      icon: '💼'
    },
    {
      name: 'Coaching Centers',
      image: 'https://images.unsplash.com/photo-1524178232363-1fb2b075b655?w=800&q=80',
      icon: '✏️'
    },
  ],
  services: [
    {
      name: 'Plumbing',
      image: 'https://images.unsplash.com/photo-1607472586893-edb57bdc0e39?w=800&q=80',
      icon: '🚰'
    },
    {
      name: 'Electrical',
      image: 'https://images.unsplash.com/photo-1621905251918-48416bd8575a?w=800&q=80',
      icon: '⚡'
    },
    {
      name: 'Carpentry',
      image: 'https://images.unsplash.com/photo-1597476827000-389f047b3a61?w=800&q=80',
      icon: '🪚'
    },
    {
      name: 'Painting',
      image: 'https://images.unsplash.com/photo-1589939705384-5185137a7f0f?w=800&q=80',
      icon: '🎨'
    },
    {
      name: 'Cleaning Services',
      image: 'https://images.unsplash.com/photo-1581578731548-c64695cc6952?w=800&q=80',
      icon: '🧹'
    },
    {
      name: 'Home Repairs',
      image: 'https://images.unsplash.com/photo-1504148455328-c376907d081c?w=800&q=80',
      icon: '🔧'
    },
    {
      name: 'Appliance Repair',
      image: 'https://images.unsplash.com/photo-1581092160562-40aa08e78837?w=800&q=80',
      icon: '🔌'
    },
  ],
  associations: [
    {
      name: 'Community Associations',
      image: 'https://images.unsplash.com/photo-1529156069898-49953e39b3ac?w=800&q=80',
      icon: '🏘️'
    },
    {
      name: 'Youth Clubs',
      image: 'https://images.unsplash.com/photo-1522071820081-009f0129c71c?w=800&q=80',
      icon: '👨‍👩‍👧‍👦'
    },
    {
      name: 'Women Groups',
      image: 'https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?w=800&q=80',
      icon: '👩‍👩‍👧'
    },
    {
      name: 'Senior Citizen Groups',
      image: 'https://images.unsplash.com/photo-1581579438747-1dc8d17bbce4?w=800&q=80',
      icon: '👴'
    },
    {
      name: 'Professional Associations',
      image: 'https://images.unsplash.com/photo-1560439514-4e9645039924?w=800&q=80',
      icon: '💼'
    },
  ],
  culturalPrograms: [
    {
      name: 'Yakshagana',
      image: 'https://images.unsplash.com/photo-1516450360452-9312f5e86fc7?w=800&q=80',
      icon: '🎭'
    },
    {
      name: 'Classical Dance',
      image: 'https://images.unsplash.com/photo-1508807526345-15e9b5f4eaff?w=800&q=80',
      icon: '💃'
    },
    {
      name: 'Music Programs',
      image: 'https://images.unsplash.com/photo-1511735111819-9a3f7709049c?w=800&q=80',
      icon: '🎵'
    },
    {
      name: 'Drama & Theater',
      image: 'https://images.unsplash.com/photo-1503095396549-807759245b35?w=800&q=80',
      icon: '🎬'
    },
    {
      name: 'Festivals',
      image: 'https://images.unsplash.com/photo-1533174072545-7a4b6ad7a6c3?w=800&q=80',
      icon: '🎉'
    },
    {
      name: 'Cultural Events',
      image: 'https://images.unsplash.com/photo-1492684223066-81342ee5ff30?w=800&q=80',
      icon: '🎪'
    },
  ],
  departments: [
    {
      name: 'Government Offices',
      image: 'https://images.unsplash.com/photo-1486406146926-c627a92ad1ab?w=800&q=80',
      icon: '🏛️'
    },
    {
      name: 'Municipality',
      image: 'https://images.unsplash.com/photo-1565008576549-57569a49371d?w=800&q=80',
      icon: '🏢'
    },
    {
      name: 'Police Station',
      image: 'https://images.unsplash.com/photo-1593003290424-14f7e2a6c6a0?w=800&q=80',
      icon: '👮'
    },
    {
      name: 'Post Office',
      image: 'https://images.unsplash.com/photo-1588421357574-87938a86fa28?w=800&q=80',
      icon: '📮'
    },
    {
      name: 'Revenue Department',
      image: 'https://images.unsplash.com/photo-1554224311-beee460201f9?w=800&q=80',
      icon: '📊'
    },
    {
      name: 'Panchayat Office',
      image: 'https://images.unsplash.com/photo-1497366216548-37526070297c?w=800&q=80',
      icon: '🏘️'
    },
  ],
  doctors: [
    {
      name: 'General Physician',
      image: 'https://images.unsplash.com/photo-1666214280557-f1b5022eb634?w=800&q=80',
      icon: '👨‍⚕️'
    },
    {
      name: 'Dentist',
      image: 'https://images.unsplash.com/photo-1606811841689-23dfddce3e95?w=800&q=80',
      icon: '🦷'
    },
    {
      name: 'Eye Specialist',
      image: 'https://images.unsplash.com/photo-1582735689369-4fe89db7114c?w=800&q=80',
      icon: '👁️'
    },
    {
      name: 'Orthopedic',
      image: 'https://images.unsplash.com/photo-1559757175-5700dde675bc?w=800&q=80',
      icon: '🦴'
    },
    {
      name: 'Pediatrician',
      image: 'https://images.unsplash.com/photo-1631217868264-e5b90bb7e133?w=800&q=80',
      icon: '👶'
    },
    {
      name: 'Dermatologist',
      image: 'https://images.unsplash.com/photo-1612349317150-e413f6a5b16d?w=800&q=80',
      icon: '💆'
    },
    {
      name: 'Gynecologist',
      image: 'https://images.unsplash.com/photo-1579154204601-01588f351e67?w=800&q=80',
      icon: '👩‍⚕️'
    },
    {
      name: 'Cardiologist',
      image: 'https://images.unsplash.com/photo-1628348068343-c6a848d2b6dd?w=800&q=80',
      icon: '❤️'
    },
  ],
  emergencyServices: [
    {
      name: 'Ambulance Services',
      image: 'https://images.unsplash.com/photo-1587745416684-47953f16f02f?w=800&q=80',
      icon: '🚑'
    },
    {
      name: 'Fire Station',
      image: 'https://images.unsplash.com/photo-1618245318763-a15156d6b23c?w=800&q=80',
      icon: '🚒'
    },
    {
      name: 'Police Station',
      image: 'https://images.unsplash.com/photo-1593003290424-14f7e2a6c6a0?w=800&q=80',
      icon: '🚓'
    },
    {
      name: 'Hospital Emergency',
      image: 'https://images.unsplash.com/photo-1519494026892-80bbd2d6fd0d?w=800&q=80',
      icon: '🏥'
    },
    {
      name: '24/7 Medical Services',
      image: 'https://images.unsplash.com/photo-1584982751601-97dcc096659c?w=800&q=80',
      icon: '⚕️'
    },
  ],
  hotels: [
    {
      name: 'Budget Hotels',
      image: 'https://images.unsplash.com/photo-1566073771259-6a8506099945?w=800&q=80',
      icon: '🏨'
    },
    {
      name: 'Lodges',
      image: 'https://images.unsplash.com/photo-1551882547-ff40c63fe5fa?w=800&q=80',
      icon: '🛏️'
    },
    {
      name: 'Resorts',
      image: 'https://images.unsplash.com/photo-1571003123894-1f0594d2b5d9?w=800&q=80',
      icon: '🏖️'
    },
    {
      name: 'Guest Houses',
      image: 'https://images.unsplash.com/photo-1522771739844-6a9f6d5f14af?w=800&q=80',
      icon: '🏠'
    },
    {
      name: 'Beach Resorts',
      image: 'https://images.unsplash.com/photo-1520250497591-112f2f40a3f4?w=800&q=80',
      icon: '🌴'
    },
  ],
  rentVehicles: [
    {
      name: 'Car Rentals',
      image: 'https://images.unsplash.com/photo-1449965408869-eaa3f722e40d?w=800&q=80',
      icon: '🚗'
    },
    {
      name: 'Bike Rentals',
      image: 'https://images.unsplash.com/photo-1558981403-c5f9899a28bc?w=800&q=80',
      icon: '🏍️'
    },
    {
      name: 'Scooter Rentals',
      image: 'https://images.unsplash.com/photo-1558981852-426c6c22a060?w=800&q=80',
      icon: '🛵'
    },
    {
      name: 'Auto Rickshaw',
      image: 'https://images.unsplash.com/photo-1581349356859-86aded6c7a96?w=800&q=80',
      icon: '🛺'
    },
    {
      name: 'Bus Services',
      image: 'https://images.unsplash.com/photo-1570125909232-eb263c188f7e?w=800&q=80',
      icon: '🚌'
    },
  ],
  sportsEquipments: [
    {
      name: 'Cricket Equipment',
      image: 'https://images.unsplash.com/photo-1531415074968-036ba1b575da?w=800&q=80',
      icon: '🏏'
    },
    {
      name: 'Football Equipment',
      image: 'https://images.unsplash.com/photo-1614632537423-1e6c2e7e0aac?w=800&q=80',
      icon: '⚽'
    },
    {
      name: 'Badminton',
      image: 'https://images.unsplash.com/photo-1626224583764-f87db24ac4ea?w=800&q=80',
      icon: '🏸'
    },
    {
      name: 'Swimming',
      image: 'https://images.unsplash.com/photo-1519315901367-f34ff9154487?w=800&q=80',
      icon: '🏊'
    },
    {
      name: 'Gym Equipment',
      image: 'https://images.unsplash.com/photo-1534438327276-14e5300c3a48?w=800&q=80',
      icon: '🏋️'
    },
    {
      name: 'Sports Wear',
      image: 'https://images.unsplash.com/photo-1556906781-9a412961c28c?w=800&q=80',
      icon: '👟'
    },
  ],
};

// Helper function to get subcategory image
export function getSubcategoryImage(categoryId: string, subcategoryName: string): string {
  const categorySubcategories = subcategoryImages[categoryId];
  if (!categorySubcategories) return '';
  
  const subcategory = categorySubcategories.find(sub => sub.name === subcategoryName);
  return subcategory?.image || '';
}

// Helper function to get subcategory icon
export function getSubcategoryIcon(categoryId: string, subcategoryName: string): string {
  const categorySubcategories = subcategoryImages[categoryId];
  if (!categorySubcategories) return '📍';
  
  const subcategory = categorySubcategories.find(sub => sub.name === subcategoryName);
  return subcategory?.icon || '📍';
}

// Helper function to get all subcategories for a category with images
export function getSubcategoriesWithImages(categoryId: string): SubcategoryImage[] {
  return subcategoryImages[categoryId] || [];
}
