export const navLinks = [
  { href: "/", label: "Home" },
  { href: "/about", label: "Why Rooted?" },
  { href: "/order", label: "Meal Plans" },
  { href: "/blogs", label: "Blogs" },
  { href: "/contact", label: "Contact Us" },
];

export const features = [
  { img: "/images/preservs.png", label: "No Added Preservatives" },
  { img: "/images/balance.png", label: "Balanced & Nutritious" },
  { img: "/images/subscriptions.png", label: "Flexible Subscriptions" },
  { img: "/images/authentic.png", label: "Authentic Flavors" },
  { img: "/images/fresh.png", label: "Fresh, Not Frozen" },
  { img: "/images/packaging.png", label: "Eco Friendly Packaging" },
];

export const steps = [
  {
    img: "/images/step_1.png",
    title: "Choose Your Plan",
    desc: "Pick between Executive or Presidential. Customize to match your taste and schedule.",
  },
  {
    img: "/images/step_2.png",
    title: "Set Your Schedule",
    desc: "Choose how many meals you want and when. Pause, modify, or cancel anytime.",
  },
  {
    img: "/images/step_3.png",
    title: "Freshly Cooked & Delivered",
    desc: "Meals are cooked fresh daily with premium, preservative-free ingredients and delivered to your door.",
  },
  {
    img: "/images/step_4.png",
    title: "Enjoy Effortless Meals",
    desc: "Unpack and savor balanced, restaurant-quality meals — no stress, just good food.",
  },
];


export const formatDate = (dateStr) =>
  new Date(dateStr).toLocaleDateString("en-IN", {
    day: "numeric",
    month: "short",
    year: "numeric",
  });
