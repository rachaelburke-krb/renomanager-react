import { Project } from "../types";
import { mockUsers } from "./mockUsers";

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
    owner: mockUsers[2],
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
    owner: mockUsers[1],
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
    owner: mockUsers[4],
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
    owner: mockUsers[3],
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
    owner: mockUsers[5],
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
  {
    id: "6",
    title: "Studio & Garage",
    description: "Convert garage into photography studio with storage",
    startDate: new Date("2024-03-01"),
    endDate: new Date("2024-06-30"),
    location: {
      address: "123 Main St, City",
      coordinates: { lat: 40.7128, lng: -74.006 },
    },
    owner: mockUsers[0],
    sharedWith: [],
    status: "planning",
    phases: [
      {
        id: "p1",
        title: "Design",
        description: "Create detailed plans and obtain client approval",
        startDate: new Date("2024-03-01"),
        endDate: new Date("2024-03-21"),
        status: "planning",
        tasks: [
          {
            id: "t1",
            title: "Initial Design Concepts",
            description: "Develop 3 initial design concepts",
            status: "planning",
            assignedTo: "designer",
            invoices: [
              {
                id: "i1",
                invoiceNumber: "INV-2024-001",
                supplier: {
                  name: "Design Studio Inc",
                  email: "billing@designstudio.com",
                },
                amount: 2500,
                dueDate: new Date("2024-03-15"),
                status: "draft",
              },
              {
                id: "i1b",
                invoiceNumber: "INV-2024-001b",
                supplier: {
                  name: "Landscape Designs",
                  email: "invoices@landscapedesigns.com",
                },
                amount: 1800,
                dueDate: new Date("2024-03-20"),
                status: "sent",
              },
            ],
          },
          {
            id: "t2",
            title: "Final Design Package",
            description: "Complete detailed design drawings and specifications",
            status: "planning",
            assignedTo: "designer",
            invoices: [],
          },
        ],
      },
      {
        id: "p2",
        title: "Consent",
        description: "Obtain necessary permits and approvals",
        startDate: new Date("2024-03-22"),
        endDate: new Date("2024-04-15"),
        status: "planning",
        tasks: [
          {
            id: "t3",
            title: "Building Permit Application",
            description: "Submit and process building permit",
            status: "planning",
            assignedTo: "project-manager",
            invoices: [
              {
                id: "i2",
                invoiceNumber: "INV-2024-002",
                supplier: {
                  name: "City Planning Department",
                  email: "permits@city.gov",
                },
                amount: 1200,
                dueDate: new Date("2024-04-01"),
                status: "draft",
              },
            ],
          },
        ],
      },
      {
        id: "p3",
        title: "Build",
        description: "Main construction phase",
        startDate: new Date("2024-04-16"),
        endDate: new Date("2024-06-15"),
        status: "planning",
        tasks: [
          {
            id: "t4",
            title: "Structural Modifications",
            description: "Modify garage structure for studio requirements",
            status: "planning",
            assignedTo: "contractor",
            invoices: [
              {
                id: "i3",
                invoiceNumber: "INV-2024-003",
                supplier: {
                  name: "Build Right Construction",
                  email: "accounts@buildright.com",
                  phone: "555-0123",
                },
                amount: 15000,
                dueDate: new Date("2024-05-01"),
                status: "draft",
              },
              {
                id: "i3b",
                invoiceNumber: "INV-2024-003b",
                supplier: {
                  name: "Concrete Specialists",
                  email: "billing@concretespecialists.com",
                  phone: "555-9012",
                },
                amount: 8500,
                dueDate: new Date("2024-03-15"),
                status: "overdue",
              },
              {
                id: "i3c",
                invoiceNumber: "INV-2024-003c",
                supplier: {
                  name: "Window World",
                  email: "accounts@windowworld.com",
                  phone: "555-1234",
                },
                amount: 6200,
                dueDate: new Date("2024-04-15"),
                status: "paid",
              },
            ],
          },
          {
            id: "t5",
            title: "Electrical Installation",
            description: "Install new electrical system for studio equipment",
            status: "planning",
            assignedTo: "electrician",
            invoices: [
              {
                id: "i4",
                invoiceNumber: "INV-2024-004",
                supplier: {
                  name: "Power Pro Electric",
                  email: "billing@powerpro.com",
                  phone: "555-0456",
                },
                amount: 8500,
                dueDate: new Date("2024-05-15"),
                status: "draft",
              },
              {
                id: "i4b",
                invoiceNumber: "INV-2024-004b",
                supplier: {
                  name: "Smart Home Systems",
                  email: "billing@smarthome.com",
                  phone: "555-0987",
                },
                amount: 4200,
                dueDate: new Date("2024-05-20"),
                status: "sent",
              },
              {
                id: "i4c",
                invoiceNumber: "INV-2024-004c",
                supplier: {
                  name: "Security Systems Pro",
                  email: "invoices@securitypro.com",
                  phone: "555-3456",
                },
                amount: 3800,
                dueDate: new Date("2024-04-30"),
                status: "paid",
              },
            ],
          },
          {
            id: "t6",
            title: "Storage Solutions",
            description: "Install custom storage systems",
            status: "planning",
            assignedTo: "carpenter",
            invoices: [
              {
                id: "i5",
                invoiceNumber: "INV-2024-005",
                supplier: {
                  name: "Custom Cabinets Co",
                  email: "sales@customcabinets.com",
                },
                amount: 6500,
                dueDate: new Date("2024-06-01"),
                status: "draft",
              },
              {
                id: "i5b",
                invoiceNumber: "INV-2024-005b",
                supplier: {
                  name: "Interior Solutions",
                  email: "accounts@interiorsolutions.com",
                },
                amount: 4800,
                dueDate: new Date("2024-05-15"),
                status: "sent",
              },
              {
                id: "i5c",
                invoiceNumber: "INV-2024-005c",
                supplier: {
                  name: "Stone & Tile Works",
                  email: "accounts@stonetile.com",
                  phone: "555-0654",
                },
                amount: 3200,
                dueDate: new Date("2024-04-15"),
                status: "paid",
              },
            ],
          },
        ],
      },
      {
        id: "p4",
        title: "Finishing",
        description: "Final touches and handover",
        startDate: new Date("2024-06-16"),
        endDate: new Date("2024-06-30"),
        status: "planning",
        tasks: [
          {
            id: "t7",
            title: "Painting and Decoration",
            description: "Complete all painting and decorative finishes",
            status: "planning",
            assignedTo: "painter",
            invoices: [
              {
                id: "i6",
                invoiceNumber: "INV-2024-006",
                supplier: {
                  name: "Perfect Paint Ltd",
                  email: "accounts@perfectpaint.com",
                },
                amount: 3500,
                dueDate: new Date("2024-06-25"),
                status: "draft",
              },
            ],
          },
          {
            id: "t8",
            title: "Final Inspection",
            description:
              "Complete final inspection and obtain occupancy permit",
            status: "planning",
            assignedTo: "project-manager",
            invoices: [],
          },
        ],
      },
    ],
    photos: [],
  },
];
