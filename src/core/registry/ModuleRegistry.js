/**
 * CVifyPro Module Registry
 * 
 * Central registry for all standalone micro-product modules.
 * This powers the Sidebar, Command Center (Dashboard), and Permissions.
 */

class Registry {
  constructor() {
    this.modules = new Map();
  }

  /**
   * Registers a new module into the Career OS platform.
   * @param {Object} config - The module configuration
   * @param {string} config.id - Unique ID (e.g., 'RESUME_BUILDER')
   * @param {Object} config.manifest - The module's manifest.js export
   * @param {Object} config.routes - React components for routing
   * @param {Array<string>} config.permissions - Required user roles
   */
  registerModule(config) {
    if (!config.id || !config.manifest) {
      console.warn(`[ModuleRegistry] Invalid module registration attempt: missing id or manifest.`);
      return;
    }
    
    if (this.modules.has(config.id)) {
      console.warn(`[ModuleRegistry] Module ${config.id} is already registered.`);
      return;
    }

    this.modules.set(config.id, {
      ...config,
      status: config.manifest.status || 'active',
    });
    
    console.log(`[ModuleRegistry] Successfully registered module: ${config.id}`);
  }

  /**
   * Returns all active modules to render the Launcher and Sidebar.
   * @returns {Array<Object>} List of module configurations
   */
  getModules() {
    return Array.from(this.modules.values()).filter(mod => mod.status === 'active');
  }

  /**
   * Get a specific module by its ID.
   * @param {string} id 
   * @returns {Object|null}
   */
  getModule(id) {
    return this.modules.get(id) || null;
  }
}

export const ModuleRegistry = new Registry();
