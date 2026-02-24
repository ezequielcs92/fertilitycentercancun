import * as React from "react"
import { cn } from "@/lib/utils"
import { ChevronDown } from "lucide-react"

export interface SelectProps
    extends React.SelectHTMLAttributes<HTMLSelectElement> {
    error?: string
}

const Select = React.forwardRef<HTMLSelectElement, SelectProps>(
    ({ className, children, error, ...props }, ref) => {
        return (
            <div className="w-full relative">
                <select
                    className={cn(
                        "flex h-14 w-full rounded-2xl bg-slate-50 px-6 py-4 pr-12 text-base transition-all appearance-none cursor-pointer",
                        "focus:outline-none focus:ring-4 focus:ring-brand-green/20 focus:bg-white",
                        "disabled:cursor-not-allowed disabled:opacity-50",
                        error
                            ? "border-2 border-red-500 focus:border-red-500 focus:ring-red-500/20"
                            : "",
                        className
                    )}
                    ref={ref}
                    {...props}
                >
                    {children}
                </select>
                <ChevronDown className="absolute right-4 top-1/2 -translate-y-1/2 w-5 h-5 text-brand-violet pointer-events-none" />
                {error && (
                    <p className="mt-2 text-base text-red-600 font-medium">{error}</p>
                )}
            </div>
        )
    }
)
Select.displayName = "Select"

export { Select }
