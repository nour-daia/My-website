/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./index.html", "./public/js/**/*.js"],
  theme: {
    extend: {
      fontFamily: {
        "pop": 'Poppins', 
      },
      
      colors:{
        'bg-black-900':'#f2f2fc',
        'bg-black-100':'#fdf9ff',
        'bg-black-50':'#e8dfec',
        '-bg-black-900':'#302e4d',
        'bg-black-700':'#504e70',
      },
    padding: {
      '5%' : '5%',
    },
    borderRadius : {
      '50%' : '50%',
    },
  
  },
},
}

  


        




