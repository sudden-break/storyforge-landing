// ============================================================================
// API utilities for fetching data from the backend
// ============================================================================

/**
 * Backend API URL
 * In production, this points to the main app API
 */
const API_URL = process.env.NEXT_PUBLIC_API_URL || 'https://app.storyforge.cloud';

// ============================================================================
// Types (matching backend response)
// ============================================================================

export interface PlanFeatureInfo {
  feature_name: string;
  feature_value: unknown;
  feature_type: 'boolean' | 'integer' | 'string' | 'json';
}

export interface PlanConfig {
  id: string;
  plan_id: string;
  name: string;
  description: string | null;
  tier: string;
  check_interval_min: number;
  check_interval_max: number;
  max_profiles: number;
  has_ai: boolean;
  price_amount: number | null;
  price_currency: string | null;
  sort_order: number;
  features: Record<string, PlanFeatureInfo>;
}

export interface PlansResponse {
  plans: PlanConfig[];
  source: 'database' | 'hardcoded';
}

// ============================================================================
// API Functions
// ============================================================================

/**
 * Fetch all subscription plans from the backend API
 * This is a public endpoint that doesn't require authentication
 */
export async function fetchPlans(): Promise<PlansResponse> {
  const response = await fetch(`${API_URL}/api/plans`, {
    next: { revalidate: 300 }, // Cache for 5 minutes
  });

  if (!response.ok) {
    throw new Error(`Failed to fetch plans: ${response.statusText}`);
  }

  return response.json();
}

// ============================================================================
// Helper Functions
// ============================================================================

/**
 * Format price for display
 */
export function formatPrice(amount: number | null, currency: string | null): string {
  if (amount === null || amount === 0) {
    return '$0';
  }

  const symbol = currency === 'EUR' ? '€' : '$';
  return `${symbol}${amount.toFixed(2)}`;
}

/**
 * Format check interval for display
 */
export function formatInterval(min: number, max: number): string {
  if (min === max) {
    return `${min}-minute check interval`;
  }
  return `${min}-${max} minute check interval`;
}

/**
 * Get AI generation limit from plan features
 */
export function getAiGenerationLimit(features: Record<string, PlanFeatureInfo>): number | null {
  const aiLimit = features['ai_generation_limit'];
  if (aiLimit && typeof aiLimit.feature_value === 'number') {
    return aiLimit.feature_value;
  }
  return null;
}
