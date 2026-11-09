import type { ReactNode } from "react";

type BannerVariant = "info" | "success" | "danger";

type BannerProps = {
  variant: BannerVariant;
  title: string;
  icon?: ReactNode;
  children?: ReactNode;
};

//kleurparen volgen de statusparen van het design system
const variantClasses: Record<BannerVariant, string> = {
  info: "bg-info-bg text-info",
  success: "bg-success-bg text-success",
  danger: "bg-danger-bg text-danger",
};

export function Banner({ variant, title, icon, children }: BannerProps) {
  return (
    <div
      role={variant == "danger" ? "alert" : "status"}
      className={`flex items-start gap-3 rounded-lg px-4 py-3 ${variantClasses[variant]}`}
    >
      {icon && <span className="mt-0.5 shrink-0">{icon}</span>}

      <div>
        <p className="text-sm font-semibold">{title}</p>

        {children && <div className="mt-0.5 text-sm">{children}</div>}
      </div>
    </div>
  );
}
