import { Project } from "../types";

export const mockProjects: Project[] = [
  {
    id: "1",
    title: "Kitchen Renovation",
    description: "Complete kitchen remodel with new cabinets and appliances",
    startDate: new Date("2024-04-01"),
    endDate: new Date("2024-05-15"),
    location: {
      address: "123 Main St, City",
      coordinates: { lat: 40.7128, lng: -74.006 },
    },
    sharedWith: [],
    status: "planning",
    phases: [
      {
        id: "p1",
        title: "Demo and Prep",
        description: "Remove existing cabinets and prepare space",
        startDate: new Date("2024-04-01"),
        endDate: new Date("2024-04-07"),
        status: "planning",
        tasks: [
          {
            id: "t1",
            title: "Remove Existing Cabinets",
            description: "Carefully remove and dispose of old cabinets",
            status: "planning",
            assignedTo: "demo-team",
            invoices: [
              {
                id: "i1",
                invoiceNumber: "INV-2024-001",
                supplier: {
                  name: "Demo Crew Inc",
                  email: "billing@democrew.com",
                  phone: "555-0123",
                },
                amount: 2500,
                dueDate: new Date("2024-04-15"),
                status: "draft",
              },
            ],
          },
          {
            id: "t2",
            title: "Electrical Updates",
            description: "Update wiring for new appliances",
            status: "planning",
            assignedTo: "electrician",
            invoices: [
              {
                id: "i2",
                invoiceNumber: "INV-2024-002",
                supplier: {
                  name: "Elite Electric",
                  email: "accounts@eliteelectric.com",
                },
                amount: 3800,
                dueDate: new Date("2024-04-20"),
                status: "draft",
              },
            ],
          },
        ],
      },
      {
        id: "p2",
        title: "Cabinet Installation",
        description: "Install new custom cabinets",
        startDate: new Date("2024-04-08"),
        endDate: new Date("2024-04-21"),
        status: "planning",
        tasks: [
          {
            id: "t3",
            title: "Install Base Cabinets",
            description: "Install and level all base cabinets",
            status: "planning",
            assignedTo: "cabinet-team",
            invoices: [
              {
                id: "i3",
                invoiceNumber: "INV-2024-003",
                supplier: {
                  name: "Custom Cabinets Co",
                  email: "invoicing@customcabinets.com",
                  phone: "555-0456",
                },
                amount: 12500,
                dueDate: new Date("2024-04-30"),
                status: "draft",
              },
            ],
          },
        ],
      },
      {
        id: "p3",
        title: "Finishing",
        description: "Install countertops and appliances",
        startDate: new Date("2024-04-22"),
        endDate: new Date("2024-05-15"),
        status: "planning",
        tasks: [
          {
            id: "t4",
            title: "Countertop Installation",
            description: "Install granite countertops",
            status: "planning",
            assignedTo: "stone-team",
            invoices: [
              {
                id: "i4",
                invoiceNumber: "INV-2024-004",
                supplier: {
                  name: "Granite Works",
                  email: "billing@graniteworks.com",
                },
                amount: 8500,
                dueDate: new Date("2024-05-10"),
                status: "draft",
              },
            ],
          },
          {
            id: "t5",
            title: "Appliance Installation",
            description: "Install and connect all new appliances",
            status: "planning",
            assignedTo: "appliance-team",
            invoices: [
              {
                id: "i5",
                invoiceNumber: "INV-2024-005",
                supplier: {
                  name: "Appliance Pros",
                  email: "accounts@appliancepros.com",
                  phone: "555-0789",
                },
                amount: 1500,
                dueDate: new Date("2024-05-15"),
                status: "draft",
              },
            ],
          },
        ],
      },
    ],
    photos: [],
  },
  {
    id: "2",
    title: "Bathroom Update",
    description: "Master bathroom modernization",
    startDate: new Date("2024-05-01"),
    endDate: new Date("2024-05-30"),
    location: {
      address: "456 Oak Ave, Town",
      coordinates: { lat: 40.7128, lng: -74.006 },
    },
    sharedWith: ["user1", "user2"],
    status: "in-progress",
    phases: [
      {
        id: "p4",
        title: "Demolition",
        description: "Remove existing fixtures and tiles",
        startDate: new Date("2024-05-01"),
        endDate: new Date("2024-05-07"),
        status: "in-progress",
        tasks: [
          {
            id: "t6",
            title: "Remove Fixtures",
            description: "Remove toilet, vanity, and shower fixtures",
            status: "in-progress",
            assignedTo: "plumber",
            invoices: [
              {
                id: "i6",
                invoiceNumber: "INV-2024-006",
                supplier: {
                  name: "Premier Plumbing",
                  email: "invoices@premierplumbing.com",
                },
                amount: 1200,
                dueDate: new Date("2024-05-14"),
                status: "sent",
              },
            ],
          },
        ],
      },
      {
        id: "p5",
        title: "Plumbing and Electrical",
        description: "Update plumbing and electrical systems",
        startDate: new Date("2024-05-08"),
        endDate: new Date("2024-05-14"),
        status: "planning",
        tasks: [
          {
            id: "t7",
            title: "Plumbing Rough-in",
            description: "Install new plumbing lines",
            status: "planning",
            assignedTo: "plumber",
            invoices: [
              {
                id: "i7",
                invoiceNumber: "INV-2024-007",
                supplier: {
                  name: "Premier Plumbing",
                  email: "invoices@premierplumbing.com",
                },
                amount: 3500,
                dueDate: new Date("2024-05-21"),
                status: "draft",
              },
            ],
          },
        ],
      },
    ],
    photos: [],
  },
  {
    id: "3",
    title: "Basement Finishing",
    description:
      "Convert unfinished basement into entertainment space with home theater and bar",
    startDate: new Date("2024-06-01"),
    endDate: new Date("2024-08-15"),
    location: {
      address: "789 Pine Rd, Village",
      coordinates: { lat: 41.8781, lng: -87.6298 },
    },
    sharedWith: ["user3"],
    status: "planning",
    phases: [
      {
        id: "p6",
        title: "Framing and Drywall",
        description: "Frame walls and install drywall",
        startDate: new Date("2024-06-01"),
        endDate: new Date("2024-06-21"),
        status: "planning",
        tasks: [
          {
            id: "t8",
            title: "Wall Framing",
            description: "Frame all interior walls",
            status: "planning",
            assignedTo: "carpenter",
            invoices: [
              {
                id: "i8",
                invoiceNumber: "INV-2024-008",
                supplier: {
                  name: "Construction Crew LLC",
                  email: "billing@constructioncrew.com",
                },
                amount: 5800,
                dueDate: new Date("2024-06-15"),
                status: "draft",
              },
            ],
          },
        ],
      },
      {
        id: "p7",
        title: "Home Theater Setup",
        description: "Install audio/visual equipment and seating",
        startDate: new Date("2024-07-15"),
        endDate: new Date("2024-08-01"),
        status: "planning",
        tasks: [
          {
            id: "t9",
            title: "AV Installation",
            description: "Install projector, screen, and sound system",
            status: "planning",
            assignedTo: "av-team",
            invoices: [
              {
                id: "i9",
                invoiceNumber: "INV-2024-009",
                supplier: {
                  name: "Home Theater Pros",
                  email: "accounts@htpros.com",
                },
                amount: 12500,
                dueDate: new Date("2024-07-30"),
                status: "draft",
              },
            ],
          },
        ],
      },
    ],
    photos: [],
  },
  {
    id: "4",
    title: "Deck Construction",
    description: "Build new composite deck with built-in seating and pergola",
    startDate: new Date("2024-05-15"),
    endDate: new Date("2024-06-30"),
    location: {
      address: "321 Maple Dr, Suburb",
      coordinates: { lat: 42.3601, lng: -71.0589 },
    },
    sharedWith: [],
    status: "planning",
    phases: [
      {
        id: "p8",
        title: "Foundation",
        description: "Install footings and support structure",
        startDate: new Date("2024-05-15"),
        endDate: new Date("2024-05-30"),
        status: "planning",
        tasks: [
          {
            id: "t10",
            title: "Footing Installation",
            description: "Dig and pour concrete footings",
            status: "planning",
            assignedTo: "foundation-team",
            invoices: [
              {
                id: "i10",
                invoiceNumber: "INV-2024-010",
                supplier: {
                  name: "Concrete Solutions",
                  email: "billing@concretesolutions.com",
                },
                amount: 4200,
                dueDate: new Date("2024-05-30"),
                status: "draft",
              },
            ],
          },
        ],
      },
    ],
    photos: [],
  },
  {
    id: "5",
    title: "Home Office Conversion",
    description:
      "Convert spare bedroom into modern home office with custom built-ins",
    startDate: new Date("2024-04-15"),
    endDate: new Date("2024-05-15"),
    location: {
      address: "567 Birch Ln, Heights",
      coordinates: { lat: 34.0522, lng: -118.2437 },
    },
    sharedWith: ["user2"],
    status: "in-progress",
    phases: [
      {
        id: "p9",
        title: "Built-ins Construction",
        description: "Build and install custom shelving and desk",
        startDate: new Date("2024-04-15"),
        endDate: new Date("2024-05-01"),
        status: "in-progress",
        tasks: [
          {
            id: "t11",
            title: "Custom Desk Build",
            description: "Build and install custom desk unit",
            status: "in-progress",
            assignedTo: "carpenter",
            invoices: [
              {
                id: "i11",
                invoiceNumber: "INV-2024-011",
                supplier: {
                  name: "Custom Woodworks",
                  email: "invoicing@customwoodworks.com",
                },
                amount: 6800,
                dueDate: new Date("2024-04-30"),
                status: "sent",
              },
            ],
          },
        ],
      },
      {
        id: "p10",
        title: "Tech Setup",
        description: "Install networking and electrical upgrades",
        startDate: new Date("2024-05-01"),
        endDate: new Date("2024-05-15"),
        status: "planning",
        tasks: [
          {
            id: "t12",
            title: "Network Installation",
            description: "Install ethernet ports and wifi access point",
            status: "planning",
            assignedTo: "network-tech",
            invoices: [
              {
                id: "i12",
                invoiceNumber: "INV-2024-012",
                supplier: {
                  name: "Network Solutions Inc",
                  email: "accounts@networksolutions.com",
                },
                amount: 1500,
                dueDate: new Date("2024-05-15"),
                status: "draft",
              },
            ],
          },
        ],
      },
    ],
    photos: [],
  },
];
