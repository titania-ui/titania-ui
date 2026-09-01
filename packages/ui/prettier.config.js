/** @type {import("prettier").Config} */
const config = {
	useTabs: true,
	singleQuote: true,
	trailingComma: 'none',
	printWidth: 100,
	plugins: [
		'prettier-plugin-svelte',
		'prettier-plugin-tailwindcss',
		'@trivago/prettier-plugin-sort-imports'
	],
	overrides: [{ files: '*.svelte', options: { parser: 'svelte' } }],
	tailwindStylesheet: './src/lib/theme/flowbite/index.css',
	tailwindFunctions: ['clsx', 'tv', 'cv', 'cx'],
	importOrderSortSpecifiers: true,
	importOrderSeparation: false
};

export default config;
