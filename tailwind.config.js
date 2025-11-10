const config = {
  content: ["./src/**/*.{js,ts,jsx,tsx,mdx}"],
  theme: {
    container: {
      center: true,
      padding: "2rem",
      screens: {
        "2xl": "1280px",
      },
    },
    extend: {
      colors: {
        charcoal: {
          950: "#050807",
          900: "#0A0F0D",
          800: "#101915",
          700: "#152420",
        },
        leaf: {
          50: "#eafff4",
          100: "#caffe7",
          200: "#97fbd1",
          300: "#5ef3b5",
          400: "#2ae69a",
          500: "#0fc77f",
          600: "#0aa86b",
          700: "#0b8658",
          800: "#0d6a47",
          900: "#0d573b",
        },
        aqua: {
          400: "#3ef3e7",
          500: "#1ad9ce",
          600: "#11b7b3",
        },
        bg: {
          900: "#0c1210",
          800: "#0e1513",
          700: "#101a18",
        },
        brand: {
          50: "#E5F6F1",
          100: "#CCEBDD",
          200: "#A4DCC5",
          300: "#7ECCA9",
          400: "#4DBA90",
          500: "#2FA183",
          600: "#23856C",
          700: "#1C6B59",
          800: "#155146",
          900: "#0E3A33",
        },
        accent: {
          50: "#F7FAF6",
          100: "#ECF2E6",
          200: "#D8E2D0",
          300: "#C4D1BD",
          400: "#A7B89F",
          500: "#8C9D86",
          600: "#6F806B",
          700: "#566555",
        },
        surface: {
          50: "#101814",
          100: "#13201A",
          200: "#172822",
          300: "#1D312A",
        },
        halo: {
          100: "rgba(47,161,131,0.12)",
          200: "rgba(47,161,131,0.2)",
          300: "rgba(216,226,208,0.16)",
        },
        accentBlue: {
          100: "#E0F5FF",
          200: "#B8E7FF",
          300: "#80D3FF",
          400: "#3ABEFF",
          500: "#00AFFF",
          600: "#0086E0",
          700: "#005EB8",
        },
        accentYellow: {
          100: "#FFF7D6",
          200: "#FFEEAD",
          300: "#FFE47A",
          400: "#FFD633",
          500: "#FFCA28",
        },
      },
      borderColor: {
        subtle: "rgba(255, 255, 255, 0.08)",
      },
      fontFamily: {
        sans: ["Inter", "Satoshi", "-apple-system", "BlinkMacSystemFont", "Segoe UI", "sans-serif"],
        display: ["Inter", "Satoshi", "-apple-system", "BlinkMacSystemFont", "Segoe UI", "sans-serif"],
      },
      boxShadow: {
        glass: "0 20px 60px rgba(0, 0, 0, 0.35), inset 0 1px 0 rgba(255,255,255,0.08)",
        halo: "0 0 45px rgba(47,161,131,0.25)",
        card: "0 10px 30px rgba(0,0,0,.35), inset 0 1px 0 rgba(255,255,255,.03)",
        glow: "0 0 0 1px rgba(26,217,206,.25), 0 10px 30px rgba(26,217,206,.12)",
        glowBlue: "0 0 0 1px rgba(0,198,255,0.32), 0 16px 45px rgba(0,198,255,0.25)",
      },
      dropShadow: {
        neon: "0 0 12px rgba(26,217,206,.45)",
      },
      borderRadius: {
        "3xl": "1.75rem",
        "4xl": "2.5rem",
      },
      backgroundImage: {
        "bio-light": "radial-gradient(120% 120% at 0% 0%, rgba(47,161,131,0.18), transparent 55%), radial-gradient(100% 80% at 90% 20%, rgba(216,226,208,0.18), transparent 65%)",
        "bio-halo": "radial-gradient(60% 70% at 50% 0%, rgba(47,161,131,0.36), transparent 70%)",
        "radial-soft": "radial-gradient(80% 50% at 50% 0%, rgba(26,217,206,.08) 0%, rgba(15,199,127,.05) 30%, rgba(0,0,0,0) 70%)",
        "gradient-overlay": "linear-gradient(135deg, #0B3C3A 0%, #003E60 40%, #00C6FF 100%)",
      },
      spacing: {
        18: "4.5rem",
      },
      transitionDuration: {
        350: "350ms",
      },
    },
  },
  plugins: [],
};

module.exports = config;
