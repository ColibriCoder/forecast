const defaultTheme = require('tailwindcss/defaultTheme');

/** @type {import('tailwindcss').Config} */
module.exports = {
    content: [
        './vendor/laravel/framework/src/Illuminate/Pagination/resources/views/*.blade.php',
        './storage/framework/views/*.php',
        './resources/views/**/*.blade.php',
        './resources/js/**/*.jsx',
    ],

    theme: {
        extend: {
            fontFamily: {
                sans: ['Figtree', ...defaultTheme.fontFamily.sans],
            },
        },
		extend: {
			colors: {
				'dark-purple': '#092669',
				'light-purple': '#A5A7CA',
				'light-gray': '#F0F3F8',
				'blue': '#1883D2',
				'gray': '#F0F3F8',
				'light-gray': '#D1D3DA',
				'red': "#E54651",
			},
			borderRadius: {
				'10px': '10px',
			},
			spacing: {
				'5px': '5px',
				'10px': '10px',
				'15px': '15px',
				'20px': '20px',
				'25px': '25px',
				'30px': '30px',
				'31px': '31px',
				'34px': '34px',
				'37px': '37px',
				'50px': '50px',
				'65px': '65px',
				'70px': '70px',
				'100px': '100px',
				'150px': '150px',
				'300px': '300px',
				'336px': '336px',
				'426px': '426.8px',
				'496px': '496px',
			},
			fontSize: {
				'25px': '25px',
				'100px': '100px',
			},
			padding: {
				'5px': '5px',
				'38px': '38px',
			},
			maxHeight: {
				'300px': '300px',
			},
			maxWidth: {
				'20px': '20px',
				'300px': '300px',
				'750px': '750px',
				'1100px': '1100px',
			},
			minWidth: {
				'300px': '300px',
			},
			fontFamily: {
				'poppins': ['Poppins'],
				'roboto': ['Roboto'],
			},
			boxShadow: {
				'select': '0px 0px 10px rgba(0, 0, 0, 0.3)',
			}
		},
    },

    plugins: [require('@tailwindcss/forms')],
};
