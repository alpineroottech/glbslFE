// Branch data management for Gurans Laghubitta Bittiya Sanstha Limited (GLBSL)
// This file contains static branch data that matches the expected Strapi API structure
// In production, this will be replaced with API calls to fetch data from Strapi CMS

export interface BranchData {
  id: string;
  name: string;
  location: string;
  address: string;
  phoneNumber: string;
  manager: {
    name: string;
    position: string;
    image: string;
    phone: string;
    email?: string;
  };
  coordinates: {
    latitude: number;
    longitude: number;
  };
}

// Static branch data for 36 branches across Nepal
// This data structure matches what we expect from Strapi API
const staticBranchData: BranchData[] = [
  {
    id: "1",
    name: "Kathmandu Main Branch",
    location: "Kathmandu",
    address: "New Road, Kathmandu 44600",
    phoneNumber: "+977-1-4000001",
    manager: {
      name: "Rajesh Sharma",
      position: "Branch Manager",
      image: "/images/inner/member-1.jpg",
      phone: "+977-1-4000001",
      email: "rajesh.sharma@glbsl.com.np"
    },
    coordinates: {
      latitude: 27.7172,
      longitude: 85.3240
    }
  },
  {
    id: "2",
    name: "Pokhara Branch",
    location: "Pokhara",
    address: "Mahendrapul, Pokhara 33700",
    phoneNumber: "+977-61-400002",
    manager: {
      name: "Sita Gurung",
      position: "Branch Manager",
      image: "/images/inner/member-2.jpg",
      phone: "+977-61-400002",
      email: "sita.gurung@glbsl.com.np"
    },
    coordinates: {
      latitude: 28.2096,
      longitude: 83.9856
    }
  },
  {
    id: "3",
    name: "Chitwan Branch",
    location: "Bharatpur",
    address: "Narayangadh, Bharatpur 44200",
    phoneNumber: "+977-56-400003",
    manager: {
      name: "Ram Bahadur Thapa",
      position: "Branch Manager",
      image: "/images/inner/member-3.jpg",
      phone: "+977-56-400003",
      email: "ram.thapa@glbsl.com.np"
    },
    coordinates: {
      latitude: 27.6936,
      longitude: 84.4333
    }
  },
  {
    id: "4",
    name: "Lalitpur Branch",
    location: "Lalitpur",
    address: "Patan Dhoka, Lalitpur 44700",
    phoneNumber: "+977-1-4000004",
    manager: {
      name: "Maya Shrestha",
      position: "Branch Manager",
      image: "/images/inner/member-1.jpg",
      phone: "+977-1-4000004",
      email: "maya.shrestha@glbsl.com.np"
    },
    coordinates: {
      latitude: 27.6683,
      longitude: 85.3206
    }
  },
  {
    id: "5",
    name: "Bhaktapur Branch",
    location: "Bhaktapur",
    address: "Durbar Square, Bhaktapur 44800",
    phoneNumber: "+977-1-4000005",
    manager: {
      name: "Gopal Maharjan",
      position: "Branch Manager",
      image: "/images/inner/member-2.jpg",
      phone: "+977-1-4000005",
      email: "gopal.maharjan@glbsl.com.np"
    },
    coordinates: {
      latitude: 27.6710,
      longitude: 85.4298
    }
  },
  {
    id: "6",
    name: "Biratnagar Branch",
    location: "Biratnagar",
    address: "Main Road, Biratnagar 56613",
    phoneNumber: "+977-21-400006",
    manager: {
      name: "Surya Limbu",
      position: "Branch Manager",
      image: "/images/inner/member-3.jpg",
      phone: "+977-21-400006",
      email: "surya.limbu@glbsl.com.np"
    },
    coordinates: {
      latitude: 26.4521,
      longitude: 87.2718
    }
  },
  {
    id: "7",
    name: "Birgunj Branch",
    location: "Birgunj",
    address: "Ghantaghar, Birgunj 44300",
    phoneNumber: "+977-51-400007",
    manager: {
      name: "Anita Yadav",
      position: "Branch Manager",
      image: "/images/inner/member-1.jpg",
      phone: "+977-51-400007",
      email: "anita.yadav@glbsl.com.np"
    },
    coordinates: {
      latitude: 27.0104,
      longitude: 84.8803
    }
  },
  {
    id: "8",
    name: "Butwal Branch",
    location: "Butwal",
    address: "Traffic Chowk, Butwal 32907",
    phoneNumber: "+977-71-400008",
    manager: {
      name: "Krishna Oli",
      position: "Branch Manager",
      image: "/images/inner/member-2.jpg",
      phone: "+977-71-400008",
      email: "krishna.oli@glbsl.com.np"
    },
    coordinates: {
      latitude: 27.7009,
      longitude: 83.4486
    }
  },
  {
    id: "9",
    name: "Dharan Branch",
    location: "Dharan",
    address: "BP Chowk, Dharan 56700",
    phoneNumber: "+977-25-400009",
    manager: {
      name: "Bishnu Rai",
      position: "Branch Manager",
      image: "/images/inner/member-3.jpg",
      phone: "+977-25-400009",
      email: "bishnu.rai@glbsl.com.np"
    },
    coordinates: {
      latitude: 26.8149,
      longitude: 87.2845
    }
  },
  {
    id: "10",
    name: "Hetauda Branch",
    location: "Hetauda",
    address: "Main Bazaar, Hetauda 44107",
    phoneNumber: "+977-57-400010",
    manager: {
      name: "Laxmi Tamang",
      position: "Branch Manager",
      image: "/images/inner/member-1.jpg",
      phone: "+977-57-400010",
      email: "laxmi.tamang@glbsl.com.np"
    },
    coordinates: {
      latitude: 27.4287,
      longitude: 85.0327
    }
  },
  {
    id: "11",
    name: "Itahari Branch",
    location: "Itahari",
    address: "Main Road, Itahari 56705",
    phoneNumber: "+977-25-400011",
    manager: {
      name: "Deepak Khadka",
      position: "Branch Manager",
      image: "/images/inner/member-2.jpg",
      phone: "+977-25-400011",
      email: "deepak.khadka@glbsl.com.np"
    },
    coordinates: {
      latitude: 26.6647,
      longitude: 87.2769
    }
  },
  {
    id: "12",
    name: "Janakpur Branch",
    location: "Janakpur",
    address: "Station Road, Janakpur 45600",
    phoneNumber: "+977-41-400012",
    manager: {
      name: "Radha Jha",
      position: "Branch Manager",
      image: "/images/inner/member-3.jpg",
      phone: "+977-41-400012",
      email: "radha.jha@glbsl.com.np"
    },
    coordinates: {
      latitude: 26.7271,
      longitude: 85.9237
    }
  },
  {
    id: "13",
    name: "Nepalgunj Branch",
    location: "Nepalgunj",
    address: "Tribhuvan Chowk, Nepalgunj 21900",
    phoneNumber: "+977-81-400013",
    manager: {
      name: "Abdul Rahman",
      position: "Branch Manager",
      image: "/images/inner/member-1.jpg",
      phone: "+977-81-400013",
      email: "abdul.rahman@glbsl.com.np"
    },
    coordinates: {
      latitude: 28.0505,
      longitude: 81.6176
    }
  },
  {
    id: "14",
    name: "Mahendranagar Branch",
    location: "Mahendranagar",
    address: "Main Bazaar, Mahendranagar 10400",
    phoneNumber: "+977-99-400014",
    manager: {
      name: "Prem Singh",
      position: "Branch Manager",
      image: "/images/inner/member-2.jpg",
      phone: "+977-99-400014",
      email: "prem.singh@glbsl.com.np"
    },
    coordinates: {
      latitude: 28.9641,
      longitude: 80.1814
    }
  },
  {
    id: "15",
    name: "Dhangadhi Branch",
    location: "Dhangadhi",
    address: "Main Road, Dhangadhi 10900",
    phoneNumber: "+977-91-400015",
    manager: {
      name: "Kamala Chaudhary",
      position: "Branch Manager",
      image: "/images/inner/member-3.jpg",
      phone: "+977-91-400015",
      email: "kamala.chaudhary@glbsl.com.np"
    },
    coordinates: {
      latitude: 28.6958,
      longitude: 80.5833
    }
  },
  {
    id: "16",
    name: "Ghorahi Branch",
    location: "Ghorahi",
    address: "Main Chowk, Ghorahi 22400",
    phoneNumber: "+977-82-400016",
    manager: {
      name: "Rajan Pun",
      position: "Branch Manager",
      image: "/images/inner/member-1.jpg",
      phone: "+977-82-400016",
      email: "rajan.pun@glbsl.com.np"
    },
    coordinates: {
      latitude: 28.0271,
      longitude: 82.4796
    }
  },
  {
    id: "17",
    name: "Tulsipur Branch",
    location: "Tulsipur",
    address: "Bus Park, Tulsipur 22400",
    phoneNumber: "+977-82-400017",
    manager: {
      name: "Sabita Sharma",
      position: "Branch Manager",
      image: "/images/inner/member-2.jpg",
      phone: "+977-82-400017",
      email: "sabita.sharma@glbsl.com.np"
    },
    coordinates: {
      latitude: 28.1362,
      longitude: 82.2956
    }
  },
  {
    id: "18",
    name: "Tansen Branch",
    location: "Tansen",
    address: "Sitalpati, Tansen 32500",
    phoneNumber: "+977-75-400018",
    manager: {
      name: "Narayan Paudel",
      position: "Branch Manager",
      image: "/images/inner/member-3.jpg",
      phone: "+977-75-400018",
      email: "narayan.paudel@glbsl.com.np"
    },
    coordinates: {
      latitude: 27.8741,
      longitude: 83.5392
    }
  },
  {
    id: "19",
    name: "Baglung Branch",
    location: "Baglung",
    address: "Kalika Chowk, Baglung 33300",
    phoneNumber: "+977-68-400019",
    manager: {
      name: "Devi Pun",
      position: "Branch Manager",
      image: "/images/inner/member-1.jpg",
      phone: "+977-68-400019",
      email: "devi.pun@glbsl.com.np"
    },
    coordinates: {
      latitude: 28.2707,
      longitude: 83.5894
    }
  },
  {
    id: "20",
    name: "Gorkha Branch",
    location: "Gorkha",
    address: "Bazaar, Gorkha 34000",
    phoneNumber: "+977-64-400020",
    manager: {
      name: "Hari Gurung",
      position: "Branch Manager",
      image: "/images/inner/member-2.jpg",
      phone: "+977-64-400020",
      email: "hari.gurung@glbsl.com.np"
    },
    coordinates: {
      latitude: 28.0000,
      longitude: 84.6333
    }
  },
  {
    id: "21",
    name: "Syangja Branch",
    location: "Syangja",
    address: "Waling Bazaar, Syangja 33800",
    phoneNumber: "+977-63-400021",
    manager: {
      name: "Sushila Thapa",
      position: "Branch Manager",
      image: "/images/inner/member-3.jpg",
      phone: "+977-63-400021",
      email: "sushila.thapa@glbsl.com.np"
    },
    coordinates: {
      latitude: 28.0889,
      longitude: 83.7711
    }
  },
  {
    id: "22",
    name: "Dolakha Branch",
    location: "Charikot",
    address: "Main Bazaar, Charikot 45500",
    phoneNumber: "+977-49-400022",
    manager: {
      name: "Tek Tamang",
      position: "Branch Manager",
      image: "/images/inner/member-1.jpg",
      phone: "+977-49-400022",
      email: "tek.tamang@glbsl.com.np"
    },
    coordinates: {
      latitude: 27.6719,
      longitude: 86.1644
    }
  },
  {
    id: "23",
    name: "Sindhupalchok Branch",
    location: "Chautara",
    address: "Main Road, Chautara 45200",
    phoneNumber: "+977-11-400023",
    manager: {
      name: "Kamala Sherpa",
      position: "Branch Manager",
      image: "/images/inner/member-2.jpg",
      phone: "+977-11-400023",
      email: "kamala.sherpa@glbsl.com.np"
    },
    coordinates: {
      latitude: 27.6167,
      longitude: 85.5167
    }
  },
  {
    id: "24",
    name: "Ramechhap Branch",
    location: "Manthali",
    address: "Bazaar, Manthali 45400",
    phoneNumber: "+977-48-400024",
    manager: {
      name: "Birendra Rai",
      position: "Branch Manager",
      image: "/images/inner/member-3.jpg",
      phone: "+977-48-400024",
      email: "birendra.rai@glbsl.com.np"
    },
    coordinates: {
      latitude: 27.4000,
      longitude: 86.0667
    }
  },
  {
    id: "25",
    name: "Okhaldhunga Branch",
    location: "Okhaldhunga",
    address: "Main Bazaar, Okhaldhunga 56100",
    phoneNumber: "+977-35-400025",
    manager: {
      name: "Ganga Rai",
      position: "Branch Manager",
      image: "/images/inner/member-1.jpg",
      phone: "+977-35-400025",
      email: "ganga.rai@glbsl.com.np"
    },
    coordinates: {
      latitude: 27.3167,
      longitude: 86.5000
    }
  },
  {
    id: "26",
    name: "Solukhumbu Branch",
    location: "Salleri",
    address: "Main Road, Salleri 56000",
    phoneNumber: "+977-38-400026",
    manager: {
      name: "Pasang Sherpa",
      position: "Branch Manager",
      image: "/images/inner/member-2.jpg",
      phone: "+977-38-400026",
      email: "pasang.sherpa@glbsl.com.np"
    },
    coordinates: {
      latitude: 27.5167,
      longitude: 86.5833
    }
  },
  {
    id: "27",
    name: "Taplejung Branch",
    location: "Taplejung",
    address: "Bazaar, Taplejung 57500",
    phoneNumber: "+977-27-400027",
    manager: {
      name: "Dil Limbu",
      position: "Branch Manager",
      image: "/images/inner/member-3.jpg",
      phone: "+977-27-400027",
      email: "dil.limbu@glbsl.com.np"
    },
    coordinates: {
      latitude: 27.3500,
      longitude: 87.6667
    }
  },
  {
    id: "28",
    name: "Panchthar Branch",
    location: "Phidim",
    address: "Main Chowk, Phidim 57400",
    phoneNumber: "+977-23-400028",
    manager: {
      name: "Indira Limbu",
      position: "Branch Manager",
      image: "/images/inner/member-1.jpg",
      phone: "+977-23-400028",
      email: "indira.limbu@glbsl.com.np"
    },
    coordinates: {
      latitude: 27.1500,
      longitude: 87.7333
    }
  },
  {
    id: "29",
    name: "Ilam Branch",
    location: "Ilam",
    address: "Main Road, Ilam 57300",
    phoneNumber: "+977-27-400029",
    manager: {
      name: "Chitra Rai",
      position: "Branch Manager",
      image: "/images/inner/member-2.jpg",
      phone: "+977-27-400029",
      email: "chitra.rai@glbsl.com.np"
    },
    coordinates: {
      latitude: 26.9089,
      longitude: 87.9256
    }
  },
  {
    id: "30",
    name: "Jhapa Branch",
    location: "Damak",
    address: "Main Road, Damak 57217",
    phoneNumber: "+977-23-400030",
    manager: {
      name: "Santosh Thapa",
      position: "Branch Manager",
      image: "/images/inner/member-3.jpg",
      phone: "+977-23-400030",
      email: "santosh.thapa@glbsl.com.np"
    },
    coordinates: {
      latitude: 26.6583,
      longitude: 87.7000
    }
  },
  {
    id: "31",
    name: "Morang Branch",
    location: "Belbari",
    address: "Highway, Belbari 56604",
    phoneNumber: "+977-21-400031",
    manager: {
      name: "Shanti Koirala",
      position: "Branch Manager",
      image: "/images/inner/member-1.jpg",
      phone: "+977-21-400031",
      email: "shanti.koirala@glbsl.com.np"
    },
    coordinates: {
      latitude: 26.5431,
      longitude: 87.2781
    }
  },
  {
    id: "32",
    name: "Sunsari Branch",
    location: "Inaruwa",
    address: "Main Road, Inaruwa 56509",
    phoneNumber: "+977-25-400032",
    manager: {
      name: "Bikash Yadav",
      position: "Branch Manager",
      image: "/images/inner/member-2.jpg",
      phone: "+977-25-400032",
      email: "bikash.yadav@glbsl.com.np"
    },
    coordinates: {
      latitude: 26.5183,
      longitude: 87.1347
    }
  },
  {
    id: "33",
    name: "Saptari Branch",
    location: "Rajbiraj",
    address: "Main Chowk, Rajbiraj 56400",
    phoneNumber: "+977-31-400033",
    manager: {
      name: "Durga Mandal",
      position: "Branch Manager",
      image: "/images/inner/member-3.jpg",
      phone: "+977-31-400033",
      email: "durga.mandal@glbsl.com.np"
    },
    coordinates: {
      latitude: 26.5397,
      longitude: 86.7450
    }
  },
  {
    id: "34",
    name: "Siraha Branch",
    location: "Lahan",
    address: "Main Road, Lahan 56300",
    phoneNumber: "+977-33-400034",
    manager: {
      name: "Jagat Sah",
      position: "Branch Manager",
      image: "/images/inner/member-1.jpg",
      phone: "+977-33-400034",
      email: "jagat.sah@glbsl.com.np"
    },
    coordinates: {
      latitude: 26.7175,
      longitude: 86.4833
    }
  },
  {
    id: "35",
    name: "Dhanusha Branch",
    location: "Janakpur",
    address: "Ram Janaki Path, Janakpur 45600",
    phoneNumber: "+977-41-400035",
    manager: {
      name: "Sunita Singh",
      position: "Branch Manager",
      image: "/images/inner/member-2.jpg",
      phone: "+977-41-400035",
      email: "sunita.singh@glbsl.com.np"
    },
    coordinates: {
      latitude: 26.7289,
      longitude: 85.9250
    }
  },
  {
    id: "36",
    name: "Mahottari Branch",
    location: "Jaleshwar",
    address: "Main Bazaar, Jaleshwar 45700",
    phoneNumber: "+977-44-400036",
    manager: {
      name: "Ramesh Yadav",
      position: "Branch Manager",
      image: "/images/inner/member-3.jpg",
      phone: "+977-44-400036",
      email: "ramesh.yadav@glbsl.com.np"
    },
    coordinates: {
      latitude: 26.6472,
      longitude: 85.7983
    }
  }
];

// Current function that returns static data
// This will be replaced with API calls to Strapi in production
export const getBranches = (): BranchData[] => {
  return staticBranchData;
};

// Placeholder function for future Strapi integration
// Replace this with actual API call when connecting to Strapi CMS
export const fetchBranchesFromStrapi = async (): Promise<BranchData[]> => {
  // TODO: Replace with actual Strapi API call
  // Example implementation steps:
  // 1. Set STRAPI_API_URL environment variable
  // 2. Use fetch or axios to GET /api/branches?populate=manager.image
  // 3. Map Strapi response to BranchData interface:
  //    - id: data.id
  //    - name: data.attributes.name
  //    - location: data.attributes.location
  //    - address: data.attributes.address
  //    - phoneNumber: data.attributes.phone_number
  //    - manager.name: data.attributes.manager.name
  //    - manager.image: data.attributes.manager.image.data.attributes.url
  //    - coordinates: { lat: data.attributes.latitude, lng: data.attributes.longitude }
  
  console.warn('fetchBranchesFromStrapi not implemented yet - using static data');
  return staticBranchData;
};

// Helper function to get branch by ID
export const getBranchById = (id: string): BranchData | undefined => {
  return staticBranchData.find(branch => branch.id === id);
};

// Helper function to get branches by location
export const getBranchesByLocation = (location: string): BranchData[] => {
  return staticBranchData.filter(branch => 
    branch.location.toLowerCase().includes(location.toLowerCase())
  );
};
