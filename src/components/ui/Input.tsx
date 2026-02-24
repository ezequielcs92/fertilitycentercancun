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
                        "flex h-14 w-full rounded-2xl bg-slate-50 px-6 py-4 text-base transition-all",
                        "placeholder:text-slate-400 placeholder:font-light",
                        "focus:outline-none focus:ring-4 focus:ring-brand-green/20 focus:bg-white",
                        "disabled:cursor-not-allowed disabled:opacity-50",
                        error
                            ? "border-2 border-red-500 focus:border-red-500 focus:ring-red-500/20"
                            : "",
                        className
                    )}
                    ref={ref}
                    {...props}
                />
                {error && (
                    <p className="mt-2 text-base text-red-600 font-medium">{error}</p>
                )}
            </div>
        )
    }
)
Input.displayName = "Input"

export { Input }
