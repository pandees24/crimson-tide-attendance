 import React, { createContext, useContext, useState, useCallback, ReactNode } from 'react';
 import { User, UserRole, HOD_EMAILS, ADMIN_EMAILS, ROLE_ROUTES } from '@/types/auth';
 
 interface AuthContextType {
   user: User | null;
   isAuthenticated: boolean;
   login: (credentials: LoginCredentials) => Promise<{ success: boolean; error?: string }>;
   logout: () => void;
   getRedirectPath: () => string;
 }
 
 interface LoginCredentials {
   identifier: string; // email or student ID
   password: string;
 }
 
 const AuthContext = createContext<AuthContextType | undefined>(undefined);
 
 // Mock users for demo
 const MOCK_USERS: Record<string, { password: string; user: User }> = {
   // Students (12-digit ID)
   '202312345678': {
     password: 'student123',
     user: {
       id: '1',
       studentId: '202312345678',
       name: 'Rahul Kumar',
       role: 'student',
       department: 'Computer Science',
     },
   },
   // Faculty
   'faculty@college.edu': {
     password: 'faculty123',
     user: {
       id: '2',
       email: 'faculty@college.edu',
       name: 'Dr. Priya Sharma',
       role: 'faculty',
       department: 'Computer Science',
     },
   },
   // HoDs
   'hod.cse@college.edu': {
     password: 'hod123',
     user: {
       id: '3',
       email: 'hod.cse@college.edu',
       name: 'Dr. Anil Kumar',
       role: 'hod',
       department: 'Computer Science',
     },
   },
   'hod.ece@college.edu': {
     password: 'hod123',
     user: {
       id: '4',
       email: 'hod.ece@college.edu',
       name: 'Dr. Meena Patel',
       role: 'hod',
       department: 'Electronics & Communication',
     },
   },
   // Super Admin
   'superadmin@college.edu': {
     password: 'super123',
     user: {
       id: '5',
       email: 'superadmin@college.edu',
       name: 'Admin User',
       role: 'super_admin',
     },
   },
   // Executive Admin
   'execadmin@college.edu': {
     password: 'exec123',
     user: {
       id: '6',
       email: 'execadmin@college.edu',
       name: 'Executive Admin',
       role: 'executive_admin',
     },
   },
   // Academic Admin
   'academicadmin@college.edu': {
     password: 'academic123',
     user: {
       id: '7',
       email: 'academicadmin@college.edu',
       name: 'Academic Admin',
       role: 'academic_admin',
     },
   },
 };
 
 export function AuthProvider({ children }: { children: ReactNode }) {
   const [user, setUser] = useState<User | null>(() => {
     const stored = localStorage.getItem('erp_user');
     return stored ? JSON.parse(stored) : null;
   });
 
   const login = useCallback(async (credentials: LoginCredentials): Promise<{ success: boolean; error?: string }> => {
     const { identifier, password } = credentials;
     
     // Check if it's a student ID (12 digits)
     const isStudentId = /^\d{12}$/.test(identifier);
     
     // Look up user
     const userData = MOCK_USERS[identifier.toLowerCase()];
     
     if (!userData) {
       return { success: false, error: 'Invalid credentials' };
     }
     
     if (userData.password !== password) {
       return { success: false, error: 'Invalid password' };
     }
     
     // Validate role based on login method
     if (isStudentId && userData.user.role !== 'student') {
       return { success: false, error: 'Invalid student ID' };
     }
     
     if (!isStudentId && userData.user.role === 'student') {
       return { success: false, error: 'Students must use their 12-digit ID' };
     }
     
     setUser(userData.user);
     localStorage.setItem('erp_user', JSON.stringify(userData.user));
     
     return { success: true };
   }, []);
 
   const logout = useCallback(() => {
     setUser(null);
     localStorage.removeItem('erp_user');
   }, []);
 
   const getRedirectPath = useCallback(() => {
     if (!user) return '/login';
     return ROLE_ROUTES[user.role];
   }, [user]);
 
   return (
     <AuthContext.Provider value={{ user, isAuthenticated: !!user, login, logout, getRedirectPath }}>
       {children}
     </AuthContext.Provider>
   );
 }
 
 export function useAuth() {
   const context = useContext(AuthContext);
   if (context === undefined) {
     throw new Error('useAuth must be used within an AuthProvider');
   }
   return context;
 }