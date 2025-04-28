export const navLinks = [
  { href: "/", label: "Home" },
  { href: "/about", label: "Our Roots" },
  { href: "/order", label: "Meal Plans" },
  { href: "/b2b", label: "B2B" },
  { href: "/blogs", label: "Blogs" },
  { href: "/contact", label: "Contact Us" },
];

export const features = [
  { img: "/images/feature1.png", label: "1000+ Rich Indian Flavours " },
  { img: "/images/feature2.png", label: "Chef Curated Menu’s" },
  { img: "/images/feature3.png", label: "Daily Time Delivery" },
  { img: "/images/feature4.png", label: "Weekly/Monthly Meal Plan" },
  { img: "/images/feature6.png", label: "Wholesome Cuisine" },
  { img: "/images/feature5.png", label: "Guilt Free Experience" },
  { img: "/images/feature7.png", label: "Hygienic Preparation" },
  { img: "/images/feature8.png", label: "Pause Anytime" },
  { img: "/images/feature9.png", label: "Zero Hassle" },
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
