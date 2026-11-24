import type { Campaign } from "@/types/campaign";

/**
 * Prototype campaign adapted from the structure and voice of
 * The Almanack of Naval Ravikant (Eric Jorgenson).
 * Passages are tightly adapted for educational story-mode play.
 */
export const navalCampaign: Campaign = {
  id: "almanack-of-naval",
  title: "The Almanack of Naval Ravikant",
  author: "Naval Ravikant",
  tagline: "A guide to wealth and happiness",
  description:
    "You are the seeker. Eight stages. Wealth first, then happiness. Play the long game.",
  stages: [
    {
      id: "stage-1-wealth",
      order: 1,
      title: "Understand How Wealth Is Created",
      subtitle: "Seek wealth, not money or status",
      keyIdea:
        "Wealth is assets that earn while you sleep. Money is how we transfer time and wealth. Status is your rank in the social hierarchy.",
      passages: [
        "Seek wealth, not money or status. Wealth is having assets that earn while you sleep. Money is how we transfer time and wealth. Status is your rank in the social hierarchy.",
        "You’re not going to get rich renting out your time. You must own equity — a piece of a business — to gain your financial freedom.",
        "You will get rich by giving society what it wants but does not yet know how to get. At scale.",
        "Pick an industry where you can play long-term games with long-term people. The internet has massively broadened the possible space of careers. Most people haven’t figured this out yet.",
      ],
      interaction: {
        type: "multiple_choice",
        prompt:
          "According to this stage, which path is most aligned with creating wealth?",
        options: [
          "Maximize hourly income and climb a status hierarchy",
          "Own equity in assets that earn while you sleep",
          "Work longer hours than everyone else in your field",
          "Accumulate money by switching jobs frequently",
        ],
        correctOptionIndex: 1,
        hint: "Think about what earns while you sleep — not what rents your hours.",
        successMessage:
          "Wealth compounds from ownership. Time-for-money is a trap. Stage unlocked.",
      },
    },
    {
      id: "stage-2-specific-knowledge",
      order: 2,
      title: "Specific Knowledge",
      subtitle: "Knowledge that cannot be trained",
      keyIdea:
        "Specific knowledge is found by pursuing your genuine curiosity and passion rather than whatever is hot right now.",
      passages: [
        "Specific knowledge is knowledge that you cannot be trained for. If society can train you, it can train someone else and replace you.",
        "Specific knowledge is found by pursuing your genuine curiosity and passion rather than whatever is hot right now.",
        "Building specific knowledge will feel like play to you but will look like work to others.",
        "When specific knowledge is taught, it’s through apprenticeships, not schools. Specific knowledge is often highly technical or creative. It cannot be outsourced or automated.",
      ],
      interaction: {
        type: "short_answer",
        prompt:
          "Name one domain where your curiosity already looks like play to you but like work to others. (1–2 words is fine.)",
        acceptedKeywords: [],
        hint: "Any honest answer works — specific knowledge starts with what you can’t stop doing.",
        successMessage:
          "Specific knowledge is personal. Follow the trail only you would follow.",
      },
    },
    {
      id: "stage-3-leverage",
      order: 3,
      title: "Leverage",
      subtitle: "Permissionless: code & media",
      keyIdea:
        "Code and media are permissionless leverage. They work while you sleep and can be multiplied without asking anyone.",
      passages: [
        "Fortunes require leverage. Business leverage comes from capital, people, and products with no marginal cost of replication (code and media).",
        "Capital means money. To raise money, apply your specific knowledge with accountability and show resulting good judgment.",
        "Labor means people working for you. It’s the oldest and most fought-over form of leverage. Labor leverage will impress your parents, but don’t waste your life chasing it.",
        "Permissionless leverage — coding, writing books, recording podcasts, posting YouTube videos, creating newsletters — is the great equalizer. The new generation’s fortunes will be created this way.",
        "If you can’t code, write books and blogs, record videos and podcasts.",
      ],
      interaction: {
        type: "multiple_choice",
        prompt: "Which forms of leverage are permissionless?",
        options: [
          "Capital raised from investors and large teams",
          "Code and media that replicate at near-zero cost",
          "Government contracts and exclusive licenses",
          "Status within a corporate hierarchy",
        ],
        correctOptionIndex: 1,
        hint: "What can you ship tonight without asking for permission?",
        successMessage:
          "Code and media scale without permission. That is the modern path.",
      },
    },
    {
      id: "stage-4-accountability",
      order: 4,
      title: "Accountability & Equity",
      subtitle: "Take business risks under your own name",
      keyIdea:
        "Embrace accountability and take business risks under your own name. Society will reward you with responsibility, equity, and leverage.",
      passages: [
        "Embrace accountability and take business risks under your own name. Society will reward you with responsibility, equity, and leverage.",
        "The people who have the ability to fail in public and keep going are the ones who end up succeeding. Clear accountability is how you get equity.",
        "Equity is a powerful force because it aligns incentives. Own pieces of businesses. Own your work. Own outcomes.",
        "If you have specific knowledge, accountability, and leverage, you get paid for your judgment — and judgment compounds.",
      ],
      interaction: {
        type: "multiple_choice",
        prompt: "Why does accountability unlock equity?",
        options: [
          "It makes you look busy to managers",
          "Society grants responsibility and ownership to those who risk their name",
          "It guarantees a higher salary in every job",
          "It removes the need for specific knowledge",
        ],
        correctOptionIndex: 1,
        hint: "Think about putting your name on the outcome.",
        successMessage:
          "Skin in the game earns equity. Hide, and you rent forever.",
      },
    },
    {
      id: "stage-5-long-term",
      order: 5,
      title: "Long-Term Games with Long-Term People",
      subtitle: "Compound relationships",
      keyIdea:
        "All returns in life — wealth, relationships, knowledge — come from compound interest. Play iterated games.",
      passages: [
        "All the returns in life, whether in wealth, relationships, or knowledge, come from compound interest.",
        "Play iterated games. All the returns in life, business, and relationships come from compound interest.",
        "Pick partners with high intelligence, energy, and above all, integrity. Don’t partner with cynics and pessimists. Their beliefs are self-fulfilling.",
        "If you can’t see yourself working with someone for life, don’t work with them for a day.",
      ],
      interaction: {
        type: "short_answer",
        prompt:
          "What compound asset are you building this year — a skill, a product, or a relationship? Name it in a few words.",
        acceptedKeywords: [],
        hint: "Compounding needs a long horizon. Name the thing you’ll still care about in five years.",
        successMessage:
          "Long-term people turn small bets into empires. Keep compounding.",
      },
    },
    {
      id: "stage-6-judgment",
      order: 6,
      title: "Judgment",
      subtitle: "Wisdom applied to external reality",
      keyIdea:
        "You get paid for your judgment — especially once you have leverage. Clear thinking is the scarce skill.",
      passages: [
        "Demonetize yourself. Demonopolize yourself. If you want to be successful, figure out how to work for free and how to give away free things.",
        "The more you know, the less you diversify. Judgment comes from experience, and experience comes from bad judgment — unless you learn from others.",
        "If you have leverage, what you do with your time matters enormously. A clear mind makes better decisions. Decision quality compounds under leverage.",
        "Learn to sell. Learn to build. If you can do both, you will be unstoppable. Reading is faster than listening. Doing is faster than watching.",
      ],
      interaction: {
        type: "multiple_choice",
        prompt:
          "When you have leverage, what becomes the highest-leverage skill?",
        options: [
          "Working more hours than competitors",
          "Judgment — clear decisions that multiply through leverage",
          "Avoiding all public accountability",
          "Collecting credentials instead of shipping",
        ],
        correctOptionIndex: 1,
        hint: "Leverage multiplies whatever you decide — good or bad.",
        successMessage:
          "Judgment under leverage is the meta-skill. Decide carefully.",
      },
    },
    {
      id: "stage-7-happiness",
      order: 7,
      title: "Happiness as a Skill",
      subtitle: "Desire is a contract for unhappiness",
      keyIdea:
        "Happiness is a choice and a skill — the absence of desire for things to be different than they are in the present moment.",
      passages: [
        "Happiness is a choice and a skill. Happiness is being satisfied with what you have. Success comes from dissatisfaction. Choose.",
        "Desire is a contract that you make with yourself to be unhappy until you get what you want.",
        "A calm mind, a fit body, and a house full of love. These things cannot be bought — they must be earned.",
        "The three big ones in life are wealth, health, and happiness. We pursue them in that order, but their importance is reverse.",
      ],
      interaction: {
        type: "multiple_choice",
        prompt: "In Naval’s framing, what is desire?",
        options: [
          "The only reliable path to lasting happiness",
          "A contract to be unhappy until you get what you want",
          "Proof that you are ambitious enough",
          "Something that disappears once you are wealthy",
        ],
        correctOptionIndex: 1,
        hint: "Happiness is present-tense. Desire postpones it.",
        successMessage:
          "Happiness is trained, not found. Desire can wait outside the door.",
      },
    },
    {
      id: "stage-8-philosophy",
      order: 8,
      title: "Philosophy & Presence",
      subtitle: "The present is all there is",
      keyIdea:
        "Peace is happiness at rest. Presence is peace in motion. Escape competition through authenticity.",
      passages: [
        "The present is all we have. The past is memory. The future is imagination. Memory and imagination are useful — but life is only lived now.",
        "Meditation is intermittent fasting for the mind. Too much sensory input without reflection will overstimulate you.",
        "Escape competition through authenticity. When you’re competing with people, it’s because you’re copying them. It’s a zero-sum competition.",
        "The more you know yourself, the less you’ll look to others for answers. Wisdom is knowing the long-term consequences of your actions.",
        "You are a combination of your genes, environment, and choices. Choose wisely — then choose again, every day.",
      ],
      interaction: {
        type: "short_answer",
        prompt:
          "What will you practice being present for today? Write one concrete moment or activity.",
        acceptedKeywords: [],
        hint: "Something small and real — a walk, a meal, a conversation without a phone.",
        successMessage:
          "Campaign complete. Wealth was never the end — presence was. Carry the map forward.",
      },
    },
  ],
};
