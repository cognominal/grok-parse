
// this file is generated — do not edit it


/// <reference types="@sveltejs/kit" />

/**
 * Environment variables [loaded by Vite](https://vitejs.dev/guide/env-and-mode.html#env-files) from `.env` files and `process.env`. Like [`$env/dynamic/private`](https://svelte.dev/docs/kit/$env-dynamic-private), this module cannot be imported into client-side code. This module only includes variables that _do not_ begin with [`config.kit.env.publicPrefix`](https://svelte.dev/docs/kit/configuration#env) _and do_ start with [`config.kit.env.privatePrefix`](https://svelte.dev/docs/kit/configuration#env) (if configured).
 * 
 * _Unlike_ [`$env/dynamic/private`](https://svelte.dev/docs/kit/$env-dynamic-private), the values exported from this module are statically injected into your bundle at build time, enabling optimisations like dead code elimination.
 * 
 * ```ts
 * import { API_KEY } from '$env/static/private';
 * ```
 * 
 * Note that all environment variables referenced in your code should be declared (for example in an `.env` file), even if they don't have a value until the app is deployed:
 * 
 * ```
 * MY_FEATURE_FLAG=""
 * ```
 * 
 * You can override `.env` values from the command line like so:
 * 
 * ```bash
 * MY_FEATURE_FLAG="enabled" npm run dev
 * ```
 */
declare module '$env/static/private' {
	export const NVM_RC_VERSION: string;
	export const MANPATH: string;
	export const npm_package_devDependencies_postcss_import: string;
	export const npm_package_devDependencies_tailwindcss_animate: string;
	export const GHOSTTY_RESOURCES_DIR: string;
	export const TERM_PROGRAM: string;
	export const XDG_DATA_HOME: string;
	export const npm_package_dependencies__rich_harris_svelte_split_pane: string;
	export const NODE: string;
	export const NVM_CD_FLAGS: string;
	export const npm_package_devDependencies_typescript: string;
	export const INIT_CWD: string;
	export const TERM: string;
	export const SHELL: string;
	export const npm_package_devDependencies_vite: string;
	export const npm_package_devDependencies__lucide_svelte: string;
	export const HOMEBREW_REPOSITORY: string;
	export const TMPDIR: string;
	export const npm_package_devDependencies_clsx: string;
	export const npm_package_dependencies_better_sqlite3: string;
	export const TERM_PROGRAM_VERSION: string;
	export const npm_package_scripts_dev: string;
	export const ZDOTDIR: string;
	export const FIG_NEW_SESSION: string;
	export const VOLTA_HOME: string;
	export const ORIGINAL_XDG_CURRENT_DESKTOP: string;
	export const MallocNanoZone: string;
	export const npm_package_devDependencies_class_variance_authority: string;
	export const npm_package_private: string;
	export const npm_package_devDependencies__sveltejs_kit: string;
	export const npm_config_registry: string;
	export const PNPM_HOME: string;
	export const ZSH: string;
	export const npm_package_scripts_analyze_words: string;
	export const NVM_DIR: string;
	export const USER: string;
	export const npm_package_devDependencies_tailwind_variants: string;
	export const LS_COLORS: string;
	export const npm_package_scripts_check_watch: string;
	export const npm_package_dependencies__tailwindcss_vite: string;
	export const COMMAND_MODE: string;
	export const CW_NEW_SESSION: string;
	export const PNPM_SCRIPT_SRC_DIR: string;
	export const SSH_AUTH_SOCK: string;
	export const __CF_USER_TEXT_ENCODING: string;
	export const npm_package_devDependencies_postcss: string;
	export const npm_execpath: string;
	export const PAGER: string;
	export const npm_package_devDependencies_svelte: string;
	export const npm_package_scripts_rebuild_sqlite: string;
	export const npm_package_devDependencies__tailwindcss_postcss: string;
	export const LSCOLORS: string;
	export const npm_config_frozen_lockfile: string;
	export const PATH: string;
	export const npm_package_devDependencies_bits_ui: string;
	export const LaunchInstanceID: string;
	export const npm_config_engine_strict: string;
	export const USER_ZDOTDIR: string;
	export const __CFBundleIdentifier: string;
	export const npm_package_dependencies_jsdom: string;
	export const PWD: string;
	export const npm_package_devDependencies_tailwindcss: string;
	export const npm_command: string;
	export const npm_package_scripts_preview: string;
	export const npm_lifecycle_event: string;
	export const LANG: string;
	export const npm_package_name: string;
	export const npm_package_devDependencies__sveltejs_vite_plugin_svelte: string;
	export const XDG_STATE_HOME: string;
	export const NODE_PATH: string;
	export const npm_package_scripts_build: string;
	export const BUN_INSPECT_CONNECT_TO: string;
	export const VSCODE_GIT_ASKPASS_EXTRA_ARGS: string;
	export const XPC_FLAGS: string;
	export const npm_package_devDependencies_tailwind_merge: string;
	export const npm_config_node_gyp: string;
	export const XPC_SERVICE_NAME: string;
	export const npm_package_version: string;
	export const npm_package_devDependencies__sveltejs_adapter_auto: string;
	export const VSCODE_INJECTION: string;
	export const npm_package_devDependencies_autoprefixer: string;
	export const npm_package_devDependencies_svelte_check: string;
	export const SHLVL: string;
	export const HOME: string;
	export const npm_package_type: string;
	export const VSCODE_GIT_ASKPASS_MAIN: string;
	export const XDG_CONFIG_HOME: string;
	export const TERMINFO: string;
	export const GHOSTTY_SHELL_INTEGRATION_NO_SUDO: string;
	export const npm_package_scripts_process_content: string;
	export const HOMEBREW_PREFIX: string;
	export const XDG_CACHE_HOME: string;
	export const LESS: string;
	export const LOGNAME: string;
	export const npm_package_devDependencies__types_jsdom: string;
	export const npm_lifecycle_script: string;
	export const VSCODE_GIT_IPC_HANDLE: string;
	export const XDG_DATA_DIRS: string;
	export const GHOSTTY_BIN_DIR: string;
	export const npm_package_dependencies_shadcn_svelte: string;
	export const BUN_INSTALL: string;
	export const npm_config_user_agent: string;
	export const VSCODE_GIT_ASKPASS_NODE: string;
	export const GIT_ASKPASS: string;
	export const HOMEBREW_CELLAR: string;
	export const INFOPATH: string;
	export const npm_package_devDependencies__types_node: string;
	export const Q_NEW_SESSION: string;
	export const BARTIB_FILE: string;
	export const SECURITYSESSIONID: string;
	export const npm_package_scripts_check: string;
	export const COLORTERM: string;
	export const npm_config_prefix: string;
	export const npm_node_execpath: string;
	export const NODE_ENV: string;
}

/**
 * Similar to [`$env/static/private`](https://svelte.dev/docs/kit/$env-static-private), except that it only includes environment variables that begin with [`config.kit.env.publicPrefix`](https://svelte.dev/docs/kit/configuration#env) (which defaults to `PUBLIC_`), and can therefore safely be exposed to client-side code.
 * 
 * Values are replaced statically at build time.
 * 
 * ```ts
 * import { PUBLIC_BASE_URL } from '$env/static/public';
 * ```
 */
declare module '$env/static/public' {
	
}

/**
 * This module provides access to runtime environment variables, as defined by the platform you're running on. For example if you're using [`adapter-node`](https://github.com/sveltejs/kit/tree/main/packages/adapter-node) (or running [`vite preview`](https://svelte.dev/docs/kit/cli)), this is equivalent to `process.env`. This module only includes variables that _do not_ begin with [`config.kit.env.publicPrefix`](https://svelte.dev/docs/kit/configuration#env) _and do_ start with [`config.kit.env.privatePrefix`](https://svelte.dev/docs/kit/configuration#env) (if configured).
 * 
 * This module cannot be imported into client-side code.
 * 
 * Dynamic environment variables cannot be used during prerendering.
 * 
 * ```ts
 * import { env } from '$env/dynamic/private';
 * console.log(env.DEPLOYMENT_SPECIFIC_VARIABLE);
 * ```
 * 
 * > In `dev`, `$env/dynamic` always includes environment variables from `.env`. In `prod`, this behavior will depend on your adapter.
 */
declare module '$env/dynamic/private' {
	export const env: {
		NVM_RC_VERSION: string;
		MANPATH: string;
		npm_package_devDependencies_postcss_import: string;
		npm_package_devDependencies_tailwindcss_animate: string;
		GHOSTTY_RESOURCES_DIR: string;
		TERM_PROGRAM: string;
		XDG_DATA_HOME: string;
		npm_package_dependencies__rich_harris_svelte_split_pane: string;
		NODE: string;
		NVM_CD_FLAGS: string;
		npm_package_devDependencies_typescript: string;
		INIT_CWD: string;
		TERM: string;
		SHELL: string;
		npm_package_devDependencies_vite: string;
		npm_package_devDependencies__lucide_svelte: string;
		HOMEBREW_REPOSITORY: string;
		TMPDIR: string;
		npm_package_devDependencies_clsx: string;
		npm_package_dependencies_better_sqlite3: string;
		TERM_PROGRAM_VERSION: string;
		npm_package_scripts_dev: string;
		ZDOTDIR: string;
		FIG_NEW_SESSION: string;
		VOLTA_HOME: string;
		ORIGINAL_XDG_CURRENT_DESKTOP: string;
		MallocNanoZone: string;
		npm_package_devDependencies_class_variance_authority: string;
		npm_package_private: string;
		npm_package_devDependencies__sveltejs_kit: string;
		npm_config_registry: string;
		PNPM_HOME: string;
		ZSH: string;
		npm_package_scripts_analyze_words: string;
		NVM_DIR: string;
		USER: string;
		npm_package_devDependencies_tailwind_variants: string;
		LS_COLORS: string;
		npm_package_scripts_check_watch: string;
		npm_package_dependencies__tailwindcss_vite: string;
		COMMAND_MODE: string;
		CW_NEW_SESSION: string;
		PNPM_SCRIPT_SRC_DIR: string;
		SSH_AUTH_SOCK: string;
		__CF_USER_TEXT_ENCODING: string;
		npm_package_devDependencies_postcss: string;
		npm_execpath: string;
		PAGER: string;
		npm_package_devDependencies_svelte: string;
		npm_package_scripts_rebuild_sqlite: string;
		npm_package_devDependencies__tailwindcss_postcss: string;
		LSCOLORS: string;
		npm_config_frozen_lockfile: string;
		PATH: string;
		npm_package_devDependencies_bits_ui: string;
		LaunchInstanceID: string;
		npm_config_engine_strict: string;
		USER_ZDOTDIR: string;
		__CFBundleIdentifier: string;
		npm_package_dependencies_jsdom: string;
		PWD: string;
		npm_package_devDependencies_tailwindcss: string;
		npm_command: string;
		npm_package_scripts_preview: string;
		npm_lifecycle_event: string;
		LANG: string;
		npm_package_name: string;
		npm_package_devDependencies__sveltejs_vite_plugin_svelte: string;
		XDG_STATE_HOME: string;
		NODE_PATH: string;
		npm_package_scripts_build: string;
		BUN_INSPECT_CONNECT_TO: string;
		VSCODE_GIT_ASKPASS_EXTRA_ARGS: string;
		XPC_FLAGS: string;
		npm_package_devDependencies_tailwind_merge: string;
		npm_config_node_gyp: string;
		XPC_SERVICE_NAME: string;
		npm_package_version: string;
		npm_package_devDependencies__sveltejs_adapter_auto: string;
		VSCODE_INJECTION: string;
		npm_package_devDependencies_autoprefixer: string;
		npm_package_devDependencies_svelte_check: string;
		SHLVL: string;
		HOME: string;
		npm_package_type: string;
		VSCODE_GIT_ASKPASS_MAIN: string;
		XDG_CONFIG_HOME: string;
		TERMINFO: string;
		GHOSTTY_SHELL_INTEGRATION_NO_SUDO: string;
		npm_package_scripts_process_content: string;
		HOMEBREW_PREFIX: string;
		XDG_CACHE_HOME: string;
		LESS: string;
		LOGNAME: string;
		npm_package_devDependencies__types_jsdom: string;
		npm_lifecycle_script: string;
		VSCODE_GIT_IPC_HANDLE: string;
		XDG_DATA_DIRS: string;
		GHOSTTY_BIN_DIR: string;
		npm_package_dependencies_shadcn_svelte: string;
		BUN_INSTALL: string;
		npm_config_user_agent: string;
		VSCODE_GIT_ASKPASS_NODE: string;
		GIT_ASKPASS: string;
		HOMEBREW_CELLAR: string;
		INFOPATH: string;
		npm_package_devDependencies__types_node: string;
		Q_NEW_SESSION: string;
		BARTIB_FILE: string;
		SECURITYSESSIONID: string;
		npm_package_scripts_check: string;
		COLORTERM: string;
		npm_config_prefix: string;
		npm_node_execpath: string;
		NODE_ENV: string;
		[key: `PUBLIC_${string}`]: undefined;
		[key: `${string}`]: string | undefined;
	}
}

/**
 * Similar to [`$env/dynamic/private`](https://svelte.dev/docs/kit/$env-dynamic-private), but only includes variables that begin with [`config.kit.env.publicPrefix`](https://svelte.dev/docs/kit/configuration#env) (which defaults to `PUBLIC_`), and can therefore safely be exposed to client-side code.
 * 
 * Note that public dynamic environment variables must all be sent from the server to the client, causing larger network requests — when possible, use `$env/static/public` instead.
 * 
 * Dynamic environment variables cannot be used during prerendering.
 * 
 * ```ts
 * import { env } from '$env/dynamic/public';
 * console.log(env.PUBLIC_DEPLOYMENT_SPECIFIC_VARIABLE);
 * ```
 */
declare module '$env/dynamic/public' {
	export const env: {
		[key: `PUBLIC_${string}`]: string | undefined;
	}
}
