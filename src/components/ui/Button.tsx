import * as React from "react"
import { cn } from "@/lib/utils"

export interface ButtonProps
    extends React.ButtonHTMLAttributes<HTMLButtonElement> {
    variant?: "primary" | "secondary" | "outline"
    isLoading?: boolean
}

const Button = React.forwardRef<HTMLButtonElement, ButtonProps>(
    ({ className, variant = "primary", isLoading, children, disabled, ...props }, ref) => {
        const variants = {
            primary: "bg-brand-green text-brand-violet hover:shadow-2xl hover:scale-[1.02] active:scale-[0.98]",
            secondary: "bg-brand-violet text-white hover:bg-brand-violet/90 hover:shadow-xl",
            outline: "bg-transparent border-2 border-brand-violet text-brand-violet hover:bg-brand-violet/5"
        }

        return (
            <button
                className={cn(
                    "inline-flex items-center justify-center gap-3 rounded-full px-8 py-4 text-base font-bold transition-all duration-300",
                    "focus:outline-none focus:ring-4 focus:ring-brand-green/30",
                    "disabled:opacity-50 disabled:cursor-not-allowed disabled:hover:scale-100",
                    variants[variant],
                    className
                )}
                ref={ref}
                disabled={disabled || isLoading}
                {...props}
            >
                {isLoading ? (
                    <>
                        <svg className="animate-spin h-5 w-5" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                            <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                            <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                        </svg>
                        Enviando...
                    </>
                ) : (
                    children
                )}
            </button>
        )
    }
)
Button.displayName = "Button"

export { Button }
