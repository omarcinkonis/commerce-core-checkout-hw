import defaultTheme from "tailwindcss/defaultTheme";
import forms from "@tailwindcss/forms";

/** @type {import('tailwindcss').Config} */
export default {
    content: [
        "./vendor/laravel/framework/src/Illuminate/Pagination/resources/views/*.blade.php",
        "./storage/framework/views/*.php",
        "./resources/views/**/*.blade.php",
        "./resources/js/**/*.jsx",
    ],

    theme: {
        extend: {
            fontFamily: {
                sans: ["Figtree", ...defaultTheme.fontFamily.sans],
            },
            colors: {
                "body-color": "#F8F1EB",
                "footer-color": "#DC624E",
                "success-color": "#009900",
                "danger-color": "#DC624E",
                "form-border-color": "#E9D6C5",
                "light-gray": "#FAFAFA",
                "input-border": "#E0E0E0",
                "gray-text": "#BDBDBD",
            },
            keyframes: {
                slideIn: {
                    "0%": { transform: "translateX(100%)" },
                    "100%": { transform: "translateX(-15%)" },
                },
                slideOut: {
                    "0%": { transform: "translateX(-%)" },
                    "100%": { transform: "translateX(100%)" },
                },
            },
            animation: {
                openCart: "slideIn 0.4s ease-in",
                closeCart: "slideOut 0.4s ease-out",
            },
        },
    },

    plugins: [forms],
};
