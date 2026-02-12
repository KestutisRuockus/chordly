import type { TeacherPlan } from "@/db/types";

export const pricing = {
  header: {
    title: "Choose the Plan That Fits Your Teaching",
    description: "Flexible plans designed to support teachers at every stage.",
  },
  plans: {
    sectionLabel: "Pricing Plans ( For teachers only )",
    cards: [
      {
        studentsLimit: "Up to 1 student",
        label: "Basic",
        plan: "basic" as TeacherPlan,
        price: "19€",
        items: [
          "Unlimited lessons",
          "Assign exercises",
          "Practice tracking",
          "Teacher profile shown",
        ],
        buttonCta: {
          buttonLabel: "Go Basic",
          href: "/dashboard/teacher",
        },
      },
      {
        studentsLimit: "Up to 3 students",
        label: "Medium",
        plan: "medium" as TeacherPlan,
        price: "39€",
        items: [
          "Unlimited lessons",
          "Exercise library + custom exercises",
          "Practice tracking + insights",
          "Priority profile placement",
        ],
        buttonCta: {
          buttonLabel: "Go Medium",
          href: "/dashboard/teacher",
        },
      },
      {
        studentsLimit: "Unlimited students",
        label: "Pro",
        plan: "pro" as TeacherPlan,
        price: "79€",
        items: [
          "All featuress",
          "Advanced analytics",
          "Featured placement",
          "Priority support",
        ],
        buttonCta: {
          buttonLabel: "Go Pro",
          href: "/dashboard/teacher",
        },
      },
    ],
  },
  faq: {
    sectionLabel: "Pricing FAQ",
    items: [
      {
        header: "Can I change my plan later?",
        body: "Yes. You can upgrade or downgrade your plan at any time as your teaching needs change.",
      },
      {
        header: "Is there a free plan?",
        body: "Chordly offers paid plans designed for active music teachers. You can choose the plan that best fits your teaching scale.",
      },
      {
        header: "What happens if I reach my student limit?",
        body: "You’ll be notified when you’re close to your limit and can upgrade your plan at any time to add more students.",
      },
      {
        header: "Do you take a commission on lessons?",
        body: "No. Chordly charges a subscription fee only. You keep full control over your lesson pricing and earnings.",
      },
      {
        header: "Can I cancel my subscription anytime?",
        body: "Yes. You can cancel your subscription at any time. Your plan will remain active until the end of the billing period.",
      },
    ],
  },
  buttonCta: {
    headline: "Start Teaching with Chordly",
    buttonLabel: "Create account for free",
    href: "/dashboard/teacher",
  },
};
