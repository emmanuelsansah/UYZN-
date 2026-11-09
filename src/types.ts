export type Gender = 'Male' | 'Female' | 'Other';

export type EmploymentStatus = 'employed' | 'unemployed' | 'self-employed' | 'student' | 'other';

export type EducationLevel = 
  | 'Primary Education'
  | 'JHS / BECE'
  | 'SHS / WASSCE'
  | 'TVET / Vocational'
  | 'Diploma / HND'
  | 'Undergraduate Degree'
  | 'Postgraduate Degree'
  | 'No Formal Education';

export type EntrepreneurshipStatus = 'Active Business Owner' | 'Aspiring Entrepreneur' | 'Not Interested';

export type MembershipStatus = 'Verified Member' | 'Pending Approval' | 'Executive Leader' | 'Community Coordinator';

export interface YouthMember {
  id: string; // e.g. UYZN-2026-0041
  fullName: string;
  gender: Gender;
  dateOfBirth: string; // YYYY-MM-DD
  age: number;
  phone: string;
  email?: string;
  community: string; // Community name
  residentialLocation: string;
  educationLevel: EducationLevel;
  institutionAttended?: string;
  employmentStatus: EmploymentStatus;
  occupation: string;
  skills: string[];
  areasOfInterest: string[];
  entrepreneurshipStatus: EntrepreneurshipStatus;
  businessName?: string;
  membershipStatus: MembershipStatus;
  emergencyContact?: {
    name: string;
    phone: string;
    relationship: string;
  };
  registrationDate: string; // YYYY-MM-DD
  consentGiven: boolean;
  isActive: boolean;
}

export interface Community {
  id: string;
  name: string;
  code: string;
  zone: 'North Zone' | 'South Zone' | 'Central Zone' | 'East Zone' | 'West Zone';
  description: string;
  coordinatorName: string;
  coordinatorPhone: string;
  coordinatorEmail: string;
  registeredYouthCount: number;
  keyProjects: string[];
  isEditable19thSlot?: boolean;
  status: 'Active' | 'Pending Registration';
}

export interface Leader {
  id: string;
  name: string;
  roleTitle: string;
  category: 'President' | 'Executive' | 'Coordinator' | 'Representative';
  communityName?: string;
  email: string;
  phone: string;
  bio: string;
  image: string;
  order: number;
}

export interface Program {
  id: string;
  title: string;
  category: 'Education' | 'Skills Training' | 'Entrepreneurship' | 'Employment Drive' | 'Health Awareness' | 'Community Development';
  description: string;
  targetAudience: string;
  location: string;
  startDate: string;
  endDate: string;
  participantCount: number;
  status: 'Ongoing' | 'Upcoming' | 'Completed';
  image: string;
}

export interface EventItem {
  id: string;
  title: string;
  community: string;
  date: string; // YYYY-MM-DD
  time: string;
  location: string;
  category: 'Summit' | 'Workshop' | 'Community Forum' | 'Sports' | 'Job Fair';
  description: string;
  rsvpCount: number;
  status: 'Upcoming' | 'Completed';
}

export interface Announcement {
  id: string;
  title: string;
  category: 'Notice' | 'Development' | 'Press Release' | 'Youth Alert';
  summary: string;
  content: string;
  date: string;
  author: string;
  isPinned?: boolean;
}

export interface GalleryItem {
  id: string;
  title: string;
  category: 'Events' | 'Skills Training' | 'Community Forums' | 'Leadership';
  imageUrl: string;
  caption: string;
  date: string;
}

export interface CoordinatorReport {
  id: string;
  communityId: string;
  communityName: string;
  coordinatorName: string;
  period: string; // e.g. "October 2026"
  newMembersRegistered: number;
  keyActivities: string;
  challenges: string;
  recommendations: string;
  submittedAt: string;
}

export interface AuditLog {
  id: string;
  timestamp: string;
  userEmail: string;
  userRole: 'Super Admin' | 'Community Coordinator';
  action: string;
  entityType: string;
  entityId: string;
  details: string;
}

export interface CMSContent {
  presidentName: string;
  presidentTitle: string;
  presidentMessage: string;
  missionStatement: string;
  visionStatement: string;
  coreValues: string[];
  contactEmail: string;
  contactPhone: string;
  contactAddress: string;
}

export type AuthRole = 'public' | 'admin' | 'coordinator';

export interface UserSession {
  isAuthenticated: boolean;
  role: AuthRole;
  email?: string;
  name?: string;
  assignedCommunity?: string;
}
