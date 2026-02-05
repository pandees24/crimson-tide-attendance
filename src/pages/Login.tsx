 import { useState } from 'react';
 import { useNavigate } from 'react-router-dom';
 import { useAuth } from '@/contexts/AuthContext';
 import { Button } from '@/components/ui/button';
 import { Input } from '@/components/ui/input';
 import { Label } from '@/components/ui/label';
 import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
 import { GraduationCap, Eye, EyeOff, Loader2 } from 'lucide-react';
 import { cn } from '@/lib/utils';
 
 export default function Login() {
   const [identifier, setIdentifier] = useState('');
   const [password, setPassword] = useState('');
   const [showPassword, setShowPassword] = useState(false);
   const [error, setError] = useState('');
   const [isLoading, setIsLoading] = useState(false);
   const { login, getRedirectPath } = useAuth();
   const navigate = useNavigate();
 
   const handleSubmit = async (e: React.FormEvent) => {
     e.preventDefault();
     setError('');
     setIsLoading(true);
 
     try {
       const result = await login({ identifier, password });
       if (result.success) {
         // Small delay to ensure state is updated
         setTimeout(() => {
           navigate(getRedirectPath());
         }, 100);
       } else {
         setError(result.error || 'Login failed');
       }
     } catch (err) {
       setError('An unexpected error occurred');
     } finally {
       setIsLoading(false);
     }
   };
 
   const isStudentId = /^\d{12}$/.test(identifier);
   const inputType = isStudentId ? 'Student ID' : 'Email';
 
   return (
     <div className="min-h-screen bg-gradient-hero flex items-center justify-center p-4">
       {/* Background Pattern */}
       <div className="absolute inset-0 opacity-10">
         <div className="absolute inset-0" style={{
           backgroundImage: `url("data:image/svg+xml,%3Csvg width='60' height='60' viewBox='0 0 60 60' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='none' fill-rule='evenodd'%3E%3Cg fill='%23ffffff' fill-opacity='0.4'%3E%3Cpath d='M36 34v-4h-2v4h-4v2h4v4h2v-4h4v-2h-4zm0-30V0h-2v4h-4v2h4v4h2V6h4V4h-4zM6 34v-4H4v4H0v2h4v4h2v-4h4v-2H6zM6 4V0H4v4H0v2h4v4h2V6h4V4H6z'/%3E%3C/g%3E%3C/g%3E%3C/svg%3E")`,
         }} />
       </div>
 
       <Card className="w-full max-w-md relative animate-scale-in shadow-2xl border-0">
         <CardHeader className="text-center pb-2">
           <div className="mx-auto w-16 h-16 rounded-2xl bg-gradient-primary flex items-center justify-center mb-4 shadow-primary">
             <GraduationCap className="w-8 h-8 text-primary-foreground" />
           </div>
           <CardTitle className="text-2xl font-bold">College ERP</CardTitle>
           <CardDescription className="text-muted-foreground">
             Attendance Management System
           </CardDescription>
         </CardHeader>
 
         <CardContent className="pt-6">
           <form onSubmit={handleSubmit} className="space-y-5">
             <div className="space-y-2">
               <Label htmlFor="identifier" className="text-sm font-medium">
                 Student ID / Email
               </Label>
               <div className="relative">
                 <Input
                   id="identifier"
                   type="text"
                   placeholder="Enter 12-digit ID or email"
                   value={identifier}
                   onChange={(e) => setIdentifier(e.target.value)}
                   className="h-12 input-focus"
                   required
                 />
                 {identifier && (
                   <span className="absolute right-3 top-1/2 -translate-y-1/2 text-xs px-2 py-1 rounded-full bg-secondary/20 text-secondary">
                     {inputType}
                   </span>
                 )}
               </div>
             </div>
 
             <div className="space-y-2">
               <Label htmlFor="password" className="text-sm font-medium">
                 Password
               </Label>
               <div className="relative">
                 <Input
                   id="password"
                   type={showPassword ? 'text' : 'password'}
                   placeholder="Enter your password"
                   value={password}
                   onChange={(e) => setPassword(e.target.value)}
                   className="h-12 pr-12 input-focus"
                   required
                 />
                 <Button
                   type="button"
                   variant="ghost"
                   size="icon"
                   className="absolute right-1 top-1/2 -translate-y-1/2 h-10 w-10 text-muted-foreground hover:text-foreground"
                   onClick={() => setShowPassword(!showPassword)}
                 >
                   {showPassword ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
                 </Button>
               </div>
             </div>
 
             {error && (
               <div className="p-3 rounded-lg bg-destructive/10 border border-destructive/20 text-destructive text-sm animate-fade-in">
                 {error}
               </div>
             )}
 
             <Button
               type="submit"
               className="w-full h-12 bg-gradient-primary hover:opacity-90 transition-opacity shadow-primary font-semibold text-primary-foreground"
               disabled={isLoading}
             >
               {isLoading ? (
                 <>
                   <Loader2 className="w-4 h-4 mr-2 animate-spin" />
                   Signing in...
                 </>
               ) : (
                 'Sign In'
               )}
             </Button>
           </form>
 
           <div className="mt-8 pt-6 border-t border-border">
             <p className="text-xs text-center text-muted-foreground mb-4">Demo Credentials</p>
             <div className="grid grid-cols-2 gap-2 text-xs">
               <div className="p-2 rounded-lg bg-muted/50">
                 <p className="font-medium text-foreground">Student</p>
                 <p className="text-muted-foreground">202312345678</p>
                 <p className="text-muted-foreground">student123</p>
               </div>
               <div className="p-2 rounded-lg bg-muted/50">
                 <p className="font-medium text-foreground">Faculty</p>
                 <p className="text-muted-foreground truncate">faculty@college.edu</p>
                 <p className="text-muted-foreground">faculty123</p>
               </div>
               <div className="p-2 rounded-lg bg-muted/50">
                 <p className="font-medium text-foreground">HoD</p>
                 <p className="text-muted-foreground truncate">hod.cse@college.edu</p>
                 <p className="text-muted-foreground">hod123</p>
               </div>
               <div className="p-2 rounded-lg bg-muted/50">
                 <p className="font-medium text-foreground">Super Admin</p>
                 <p className="text-muted-foreground truncate">superadmin@college.edu</p>
                 <p className="text-muted-foreground">super123</p>
               </div>
             </div>
           </div>
         </CardContent>
       </Card>
     </div>
   );
 }