/** @type {import('tailwindcss').Config} */
module.exports = {
    content: ["./src/**/*.tsx"],
    theme: {
        extend: {
            fontFamily: {
                sans: "Roboto, sans-serif",
            },
            colors: {
                gray: {
                    600: "#323228",
                    800: "#202024",
                    900: "#121214",
                },
                ignite: {
                    500: "#129e57",
                },
                yellow: {
                    500: "#F7DD43",
                    600: "#e5cd3d",
                },
            },
            backgroundImage: {
                app: "url(/bg-effects.png)",
            },
        },
    },
    plugins: [],
};
