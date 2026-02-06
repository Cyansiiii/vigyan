/** @type {import('tailwindcss').Config} */
export default {
    content: [
        "./index.html",
        "./aboutpage.html",
        "./src/**/*.{js,ts,jsx,tsx}",
        "./components/**/*.{js,ts,jsx,tsx}",
    ],
    theme: {
        extend: {
            colors: {
                background: "hsl(var(--background))",
                foreground: "hsl(var(--foreground))",
                primary: "hsl(var(--primary))",
                blue: {
                    500: "#3b82f6",
                    600: "#2563eb",
                    700: "#1d4ed8",
                },
            },
            fontFamily: {
                serif: ["Playfair Display", "serif"],
                sans: ["Inter", "sans-serif"],
            },
        },
    },
    plugins: [],
}
