// Branch data for Gurans Laghubitta Bittiya Sanstha Ltd.
// Source: Branch Details Updated.xlsx
// Corporate Office: Budiganga-1, Puspalal Chowk, Morang

export interface BranchData {
  id: string;
  sn: number;
  name: string;
  district: string;
  municipality: string;
  ward: number;
  locality: string;
  contactPerson: string;
  phone: string;
  email: string;
  managerImage?: string;
}

const branchData: BranchData[] = [
  { id: "3",  sn: 3,  name: "Dhankuta",       district: "Dhankuta",      municipality: "Dhankuta Municipality",                      ward: 7, locality: "Tribeni Chowk",   contactPerson: "Khagendra Karki",              phone: "9802751377", email: "dhankuta@glbsl.com.np" },
  { id: "4",  sn: 4,  name: "Dandabazar",     district: "Dhankuta",      municipality: "Sangurigadhi Rural Municipality",             ward: 5, locality: "Dandabazar",       contactPerson: "Manish Karki",                 phone: "9802751378", email: "dandabazar@glbsl.com.np" },
  { id: "5",  sn: 5,  name: "Sidhuwa",        district: "Dhankuta",      municipality: "Chhathar Jorpati Rural Municipality",         ward: 6, locality: "Sidhuwa",          contactPerson: "Mahesh Katwal",                phone: "9802751379", email: "sidhuwa@glbsl.com.np" },
  { id: "6",  sn: 6,  name: "Aankhisalla",    district: "Dhankuta",      municipality: "Shahidbhumi Rural Municipality",              ward: 6, locality: "Aankhisalla",      contactPerson: "Sushil Poudel",                phone: "9802751380", email: "ankhisalla@glbsl.com.np" },
  { id: "7",  sn: 7,  name: "Mude",           district: "Sankhuwasabha", municipality: "Dharmadevi Municipality",                    ward: 3, locality: "Mude",             contactPerson: "Bodharaj Katuwal",             phone: "9802751381", email: "mude@glbsl.com.np" },
  { id: "8",  sn: 8,  name: "Jirikhimti",     district: "Terhathum",     municipality: "Myanglung Municipality",                     ward: 6, locality: "Jirikhimti",       contactPerson: "Arjun Rai",                    phone: "9802751382", email: "jirikhimti@glbsl.com.np" },
  { id: "9",  sn: 9,  name: "Ranke",          district: "Panchthar",     municipality: "Falgunanda Rural Municipality",              ward: 4, locality: "Ranke",            contactPerson: "Saurav Panthak",               phone: "9802751383", email: "ranke@glbsl.com.np" },
  { id: "10", sn: 10, name: "Jorpokhari",     district: "Panchthar",     municipality: "Hilihan Rural Municipality",                 ward: 5, locality: "Jorpokhari",       contactPerson: "Binod Prasad Dahal",           phone: "9802751384", email: "jorpokhari@glbsl.com.np" },
  { id: "11", sn: 11, name: "Taplejung",      district: "Taplejung",     municipality: "Phungling Municipality",                    ward: 9, locality: "Phungling",        contactPerson: "Sangita Rai",                  phone: "9802751385", email: "taplejung@glbsl.com.np" },
  { id: "12", sn: 12, name: "Naya Bazar",     district: "Ilam",          municipality: "Mai Jogmai Rural Municipality",              ward: 1, locality: "Nayabazar",        contactPerson: "Subash Adhikari",              phone: "9802751386", email: "nayabazar@glbsl.com.np" },
  { id: "13", sn: 13, name: "Puspalal Chowk", district: "Morang",        municipality: "Budhiganga Rural Municipality",              ward: 1, locality: "Puspalal Chowk",   contactPerson: "Kabiraj Pokharel",             phone: "9802751387", email: "pushpalalchowk@glbsl.com.np" },
  { id: "14", sn: 14, name: "Dulari",         district: "Morang",        municipality: "Sundarharaicha Municipality",                ward: 4, locality: "Dulari",           contactPerson: "Sabitra Subedi Ghimire",       phone: "9802751388", email: "dulari@glbsl.com.np" },
  { id: "15", sn: 15, name: "Buddha Chowk",   district: "Sunsari",       municipality: "Duhabi Municipality",                       ward: 10, locality: "Buddha Chowk",    contactPerson: "Sunil Kumar Majhi",            phone: "9802751389", email: "buddhachowk@glbsl.com.np" },
  { id: "16", sn: 16, name: "Keraun",         district: "Morang",        municipality: "Kanepokhari Rural Municipality",             ward: 5, locality: "Keraun",           contactPerson: "Narayan Kumar Majhi",          phone: "9802751390", email: "keroun@glbsl.com.np" },
  { id: "17", sn: 17, name: "Hasandaha",      district: "Morang",        municipality: "Pathari Shanishchare Municipality",          ward: 6, locality: "Hasandaha",        contactPerson: "Manoj Kumar Yadav",            phone: "9802751391", email: "hasandaha@glbsl.com.np" },
  { id: "18", sn: 18, name: "Kaseni",         district: "Morang",        municipality: "Belbari Municipality",                      ward: 5, locality: "Kaseni",           contactPerson: "Bikash Chaudhary",             phone: "9802751392", email: "kaseni@glbsl.com.np" },
  { id: "19", sn: 19, name: "Mangalbare",     district: "Morang",        municipality: "Urlabari Municipality",                     ward: 3, locality: "Mangalbare",       contactPerson: "Jiwan Gurung",                 phone: "9802751393", email: "mangalbare@glbsl.com.np" },
  { id: "20", sn: 20, name: "Kalabanzar",     district: "Sunsari",       municipality: "Barahachhetra Municipality",                ward: 5, locality: "Kalabanzar",       contactPerson: "Yubraj Niraula",               phone: "9802751394", email: "kalabanjar@glbsl.com.np" },
  { id: "21", sn: 21, name: "Chimdi",         district: "Sunsari",       municipality: "Barju Rural Municipality",                  ward: 6, locality: "Chimdi",           contactPerson: "Nabin Kumar Chaudhary",        phone: "9802751395", email: "chimdi@glbsl.com.np" },
  { id: "22", sn: 22, name: "Inaruwa",        district: "Sunsari",       municipality: "Inaruwa Municipality",                      ward: 1, locality: "Inaruwa",          contactPerson: "Khagendra Poudel",             phone: "9802751396", email: "inaruwa@glbsl.com.np" },
  { id: "23", sn: 23, name: "Rampur",         district: "Okhaldhunga",   municipality: "Molung Rural Municipality",                 ward: 2, locality: "Rampur",           contactPerson: "Mandira Katel",                phone: "9802751397", email: "rampur@glbsl.com.np" },
  { id: "24", sn: 24, name: "Pyauli",         district: "Bhojpur",       municipality: "Arun Rural Municipality",                   ward: 3, locality: "Pyauli",           contactPerson: "Alisiba Raika Magar",          phone: "9802751398", email: "pyauli@glbsl.com.np" },
  { id: "25", sn: 25, name: "Rangeli",        district: "Morang",        municipality: "Rangeli Municipality",                      ward: 8, locality: "Rangeli",          contactPerson: "Subek Kumar Shah",             phone: "9802751399", email: "rangeli@glbsl.com.np" },
  { id: "26", sn: 26, name: "Sautha",         district: "Morang",        municipality: "Ratuwamai Municipality",                    ward: 6, locality: "Sautha",           contactPerson: "Raj Kiran Kumari Mandal",      phone: "9802751401", email: "sautha@glbsl.com.np" },
  { id: "27", sn: 27, name: "Nalbari",        district: "Morang",        municipality: "Belbari Municipality",                      ward: 9, locality: "Nalbari",          contactPerson: "Sarita Senehang",              phone: "9802751832", email: "nalbari@glbsl.com.np" },
  { id: "28", sn: 28, name: "Laukahi",        district: "Sunsari",       municipality: "Koshi Rural Municipality",                  ward: 1, locality: "Laukahi",          contactPerson: "Pramita Kumari Bhagat",        phone: "9802751831", email: "laukahi@glbsl.com.np" },
  { id: "29", sn: 29, name: "Shivaganj",      district: "Jhapa",         municipality: "Shivasatakshi Municipality",                ward: 6, locality: "Shivganj",         contactPerson: "Mithun Kumar Singh Gangai",    phone: "9802751830", email: "shivaganj@glbsl.com.np" },
  { id: "30", sn: 30, name: "Budhabare",      district: "Jhapa",         municipality: "Buddhashanti Rural Municipality",           ward: 2, locality: "Jayapur",          contactPerson: "Pawan Kumari Rai",             phone: "9802751834", email: "jayapur@glbsl.com.np" },
  { id: "31", sn: 31, name: "Damak",          district: "Jhapa",         municipality: "Damak Municipality",                       ward: 7, locality: "Damak",            contactPerson: "Dev Narayan Das",              phone: "9802751360", email: "damak@glbsl.com.np" },
  { id: "32", sn: 32, name: "Rajabas",        district: "Udayapur",      municipality: "Triyuga Municipality",                     ward: 9, locality: "Rajabas",          contactPerson: "Subash Yadav",                 phone: "9802751361", email: "rajabas@glbsl.com.np" },
  { id: "33", sn: 33, name: "Risku",          district: "Udayapur",      municipality: "Katari Municipality",                      ward: 6, locality: "Risku",            contactPerson: "Kul Bahadur Basnet",           phone: "9802751362", email: "katari@glbsl.com.np" },
  { id: "34", sn: 34, name: "Schoolchaun",    district: "Jhapa",         municipality: "Gauradaha Municipality",                   ward: 5, locality: "Schoolchaun",      contactPerson: "Asmita Limbu",                 phone: "9802751363", email: "schoolchaun@glbsl.com.np" },
  { id: "35", sn: 35, name: "Chakchaki",      district: "Jhapa",         municipality: "Barhadashi Rural Municipality",             ward: 4, locality: "Chakchaki",        contactPerson: "Sagar Shah Sudi",              phone: "9802751364", email: "chakchaki@glbsl.com.np" },
  { id: "36", sn: 36, name: "Diktel",         district: "Khotang",       municipality: "Diktel Rupakot Majhuwagadi Municipality",  ward: 2, locality: "Diktel",           contactPerson: "Sanjita Limbu",                phone: "9709024484", email: "diktel@glbsl.com.np" },
  { id: "37", sn: 37, name: "Bhojpur",        district: "Bhojpur",       municipality: "Bhojpur Municipality",                     ward: 8, locality: "Bhojpur",          contactPerson: "Durga Shrestha",               phone: "9802726064", email: "bhojpur@glbsl.com.np" },
  { id: "38", sn: 38, name: "Dharan",         district: "Sunsari",       municipality: "Dharan Sub-metropolitan",                  ward: 8, locality: "Dharan",           contactPerson: "Bhadra Kafle",                 phone: "9802725694", email: "dharan@glbsl.com.np" },
];

export const getBranches = (): BranchData[] => branchData;

export const getBranchById = (id: string): BranchData | undefined =>
  branchData.find((b) => b.id === id);

export const getBranchesByDistrict = (district: string): BranchData[] =>
  branchData.filter((b) => b.district.toLowerCase().includes(district.toLowerCase()));
