module.exports = {
	'env': {
		'browser': true,
		'es2021': true
	},
	'extends': ['eslint:recommended',
	 'plugin:@typescript-eslint/recommended',
	  'plugin:vue/vue3-essential',
	  'plugin:storybook/recommended',
	   'plugin:@conarti/feature-sliced/recommended'
	    ],
	'overrides': [
		{
			'env': {
				'node': true
			},
			'files': [
				'.eslintrc.{js,cjs}'
			],
			'parserOptions': {
				'sourceType': 'script'
			}
		}
	],
	'parserOptions': {
		'ecmaVersion': 'latest',
		'parser': '@typescript-eslint/parser',
		'sourceType': 'module'
	},
	'plugins': [
		'@typescript-eslint',
		'vue'
	],
	'rules': {
		'indent': [
			'error',
			'tab'
		],
		'object-curly-spacing': [
			'error',
			'always'
		],
		'@typescript-eslint/ban-ts-comment': 'warn',
		'vue/multi-word-component-names': 'warn',
		'no-undef': 'warn',
		'@typescript-eslint/no-unused-vars': 'warn',
		'no-mixed-spaces-and-tabs': 'off',
		'no-multiple-empty-lines': 'error',
		'@typescript-eslint/no-empty-interface': 'warn',
		'@typescript-eslint/no-explicit-any': 'warn',
		'linebreak-style': 'off',
		'prefer-const': 'warn',
		
		'key-spacing': ['error'],
  
		'quotes': [
			'error',
			'single'
		],
		'semi': [
			'error',
			'always'
		]
	}
};
