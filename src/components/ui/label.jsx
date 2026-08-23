import * as React from "react"
import * as LabelPrimitive from "@radix-ui/react-label"
import { cva } from "class-variance-authority"

import { cn } from "@/lib/utils"

const labelVariants = cva(
  "text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
)

/**
 * @typedef {React.ComponentPropsWithoutRef<typeof LabelPrimitive.Root>} LabelProps
 */

const Label = React.forwardRef(
  /**
   * @param {LabelProps} props
   * @param {React.ForwardedRef<any>} ref
   */
  ({ className, ...props }, ref) => (
    <LabelPrimitive.Root
      ref={ref}
      className={cn(labelVariants(), className)}
      {...props}
    />
  )
)

Label.displayName = LabelPrimitive.Root.displayName

export { Label }