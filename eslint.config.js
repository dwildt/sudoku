import js from '@eslint/js';

export default [
    {
        ignores: [
            'node_modules/',
            'coverage/',
            'dist/',
            'build/'
        ]
    },
    {
        files: ['js/**/*.js'],
        languageOptions: {
            ecmaVersion: 'latest',
            sourceType: 'script',
            globals: {
                window: 'readonly',
                document: 'readonly',
                console: 'readonly',
                localStorage: 'readonly',
                fetch: 'readonly',
                alert: 'readonly',
                setTimeout: 'readonly',
                setInterval: 'readonly',
                clearInterval: 'readonly'
            }
        },
        rules: {
            ...js.configs.recommended.rules,
            // Relaxed rules for existing codebase
            'no-unused-vars': 'warn',
            'no-console': 'warn',
            'no-undef': 'warn',
            'no-implicit-globals': 'off',
            // Style rules for new code
            'prefer-const': 'warn',
            'no-var': 'error',
            'eqeqeq': 'warn',
            'curly': 'warn',
            // Formatting (auto-fixable)
            'quotes': ['warn', 'single'],
            'semi': ['warn', 'always'],
            'indent': ['warn', 4],
            'no-trailing-spaces': 'warn',
            'eol-last': 'warn'
        }
    },
    {
        files: ['tests/**/*.js'],
        languageOptions: {
            ecmaVersion: 'latest',
            sourceType: 'script',
            globals: {
                console: 'readonly',
                global: 'writable',
                window: 'readonly',
                document: 'readonly',
                localStorage: 'readonly',
                fetch: 'readonly',
                // Jest globals
                describe: 'readonly',
                test: 'readonly',
                expect: 'readonly',
                beforeEach: 'readonly',
                afterEach: 'readonly',
                jest: 'readonly'
            }
        },
        rules: {
            ...js.configs.recommended.rules,
            'no-unused-vars': 'warn',
            'no-console': 'off', // Allow console in tests
            'no-undef': 'warn',
            'no-implicit-globals': 'off',
            'prefer-const': 'warn',
            'no-var': 'error',
            'quotes': ['warn', 'single'],
            'semi': ['warn', 'always'],
            'indent': ['warn', 4],
            'no-trailing-spaces': 'warn',
            'eol-last': 'warn'
        }
    }
];