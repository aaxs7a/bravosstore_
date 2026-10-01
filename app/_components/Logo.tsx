// Components/Logo.tsx
import Image from "next/image";
type LogoProps = {
    variant?: "horizontal" | "vertical" | "navbar";
    className?: string;
};

const LOGO_VARIANTS = {
    horizontal: { src: "/logotipos/logo-horizontal-colorido.png", width: 630, height: 230 },
    vertical: { src: "/logotipos/logo-vertical-colorido.png", width: 238, height: 246 },
    navbar: { src: "/logotipos/logo-navbar-colorido.png", width: 360, height: 138 },
} as const;

export function Logo({ variant = "horizontal", className }: LogoProps) {
    const { src, width, height } = LOGO_VARIANTS[variant];

    return (
        <Image
            src={src}
            alt="BRAVOS STORE"
            width={width}
            height={height}
            className={className}
            priority
        />
    );
}