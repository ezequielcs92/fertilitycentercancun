import * as React from "react"
import { cn } from "@/lib/utils"

export interface InputProps
    extends React.InputHTMLAttributes<HTMLInputElement> {
    error?: string
}

const Input = React.forwardRef<HTMLInputElement, InputProps>(
    ({ className, type, error, ...props }, ref) => {
        return (
            <div className="w-full">
                <input
                    type={type}
                    className={cn(
                        "flex h-14 w-full rounded-2xl border-2 bg-white px-6 py-4 text-base transition-all",
                        "placeholder:text-slate-400 placeholder:font-light",
                        "focus:outline-none focus:ring-4 focus:ring-brand-green/20 focus:border-brand-violet",
                        "disabled:cursor-not-allowed disabled:opacity-50",
                        error
                            ? "border-red-500 focus:border-red-500 focus:ring-red-500/20"
                            : "border-slate-200 hover:border-brand-violet/30",
                        className
                    )}
                    ref={ref}
                    {...props}
                />
                {error && (
                    <p className="mt-2 text-sm text-red-600 font-medium">{error}</p>
                )}
            </div>
        )
    }
)
Input.displayName = "Input"

export { Input }
