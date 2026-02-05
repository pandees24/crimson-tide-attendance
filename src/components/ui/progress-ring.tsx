 import { cn } from '@/lib/utils';
 
 interface ProgressRingProps {
   value: number;
   size?: number;
   strokeWidth?: number;
   variant?: 'primary' | 'secondary' | 'success' | 'warning' | 'danger';
   showLabel?: boolean;
   label?: string;
   className?: string;
 }
 
 const variantColors = {
   primary: 'stroke-primary',
   secondary: 'stroke-secondary',
   success: 'stroke-success',
   warning: 'stroke-warning',
   danger: 'stroke-destructive',
 };
 
 export function ProgressRing({
   value,
   size = 120,
   strokeWidth = 10,
   variant = 'primary',
   showLabel = true,
   label,
   className,
 }: ProgressRingProps) {
   const radius = (size - strokeWidth) / 2;
   const circumference = radius * 2 * Math.PI;
   const offset = circumference - (value / 100) * circumference;
 
   return (
     <div className={cn("relative inline-flex items-center justify-center", className)}>
       <svg
         width={size}
         height={size}
         className="transform -rotate-90"
       >
         {/* Background circle */}
         <circle
           cx={size / 2}
           cy={size / 2}
           r={radius}
           stroke="currentColor"
           strokeWidth={strokeWidth}
           fill="none"
           className="text-muted/30"
         />
         {/* Progress circle */}
         <circle
           cx={size / 2}
           cy={size / 2}
           r={radius}
           strokeWidth={strokeWidth}
           fill="none"
           strokeLinecap="round"
           strokeDasharray={circumference}
           strokeDashoffset={offset}
           className={cn(variantColors[variant], "transition-all duration-700 ease-out")}
         />
       </svg>
       {showLabel && (
         <div className="absolute inset-0 flex flex-col items-center justify-center">
           <span className="text-2xl font-bold">{value}%</span>
           {label && <span className="text-xs text-muted-foreground">{label}</span>}
         </div>
       )}
     </div>
   );
 }