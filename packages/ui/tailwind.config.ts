import type { Config } from "tailwindcss";

const config = {
  darkMode: ["class"],
  content: [
    "./pages/**/*.{ts,tsx}",
    "./components/**/*.{ts,tsx}",
    "./app/**/*.{ts,tsx}",
    "./src/**/*.{ts,tsx}",
  ],
  prefix: "",
  theme: {
    container: {
      center: true,
      padding: "2rem",
      screens: {
        "2xl": "1400px",
      },
    },
    extend: {
      fontSize: {
        base: ["1.2rem", { fontWeight: "500" }],
        "compact-xlarge-plus": ["1rem", { fontWeight: "500" }],
        "compact-xlarge": ["1rem", { fontWeight: "400" }],
        "compact-large-plus": ["0.89rem", { fontWeight: "500" }],
        "compact-large": ["0.89rem", { fontWeight: "400" }],
        "compact-medium-plus": ["0.78rem", { fontWeight: "500" }],
        "compact-medium": ["0.78rem", { fontWeight: "400" }],
        "compact-small-plus": ["0.72rem", { fontWeight: "500" }],
        "compact-small": ["0.72rem", { fontWeight: "400" }],
        "compact-xsmall-plus": ["0.67rem", { fontWeight: "500" }],
        "compact-xsmall": ["0.67rem", { fontWeight: "400" }],
        "xlarge-plus": ["1rem", { fontWeight: "400" }],
        xlarge: ["1rem", { fontWeight: "400" }],
        "large-plus": ["0.89rem", { fontWeight: "400" }],
        large: ["0.89rem", { fontWeight: "400" }],
        "medium-plus": ["0.78rem", { fontWeight: "400" }],
        medium: ["0.78rem", { fontWeight: "400" }],
        "small-plus": ["0.72rem", { fontWeight: "400" }],
        small: ["0.72rem", { fontWeight: "400" }],
        "xsmall-plus": ["0.67rem", { fontWeight: "400" }],
        xsmall: ["0.67rem", { fontWeight: "400" }],
        "headers-core-h1": ["1.5rem", { fontWeight: "500" }],
        "headers-core-h2": ["1.25rem", { fontWeight: "500" }],
        "headers-core-h3": ["1rem", { fontWeight: "500" }],
        "headers-webs-h1": ["1.5rem", { fontWeight: "500" }],
        "headers-webs-h2": ["1.25rem", { fontWeight: "500" }],
        "headers-webs-h3": ["1rem", { fontWeight: "500" }],
        "headers-webs-h4": ["0.89rem", { fontWeight: "500" }],
        "headers-docs-h1": ["1.5rem", { fontWeight: "500" }],
        "headers-docs-h2": ["1.25rem", { fontWeight: "500" }],
        "headers-docs-h3": ["1rem", { fontWeight: "500" }],
        "code-label": ["0.78rem", { fontWeight: "500" }],
        "code-body": ["0.72rem", { fontWeight: "500" }],
      },
      fontFamily: {
        departure: ["var(--font-departure-mono)"],
      },
      colors: {
        border: "hsl(var(--border))",
        input: "hsl(var(--input))",
        ring: "hsl(var(--ring))",
        background: "hsl(var(--background))",

        foreground: "hsl(var(--foreground))",
        subtitle: "hsl(var(--subtitle))",
        primary: {
          DEFAULT: "hsl(var(--primary))",
          foreground: "hsl(var(--primary-foreground))",
        },
        secondary: {
          DEFAULT: "hsl(var(--secondary))",
          foreground: "hsl(var(--secondary-foreground))",
        },
        destructive: {
          DEFAULT: "hsl(var(--destructive))",
          foreground: "hsl(var(--destructive-foreground))",
        },
        muted: {
          DEFAULT: "hsl(var(--muted))",
          foreground: "hsl(var(--muted-foreground))",
        },
        accent: {
          DEFAULT: "hsl(var(--accent))",
          foreground: "hsl(var(--accent-foreground))",
        },
        popover: {
          DEFAULT: "hsl(var(--popover))",
          foreground: "hsl(var(--popover-foreground))",
        },
        card: {
          DEFAULT: "hsl(var(--card))",
          foreground: "hsl(var(--card-foreground))",
        },
        warning: {
          DEFAULT: "hsl(var(--warning))",
          foreground: "hsl(var(--warning-foreground))",
        },
        success: {
          DEFAULT: "hsl(var(--success))",
          foreground: "hsl(var(--success-foreground))",
        },
        blue: {
          DEFAULT: "hsl(var(--blue))",
        },
        tag: {
          neutral: {
            bg: "hsl(var(--tag-neutral-bg))",
            text: "hsl(var(--tag-neutral-text))",
            icon: "hsl(var(--tag-neutral-icon))",
            border: "hsl(var(--tag-neutral-border))",
            bgHover: "hsl(var(--tag-neutral-bg-hover))",
          },
          purple: {
            bg: "hsl(var(--tag-purple-bg))",
            text: "hsl(var(--tag-purple-text))",
            icon: "hsl(var(--tag-purple-icon))",
            border: "hsl(var(--tag-purple-border))",
            bgHover: "hsl(var(--tag-purple-bg-hover))",
          },
          blue: {
            bg: "hsl(var(--tag-blue-bg))",
            text: "hsl(var(--tag-blue-text))",
            icon: "hsl(var(--tag-blue-icon))",
            border: "hsl(var(--tag-blue-border))",
            bgHover: "hsl(var(--tag-blue-bg-hover))",
          },
          success: {
            bg: "hsl(var(--tag-success-bg))",
            text: "hsl(var(--tag-success-text))",
            icon: "hsl(var(--tag-success-icon))",
            border: "hsl(var(--tag-success-border))",
            bgHover: "hsl(var(--tag-success-bg-hover))",
          },
          warning: {
            bg: "hsl(var(--tag-warning-bg))",
            text: "hsl(var(--tag-warning-text))",
            icon: "hsl(var(--tag-warning-icon))",
            border: "hsl(var(--tag-warning-border))",
            bgHover: "hsl(var(--tag-warning-bg-hover))",
          },
          error: {
            bg: "hsl(var(--tag-error-bg))",
            text: "hsl(var(--tag-error-text))",
            icon: "hsl(var(--tag-error-icon))",
            border: "hsl(var(--tag-error-border))",
            bgHover: "hsl(var(--tag-error-bg-hover))",
          },
          red: {
            text: "hsl(var(--tag-red-text))",
            icon: "hsl(var(--tag-red-icon))",
            border: "hsl(var(--tag-red-border))",
            bgHover: "hsl(var(--tag-red-bg-hover))",
            bg: "hsl(var(--tag-red-bg))",
          },
        },
        chart: {
          "1": "hsl(var(--chart-1))",
          "2": "hsl(var(--chart-2))",
          "3": "hsl(var(--chart-3))",
          "4": "hsl(var(--chart-4))",
          "5": "hsl(var(--chart-5))",
        },
        sidebar: {
          DEFAULT: "hsl(var(--sidebar-background))",
          foreground: "hsl(var(--sidebar-foreground))",
          primary: "hsl(var(--sidebar-primary))",
          "primary-foreground": "hsl(var(--sidebar-primary-foreground))",
          accent: "hsl(var(--sidebar-accent))",
          "accent-foreground": "hsl(var(--sidebar-accent-foreground))",
          border: "hsl(var(--sidebar-border))",
          ring: "hsl(var(--sidebar-ring))",
        },
      },
      borderRadius: {
        lg: "var(--radius)",
        md: "calc(var(--radius) - 2px)",
        sm: "calc(var(--radius) - 4px)",
      },
      keyframes: {
        shake: {
          "0%, 100%": {
            transform: "translateX(0)",
          },
          "10%": {
            transform: "translateX(10px)",
          },
          "20%": {
            transform: "translateX(-10px)",
          },
          "30%": {
            transform: "translateX(5px)",
          },
          "40%": {
            transform: "translateX(-5px)",
          },
          "50%": {
            transform: "translateX(2px)",
          },
          "60%": {
            transform: "translateX(-2px)",
          },
        },
        "accordion-down": {
          from: {
            height: "0",
          },
          to: {
            height: "var(--radix-accordion-content-height)",
          },
        },
        "accordion-up": {
          from: {
            height: "var(--radix-accordion-content-height)",
          },
          to: {
            height: "0",
          },
        },
      },
      animation: {
        shake: "shake 0.5s ease-in-out",
        "accordion-down": "accordion-down 0.2s ease-out",
        "accordion-up": "accordion-up 0.2s ease-out",
      },
    },
  },
  plugins: [require("tailwindcss-animate")],
  mode: "jit",
} satisfies Config;

export default config;
