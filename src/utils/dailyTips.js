// dailyTips.js

const dailyTips = [
    "Pay yourself first. Save a part of your income before you start spending.",
    "Track your expenses for a week to understand where your money goes.",
    "Set clear financial goals to stay motivated and focused.",
    "Avoid impulse purchases by waiting 24 hours before buying something non-essential.",
    "Build an emergency fund with at least 3-6 months of living expenses.",
    "Use the 50/30/20 rule: 50% for needs, 30% for wants, and 20% for savings.",
    "Review your subscriptions and cancel the ones you don't use.",
    "Automate your savings to make saving money easier and more consistent.",
    "Invest in yourself. Education and skills can help you earn more in the future.",
    "Create a budget and stick to it. It's the foundation of good financial health."
  ];
  
  export const getDailyTip = () => {
    const randomIndex = Math.floor(Math.random() * dailyTips.length);
    return dailyTips[randomIndex];
  };
  