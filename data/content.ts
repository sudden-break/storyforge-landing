// ============================================================================
// StoryForge Landing Page Content
// Central content definitions for all landing page components
// ============================================================================

// ============================================================================
// Types
// ============================================================================

export interface CtaButton {
  text: string;
  url: string;
}

export interface HeroContent {
  headline: string;
  subheadline: string;
  primaryCta: string;
  primaryCtaUrl: string;
}

export interface FeatureItem {
  id: string;
  title: string;
  description: string;
  icon: string;
  badge?: string;
}

export interface FeaturesContent {
  title: string;
  subtitle: string;
  features: FeatureItem[];
}

export interface StepItem {
  id: string;
  title: string;
  description: string;
  icon: string;
}

export interface HowItWorksContent {
  title: string;
  subtitle: string;
  steps: StepItem[];
}

export interface PricingFeature {
  text: string;
  included: boolean;
}

export interface PricingPlan {
  id: string;
  name: string;
  price: string;
  period?: string;
  description: string;
  features: PricingFeature[];
  badge?: string;
  cta: string;
}

export interface PricingContent {
  title: string;
  subtitle: string;
  plans: PricingPlan[];
  note: string;
}

export interface FAQItem {
  id: string;
  question: string;
  answer: string;
}

export interface FAQContent {
  title: string;
  subtitle: string;
  items: FAQItem[];
}

export interface TrustItem {
  icon: string;
  text: string;
}

export interface TrustContent {
  title: string;
  items: TrustItem[];
}

export interface LandingPageContent {
  hero: HeroContent;
  features: FeaturesContent;
  howItWorks: HowItWorksContent;
  pricing: PricingContent;
  faq: FAQContent;
  trust: TrustContent;
}

// ============================================================================
// Content Data
// ============================================================================

const content: LandingPageContent = {
  // ------------------------------------------------------------------
  // Hero Section
  // ------------------------------------------------------------------
  hero: {
    headline: "Never Miss an Instagram Story Again",
    subheadline: "Automatically monitor, archive, and transform Instagram Stories with AI-powered content generation.",
    primaryCta: "Start Free",
    primaryCtaUrl: "https://app.storyforge.cloud",
  },

  // ------------------------------------------------------------------
  // Features Section
  // ------------------------------------------------------------------
  features: {
    title: "Everything You Need to Monitor Stories",
    subtitle: "Powerful features to help you stay on top of Instagram content 24/7",
    features: [
      {
        id: "story-monitoring",
        title: "Story Monitoring",
        description: "Automatically capture and archive Instagram Stories as they're posted. Never miss exclusive content from accounts you follow.",
        icon: "Eye",
      },
      {
        id: "ai-generation",
        title: "AI Generation",
        description: "Transform captured stories with AI-powered generation. Create content variants automatically.",
        icon: "Sparkles",
        badge: "Premium",
      },
      {
        id: "privacy",
        title: "Privacy First",
        description: "Your data stays yours. We use encrypted storage and never share your information with third parties.",
        icon: "Shield",
      },
      {
        id: "multiple-profiles",
        title: "Multiple Profiles",
        description: "Monitor multiple Instagram accounts simultaneously. Perfect for agencies, marketers, and power users.",
        icon: "Users",
      },
    ],
  },

  // ------------------------------------------------------------------
  // How It Works Section
  // ------------------------------------------------------------------
  howItWorks: {
    title: "How StoryForge Works",
    subtitle: "Get started in three simple steps",
    steps: [
      {
        id: "connect",
        title: "Connect",
        description: "Sign up and connect your Instagram account. No password required – we use secure OAuth authentication.",
        icon: "Users",
      },
      {
        id: "monitor",
        title: "Monitor",
        description: "We automatically monitor Stories 24/7. Sit back as we capture and archive content from accounts you follow.",
        icon: "Eye",
      },
      {
        id: "transform",
        title: "Transform",
        description: "AI generates variants, summaries, and insights from captured stories. Available on Pro and Pro+ plans.",
        icon: "Sparkles",
      },
    ],
  },

  // ------------------------------------------------------------------
  // Pricing Section
  // ------------------------------------------------------------------
  pricing: {
    title: "Simple, Transparent Pricing",
    subtitle: "Choose the plan that fits your needs. Upgrade or downgrade anytime.",
    plans: [
      {
        id: "free",
        name: "Free",
        price: "$0",
        description: "Perfect for getting started",
        features: [
          { text: "2 Instagram profiles", included: true },
          { text: "60-minute check interval", included: true },
          { text: "Story archiving", included: true },
          { text: "Basic alerts", included: true },
          { text: "AI generation", included: false },
          { text: "Priority support", included: false },
        ],
        cta: "Get Started",
      },
      {
        id: "starter",
        name: "Starter",
        price: "$4.99",
        period: "/month",
        description: "For casual users",
        features: [
          { text: "5 Instagram profiles", included: true },
          { text: "30-60 minute check interval", included: true },
          { text: "Story archiving", included: true },
          { text: "Basic alerts", included: true },
          { text: "AI generation", included: false },
          { text: "Priority support", included: false },
        ],
        cta: "Choose Starter",
      },
      {
        id: "pro",
        name: "Pro",
        price: "$9.99",
        period: "/month",
        description: "Most popular for professionals",
        features: [
          { text: "10 Instagram profiles", included: true },
          { text: "15-30 minute check interval", included: true },
          { text: "Story archiving", included: true },
          { text: "Real-time alerts", included: true },
          { text: "AI generation", included: true },
          { text: "Analytics dashboard", included: true },
        ],
        badge: "Most Popular",
        cta: "Choose Pro",
      },
      {
        id: "enterprise",
        name: "Pro+",
        price: "$19.99",
        period: "/month",
        description: "For teams and power users",
        features: [
          { text: "15 Instagram profiles", included: true },
          { text: "5-15 minute check interval", included: true },
          { text: "Story archiving", included: true },
          { text: "Real-time alerts", included: true },
          { text: "AI generation", included: true },
          { text: "Priority support", included: true },
        ],
        cta: "Choose Pro+",
      },
    ],
    note: "All plans include secure storage and cancel anytime.",
  },

  // ------------------------------------------------------------------
  // FAQ Section
  // ------------------------------------------------------------------
  faq: {
    title: "Frequently Asked Questions",
    subtitle: "Everything you need to know about StoryForge",
    items: [
      {
        id: "what-is",
        question: "What is StoryForge?",
        answer: "StoryForge is an Instagram Story monitoring and archiving service. We automatically capture and store stories from accounts you follow, send you desktop notifications when new stories are posted, and use AI to generate variants from the captured content.",
      },
      {
        id: "account-security",
        question: "Is my Instagram account safe?",
        answer: "Absolutely. You never share your Instagram password with us. We only read publicly available stories and don't interact with your account on your behalf. Your data is encrypted and never shared with third parties.",
      },
      {
        id: "ai-generation",
        question: "How does the AI generation work?",
        answer: "Our AI analyzes captured stories to create content variants. It can generate different versions and transformations of the captured stories. This feature is available on Pro and Pro+ plans.",
      },
      {
        id: "payment-methods",
        question: "What payment methods are accepted?",
        answer: "We accept both cryptocurrency (via Web3 payments) and credit/debit cards through our payment provider BoomFi. All transactions are secure and encrypted.",
      },
      {
        id: "cancel-anytime",
        question: "Can I cancel anytime?",
        answer: "Yes, you can cancel your subscription at any time with no questions asked. Your access will continue until the end of your current billing period. We don't do long-term contracts or hidden fees.",
      },
      {
        id: "which-plan",
        question: "Which plan is right for me?",
        answer: "Start with our Free plan to explore the basics. Upgrade to Starter if you need to monitor 5 profiles. Choose Pro for AI features and faster monitoring intervals. Go with Pro+ for maximum profiles (15) and the fastest 5-15 minute check intervals with priority support.",
      },
      {
        id: "after-cancellation",
        question: "What happens after I cancel?",
        answer: "After cancellation, your account will revert to the Free plan at the end of your billing period. Your archived stories will be retained for 30 days. If you choose not to return, all data is permanently deleted in accordance with our privacy policy.",
      },
      {
        id: "monitoring-works",
        question: "How does Story Monitoring work?",
        answer: "Once you connect accounts to monitor, our system checks for new stories at regular intervals based on your plan (5-60 minutes). When new stories are detected, they're automatically archived to your account, and you'll receive desktop notifications if enabled.",
      },
    ],
  },

  // ------------------------------------------------------------------
  // Trust Section
  // ------------------------------------------------------------------
  trust: {
    title: "Built for Reliability and Trust",
    items: [
      { icon: "Shield", text: "Secure & Private" },
      { icon: "CreditCard", text: "Crypto & Card via BoomFi" },
      { icon: "XCircle", text: "Cancel Anytime" },
      { icon: "CheckCircle", text: "Built for Reliability" },
    ],
  },
};

// ============================================================================
// Export
// ============================================================================

export default content;
