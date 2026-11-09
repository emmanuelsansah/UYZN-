import React, { createContext, useContext, useState, useEffect } from 'react';
import { 
  YouthMember, Community, Leader, Program, EventItem, Announcement, 
  GalleryItem, CoordinatorReport, AuditLog, CMSContent, UserSession, AuthRole 
} from '../types';
import { 
  INITIAL_COMMUNITIES, INITIAL_LEADERS, INITIAL_PROGRAMS, INITIAL_EVENTS, 
  INITIAL_ANNOUNCEMENTS, INITIAL_GALLERY, INITIAL_CMS, INITIAL_YOUTH_MEMBERS 
} from '../data/initialData';

interface AppContextType {
  session: UserSession;
  login: (role: AuthRole, email?: string, password?: string, communityAssignedId?: string) => boolean;
  logout: () => void;
  
  // Data
  youthMembers: YouthMember[];
  communities: Community[];
  leaders: Leader[];
  programs: Program[];
  events: EventItem[];
  announcements: Announcement[];
  gallery: GalleryItem[];
  coordinatorReports: CoordinatorReport[];
  auditLogs: AuditLog[];
  cmsContent: CMSContent;

  // Actions
  addYouthMember: (member: Omit<YouthMember, 'id' | 'registrationDate' | 'isActive'>) => YouthMember;
  updateYouthMember: (id: string, updates: Partial<YouthMember>) => void;
  deactivateYouthMember: (id: string) => void;
  approveYouthMember: (id: string) => void;
  
  addCommunity: (community: Omit<Community, 'id' | 'registeredYouthCount'>) => void;
  updateCommunity: (id: string, updates: Partial<Community>) => void;
  
  addLeader: (leader: Omit<Leader, 'id' | 'order'>) => void;
  updateLeader: (id: string, updates: Partial<Leader>) => void;
  deleteLeader: (id: string) => void;
  
  addEvent: (event: Omit<EventItem, 'id' | 'rsvpCount'>) => void;
  updateEvent: (id: string, updates: Partial<EventItem>) => void;
  deleteEvent: (id: string) => void;
  rsvpEvent: (id: string) => void;

  addAnnouncement: (announcement: Omit<Announcement, 'id' | 'date'>) => void;
  updateAnnouncement: (id: string, updates: Partial<Announcement>) => void;
  deleteAnnouncement: (id: string) => void;

  submitCoordinatorReport: (report: Omit<CoordinatorReport, 'id' | 'submittedAt'>) => void;
  updateCMSContent: (updates: Partial<CMSContent>) => void;
  resetDatabaseToDefaults: () => void;
}

const AppContext = createContext<AppContextType | undefined>(undefined);

export const AppProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  // Session State
  const [session, setSession] = useState<UserSession>(() => {
    const saved = localStorage.getItem('uyzn_session');
    return saved ? JSON.parse(saved) : { isAuthenticated: false, role: 'public' };
  });

  // Database State with LocalStorage Persistence
  const [youthMembers, setYouthMembers] = useState<YouthMember[]>(() => {
    const saved = localStorage.getItem('uyzn_youth_members');
    return saved ? JSON.parse(saved) : INITIAL_YOUTH_MEMBERS;
  });

  const [communities, setCommunities] = useState<Community[]>(() => {
    const saved = localStorage.getItem('uyzn_communities');
    return saved ? JSON.parse(saved) : INITIAL_COMMUNITIES;
  });

  const [leaders, setLeaders] = useState<Leader[]>(() => {
    const saved = localStorage.getItem('uyzn_leaders');
    return saved ? JSON.parse(saved) : INITIAL_LEADERS;
  });

  const [programs] = useState<Program[]>(INITIAL_PROGRAMS);

  const [events, setEvents] = useState<EventItem[]>(() => {
    const saved = localStorage.getItem('uyzn_events');
    return saved ? JSON.parse(saved) : INITIAL_EVENTS;
  });

  const [announcements, setAnnouncements] = useState<Announcement[]>(() => {
    const saved = localStorage.getItem('uyzn_announcements');
    return saved ? JSON.parse(saved) : INITIAL_ANNOUNCEMENTS;
  });

  const [gallery] = useState<GalleryItem[]>(INITIAL_GALLERY);

  const [coordinatorReports, setCoordinatorReports] = useState<CoordinatorReport[]>(() => {
    const saved = localStorage.getItem('uyzn_coordinator_reports');
    return saved ? JSON.parse(saved) : [];
  });

  const [auditLogs, setAuditLogs] = useState<AuditLog[]>(() => {
    const saved = localStorage.getItem('uyzn_audit_logs');
    return saved ? JSON.parse(saved) : [
      {
        id: 'log-1',
        timestamp: new Date().toISOString(),
        userEmail: 'admin@uyzn.org',
        userRole: 'Super Admin',
        action: 'INITIALIZE_SYSTEM',
        entityType: 'System',
        entityId: 'UYZN-SYS',
        details: 'System initialized with 18 communities and President Dr. Christian Agbesi Duse profile.'
      }
    ];
  });

  const [cmsContent, setCmsContent] = useState<CMSContent>(() => {
    const saved = localStorage.getItem('uyzn_cms_content');
    return saved ? JSON.parse(saved) : INITIAL_CMS;
  });

  // Persistence Effects
  useEffect(() => {
    localStorage.setItem('uyzn_session', JSON.stringify(session));
  }, [session]);

  useEffect(() => {
    localStorage.setItem('uyzn_youth_members', JSON.stringify(youthMembers));
  }, [youthMembers]);

  useEffect(() => {
    localStorage.setItem('uyzn_communities', JSON.stringify(communities));
  }, [communities]);

  useEffect(() => {
    localStorage.setItem('uyzn_leaders', JSON.stringify(leaders));
  }, [leaders]);

  useEffect(() => {
    localStorage.setItem('uyzn_events', JSON.stringify(events));
  }, [events]);

  useEffect(() => {
    localStorage.setItem('uyzn_announcements', JSON.stringify(announcements));
  }, [announcements]);

  useEffect(() => {
    localStorage.setItem('uyzn_coordinator_reports', JSON.stringify(coordinatorReports));
  }, [coordinatorReports]);

  useEffect(() => {
    localStorage.setItem('uyzn_audit_logs', JSON.stringify(auditLogs));
  }, [auditLogs]);

  useEffect(() => {
    localStorage.setItem('uyzn_cms_content', JSON.stringify(cmsContent));
  }, [cmsContent]);

  // Helper: Log Audit Trail
  const logAudit = (action: string, entityType: string, entityId: string, details: string) => {
    const newLog: AuditLog = {
      id: `log-${Date.now()}`,
      timestamp: new Date().toISOString(),
      userEmail: session.email || 'system@uyzn.org',
      userRole: session.role === 'admin' ? 'Super Admin' : 'Community Coordinator',
      action,
      entityType,
      entityId,
      details
    };
    setAuditLogs(prev => [newLog, ...prev]);
  };

  // Auth Functions
  const login = (role: AuthRole, email?: string, password?: string, communityAssignedId?: string): boolean => {
    if (role === 'admin') {
      if (email === 'admin@uyzn.org' && password === 'admin123') {
        const newSession: UserSession = {
          isAuthenticated: true,
          role: 'admin',
          email: 'admin@uyzn.org',
          name: 'Super Administrator'
        };
        setSession(newSession);
        logAudit('LOGIN_ADMIN', 'Session', 'ADMIN-01', 'Super Admin logged into UYZN Dashboard.');
        return true;
      }
      return false;
    } else if (role === 'coordinator') {
      const assigned = communityAssignedId || 'Pepesa';
      const newSession: UserSession = {
        isAuthenticated: true,
        role: 'coordinator',
        email: email || `coordinator.${assigned.toLowerCase().replace(/\s+/g, '')}@uyzn.org`,
        name: `${assigned} Coordinator`,
        assignedCommunity: assigned
      };
      setSession(newSession);
      logAudit('LOGIN_COORDINATOR', 'Session', `COORD-${assigned}`, `Coordinator logged in for community ${assigned}.`);
      return true;
    }
    return false;
  };

  const logout = () => {
    logAudit('LOGOUT', 'Session', session.email || 'USER', 'User logged out.');
    setSession({ isAuthenticated: false, role: 'public' });
  };

  // Actions
  const addYouthMember = (memberData: Omit<YouthMember, 'id' | 'registrationDate' | 'isActive'>): YouthMember => {
    const nextNum = youthMembers.length + 1;
    const formattedId = `UYZN-2026-${String(nextNum).padStart(4, '0')}`;
    const newMember: YouthMember = {
      ...memberData,
      id: formattedId,
      registrationDate: new Date().toISOString().split('T')[0],
      isActive: true
    };

    setYouthMembers(prev => [newMember, ...prev]);

    // Increment community registered count
    setCommunities((prev: Community[]) => prev.map(c => {
      if (c.name.toLowerCase() === memberData.community.toLowerCase()) {
        return { ...c, registeredYouthCount: c.registeredYouthCount + 1 };
      }
      return c;
    }));

    logAudit('CREATE_YOUTH_MEMBER', 'YouthMember', formattedId, `Registered youth member ${memberData.fullName} in ${memberData.community}.`);
    return newMember;
  };

  const updateYouthMember = (id: string, updates: Partial<YouthMember>) => {
    setYouthMembers(prev => prev.map(m => m.id === id ? { ...m, ...updates } : m));
    logAudit('UPDATE_YOUTH_MEMBER', 'YouthMember', id, `Updated fields for youth member ${id}.`);
  };

  const deactivateYouthMember = (id: string) => {
    setYouthMembers(prev => prev.map(m => m.id === id ? { ...m, isActive: !m.isActive } : m));
    logAudit('TOGGLE_STATUS_YOUTH_MEMBER', 'YouthMember', id, `Toggled active state for youth member ${id}.`);
  };

  const approveYouthMember = (id: string) => {
    setYouthMembers(prev => prev.map(m => m.id === id ? { ...m, membershipStatus: 'Verified Member' } : m));
    logAudit('APPROVE_YOUTH_MEMBER', 'YouthMember', id, `Approved membership status for ${id}.`);
  };

  const addCommunity = (commData: Omit<Community, 'id' | 'registeredYouthCount'>) => {
    const newId = `comm-${communities.length + 1}`;
    const newComm: Community = {
      ...commData,
      id: newId,
      registeredYouthCount: 0
    };
    setCommunities(prev => [...prev, newComm]);
    logAudit('CREATE_COMMUNITY', 'Community', newId, `Added community ${commData.name}.`);
  };

  const updateCommunity = (id: string, updates: Partial<Community>) => {
    setCommunities(prev => prev.map(c => c.id === id ? { ...c, ...updates } : c));
    logAudit('UPDATE_COMMUNITY', 'Community', id, `Updated community record ${id}.`);
  };

  const addLeader = (leaderData: Omit<Leader, 'id' | 'order'>) => {
    const newId = `lead-${leaders.length + 1}`;
    const newLeader: Leader = {
      ...leaderData,
      id: newId,
      order: leaders.length + 1
    };
    setLeaders(prev => [...prev, newLeader]);
    logAudit('CREATE_LEADER', 'Leader', newId, `Added leader ${leaderData.name} (${leaderData.roleTitle}).`);
  };

  const updateLeader = (id: string, updates: Partial<Leader>) => {
    setLeaders(prev => prev.map(l => l.id === id ? { ...l, ...updates } : l));
    logAudit('UPDATE_LEADER', 'Leader', id, `Updated leader profile ${id}.`);
  };

  const deleteLeader = (id: string) => {
    setLeaders(prev => prev.filter(l => l.id !== id));
    logAudit('DELETE_LEADER', 'Leader', id, `Removed leader ${id}.`);
  };

  const addEvent = (eventData: Omit<EventItem, 'id' | 'rsvpCount'>) => {
    const newId = `event-${events.length + 1}`;
    const newEvent: EventItem = {
      ...eventData,
      id: newId,
      rsvpCount: 0
    };
    setEvents(prev => [newEvent, ...prev]);
    logAudit('CREATE_EVENT', 'Event', newId, `Created event ${eventData.title}.`);
  };

  const updateEvent = (id: string, updates: Partial<EventItem>) => {
    setEvents(prev => prev.map(e => e.id === id ? { ...e, ...updates } : e));
    logAudit('UPDATE_EVENT', 'Event', id, `Updated event ${id}.`);
  };

  const deleteEvent = (id: string) => {
    setEvents(prev => prev.filter(e => e.id !== id));
    logAudit('DELETE_EVENT', 'Event', id, `Deleted event ${id}.`);
  };

  const rsvpEvent = (id: string) => {
    setEvents(prev => prev.map(e => e.id === id ? { ...e, rsvpCount: e.rsvpCount + 1 } : e));
  };

  const addAnnouncement = (annData: Omit<Announcement, 'id' | 'date'>) => {
    const newId = `ann-${announcements.length + 1}`;
    const newAnn: Announcement = {
      ...annData,
      id: newId,
      date: new Date().toISOString().split('T')[0]
    };
    setAnnouncements(prev => [newAnn, ...prev]);
    logAudit('CREATE_ANNOUNCEMENT', 'Announcement', newId, `Published announcement ${annData.title}.`);
  };

  const updateAnnouncement = (id: string, updates: Partial<Announcement>) => {
    setAnnouncements(prev => prev.map(a => a.id === id ? { ...a, ...updates } : a));
    logAudit('UPDATE_ANNOUNCEMENT', 'Announcement', id, `Updated announcement ${id}.`);
  };

  const deleteAnnouncement = (id: string) => {
    setAnnouncements(prev => prev.filter(a => a.id !== id));
    logAudit('DELETE_ANNOUNCEMENT', 'Announcement', id, `Deleted announcement ${id}.`);
  };

  const submitCoordinatorReport = (reportData: Omit<CoordinatorReport, 'id' | 'submittedAt'>) => {
    const newId = `rep-${coordinatorReports.length + 1}`;
    const newReport: CoordinatorReport = {
      ...reportData,
      id: newId,
      submittedAt: new Date().toISOString()
    };
    setCoordinatorReports(prev => [newReport, ...prev]);
    logAudit('SUBMIT_REPORT', 'CoordinatorReport', newId, `Submitted monthly report for ${reportData.communityName}.`);
  };

  const updateCMSContent = (updates: Partial<CMSContent>) => {
    setCmsContent(prev => ({ ...prev, ...updates }));
    logAudit('UPDATE_CMS', 'CMSContent', 'CMS-01', 'Updated website content settings.');
  };

  const resetDatabaseToDefaults = () => {
    localStorage.clear();
    setYouthMembers(INITIAL_YOUTH_MEMBERS);
    setCommunities(INITIAL_COMMUNITIES);
    setLeaders(INITIAL_LEADERS);
    setEvents(INITIAL_EVENTS);
    setAnnouncements(INITIAL_ANNOUNCEMENTS);
    setCmsContent(INITIAL_CMS);
    setCoordinatorReports([]);
    setAuditLogs([]);
  };

  return (
    <AppContext.Provider
      value={{
        session,
        login,
        logout,
        youthMembers,
        communities,
        leaders,
        programs,
        events,
        announcements,
        gallery,
        coordinatorReports,
        auditLogs,
        cmsContent,
        addYouthMember,
        updateYouthMember,
        deactivateYouthMember,
        approveYouthMember,
        addCommunity,
        updateCommunity,
        addLeader,
        updateLeader,
        deleteLeader,
        addEvent,
        updateEvent,
        deleteEvent,
        rsvpEvent,
        addAnnouncement,
        updateAnnouncement,
        deleteAnnouncement,
        submitCoordinatorReport,
        updateCMSContent,
        resetDatabaseToDefaults
      }}
    >
      {children}
    </AppContext.Provider>
  );
};

export const useApp = () => {
  const context = useContext(AppContext);
  if (!context) {
    throw new Error('useApp must be used within an AppProvider');
  }
  return context;
};
