# @titania/ui

## Translations (optional)

Out of the box the components render English and need no i18n library. For multilingual sites you can opt in to [Paraglide](https://inlang.com/m/gerre34r/library-inlang-paraglideJs): all strings the components render (accessible names, sr-only status words, error counts) are messages prefixed `ui_`, compiled and tree-shaken together with your own messages at build time. The library adds no runtime i18n code of its own.

1. Add the library's message files to your inlang project's `pathPattern` (`project.inlang/settings.json`):

   ```json
   "plugin.inlang.messageFormat": {
   	"pathPattern": ["./messages/{locale}.json", "./node_modules/@titania/ui/messages/{locale}.json"]
   }
   ```

2. Add the Vite plugin after Paraglide's, pointing at its generated messages module:

   ```ts
   import { titania } from '@titania/ui/vite';

   plugins: [
   	paraglideVitePlugin({ project: './project.inlang', outdir: './src/lib/paraglide' }),
   	titania({ messages: './src/lib/paraglide/messages.js' }),
   	sveltekit()
   ];
   ```

Switching the locale is then plain Paraglide (`setLocale`). Shipped locales: `en`, `de`. Messages live in `messages/{locale}.json` (inlang message format) and are compiled by the real Paraglide compiler (`npm run paraglide`, run automatically by `dev`, `check` and `prepack`). Add a locale by adding a `messages/<locale>.json`. Individual strings can still be overridden per instance (`pendingLabel`, `statusLabel`, `title`, `announceErrors`, `aria-label`).
