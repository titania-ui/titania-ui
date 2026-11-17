// Read by both `paraglide-js compile` (npm scripts) and `paraglideVitePlugin` (vite.config.ts).
export default {
	outdir: './src/lib/paraglide',
	strategy: ['baseLocale'],
	emitTsDeclarations: true,
	emitGitIgnore: false,
	emitPrettierIgnore: false,
	emitReadme: false
};
