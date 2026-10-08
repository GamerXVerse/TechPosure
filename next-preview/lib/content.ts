export const services = [
  ['Websites', 'Accessible, responsive websites for nonprofits and community initiatives.'],
  ['Web Applications', 'Custom browser-based tools when off-the-shelf software doesn’t fit the work.'],
  ['App Development', 'Lightweight applications and digital experiences for organizational needs.'],
  ['Tracking Systems', 'Clear ways to track programs, volunteers, resources, outreach, and participation.'],
  ['Workflow Systems', 'Better-organized digital workflows for repetitive or fragmented processes.'],
  ['Data Organization', 'Thoughtful structures for information, records, forms, and spreadsheets.'],
  ['3D Modeling', 'Digital models, prototypes, and visualization support where design needs dimension.'],
  ['Technology Setup', 'Skill-based help configuring devices, software, tools, and infrastructure.'],
  ['Automation & Integration', 'Connections between tools that reduce repetitive administrative work.'],
  ['Custom Technical Projects', 'Have a challenge that doesn’t fit a category? Start with the problem—we’ll explore what’s possible.'],
] as const;

export const processSteps = [
  ['Listen', 'We learn about the organization, its mission, and the technical problem.'],
  ['Design', 'We shape the simplest system that addresses the organization’s actual needs.'],
  ['Build', 'Our team develops, configures, or implements the agreed solution.'],
  ['Hand Off & Support', 'We help the organization understand and use what was created.'],
] as const;

export const directors = [
  {
    name: 'Aarush Divakarla',
    role: 'Director of Technology & Systems Integration',
    email: 'aarush.divakarla@gmail.com',
    image: '/assets/aarush.jpeg',
    contact: 'aarush',
  },
  {
    name: 'Prasenjit Panigrahi',
    role: 'Director of Outreach & External Affairs',
    email: 'prasen.pani@gmail.com',
    image: '/assets/prasenjit.jpeg',
    contact: 'prasen',
  },
  {
    name: 'Frederick Noel Toby',
    role: 'Director of Finance & Operations',
    email: 'tobyf@bentonvillek12.org',
    image: '/assets/frederick.png',
    contact: 'toby',
  },
] as const;
