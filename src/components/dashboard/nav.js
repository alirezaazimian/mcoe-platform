import {
  CalendarDays,
  FileText,
  Globe,
  GraduationCap,
  LayoutDashboard,
  MessageSquare,
  Newspaper,
  Presentation,
  Users,
  Video,
} from 'lucide-react';

export const DASHBOARD_NAV_ITEMS = [
  {
    path: '/dashboard',
    key: 'overview',
    icon: LayoutDashboard,
  },
  {
    path: '/dashboard/workgroups',
    key: 'workgroups',
    icon: Users,
  },
  {
    path: '/dashboard/articles',
    key: 'articles',
    icon: FileText,
  },
  {
    path: '/dashboard/news',
    key: 'news',
    icon: Newspaper,
  },
  {
    path: '/dashboard/events',
    key: 'events',
    icon: CalendarDays,
  },
  {
    path: '/dashboard/teachers',
    key: 'teachers',
    icon: Presentation,
  },
  {
    path: '/dashboard/students',
    key: 'students',
    icon: GraduationCap,
  },
  {
    path: '/dashboard/online-classes',
    key: 'onlineClasses',
    icon: Video,
  },
  {
    path: '/dashboard/sms',
    key: 'smsPanel',
    icon: MessageSquare,
  },
  {
    path: '/dashboard/site-content',
    key: 'siteContent',
    icon: Globe,
  },
];
