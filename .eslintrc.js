module.exports = {
    parser: '@typescript-eslint/parser', // Indica que vamos a usar el parser de TypeScript
    extends: [
      'eslint:recommended',
      'plugin:@typescript-eslint/recommended', // Utiliza una configuración recomendada para TypeScript
    ],
    plugins: ['@typescript-eslint'], // Habilita el complemento para TypeScript
    rules: {
      // Agrega reglas personalizadas aquí si es necesario
    },
  };
  