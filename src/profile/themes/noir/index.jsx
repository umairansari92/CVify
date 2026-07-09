/**
 * NOIR Theme Entry — src/profile/themes/noir/index.jsx
 *
 * This file re-exports the existing theme from src/themes/noir/
 * so the new registry can discover it without duplicating code.
 *
 * Migration plan: When the existing theme is ready to be fully migrated
 * to accept ThemeProps (manifest, model, config, tokens, components, runtime),
 * replace this re-export with the new implementation.
 */
export { default } from "../../../themes/noir/index.jsx";
