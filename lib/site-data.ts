export const site = {
  name: 'Junction City Boxing Brigade',
  shortName: 'JCBB',
  tagline: 'Put In The Work, Get Results',
  founded: 2025,
  phone: '(785) 223-2419',
  email: 'jcboxingbrigade@gmail.com',
  address: '815 South Adams Street, Junction City, KS 66441',
  social: {
    instagram: 'https://instagram.com/junctioncityboxingbrigade',
    facebook: '',
    tiktok: '',
  },
};

export const navLinks = [
  { href: '/', label: 'Home' },
  { href: '/about', label: 'About' },
  { href: '/classes', label: 'Classes' },
  { href: '/schedule', label: 'Schedule' },
  { href: '/events', label: 'Events' },
  { href: '/fighters', label: 'Fighters' },
  { href: '/gallery', label: 'Gallery' },
  { href: '/contact', label: 'Contact' },
];

export const weightClasses = [
  'Strawweight',
  'Light Flyweight',
  'Flyweight',
  'Super Flyweight',
  'Bantamweight',
  'Super Bantamweight',
  'Featherweight',
  'Super Featherweight',
  'Lightweight',
  'Super Lightweight',
  'Welterweight',
  'Super Welterweight',
  'Middleweight',
  'Super Middleweight',
  'Light Heavyweight',
  'Cruiserweight',
  'Heavyweight',
];

export const classLevels = [
  'Beginner',
  'Intermediate',
  'Advanced',
  'All Levels',
  'Youth',
  'Competitive',
];

export type ClassInfo = {
  name: string;
  description: string;
  level: string;
  duration: string;
};

export const classes: ClassInfo[] = [
  {
    name: 'Boxing Fundamentals',
    description:
      'Learn proper stance, footwork, and the core punches — jab, cross, hook, uppercut. The foundation every fighter builds on.',
    level: 'Beginner',
    duration: '60 min',
  },
  {
    name: 'Technical Boxing',
    description:
      'Sharpen combinations, defense, and ring IQ with pad work and partner drills for boxers ready to move past the basics.',
    level: 'Intermediate',
    duration: '60 min',
  },
  {
    name: 'Sparring Session',
    description:
      'Controlled, coach-supervised sparring to apply technique under pressure. Headgear and mouthguard required.',
    level: 'Advanced',
    duration: '75 min',
  },
  {
    name: 'Boxing Conditioning',
    description:
      'High-intensity circuits built around boxing movement — jump rope, bag rounds, and core work for elite gas tanks.',
    level: 'All Levels',
    duration: '45 min',
  },
  {
    name: 'Youth Boxing',
    description:
      'Discipline, coordination, and confidence for ages 8-15, taught through fundamentals and non-contact drills.',
    level: 'Youth',
    duration: '45 min',
  },
  {
    name: 'Competitive Team Training',
    description:
      'Invite-only training block for JCBB fighters preparing for sanctioned bouts. Strength, strategy, and sparring combined.',
    level: 'Competitive',
    duration: '90 min',
  },
];

export type ScheduleClass = {
  time: string;
  name: string;
  coach: string;
};

export type ScheduleDay = {
  day: string;
  classes: ScheduleClass[];
};

export const schedule: ScheduleDay[] = [
  {
    day: 'Monday',
    classes: [
      { time: '6:00 AM', name: 'Boxing Conditioning', coach: 'Coach Reyes' },
      { time: '12:00 PM', name: 'Technical Boxing', coach: 'Coach Reyes' },
      { time: '5:30 PM', name: 'Boxing Fundamentals', coach: 'Coach Dobbs' },
      { time: '7:00 PM', name: 'Sparring Session', coach: 'Coach Dobbs' },
    ],
  },
  {
    day: 'Tuesday',
    classes: [
      { time: '6:00 AM', name: 'Technical Boxing', coach: 'Coach Dobbs' },
      { time: '4:30 PM', name: 'Youth Boxing', coach: 'Coach Reyes' },
      { time: '5:30 PM', name: 'Boxing Fundamentals', coach: 'Coach Reyes' },
      { time: '7:00 PM', name: 'Competitive Team Training', coach: 'Coach Dobbs' },
    ],
  },
  {
    day: 'Wednesday',
    classes: [
      { time: '6:00 AM', name: 'Boxing Conditioning', coach: 'Coach Reyes' },
      { time: '12:00 PM', name: 'Technical Boxing', coach: 'Coach Reyes' },
      { time: '5:30 PM', name: 'Boxing Fundamentals', coach: 'Coach Dobbs' },
      { time: '7:00 PM', name: 'Sparring Session', coach: 'Coach Dobbs' },
    ],
  },
  {
    day: 'Thursday',
    classes: [
      { time: '6:00 AM', name: 'Technical Boxing', coach: 'Coach Dobbs' },
      { time: '4:30 PM', name: 'Youth Boxing', coach: 'Coach Reyes' },
      { time: '5:30 PM', name: 'Boxing Fundamentals', coach: 'Coach Reyes' },
      { time: '7:00 PM', name: 'Competitive Team Training', coach: 'Coach Dobbs' },
    ],
  },
  {
    day: 'Friday',
    classes: [
      { time: '6:00 AM', name: 'Boxing Conditioning', coach: 'Coach Reyes' },
      { time: '5:30 PM', name: 'Boxing Fundamentals', coach: 'Coach Dobbs' },
      { time: '6:30 PM', name: 'Open Sparring', coach: 'Coach Dobbs' },
    ],
  },
  {
    day: 'Saturday',
    classes: [
      { time: '9:00 AM', name: 'Boxing Fundamentals', coach: 'Coach Reyes' },
      { time: '10:15 AM', name: 'Youth Boxing', coach: 'Coach Reyes' },
      { time: '11:30 AM', name: 'Technical Boxing', coach: 'Coach Dobbs' },
    ],
  },
  {
    day: 'Sunday',
    classes: [{ time: 'Closed', name: 'Gym Closed', coach: '—' }],
  },
];

export type Coach = {
  name: string;
  role: string;
  bio: string;
};

export const coaches: Coach[] = [
  {
    name: 'Coach Marcus Dobbs',
    role: 'Head Coach & Founder',
    bio: 'A former regional amateur champion, Marcus founded JCBB in 2025 to bring disciplined, no-nonsense boxing instruction to Junction City. He believes fundamentals win fights.',
  },
  {
    name: 'Coach Elena Reyes',
    role: 'Boxing & Conditioning Coach',
    bio: 'Elena spent a decade training fighters at the collegiate level before joining JCBB. She leads conditioning and technical sessions with an emphasis on precision over power.',
  },
];
