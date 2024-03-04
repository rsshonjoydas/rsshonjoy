import { Book, Contact, FolderKanban, Home, Settings, User } from 'lucide-react';

export const routes = [
  {
    icon: Home,
    href: '/dashboard',
    label: 'Home',
  },
  {
    icon: User,
    href: '/dashboard/about',
    label: 'About',
  },
  {
    icon: FolderKanban,
    href: '/dashboard/projects',
    label: 'Projects',
  },
  {
    icon: Book,
    href: '/dashboard/blogs',
    label: 'Blogs',
  },
  {
    icon: Contact,
    href: '/dashboard/contact',
    label: 'Contact',
  },
  {
    icon: Settings,
    href: '/dashboard/settings',
    label: 'Settings',
  },
] as const;
