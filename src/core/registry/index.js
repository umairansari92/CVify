import { ModuleRegistry } from './ModuleRegistry';
import { manifest as resumeManifest } from '../../modules/resume/manifest';
import { manifest as atsManifest } from '../../modules/ats/manifest';

// Bootstrap the registry by registering known modules
export const initializeRegistry = () => {
  ModuleRegistry.registerModule({
    id: resumeManifest.id,
    manifest: resumeManifest,
  });

  ModuleRegistry.registerModule({
    id: atsManifest.id,
    manifest: atsManifest,
  });

  console.log('[Registry] Initialization complete.', ModuleRegistry.getModules());
};
