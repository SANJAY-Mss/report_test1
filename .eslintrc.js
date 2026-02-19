module.exports = {
    root: true,
    extends: [
        'next/core-web-vitals',
        'eslint:recommended',
    ],
    rules: {
        'no-unused-vars': 'warn',
        'no-console': 'warn',
        '@next/next/no-html-link-for-pages': 'off',
    },
};
