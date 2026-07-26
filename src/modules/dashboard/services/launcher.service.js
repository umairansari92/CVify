import { ModuleRegistry } from "../../../core/registry/ModuleRegistry";

export const launcherService = {
  getActiveModules() {
    return ModuleRegistry.getModules();
  }
};
