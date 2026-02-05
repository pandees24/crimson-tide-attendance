 // User roles in the system
 export type UserRole = 'student' | 'faculty' | 'hod' | 'super_admin' | 'executive_admin' | 'academic_admin';
 
 // User interface
 export interface User {
   id: string;
   email?: string;
   studentId?: string;
   name: string;
   role: UserRole;
   department?: string;
   avatar?: string;
 }
 
 // HoD department emails
 export const HOD_EMAILS: Record<string, string> = {
   'hod.cse@college.edu': 'Computer Science',
   'hod.ece@college.edu': 'Electronics & Communication',
   'hod.eee@college.edu': 'Electrical & Electronics',
   'hod.mech@college.edu': 'Mechanical Engineering',
   'hod.civil@college.edu': 'Civil Engineering',
   'hod.it@college.edu': 'Information Technology',
   'hod.ai@college.edu': 'Artificial Intelligence',
   'hod.biotech@college.edu': 'Biotechnology',
 };
 
 // Admin emails
 export const ADMIN_EMAILS: Record<string, UserRole> = {
   'superadmin@college.edu': 'super_admin',
   'execadmin@college.edu': 'executive_admin',
   'academicadmin@college.edu': 'academic_admin',
 };
 
 // Route paths by role
 export const ROLE_ROUTES: Record<UserRole, string> = {
   student: '/student',
   faculty: '/faculty',
   hod: '/hod',
   super_admin: '/admin/super',
   executive_admin: '/admin/executive',
   academic_admin: '/admin/academic',
 };
 
 // Role display names
 export const ROLE_DISPLAY_NAMES: Record<UserRole, string> = {
   student: 'Student',
   faculty: 'Faculty',
   hod: 'Head of Department',
   super_admin: 'Super Admin',
   executive_admin: 'Executive Admin',
   academic_admin: 'Academic Admin',
 };