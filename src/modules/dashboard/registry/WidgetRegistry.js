/**
 * Dashboard Widget Registry
 * 
 * Local registry managing dashboard widgets, priority order (P0, P1, P2),
 * layout column spans, feature flag validation, and permission checks.
 */

class DashboardWidgetRegistry {
  constructor() {
    this.widgets = new Map();
  }

  /**
   * Registers a widget into the Dashboard Framework.
   * @param {Object} contract - Universal Widget Contract
   */
  registerWidget(contract) {
    if (!contract.id || !contract.component) {
      console.warn(`[WidgetRegistry] Missing required fields for widget registration:`, contract);
      return;
    }

    if (this.widgets.has(contract.id)) {
      console.warn(`[WidgetRegistry] Widget ${contract.id} is already registered.`);
      return;
    }

    const defaultContract = {
      title: "",
      description: "",
      priority: "P1", // P0, P1, P2, P3
      span: { default: 12, md: 6, xl: 4 }, // Grid column span
      permissions: ["user"],
      featureFlag: null,
      cacheTTL: 300, // 5 mins
      refreshInterval: 0,
      loadingStrategy: "eager", // eager | lazy
      component: null,
      fallback: null,
      enabled: true,
    };

    this.widgets.set(contract.id, {
      ...defaultContract,
      ...contract,
    });
  }

  /**
   * Returns registered widgets sorted by Priority (P0 -> P1 -> P2 -> P3)
   * @param {Object} user - Active auth user
   * @returns {Array<Object>} List of active widgets
   */
  getWidgets(user = null) {
    const priorityOrder = { P0: 0, P1: 1, P2: 2, P3: 3 };

    return Array.from(this.widgets.values())
      .filter((widget) => widget.enabled !== false)
      .sort((a, b) => (priorityOrder[a.priority] ?? 9) - (priorityOrder[b.priority] ?? 9));
  }

  /**
   * Get a specific widget by ID.
   * @param {string} id 
   */
  getWidget(id) {
    return this.widgets.get(id) || null;
  }
}

export const WidgetRegistry = new DashboardWidgetRegistry();
