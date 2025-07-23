import { NavItem } from './nav-item/nav-item';

export const navItems: NavItem[] = [
  {
    navCap: 'S2P Student Management',
  },
  // {
  //   displayName: 'Dashboard',
  //   iconName: 'solar:widget-4-line-duotone',
  //   route: '/dashboard',
  //   urlStartsWith:'dashboard'
  // },
  {
    displayName: 'Users',
    iconName: 'solar:user-line-duotone',
    route: '/dashboard/user-list',
    urlStartsWith: 'user',
  },
    {
    displayName: 'Master',
    iconName: 'solar:shield-user-line-duotone',
    route: '/dashboard/master',
    urlStartsWith: 'master',
  },
      {
    displayName: 'Student',
    iconName: 'solar:user-id-line-duotone',
    route: '/dashboard/student',
    urlStartsWith: 'student',
  },
  {
    displayName: 'Blogs',
    iconName: 'solar:document-line-duotone',
    route: '/dashboard/blog-list',
    urlStartsWith: 'blog',
  },
  // {
  //   displayName: 'Enquiry',
  //   iconName: 'solar:feed-line-duotone',
  //   route: '/dashboard/enquiry-list',
  //   urlStartsWith: 'enquiry',
  // },

  {
    displayName: 'Template',
    iconName: 'solar:layers-minimalistic-line-duotone',
    route: '/dashboard/template-list',
    urlStartsWith: 'template',
  },

  {
    displayName: 'Plan',
    iconName: 'solar:feed-line-duotone',
    route: '/dashboard/plan-list',
    urlStartsWith: 'plan',
  },

  {
    displayName: 'Audit',
    iconName: 'solar:feed-line-duotone',
    route: '/dashboard/audit-trail',
    urlStartsWith: 'audit',
  },
];
