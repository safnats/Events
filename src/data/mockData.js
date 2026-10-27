import { EVENT_IMAGES } from '../assets/images';

export const INITIAL_CATEGORIES = [
  'All',
  'Music & Concerts',
  'Technology',
  'Workshops',
  'Business',
  'Art & Culture',
  'Sports'
];

export const INITIAL_EVENTS = [
  {
    id: 'evt-101',
    title: 'Neon Horizon Music & Lights Festival 2026',
    slug: 'neon-horizon-music-festival',
    category: 'Music & Concerts',
    image: EVENT_IMAGES.music1,
    date: '2026-11-14',
    time: '18:00',
    endDate: '2026-11-15',
    endTime: '02:00',
    location: 'Brooklyn, New York',
    venue: 'Avant Gardner - Mirage Stage',
    address: '1028 Grand St, Brooklyn, NY 11211',
    startingPrice: 89,
    capacity: 4500,
    ticketsSold: 3820,
    status: 'Published',
    featured: true,
    organizer: {
      name: 'Vanguard Live Productions',
      avatar: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=200&q=80',
      role: 'Premier Event Curator',
      verified: true,
      email: 'events@vanguardlive.io',
      phone: '+1 (555) 234-5678'
    },
    description: 'Immerse yourself in three stages of world-class electronic music, cutting-edge laser choreography, and holographic visual arts.',
    fullDescription: 'Neon Horizon brings together over 25 international electronic and indie music icons for an unforgettable multi-sensory journey. Featuring immersive sound architectures, custom 3D projection mapping, gourmet street food pavilions, and interactive light installations designed by global digital artists.',
    highlights: [
      '3 distinct sound stages with Spatial Audio',
      'Over 25 headline international artists & DJs',
      'Interactive holographic art installations',
      'Artisanal culinary village & craft cocktails',
      'Exclusive VIP sky lounges with open bar'
    ],
    ticketTypes: [
      {
        id: 'tkt-tier-1',
        name: 'General Admission',
        price: 89,
        available: 350,
        description: 'Full festival access to all 3 stages, food market, and interactive installations.',
        perks: ['Access to all 3 stages', 'Standard entry line', 'Digital souvenir lanyard']
      },
      {
        id: 'tkt-tier-2',
        name: 'VIP Experience Pass',
        price: 185,
        available: 120,
        description: 'Express festival entry, elevated viewing decks, private air-conditioned restrooms, and 2 complimentary drinks.',
        perks: ['Fast-track VIP entrance', 'Elevated stage viewing decks', 'Private air-conditioned restrooms', '2 Signature craft cocktails']
      },
      {
        id: 'tkt-tier-3',
        name: 'All-Access Backstage Pass',
        price: 349,
        available: 25,
        description: 'Ultimate backstage hospitality lounge access, artist meet & greet chances, open premium bar, and festival merchandise pack.',
        perks: ['Backstage lounge access', 'Complimentary premium bar', 'Exclusive artist meet & greet raffle', 'Limited edition merchandise kit']
      }
    ]
  },
  {
    id: 'evt-102',
    title: 'Global AI & Web Engineering Summit 2026',
    slug: 'global-ai-web-engineering-summit',
    category: 'Technology',
    image: EVENT_IMAGES.tech1,
    date: '2026-11-20',
    time: '09:00',
    endDate: '2026-11-22',
    endTime: '17:30',
    location: 'San Francisco, CA',
    venue: 'Moscone Convention Center',
    address: '747 Howard St, San Francisco, CA 94103',
    startingPrice: 249,
    capacity: 3200,
    ticketsSold: 2890,
    status: 'Published',
    featured: true,
    organizer: {
      name: 'TechForward Global Forum',
      avatar: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&w=200&q=80',
      role: 'Global Tech Institute',
      verified: true,
      email: 'summit@techforward.com',
      phone: '+1 (555) 456-7890'
    },
    description: 'The defining conference for engineers, AI researchers, and engineering leaders shaping autonomous systems and full-stack computing.',
    fullDescription: 'Join 3,000+ engineers from OpenAI, DeepMind, Google, Meta, and pioneering startups. Delve into foundational models, agentic workflows, scalable cloud distributed computing, and the future of generative interfaces.',
    highlights: [
      '60+ keynote speakers and deep-dive technical sessions',
      'Hands-on AI agent engineering workshops',
      'Venture pitch arena and product showcases',
      'Curated executive networking dinner',
      'Complete video archives & slides included'
    ],
    ticketTypes: [
      {
        id: 'tkt-tier-1',
        name: 'Standard Conference Pass',
        price: 249,
        available: 180,
        description: 'Complete 3-day access to all keynote stages, expo hall, and session recordings.',
        perks: ['3-day general sessions', 'Expo hall entry', 'Session video recordings']
      },
      {
        id: 'tkt-tier-2',
        name: 'Workshop & Masterclass Bundle',
        price: 499,
        available: 80,
        description: 'All-inclusive pass including private hands-on code laboratories and mentor feedback.',
        perks: ['Hands-on engineering labs', '1-on-1 architecture reviews', 'Catered lunch & networking mixers']
      }
    ]
  },
  {
    id: 'evt-103',
    title: 'Symphony Under The Stars: Moonlight Philharmonia',
    slug: 'symphony-under-the-stars',
    category: 'Music & Concerts',
    image: EVENT_IMAGES.music2,
    date: '2026-11-28',
    time: '19:30',
    endDate: '2026-11-28',
    endTime: '22:30',
    location: 'Chicago, Illinois',
    venue: 'Millennium Park Pavilion',
    address: '201 E Randolph St, Chicago, IL 60602',
    startingPrice: 45,
    capacity: 5000,
    ticketsSold: 4620,
    status: 'Published',
    featured: true,
    organizer: {
      name: 'Chicago Philharmonia Society',
      avatar: 'https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?auto=format&fit=crop&w=200&q=80',
      role: 'Cultural Arts Foundation',
      verified: true,
      email: 'tickets@chicagophil.org',
      phone: '+1 (555) 789-0123'
    },
    description: 'An acoustic masterwork in open air. Experience timeless classical anthems and modern cinematic scores under starry autumn skies.',
    fullDescription: 'Eighty world-renowned orchestral musicians perform iconic works by Beethoven, Debussy, and contemporary film masterpieces by Hans Zimmer and Ennio Morricone under Chicago’s dramatic architecture.',
    highlights: [
      '80-piece live symphony orchestra',
      'Chamber choir guest accompaniment',
      'Surround outdoor acoustics',
      'Artisan wine and charcuterie pairings available'
    ],
    ticketTypes: [
      {
        id: 'tkt-tier-1',
        name: 'Lawn Seating',
        price: 45,
        available: 220,
        description: 'Bring your blanket and picnic on the lush Great Lawn with crystal-clear line-array sound.',
        perks: ['Great Lawn general admission', 'Picnic basket friendly']
      },
      {
        id: 'tkt-tier-2',
        name: 'Reserved Pavilion Chair',
        price: 110,
        available: 95,
        description: 'Direct prime view under the acoustic canopy with reserved assigned seating.',
        perks: ['Assigned sheltered seat', 'Program booklet included', 'Priority entrance']
      }
    ]
  },
  {
    id: 'evt-104',
    title: 'Modern UI/UX Design & Spatial Systems Masterclass',
    slug: 'modern-ui-ux-design-masterclass',
    category: 'Workshops',
    image: EVENT_IMAGES.workshop1,
    date: '2026-12-05',
    time: '10:00',
    endDate: '2026-12-05',
    endTime: '16:00',
    location: 'Austin, Texas',
    venue: 'Capital Factory Tech Hub',
    address: '701 Brazos St, Austin, TX 78701',
    startingPrice: 120,
    capacity: 150,
    ticketsSold: 135,
    status: 'Published',
    featured: true,
    organizer: {
      name: 'DesignCraft Collective',
      avatar: 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?auto=format&fit=crop&w=200&q=80',
      role: 'Design Education Studio',
      verified: true,
      email: 'hello@designcraft.studio',
      phone: '+1 (555) 321-6547'
    },
    description: 'Accelerate your product design craft: design systems, micro-interactions, dark/light architectures, and spatial UI patterns.',
    fullDescription: 'Led by design leaders formerly at Figma and Apple, this hands-on workshop takes you from design tokens and complex Figma components to polished live web prototypes.',
    highlights: [
      'Step-by-step interactive Figma & code labs',
      'Personal critique on your portfolio projects',
      'Lifetime design token starter kit ($299 value)',
      'Certificate of Completion from DesignCraft'
    ],
    ticketTypes: [
      {
        id: 'tkt-tier-1',
        name: 'Full Workshop Pass',
        price: 120,
        available: 15,
        description: 'Full day in-person workshop, coffee & lunch, Figma component library.',
        perks: ['In-person seat', 'Lunch & refreshments', 'Figma kit download', 'Certificate']
      }
    ]
  },
  {
    id: 'evt-105',
    title: 'Venture & Growth Capital Leadership Forum 2026',
    slug: 'venture-growth-capital-forum',
    category: 'Business',
    image: EVENT_IMAGES.business1,
    date: '2026-12-10',
    time: '08:30',
    endDate: '2026-12-11',
    endTime: '18:00',
    location: 'London, United Kingdom',
    venue: 'The Queen Elizabeth II Centre',
    address: 'Broad Sanctuary, Westminster, London SW1P 3EE',
    startingPrice: 380,
    capacity: 1200,
    ticketsSold: 940,
    status: 'Published',
    featured: false,
    organizer: {
      name: 'Apex Capital Conferences',
      avatar: 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?auto=format&fit=crop&w=200&q=80',
      role: 'Financial Forum Series',
      verified: true,
      email: 'london@apexcapforum.com',
      phone: '+44 20 7946 0912'
    },
    description: 'Where global institutional investors, private equity partners, and Series B-D founders debate capital allocation strategies.',
    fullDescription: 'Two days of high-signal discussions covering cross-border capital flows, emerging tech valuations, secondary liquidity, and LP governance.',
    highlights: [
      'Keynote panels with leading European & US partners',
      'Curated 1-to-1 LP/GP meeting concierge',
      'Gala dinner at Historic Guildhall',
      'Full research benchmark report pack'
    ],
    ticketTypes: [
      {
        id: 'tkt-tier-1',
        name: 'Delegate Pass',
        price: 380,
        available: 120,
        description: 'Access to all keynotes, networking break lounges, and digital attendee portal.',
        perks: ['Access to main halls', 'Networking lounge app', 'Breakfast & luncheon']
      },
      {
        id: 'tkt-tier-2',
        name: 'Executive Partner Pass',
        price: 750,
        available: 40,
        description: 'Includes 1-on-1 concierge meetings, private investor roundtable, and Guildhall Gala Dinner.',
        perks: ['Gala Dinner invitation', 'Private deal room access', '1-on-1 concierge pairings']
      }
    ]
  },
  {
    id: 'evt-106',
    title: 'Avant-Garde Expressions: Contemporary Art Biennale',
    slug: 'contemporary-art-biennale',
    category: 'Art & Culture',
    image: EVENT_IMAGES.art1,
    date: '2026-12-15',
    time: '11:00',
    endDate: '2026-12-22',
    endTime: '20:00',
    location: 'Berlin, Germany',
    venue: 'Kraftwerk Berlin',
    address: 'Köpenicker Str. 70, 10179 Berlin',
    startingPrice: 28,
    capacity: 8000,
    ticketsSold: 5800,
    status: 'Published',
    featured: true,
    organizer: {
      name: 'Berlin Arts Foundation',
      avatar: 'https://images.unsplash.com/photo-1544005313-94ddf0286df2?auto=format&fit=crop&w=200&q=80',
      role: 'Curatorial Committee',
      verified: true,
      email: 'curator@berlinarts.de',
      phone: '+49 30 1234567'
    },
    description: 'Over 120 monumental sculptures, generative digital tapestries, and live performance art inside an iconic industrial cathedral.',
    fullDescription: 'The 2026 Biennale unites visionary artists across 30 nations. Discover mind-bending kinetic installations, bio-luminescent flora sculptures, and intimate spoken-word salons.',
    highlights: [
      '120+ international exhibiting artists',
      'Architectural industrial exhibition space',
      'Nightly live ambient audiovisual performances',
      'Curator guided tours in English & German'
    ],
    ticketTypes: [
      {
        id: 'tkt-tier-1',
        name: 'Single Day Entry',
        price: 28,
        available: 400,
        description: 'Full single day admission to all gallery chambers and daily performances.',
        perks: ['Single day gallery pass', 'Exhibition guide booklet']
      },
      {
        id: 'tkt-tier-2',
        name: 'Opening Night VIP Gala',
        price: 95,
        available: 60,
        description: 'Private preview evening with artist discussions, champagne reception, and live DJ set.',
        perks: ['Opening night preview', 'Champagne reception', 'Artist panel access']
      }
    ]
  },
  {
    id: 'evt-107',
    title: 'Championship Urban Marathon & Fitness Festival',
    slug: 'championship-urban-marathon',
    category: 'Sports',
    image: EVENT_IMAGES.sports1,
    date: '2027-01-10',
    time: '06:30',
    endDate: '2027-01-10',
    endTime: '15:00',
    location: 'Seattle, WA',
    venue: 'Seattle Waterfront & Center Plaza',
    address: '305 Harrison St, Seattle, WA 98109',
    startingPrice: 65,
    capacity: 10000,
    ticketsSold: 8420,
    status: 'Published',
    featured: false,
    organizer: {
      name: 'Pacific Athletic Alliance',
      avatar: 'https://images.unsplash.com/photo-1506794778202-cad84cf45f1d?auto=format&fit=crop&w=200&q=80',
      role: 'Sports Events Federation',
      verified: true,
      email: 'race@pacificathletic.org',
      phone: '+1 (555) 987-6543'
    },
    description: 'Scenic 10K, Half-Marathon, and Full Marathon along Puget Sound, followed by a live acoustic recovery festival.',
    fullDescription: 'Join 10,000 passionate runners on Seattle’s iconic waterfront course. Certified Boston Marathon qualifier with top-tier hydration stations, chip timing, and custom finishers medals.',
    highlights: [
      'Certified USATF championship race course',
      'Custom die-cast finisher medal & performance shirt',
      'Post-race recovery zone with massage & nutrition',
      'Live music and food truck celebration plaza'
    ],
    ticketTypes: [
      {
        id: 'tkt-tier-1',
        name: 'Half Marathon Registration',
        price: 65,
        available: 300,
        description: 'Includes race bib, timing chip, technical runner shirt, and finisher medal.',
        perks: ['Bib & RFID timing chip', 'Technical race shirt', 'Commemorative finisher medal']
      },
      {
        id: 'tkt-tier-2',
        name: 'Full Marathon Pro Registration',
        price: 95,
        available: 150,
        description: 'Full 42.195 km marathon entry, elite start corral qualifier, and VIP gear check.',
        perks: ['Full Marathon entry', 'Corral A/B access', 'VIP gear lounge']
      }
    ]
  },
  {
    id: 'evt-108',
    title: 'Indie Rock Resonance: The Sunset Horizon Sessions',
    slug: 'indie-rock-resonance',
    category: 'Music & Concerts',
    image: EVENT_IMAGES.music3,
    date: '2027-01-22',
    time: '19:00',
    endDate: '2027-01-22',
    endTime: '23:30',
    location: 'Los Angeles, CA',
    venue: 'The Greek Theatre',
    address: '2700 N Vermont Ave, Los Angeles, CA 90027',
    startingPrice: 55,
    capacity: 5900,
    ticketsSold: 5120,
    status: 'Published',
    featured: false,
    organizer: {
      name: 'Sunset Soundworks',
      avatar: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=200&q=80',
      role: 'Music Promoter',
      verified: true,
      email: 'info@sunsetsoundworks.com',
      phone: '+1 (555) 876-5432'
    },
    description: 'An intimate evening of indie rock, soaring guitar solos, and emotive lyrics in Griffith Park’s outdoor amphitheatre.',
    fullDescription: 'Experience four celebrated indie bands performing acoustic and electric sets under the starry California sky, surrounded by eucalyptus trees in historical Greek Theatre.',
    highlights: [
      'Legendary open-air acoustic theatre',
      'Sunset views over Los Angeles hills',
      'Exclusive tour vinyl merch booth',
      'Organic food & California wine garden'
    ],
    ticketTypes: [
      {
        id: 'tkt-tier-1',
        name: 'Section B Reserved Seat',
        price: 55,
        available: 110,
        description: 'Great elevated sightlines and crystal acoustics.',
        perks: ['Assigned chair seating', 'Merch fast-track']
      },
      {
        id: 'tkt-tier-2',
        name: 'Pit General Admission',
        price: 125,
        available: 40,
        description: 'Directly in front of the stage for high energy fans.',
        perks: ['Front of stage access', 'Early venue entry']
      }
    ]
  }
];

export const INITIAL_BOOKINGS = [
  {
    id: 'bkg-901',
    bookingReference: 'EVT-89412-A',
    ticketId: 'TKT-EVT-78901',
    eventId: 'evt-101',
    eventTitle: 'Neon Horizon Music & Lights Festival 2026',
    eventImage: EVENT_IMAGES.music1,
    eventDate: '2026-11-14',
    eventTime: '18:00',
    eventVenue: 'Avant Gardner - Mirage Stage',
    eventLocation: 'Brooklyn, New York',
    ticketTier: 'VIP Experience Pass',
    ticketQuantity: 2,
    unitPrice: 185,
    serviceFee: 18,
    totalAmount: 388,
    bookingDate: '2026-10-24 14:32',
    paymentStatus: 'Paid',
    bookingStatus: 'Confirmed',
    ticketValidity: 'Active',
    attendeeName: 'Alex Morgan',
    attendeeEmail: 'alex.morgan@eventra.com',
    attendeePhone: '+1 (555) 321-9876',
    qrData: 'EVENTRA-AUTH-PASS-TKT-EVT-78901-VERIFIED'
  },
  {
    id: 'bkg-902',
    bookingReference: 'EVT-74193-B',
    ticketId: 'TKT-EVT-78902',
    eventId: 'evt-102',
    eventTitle: 'Global AI & Web Engineering Summit 2026',
    eventImage: EVENT_IMAGES.tech1,
    eventDate: '2026-11-20',
    eventTime: '09:00',
    eventVenue: 'Moscone Convention Center',
    eventLocation: 'San Francisco, CA',
    ticketTier: 'Standard Conference Pass',
    ticketQuantity: 1,
    unitPrice: 249,
    serviceFee: 15,
    totalAmount: 264,
    bookingDate: '2026-10-22 10:15',
    paymentStatus: 'Paid',
    bookingStatus: 'Confirmed',
    ticketValidity: 'Active',
    attendeeName: 'Alex Morgan',
    attendeeEmail: 'alex.morgan@eventra.com',
    attendeePhone: '+1 (555) 321-9876',
    qrData: 'EVENTRA-AUTH-PASS-TKT-EVT-78902-VERIFIED'
  },
  {
    id: 'bkg-903',
    bookingReference: 'EVT-55219-C',
    ticketId: 'TKT-EVT-78903',
    eventId: 'evt-104',
    eventTitle: 'Modern UI/UX Design & Spatial Systems Masterclass',
    eventImage: EVENT_IMAGES.workshop1,
    eventDate: '2026-12-05',
    eventTime: '10:00',
    eventVenue: 'Capital Factory Tech Hub',
    eventLocation: 'Austin, Texas',
    ticketTier: 'Full Workshop Pass',
    ticketQuantity: 1,
    unitPrice: 120,
    serviceFee: 10,
    totalAmount: 130,
    bookingDate: '2026-10-18 16:45',
    paymentStatus: 'Paid',
    bookingStatus: 'Confirmed',
    ticketValidity: 'Active',
    attendeeName: 'Sarah Jenkins',
    attendeeEmail: 'sarah.j@designer.io',
    attendeePhone: '+1 (555) 765-4321',
    qrData: 'EVENTRA-AUTH-PASS-TKT-EVT-78903-VERIFIED'
  },
  {
    id: 'bkg-904',
    bookingReference: 'EVT-33108-D',
    ticketId: 'TKT-EVT-78904',
    eventId: 'evt-103',
    eventTitle: 'Symphony Under The Stars: Moonlight Philharmonia',
    eventImage: EVENT_IMAGES.music2,
    eventDate: '2026-11-28',
    eventTime: '19:30',
    eventVenue: 'Millennium Park Pavilion',
    eventLocation: 'Chicago, Illinois',
    ticketTier: 'Reserved Pavilion Chair',
    ticketQuantity: 2,
    unitPrice: 110,
    serviceFee: 14,
    totalAmount: 234,
    bookingDate: '2026-10-12 11:20',
    paymentStatus: 'Paid',
    bookingStatus: 'Confirmed',
    ticketValidity: 'Active',
    attendeeName: 'David Chen',
    attendeeEmail: 'dchen@techventures.co',
    attendeePhone: '+1 (555) 890-1234',
    qrData: 'EVENTRA-AUTH-PASS-TKT-EVT-78904-VERIFIED'
  }
];

export const INITIAL_ATTENDEES = [
  {
    id: 'att-01',
    name: 'Alex Morgan',
    email: 'alex.morgan@eventra.com',
    phone: '+1 (555) 321-9876',
    bookingCount: 4,
    totalSpent: 874,
    registrationDate: '2026-03-15',
    status: 'VIP',
    avatar: 'https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?auto=format&fit=crop&w=150&q=80'
  },
  {
    id: 'att-02',
    name: 'Sarah Jenkins',
    email: 'sarah.j@designer.io',
    phone: '+1 (555) 765-4321',
    bookingCount: 3,
    totalSpent: 480,
    registrationDate: '2026-04-02',
    status: 'Active',
    avatar: 'https://images.unsplash.com/photo-1494790108377-be9c29b29330?auto=format&fit=crop&w=150&q=80'
  },
  {
    id: 'att-03',
    name: 'David Chen',
    email: 'dchen@techventures.co',
    phone: '+1 (555) 890-1234',
    bookingCount: 5,
    totalSpent: 1420,
    registrationDate: '2026-01-28',
    status: 'VIP',
    avatar: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&w=150&q=80'
  },
  {
    id: 'att-04',
    name: 'Elena Rostova',
    email: 'elena.rostova@artstudio.de',
    phone: '+49 30 8923 112',
    bookingCount: 2,
    totalSpent: 215,
    registrationDate: '2026-05-19',
    status: 'Active',
    avatar: 'https://images.unsplash.com/photo-1544005313-94ddf0286df2?auto=format&fit=crop&w=150&q=80'
  },
  {
    id: 'att-05',
    name: 'Marcus Sterling',
    email: 'm.sterling@capitaladvisors.uk',
    phone: '+44 20 7946 0888',
    bookingCount: 3,
    totalSpent: 1130,
    registrationDate: '2026-02-14',
    status: 'VIP',
    avatar: 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?auto=format&fit=crop&w=150&q=80'
  }
];

// Admin Dashboard Analytics data - closely inspired by Reference Image 1
export const ADMIN_ANALYTICS = {
  stats: {
    totalRevenue: 148920,
    revenueChange: '+18.4%',
    totalAttendees: 12480,
    attendeesChange: '+12.2%',
    eventsHosted: 48,
    eventsChange: '+6 this month',
    totalTicketsSold: 9840,
    ticketsChange: '+15.8%'
  },
  // Revenue and Attendance Trends (Combined Area/Line chart with purple & pink accents)
  trends: [
    { month: 'Jan', revenue: 9800, attendees: 720 },
    { month: 'Feb', revenue: 11400, attendees: 840 },
    { month: 'Mar', revenue: 14200, attendees: 1100 },
    { month: 'Apr', revenue: 16800, attendees: 1350 },
    { month: 'May', revenue: 19500, attendees: 1520 },
    { month: 'Jun', revenue: 24800, attendees: 1980 },
    { month: 'Jul', revenue: 22100, attendees: 1750 },
    { month: 'Aug', revenue: 26400, attendees: 2100 },
    { month: 'Sep', revenue: 29500, attendees: 2340 },
    { month: 'Oct', revenue: 34200, attendees: 2750 },
    { month: 'Nov', revenue: 38900, attendees: 3100 },
    { month: 'Dec', revenue: 42500, attendees: 3450 }
  ],
  // Event Performance Comparison (Tickets Sold vs Capacity)
  performanceComparison: [
    { name: 'Neon Horizon', sold: 3820, capacity: 4500, rate: '85%' },
    { name: 'AI Summit', sold: 2890, capacity: 3200, rate: '90%' },
    { name: 'Moonlight Philharmonia', sold: 4620, capacity: 5000, rate: '92%' },
    { name: 'UI/UX Masterclass', sold: 135, capacity: 150, rate: '90%' },
    { name: 'Venture Forum', sold: 940, capacity: 1200, rate: '78%' },
    { name: 'Art Biennale', sold: 5800, capacity: 8000, rate: '73%' },
    { name: 'Urban Marathon', sold: 8420, capacity: 10000, rate: '84%' }
  ],
  // Attendee Growth (Line Chart)
  attendeeGrowth: [
    { week: 'W1', newAttendees: 340, total: 10200 },
    { week: 'W2', newAttendees: 480, total: 10680 },
    { week: 'W3', newAttendees: 620, total: 11300 },
    { week: 'W4', newAttendees: 790, total: 12090 },
    { week: 'W5', newAttendees: 890, total: 12980 },
    { week: 'W6', newAttendees: 1040, total: 14020 }
  ],
  // Event Categories by Revenue (Donut Chart)
  categoriesRevenue: [
    { name: 'Music & Concerts', value: 68400, color: '#350047' },
    { name: 'Technology', value: 38500, color: '#F43F8C' },
    { name: 'Business', value: 21300, color: '#7C3AED' },
    { name: 'Art & Culture', value: 12800, color: '#EC4899' },
    { name: 'Sports', value: 7920, color: '#06B6D4' }
  ],
  // Top Performing Events
  topEvents: [
    {
      id: 'evt-101',
      title: 'Neon Horizon Music & Lights Festival',
      category: 'Music & Concerts',
      sales: '$339,980',
      soldPercentage: 85,
      status: 'Active'
    },
    {
      id: 'evt-102',
      title: 'Global AI & Web Engineering Summit',
      category: 'Technology',
      sales: '$719,610',
      soldPercentage: 90,
      status: 'Active'
    },
    {
      id: 'evt-103',
      title: 'Symphony Under The Stars: Moonlight',
      category: 'Music & Concerts',
      sales: '$207,900',
      soldPercentage: 92,
      status: 'Active'
    },
    {
      id: 'evt-107',
      title: 'Championship Urban Marathon & Fitness',
      category: 'Sports',
      sales: '$547,300',
      soldPercentage: 84,
      status: 'Active'
    }
  ]
};

// Default Demo Users for Instant Frictionless Testing
export const DEMO_USERS = {
  attendee: {
    id: 'user-att-01',
    name: 'Alex Morgan',
    email: 'alex.morgan@eventra.com',
    role: 'attendee',
    avatar: 'https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?auto=format&fit=crop&w=150&q=80',
    token: 'jwt-demo-token-attendee-2026'
  },
  admin: {
    id: 'user-admin-01',
    name: 'Elena Vance',
    email: 'admin@eventra.com',
    role: 'admin',
    avatar: 'https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?auto=format&fit=crop&w=150&q=80',
    token: 'jwt-demo-token-admin-2026'
  }
};
