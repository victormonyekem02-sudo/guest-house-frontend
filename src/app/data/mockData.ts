// Mock data for the Guest House Management System

export interface Staff {
  id: string;
  name: string;
  role: 'Housekeeping' | 'Kitchen' | 'Maintenance' | 'Front Desk';
  status: 'Available' | 'Busy' | 'Off Duty';
  phone: string;
  email: string;
  shift: 'Morning' | 'Evening' | 'Night';
}

export interface Room {
  id: string;
  number: string;
  type: 'Single' | 'Double' | 'Suite' | 'Deluxe';
  status: 'Available' | 'Occupied' | 'Cleaning' | 'Maintenance';
  price: number;
  currentGuest?: string;
  checkIn?: string;
  checkOut?: string;
}

export interface ServiceRequest {
  id: string;
  guestName: string;
  roomNumber: string;
  serviceType: 'Housekeeping' | 'Food Order' | 'Maintenance' | 'Laundry' | 'Transport' | 'Extra Amenities';
  description: string;
  priority: 'Low' | 'Medium' | 'High';
  status: 'Pending' | 'In Progress' | 'Completed' | 'Cancelled';
  assignedTo?: string;
  createdAt: string;
  completedAt?: string;
}

export interface Guest {
  id: string;
  name: string;
  roomNumber: string;
  checkIn: string;
  checkOut: string;
  phone: string;
  email: string;
  accessCode: string;
}

export interface Activity {
  id: string;
  type: 'Check-in' | 'Check-out' | 'Service Request' | 'Room Cleaning' | 'Maintenance' | 'Payment';
  description: string;
  performedBy: string;
  timestamp: string;
  roomNumber?: string;
}

// ─── STAFF ───────────────────────────────────────────────────────────────────
export const initialStaff: Staff[] = [
  { id: 'S001', name: 'Tlalane Tsotetsi',  role: 'Housekeeping', status: 'Available', phone: '+266 0000 0001', email: 'tlalane.tsotetsi@stoneguesthouse.com',  shift: 'Morning'  },
  { id: 'S002', name: 'Sargen Sekoala',    role: 'Maintenance',  status: 'Available', phone: '+266 0000 0002', email: 'sargen.sekoala@stoneguesthouse.com',    shift: 'Night'    },
  { id: 'S003', name: 'Sentle Mapeshoane', role: 'Maintenance',  status: 'Available', phone: '+266 0000 0003', email: 'sentle.mapeshoane@stoneguesthouse.com', shift: 'Morning'  },
  { id: 'S004', name: 'Thabo Lebusa',      role: 'Kitchen',      status: 'Available', phone: '+266 0000 0004', email: 'thabo.lebusa@stoneguesthouse.com',      shift: 'Evening'  },
  { id: 'S005', name: 'Viktor Monyeke',    role: 'Maintenance',  status: 'Available', phone: '+266 0000 0005', email: 'viktor.monyeke@stoneguesthouse.com',    shift: 'Evening'  },
  { id: 'S006', name: 'Thabang Nelson',    role: 'Front Desk',   status: 'Available', phone: '+266 0000 0006', email: 'thabang.nelson@stoneguesthouse.com',    shift: 'Morning'  },
];

// ─── ROOMS (60 rooms across 3 floors) ────────────────────────────────────────
export const initialRooms: Room[] = [
  // Ground floor G01–G20
  { id: 'R001', number: 'G01',  type: 'Single', status: 'Occupied',  price: 850,  currentGuest: 'Guest G01',  checkIn: '2026-03-20', checkOut: '2026-03-27' },
  { id: 'R002', number: 'G02',  type: 'Single', status: 'Occupied',  price: 850,  currentGuest: 'Guest G02',  checkIn: '2026-03-20', checkOut: '2026-03-27' },
  { id: 'R003', number: 'G03',  type: 'Double', status: 'Occupied',  price: 1200, currentGuest: 'Guest G03',  checkIn: '2026-03-20', checkOut: '2026-03-27' },
  { id: 'R004', number: 'G04',  type: 'Double', status: 'Occupied',  price: 1200, currentGuest: 'Guest G04',  checkIn: '2026-03-20', checkOut: '2026-03-27' },
  { id: 'R005', number: 'G05',  type: 'Suite',  status: 'Occupied',  price: 2500, currentGuest: 'Guest G05',  checkIn: '2026-03-20', checkOut: '2026-03-27' },
  { id: 'R006', number: 'G06',  type: 'Suite',  status: 'Occupied',  price: 2500, currentGuest: 'Guest G06',  checkIn: '2026-03-20', checkOut: '2026-03-27' },
  { id: 'R007', number: 'G07',  type: 'Deluxe', status: 'Occupied',  price: 1800, currentGuest: 'Guest G07',  checkIn: '2026-03-20', checkOut: '2026-03-27' },
  { id: 'R008', number: 'G08',  type: 'Deluxe', status: 'Occupied',  price: 1800, currentGuest: 'Guest G08',  checkIn: '2026-03-20', checkOut: '2026-03-27' },
  { id: 'R009', number: 'G09',  type: 'Single', status: 'Available', price: 850  },
  { id: 'R010', number: 'G10',  type: 'Single', status: 'Available', price: 850  },
  { id: 'R011', number: 'G11',  type: 'Double', status: 'Available', price: 1200 },
  { id: 'R012', number: 'G12',  type: 'Double', status: 'Available', price: 1200 },
  { id: 'R013', number: 'G13',  type: 'Suite',  status: 'Available', price: 2500 },
  { id: 'R014', number: 'G14',  type: 'Suite',  status: 'Available', price: 2500 },
  { id: 'R015', number: 'G15',  type: 'Deluxe', status: 'Available', price: 1800 },
  { id: 'R016', number: 'G16',  type: 'Deluxe', status: 'Available', price: 1800 },
  { id: 'R017', number: 'G17',  type: 'Single', status: 'Available', price: 850  },
  { id: 'R018', number: 'G18',  type: 'Single', status: 'Available', price: 850  },
  { id: 'R019', number: 'G19',  type: 'Double', status: 'Available', price: 1200 },
  { id: 'R020', number: 'G20',  type: 'Double', status: 'Available', price: 1200 },
  // Lower ground LG01–LG20
  { id: 'R021', number: 'LG01', type: 'Single', status: 'Occupied',  price: 750,  currentGuest: 'Guest LG01', checkIn: '2026-03-20', checkOut: '2026-03-27' },
  { id: 'R022', number: 'LG02', type: 'Single', status: 'Occupied',  price: 750,  currentGuest: 'Guest LG02', checkIn: '2026-03-20', checkOut: '2026-03-27' },
  { id: 'R023', number: 'LG03', type: 'Double', status: 'Occupied',  price: 1100, currentGuest: 'Guest LG03', checkIn: '2026-03-20', checkOut: '2026-03-27' },
  { id: 'R024', number: 'LG04', type: 'Double', status: 'Occupied',  price: 1100, currentGuest: 'Guest LG04', checkIn: '2026-03-20', checkOut: '2026-03-27' },
  { id: 'R025', number: 'LG05', type: 'Suite',  status: 'Occupied',  price: 2200, currentGuest: 'Guest LG05', checkIn: '2026-03-20', checkOut: '2026-03-27' },
  { id: 'R026', number: 'LG06', type: 'Suite',  status: 'Occupied',  price: 2200, currentGuest: 'Guest LG06', checkIn: '2026-03-20', checkOut: '2026-03-27' },
  { id: 'R027', number: 'LG07', type: 'Deluxe', status: 'Occupied',  price: 1600, currentGuest: 'Guest LG07', checkIn: '2026-03-20', checkOut: '2026-03-27' },
  { id: 'R028', number: 'LG08', type: 'Deluxe', status: 'Occupied',  price: 1600, currentGuest: 'Guest LG08', checkIn: '2026-03-20', checkOut: '2026-03-27' },
  { id: 'R029', number: 'LG09', type: 'Single', status: 'Available', price: 750  },
  { id: 'R030', number: 'LG10', type: 'Single', status: 'Available', price: 750  },
  { id: 'R031', number: 'LG11', type: 'Double', status: 'Available', price: 1100 },
  { id: 'R032', number: 'LG12', type: 'Double', status: 'Available', price: 1100 },
  { id: 'R033', number: 'LG13', type: 'Suite',  status: 'Available', price: 2200 },
  { id: 'R034', number: 'LG14', type: 'Suite',  status: 'Available', price: 2200 },
  { id: 'R035', number: 'LG15', type: 'Deluxe', status: 'Available', price: 1600 },
  { id: 'R036', number: 'LG16', type: 'Deluxe', status: 'Available', price: 1600 },
  { id: 'R037', number: 'LG17', type: 'Single', status: 'Available', price: 750  },
  { id: 'R038', number: 'LG18', type: 'Single', status: 'Available', price: 750  },
  { id: 'R039', number: 'LG19', type: 'Double', status: 'Available', price: 1100 },
  { id: 'R040', number: 'LG20', type: 'Double', status: 'Available', price: 1100 },
  // Upper ground UG01–UG20
  { id: 'R041', number: 'UG01', type: 'Single', status: 'Occupied',  price: 950,  currentGuest: 'Guest UG01', checkIn: '2026-03-20', checkOut: '2026-03-27' },
  { id: 'R042', number: 'UG02', type: 'Single', status: 'Occupied',  price: 950,  currentGuest: 'Guest UG02', checkIn: '2026-03-20', checkOut: '2026-03-27' },
  { id: 'R043', number: 'UG03', type: 'Double', status: 'Occupied',  price: 1350, currentGuest: 'Guest UG03', checkIn: '2026-03-20', checkOut: '2026-03-27' },
  { id: 'R044', number: 'UG04', type: 'Double', status: 'Occupied',  price: 1350, currentGuest: 'Guest UG04', checkIn: '2026-03-20', checkOut: '2026-03-27' },
  { id: 'R045', number: 'UG05', type: 'Suite',  status: 'Occupied',  price: 2800, currentGuest: 'Guest UG05', checkIn: '2026-03-20', checkOut: '2026-03-27' },
  { id: 'R046', number: 'UG06', type: 'Suite',  status: 'Occupied',  price: 2800, currentGuest: 'Guest UG06', checkIn: '2026-03-20', checkOut: '2026-03-27' },
  { id: 'R047', number: 'UG07', type: 'Deluxe', status: 'Occupied',  price: 2000, currentGuest: 'Guest UG07', checkIn: '2026-03-20', checkOut: '2026-03-27' },
  { id: 'R048', number: 'UG08', type: 'Deluxe', status: 'Occupied',  price: 2000, currentGuest: 'Guest UG08', checkIn: '2026-03-20', checkOut: '2026-03-27' },
  { id: 'R049', number: 'UG09', type: 'Single', status: 'Available', price: 950  },
  { id: 'R050', number: 'UG10', type: 'Single', status: 'Available', price: 950  },
  { id: 'R051', number: 'UG11', type: 'Double', status: 'Available', price: 1350 },
  { id: 'R052', number: 'UG12', type: 'Double', status: 'Available', price: 1350 },
  { id: 'R053', number: 'UG13', type: 'Suite',  status: 'Available', price: 2800 },
  { id: 'R054', number: 'UG14', type: 'Suite',  status: 'Available', price: 2800 },
  { id: 'R055', number: 'UG15', type: 'Deluxe', status: 'Available', price: 2000 },
  { id: 'R056', number: 'UG16', type: 'Deluxe', status: 'Available', price: 2000 },
  { id: 'R057', number: 'UG17', type: 'Single', status: 'Available', price: 950  },
  { id: 'R058', number: 'UG18', type: 'Single', status: 'Available', price: 950  },
  { id: 'R059', number: 'UG19', type: 'Double', status: 'Available', price: 1350 },
  { id: 'R060', number: 'UG20', type: 'Double', status: 'Available', price: 1350 },
];

// ─── GUESTS (60 total) ───────────────────────────────────────────────────────
export const initialGuests: Guest[] = [
  // Ground floor G01–G20
  { id: 'G01',  name: 'Guest G01',  roomNumber: 'G01',  checkIn: '2026-03-20', checkOut: '2026-03-27', phone: '', email: '', accessCode: 'G01'  },
  { id: 'G02',  name: 'Guest G02',  roomNumber: 'G02',  checkIn: '2026-03-20', checkOut: '2026-03-27', phone: '', email: '', accessCode: 'G02'  },
  { id: 'G03',  name: 'Guest G03',  roomNumber: 'G03',  checkIn: '2026-03-20', checkOut: '2026-03-27', phone: '', email: '', accessCode: 'G03'  },
  { id: 'G04',  name: 'Guest G04',  roomNumber: 'G04',  checkIn: '2026-03-20', checkOut: '2026-03-27', phone: '', email: '', accessCode: 'G04'  },
  { id: 'G05',  name: 'Guest G05',  roomNumber: 'G05',  checkIn: '2026-03-20', checkOut: '2026-03-27', phone: '', email: '', accessCode: 'G05'  },
  { id: 'G06',  name: 'Guest G06',  roomNumber: 'G06',  checkIn: '2026-03-20', checkOut: '2026-03-27', phone: '', email: '', accessCode: 'G06'  },
  { id: 'G07',  name: 'Guest G07',  roomNumber: 'G07',  checkIn: '2026-03-20', checkOut: '2026-03-27', phone: '', email: '', accessCode: 'G07'  },
  { id: 'G08',  name: 'Guest G08',  roomNumber: 'G08',  checkIn: '2026-03-20', checkOut: '2026-03-27', phone: '', email: '', accessCode: 'G08'  },
  { id: 'G09',  name: 'Guest G09',  roomNumber: 'G09',  checkIn: '2026-03-20', checkOut: '2026-03-27', phone: '', email: '', accessCode: 'G09'  },
  { id: 'G10',  name: 'Guest G10',  roomNumber: 'G10',  checkIn: '2026-03-20', checkOut: '2026-03-27', phone: '', email: '', accessCode: 'G10'  },
  { id: 'G11',  name: 'Guest G11',  roomNumber: 'G11',  checkIn: '2026-03-20', checkOut: '2026-03-27', phone: '', email: '', accessCode: 'G11'  },
  { id: 'G12',  name: 'Guest G12',  roomNumber: 'G12',  checkIn: '2026-03-20', checkOut: '2026-03-27', phone: '', email: '', accessCode: 'G12'  },
  { id: 'G13',  name: 'Guest G13',  roomNumber: 'G13',  checkIn: '2026-03-20', checkOut: '2026-03-27', phone: '', email: '', accessCode: 'G13'  },
  { id: 'G14',  name: 'Guest G14',  roomNumber: 'G14',  checkIn: '2026-03-20', checkOut: '2026-03-27', phone: '', email: '', accessCode: 'G14'  },
  { id: 'G15',  name: 'Guest G15',  roomNumber: 'G15',  checkIn: '2026-03-20', checkOut: '2026-03-27', phone: '', email: '', accessCode: 'G15'  },
  { id: 'G16',  name: 'Guest G16',  roomNumber: 'G16',  checkIn: '2026-03-20', checkOut: '2026-03-27', phone: '', email: '', accessCode: 'G16'  },
  { id: 'G17',  name: 'Guest G17',  roomNumber: 'G17',  checkIn: '2026-03-20', checkOut: '2026-03-27', phone: '', email: '', accessCode: 'G17'  },
  { id: 'G18',  name: 'Guest G18',  roomNumber: 'G18',  checkIn: '2026-03-20', checkOut: '2026-03-27', phone: '', email: '', accessCode: 'G18'  },
  { id: 'G19',  name: 'Guest G19',  roomNumber: 'G19',  checkIn: '2026-03-20', checkOut: '2026-03-27', phone: '', email: '', accessCode: 'G19'  },
  { id: 'G20',  name: 'Guest G20',  roomNumber: 'G20',  checkIn: '2026-03-20', checkOut: '2026-03-27', phone: '', email: '', accessCode: 'G20'  },
  // Lower ground LG01–LG20
  { id: 'LG01', name: 'Guest LG01', roomNumber: 'LG01', checkIn: '2026-03-20', checkOut: '2026-03-27', phone: '', email: '', accessCode: 'LG01' },
  { id: 'LG02', name: 'Guest LG02', roomNumber: 'LG02', checkIn: '2026-03-20', checkOut: '2026-03-27', phone: '', email: '', accessCode: 'LG02' },
  { id: 'LG03', name: 'Guest LG03', roomNumber: 'LG03', checkIn: '2026-03-20', checkOut: '2026-03-27', phone: '', email: '', accessCode: 'LG03' },
  { id: 'LG04', name: 'Guest LG04', roomNumber: 'LG04', checkIn: '2026-03-20', checkOut: '2026-03-27', phone: '', email: '', accessCode: 'LG04' },
  { id: 'LG05', name: 'Guest LG05', roomNumber: 'LG05', checkIn: '2026-03-20', checkOut: '2026-03-27', phone: '', email: '', accessCode: 'LG05' },
  { id: 'LG06', name: 'Guest LG06', roomNumber: 'LG06', checkIn: '2026-03-20', checkOut: '2026-03-27', phone: '', email: '', accessCode: 'LG06' },
  { id: 'LG07', name: 'Guest LG07', roomNumber: 'LG07', checkIn: '2026-03-20', checkOut: '2026-03-27', phone: '', email: '', accessCode: 'LG07' },
  { id: 'LG08', name: 'Guest LG08', roomNumber: 'LG08', checkIn: '2026-03-20', checkOut: '2026-03-27', phone: '', email: '', accessCode: 'LG08' },
  { id: 'LG09', name: 'Guest LG09', roomNumber: 'LG09', checkIn: '2026-03-20', checkOut: '2026-03-27', phone: '', email: '', accessCode: 'LG09' },
  { id: 'LG10', name: 'Guest LG10', roomNumber: 'LG10', checkIn: '2026-03-20', checkOut: '2026-03-27', phone: '', email: '', accessCode: 'LG10' },
  { id: 'LG11', name: 'Guest LG11', roomNumber: 'LG11', checkIn: '2026-03-20', checkOut: '2026-03-27', phone: '', email: '', accessCode: 'LG11' },
  { id: 'LG12', name: 'Guest LG12', roomNumber: 'LG12', checkIn: '2026-03-20', checkOut: '2026-03-27', phone: '', email: '', accessCode: 'LG12' },
  { id: 'LG13', name: 'Guest LG13', roomNumber: 'LG13', checkIn: '2026-03-20', checkOut: '2026-03-27', phone: '', email: '', accessCode: 'LG13' },
  { id: 'LG14', name: 'Guest LG14', roomNumber: 'LG14', checkIn: '2026-03-20', checkOut: '2026-03-27', phone: '', email: '', accessCode: 'LG14' },
  { id: 'LG15', name: 'Guest LG15', roomNumber: 'LG15', checkIn: '2026-03-20', checkOut: '2026-03-27', phone: '', email: '', accessCode: 'LG15' },
  { id: 'LG16', name: 'Guest LG16', roomNumber: 'LG16', checkIn: '2026-03-20', checkOut: '2026-03-27', phone: '', email: '', accessCode: 'LG16' },
  { id: 'LG17', name: 'Guest LG17', roomNumber: 'LG17', checkIn: '2026-03-20', checkOut: '2026-03-27', phone: '', email: '', accessCode: 'LG17' },
  { id: 'LG18', name: 'Guest LG18', roomNumber: 'LG18', checkIn: '2026-03-20', checkOut: '2026-03-27', phone: '', email: '', accessCode: 'LG18' },
  { id: 'LG19', name: 'Guest LG19', roomNumber: 'LG19', checkIn: '2026-03-20', checkOut: '2026-03-27', phone: '', email: '', accessCode: 'LG19' },
  { id: 'LG20', name: 'Guest LG20', roomNumber: 'LG20', checkIn: '2026-03-20', checkOut: '2026-03-27', phone: '', email: '', accessCode: 'LG20' },
  // Upper ground UG01–UG20
  { id: 'UG01', name: 'Guest UG01', roomNumber: 'UG01', checkIn: '2026-03-20', checkOut: '2026-03-27', phone: '', email: '', accessCode: 'UG01' },
  { id: 'UG02', name: 'Guest UG02', roomNumber: 'UG02', checkIn: '2026-03-20', checkOut: '2026-03-27', phone: '', email: '', accessCode: 'UG02' },
  { id: 'UG03', name: 'Guest UG03', roomNumber: 'UG03', checkIn: '2026-03-20', checkOut: '2026-03-27', phone: '', email: '', accessCode: 'UG03' },
  { id: 'UG04', name: 'Guest UG04', roomNumber: 'UG04', checkIn: '2026-03-20', checkOut: '2026-03-27', phone: '', email: '', accessCode: 'UG04' },
  { id: 'UG05', name: 'Guest UG05', roomNumber: 'UG05', checkIn: '2026-03-20', checkOut: '2026-03-27', phone: '', email: '', accessCode: 'UG05' },
  { id: 'UG06', name: 'Guest UG06', roomNumber: 'UG06', checkIn: '2026-03-20', checkOut: '2026-03-27', phone: '', email: '', accessCode: 'UG06' },
  { id: 'UG07', name: 'Guest UG07', roomNumber: 'UG07', checkIn: '2026-03-20', checkOut: '2026-03-27', phone: '', email: '', accessCode: 'UG07' },
  { id: 'UG08', name: 'Guest UG08', roomNumber: 'UG08', checkIn: '2026-03-20', checkOut: '2026-03-27', phone: '', email: '', accessCode: 'UG08' },
  { id: 'UG09', name: 'Guest UG09', roomNumber: 'UG09', checkIn: '2026-03-20', checkOut: '2026-03-27', phone: '', email: '', accessCode: 'UG09' },
  { id: 'UG10', name: 'Guest UG10', roomNumber: 'UG10', checkIn: '2026-03-20', checkOut: '2026-03-27', phone: '', email: '', accessCode: 'UG10' },
  { id: 'UG11', name: 'Guest UG11', roomNumber: 'UG11', checkIn: '2026-03-20', checkOut: '2026-03-27', phone: '', email: '', accessCode: 'UG11' },
  { id: 'UG12', name: 'Guest UG12', roomNumber: 'UG12', checkIn: '2026-03-20', checkOut: '2026-03-27', phone: '', email: '', accessCode: 'UG12' },
  { id: 'UG13', name: 'Guest UG13', roomNumber: 'UG13', checkIn: '2026-03-20', checkOut: '2026-03-27', phone: '', email: '', accessCode: 'UG13' },
  { id: 'UG14', name: 'Guest UG14', roomNumber: 'UG14', checkIn: '2026-03-20', checkOut: '2026-03-27', phone: '', email: '', accessCode: 'UG14' },
  { id: 'UG15', name: 'Guest UG15', roomNumber: 'UG15', checkIn: '2026-03-20', checkOut: '2026-03-27', phone: '', email: '', accessCode: 'UG15' },
  { id: 'UG16', name: 'Guest UG16', roomNumber: 'UG16', checkIn: '2026-03-20', checkOut: '2026-03-27', phone: '', email: '', accessCode: 'UG16' },
  { id: 'UG17', name: 'Guest UG17', roomNumber: 'UG17', checkIn: '2026-03-20', checkOut: '2026-03-27', phone: '', email: '', accessCode: 'UG17' },
  { id: 'UG18', name: 'Guest UG18', roomNumber: 'UG18', checkIn: '2026-03-20', checkOut: '2026-03-27', phone: '', email: '', accessCode: 'UG18' },
  { id: 'UG19', name: 'Guest UG19', roomNumber: 'UG19', checkIn: '2026-03-20', checkOut: '2026-03-27', phone: '', email: '', accessCode: 'UG19' },
  { id: 'UG20', name: 'Guest UG20', roomNumber: 'UG20', checkIn: '2026-03-20', checkOut: '2026-03-27', phone: '', email: '', accessCode: 'UG20' },
];

// ─── SERVICE REQUESTS ────────────────────────────────────────────────────────
export const initialServiceRequests: ServiceRequest[] = [
  { id: 'SR001', guestName: 'Guest G01',  roomNumber: 'G01',  serviceType: 'Food Order',    description: 'Breakfast - 2x Continental, 1x Coffee', priority: 'Medium', status: 'Pending', createdAt: '2026-03-22T08:30:00' },
  { id: 'SR002', guestName: 'Guest G02',  roomNumber: 'G02',  serviceType: 'Housekeeping',  description: 'Extra towels and toiletries needed',    priority: 'Low',    status: 'Pending', createdAt: '2026-03-22T09:15:00' },
  { id: 'SR003', guestName: 'Guest LG01', roomNumber: 'LG01', serviceType: 'Maintenance',   description: 'Air conditioning not working properly', priority: 'High',   status: 'Pending', createdAt: '2026-03-22T07:45:00' },
];

// ─── ACTIVITIES ──────────────────────────────────────────────────────────────
export const initialActivities: Activity[] = [
  { id: 'A001', type: 'Check-in',     description: 'Guest G01 checked into Room G01',       performedBy: 'Thabang Nelson',    timestamp: '2026-03-20T15:00:00', roomNumber: 'G01'  },
  { id: 'A002', type: 'Room Cleaning', description: 'Room G02 cleaned and sanitized',        performedBy: 'Tlalane Tsotetsi', timestamp: '2026-03-22T10:30:00', roomNumber: 'G02'  },
  { id: 'A003', type: 'Maintenance',  description: 'Fixed electrical fault in Room LG01',   performedBy: 'Sentle Mapeshoane', timestamp: '2026-03-21T16:45:00', roomNumber: 'LG01' },
  { id: 'A004', type: 'Check-in',     description: 'Guest LG01 checked into Room LG01',     performedBy: 'Thabang Nelson',    timestamp: '2026-03-20T16:00:00', roomNumber: 'LG01' },
  { id: 'A005', type: 'Check-in',     description: 'Guest UG01 checked into Room UG01',     performedBy: 'Thabang Nelson',    timestamp: '2026-03-20T17:00:00', roomNumber: 'UG01' },
];

// ─── LOGIN CREDENTIALS ───────────────────────────────────────────────────────
export const loginCredentials = {
  manager: { username: 'Manager', password: 'P@ssw0rd' },
  staff: [
    { username: 'tlalane.tsotetsi',  password: 'P@ssw0rd', staffId: 'S001' },
    { username: 'sargen.sekoala',    password: 'P@ssw0rd', staffId: 'S002' },
    { username: 'sentle.mapeshoane', password: 'P@ssw0rd', staffId: 'S003' },
    { username: 'thabo.lebusa',      password: 'P@ssw0rd', staffId: 'S004' },
    { username: 'viktor.monyeke',    password: 'P@ssw0rd', staffId: 'S005' },
    { username: 'thabang.nelson',    password: 'P@ssw0rd', staffId: 'S006' },
  ],
  guestPassword: '12345678',
};
