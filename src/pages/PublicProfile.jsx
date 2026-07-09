/**
 * PublicProfile — Layer 1 (Entry Point)
 *
 * This file is intentionally minimal.
 * It only mounts the ProfileLoader.
 *
 * Architecture Rule: Never add imports or logic here.
 * Any new feature must go into ProfileLoader, ProfileEngine, or ThemeResolver.
 */
import ProfileLoader from "../profile/engine/ProfileLoader.jsx";

const PublicProfile = () => <ProfileLoader />;

export default PublicProfile;
