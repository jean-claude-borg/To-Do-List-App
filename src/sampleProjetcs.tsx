import * as Types from './types/types.tsx'

export const sampleProjectList: Types.ProjectList_T = {
  idCounter: 20,
  projects: [
    {
      title: "Website Redesign",
      projectID: 1,
      pinned: true,
      tasks: [
        {
          id: 0,
          title: "Homepage Design",
          description: "Redesign the main landing page for better user experience",
          startDate: new Date('2023-09-26T09:00:00'),
          dueDate: new Date('2023-09-24T09:00:00'),
          completed: false,
          pinned: true,
          priority: 1
        },
        {
          id: 1,
          title: "Contact Form Update",
          description: "Add additional fields and integrate with the new CRM",
          startDate: new Date('2023-09-30T14:00:00'),
          dueDate: new Date('2023-10-03T14:00:00'),
          completed: true,
          pinned: false,
          priority: 2
        },
        {
          id: 2,
          title: "Migrate Blog Posts",
          description: "Transfer old blog posts to the new content management system",
          startDate: new Date('2023-10-02T16:00:00'),
          dueDate: new Date('2023-10-05T16:00:00'),
          completed: false,
          pinned: true,
          priority: 1
        },
        {
          id: 3,
          title: "Mobile Responsiveness",
          description: "Ensure the website looks good and functions well on mobile devices",
          startDate: new Date('2023-10-04T11:00:00'),
          dueDate: new Date('2023-10-08T11:00:00'),
          completed: true,
          pinned: false,
          priority: 3
        },
        {
          id: 4,
          title: "Update FAQs",
          description: "Revise the FAQ section with up-to-date information and user inquiries",
          startDate: new Date('2023-10-07T13:30:00'),
          dueDate: new Date('2023-10-10T13:30:00'),
          completed: false,
          pinned: true,
          priority: 2
        }
      ]
    },
    {
      title: "Product Launch",
      projectID: 2,
      pinned: true,
      tasks: [
        {
          id: 5,
          title: "Finalize Product Specs",
          description: "Ensure all product specifications are up-to-date and accurate",
          startDate: new Date('2023-10-07T10:30:00'),
          dueDate: new Date('2023-10-10T10:30:00'),
          completed: true,
          pinned: false,
          priority: 2
        },
        {
          id: 6,
          title: "Plan Marketing Campaign",
          description: "Outline the key marketing strategies and channels for product promotion",
          startDate: new Date('2023-10-12T11:00:00'),
          dueDate: new Date('2023-10-15T11:00:00'),
          completed: false,
          pinned: true,
          priority: 1
        },
        {
          id: 7,
          title: "Coordinate with Sales Team",
          description: "Provide the sales team with necessary product information and training",
          startDate: new Date('2023-10-15T13:00:00'),
          dueDate: new Date('2023-10-18T13:00:00'),
          completed: false,
          pinned: false,
          priority: 3
        },
        {
          id: 8,
          title: "Press Release",
          description: "Draft and distribute a press release announcing the new product",
          startDate: new Date('2023-10-17T09:00:00'),
          dueDate: new Date('2023-10-20T09:00:00'),
          completed: false,
          pinned: true,
          priority: 1
        },
        {
          id: 9,
          title: "Host Webinar",
          description: "Organize a webinar to demonstrate the product's features to potential clients",
          startDate: new Date('2023-10-20T15:00:00'),
          dueDate: new Date('2023-10-23T15:00:00'),
          completed: false,
          pinned: false,
          priority: 2
        }
      ]
    },
    {
      title: "User Onboarding Improvements",
      projectID: 3,
      pinned: true,
      tasks: [
        {
          id: 10,
          title: "Survey Current Users",
          description: "Gather feedback from current users about their onboarding experience",
          startDate: new Date('2023-10-15T12:00:00'),
          dueDate: new Date('2023-10-20T12:00:00'),
          completed: true,
          pinned: true,
          priority: 2
        },
        {
          id: 11,
          title: "Develop New Onboarding Tutorial",
          description: "Create a more interactive and informative onboarding tutorial for new users",
          startDate: new Date('2023-10-20T14:30:00'),
          dueDate: new Date('2023-10-25T14:30:00'),
          completed: false,
          pinned: false,
          priority: 1
        },
        {
          id: 12,
          title: "Revise Documentation",
          description: "Update the user manual with clearer step-by-step instructions",
          startDate: new Date('2023-10-24T10:00:00'),
          dueDate: new Date('2023-10-28T10:00:00'),
          completed: false,
          pinned: true,
          priority: 3
        }
      ]
    },
    {
      title: "Office Relocation",
      projectID: 4,
      pinned: true,
      tasks: [
        {
          id: 13,
          title: "Find New Office Space",
          description: "Research and visit potential office locations",
          startDate: new Date('2023-10-25T10:00:00'),
          dueDate: new Date('2023-11-01T10:00:00'),
          completed: false,
          pinned: true,
          priority: 1
        },
        {
          id: 14,
          title: "Coordinate Movers",
          description: "Hire a moving company to transfer office equipment and furniture",
          startDate: new Date('2023-10-31T14:00:00'),
          dueDate: new Date('2023-11-05T14:00:00'),
          completed: false,
          pinned: false,
          priority: 2
        },
        {
          id: 15,
          title: "Update Address",
          description: "Notify clients and partners of the new office address",
          startDate: new Date('2023-11-03T09:00:00'),
          dueDate: new Date('2023-11-08T09:00:00'),
          completed: false,
          pinned: true,
          priority: 3
        },
        {
          id: 16,
          title: "Organize Office Layout",
          description: "Design the layout of the new office for optimal workflow",
          startDate: new Date('2023-11-05T11:00:00'),
          dueDate: new Date('2023-11-10T11:00:00'),
          completed: false,
          pinned: false,
          priority: 1
        }
      ]
    },
    {
      title: "Customer Support Enhancement",
      projectID: 5,
      pinned: true,
      tasks: [
        {
          id: 17,
          title: "Train Support Team",
          description: "Provide training sessions on the new customer support software",
          startDate: new Date('2023-11-10T13:00:00'),
          dueDate: new Date('2023-11-15T13:00:00'),
          completed: true,
          pinned: true,
          priority: 1
        },
        {
          id: 18,
          title: "Gather Feedback",
          description: "Request feedback from users on the support experience",
          startDate: new Date('2023-11-15T15:00:00'),
          dueDate: new Date('2023-11-18T15:00:00'),
          completed: false,
          pinned: false,
          priority: 2
        },
        {
          id: 19,
          title: "Implement Chatbot",
          description: "Add a chatbot to the website for instant user queries",
          startDate: new Date('2023-11-18T14:30:00'),
          dueDate: new Date('2023-11-20T14:30:00'),
          completed: false,
          pinned: true,
          priority: 3
        },
        {
          id: 20,
          title: "Update Support Policies",
          description: "Review and revise the current customer support policies",
          startDate: new Date('2023-11-20T10:00:00'),
          dueDate: new Date('2023-11-23T10:00:00'),
          completed: false,
          pinned: false,
          priority: 2
        }
      ]
    }
  ]
};