"use client";

import { ActivityDelist, Congratulations } from "./icons";
import {
  Toast,
  ToastClose,
  ToastDescription,
  ToastProvider,
  ToastTitle,
  ToastViewport,
} from "./toast";
import { useToast } from "./use-toast";

export function Toaster() {
  const { toasts } = useToast();

  return (
    <ToastProvider>
      {toasts.map(function ({
        id,
        title,
        description,
        action,
        additionalContent,
        variant,
        ...props
      }) {
        return (
          <Toast key={id} variant={variant} {...props}>
            <div className="grid w-full gap-1">
              <div className="flex items-center gap-2.5 text-lg font-semibold">
                {variant === "canceled" && (
                  <ActivityDelist className="size-6 text-[#EF4444]" />
                )}
                {variant === "success" && (
                  <Congratulations className="size-6 text-foreground" />
                )}
                {title && <ToastTitle>{title}</ToastTitle>}
              </div>
              {description && (
                <ToastDescription>{description}</ToastDescription>
              )}
              {additionalContent ?? null}
            </div>
            {action}
            <ToastClose />
          </Toast>
        );
      })}
      <ToastViewport />
    </ToastProvider>
  );
}
