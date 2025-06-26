"use client"

import { cn } from "@/lib/utils"
import * as React from "react"

interface ScrollAreaProps extends React.HTMLAttributes<HTMLDivElement> {
  children: React.ReactNode
}

export function ScrollArea({ className, children, ...props }: ScrollAreaProps) {
  return (
    <div
      className={cn("overflow-auto max-h-full", className)}
      {...props}
    >
      {children}
    </div>
  )
}
