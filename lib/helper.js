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
  { img: "/images/feature2.png", label: "Chef Curated Menus" },
  { img: "/images/feature3.png", label: "Daily On-Time Delivery" },
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


export const apiFetch = async (url, options = {}) => {
  // pull token once (or inject from caller)
  const stored = JSON.parse(localStorage.getItem('authenticatedUser') || '{}');
  const token = stored.token;

  // merge default + caller-supplied headers
  const headers = {
    'Content-Type': 'application/json',
    ...(token ? { Authorization: `Bearer ${token}` } : {}),
    ...(options.headers || {}),
  };

  const res = await fetch(url, { ...options, headers });

  /* --- automatic logout on 401 --- */
  if (res.status === 401) {
    logout();               // ← your central logout routine
    // Optionally: throw a special error so callers know why
    throw new Error('Session expired. Logged out.');
  }

  return res;               // let the caller .json() or handle other statuses
};

/* simple global logout helper */
export function logout() {
  localStorage.removeItem('authenticatedUser');
  // do any context / redux state cleanup here
  window.location.href = '/login';   // redirect to login page
}
