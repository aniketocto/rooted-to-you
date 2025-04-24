import Breadcrumbs from "@/components/Breadcrumbs";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";

const page = () => {
  return (
    <section className="w-full h-fit flex justify-center items-center my-20 mt-36">
        <img
        src="/images/nav-bg.jpg"
        className="absolute w-full h-[300px] object-cover z-[-1] top-0"
        alt=""
      />
      <div className="max-w-[1350px] w-full h-full flex flex-col items-baseline justify-center md:mx-10 mx-5">
        <Breadcrumbs />
        <h2 className="secondary-font text-[#e6af55] text-center w-full mb-10">
          FAQs
        </h2>
        <Accordion type="single" collapsible className="w-full">
          <AccordionItem
            value="item-1"
            className="border border-[#e6af55] rounded-lg mb-4 p-2"
          >
            <AccordionTrigger className="secondary-font faqFont">
              Food Safety, Hygiene & Quality
            </AccordionTrigger>
            <AccordionContent className="transition-all duration-500">
              <p className="mb-4 font-semibold primary-font font-base pl-5">
                Kitchen Hygiene & Sanitization
              </p>
              <ul className="list-disc primary-font list-inside mb-4 pl-10">
                <li>Is the food hygienic?</li>
                <li>Are the utensils sanitized?</li>
                <li>Are ingredients washed and sanitized properly?</li>
                <li>
                  Do you follow any standard operating procedures for hygiene?
                </li>
                <li>Do your chefs wear gloves and masks?</li>
                <li>Do you check your chefs’ health regularly?</li>
              </ul>
              <p className="mb-6 primary-font pl-5">
                At Rooted, food safety is not a checkbox – it's a value. Our
                culinary processes are designed around cleanliness, consistency,
                and care. From the moment ingredients enter our kitchen to the
                final moment of dispatch, every step follows strict hygiene
                protocols. Our chefs work in sanitized environments and use
                protective gear wherever necessary. Our kitchens operate with
                FSSAI certification and follow rigorous SOPs, ensuring that what
                reaches you is wholesome, safe, and prepared in a thoughtfully
                clean environment.
              </p>
              <p className="mb-4 font-semibold primary-font font-base pl-5">
                Ingredients & Cooking Practices
              </p>
              <ul className="list-disc primary-font list-inside mb-4 pl-10">
                <li>What oil do you use for cooking? </li>
                <li>Do you use preservatives?</li>
                <li>Are the meals freshly made each day?</li>
                <li>Are your meals vegetarian/non-vegetarian?</li>
                <li>Do you use seasonal ingredients?</li>
              </ul>
              <p className="mb-6 primary-font pl-5">
                Our menus are crafted to showcase authenticity and celebrate
                regional wisdom. This begins with choosing the right oils and
                seasonal produce. We use cooking mediums that align with each
                dish’s cultural identity – be it mustard oil in Bengali cuisine
                or coconut oil in South Indian meals – so that every bite tells
                a story. We do not rely on preservatives, allowing natural
                freshness and flavor to shine through. Where possible, we
                welcome requests for reduced oil or salt, staying true to our
                belief in personal nourishment through tradition.
              </p>
              <p className="mb-4 font-semibold primary-font font-base pl-5">
                Certification & Standards
              </p>
              <ul className="list-disc primary-font list-inside mb-4 pl-10">
                <li>Is your kitchen FSSAI certified?</li>
                <li>How do you handle complaints about food safety?</li>
              </ul>
              <p className="mb-6 primary-font pl-5">
                Our kitchens are certified by FSSAI, reflecting our commitment
                to food safety and quality standards. We maintain detailed logs
                and processes to ensure accountability. In the rare event of a
                concern, we follow a structured and responsive resolution system
                that places your health and satisfaction at the forefront of our
                actions.
              </p>
              <p className="mb-4 font-semibold font-base pl-5">
                Delivery & Packaging Safety
              </p>
              <ul className="list-disc primary-font list-inside mb-4 pl-10">
                <li>
                  How do you ensure the meals remain safe during delivery?
                </li>
                <li>Is the packaging safe and eco-friendly?</li>
                <li>Do you use plastic for packaging?</li>
              </ul>
              <p className="mb-6 primary-font pl-5">
                Delivery at Rooted is an extension of our kitchen. Our meals are
                sealed in sustainable, tamperevident packaging that maintains
                freshness and integrity until it reaches your doorstep. Our
                materials are chosen with environmental care, and we aim to
                minimize plastic use wherever feasible while ensuring the safety
                and reliability of your meal.
              </p>
              <p className="mb-4 font-semibold font-base pl-5">
                Transparency & Trust
              </p>
              <ul className="list-disc primary-font list-inside mb-4 pl-10">
                <li>Can I visit your kitchen?</li>
                <li>How do you handle food allergies or special needs?</li>
              </ul>
              <p className="mb-6 primary-font pl-5">
                We prioritize openness and build trust through transparency.
                While physical kitchen visits aren't a part of our standard
                experience, we are always happy to share information about our
                processes. For dietary preferences and sensitivities, we
                encourage communication so we can align with your needs
                responsibly, ensuring that your comfort and well-being are
                respected at every step
              </p>
            </AccordionContent>
          </AccordionItem>
          <AccordionItem
            value="item-2"
            className="border border-[#e6af55] rounded-lg mb-4 p-2"
          >
            <AccordionTrigger className="secondary-font faqFont">
              Delivery & Service Areas
            </AccordionTrigger>
            <AccordionContent className="transition-all duration-500">
              <p className="mb-4 font-semibold primary-font font-base pl-5">
                Serviceable Locations
              </p>
              <ul className="list-disc primary-font list-inside mb-4 pl-10">
                <li>Which areas do you deliver to?</li>
                <li>Do you deliver to Navi Mumbai or Thane?</li>
                <li>What if my area isn’t listed?</li>
                <li>Can I gift a meal to someone else in another area?</li>
              </ul>
              <p className="mb-6 primary-font pl-5">
                Rooted currently delivers to carefully mapped zones in Mumbai,
                Navi Mumbai, and Thane. We invite customers to check service
                availability via our pin code tool on the website. If you're
                gifting a meal to someone, you can easily place an order in
                their name and serviceable location.
              </p>
              <p className="mb-4 font-semibold primary-font font-base pl-5">
                Delivery Timing & Scheduling
              </p>
              <ul className="list-disc primary-font list-inside mb-4 pl-10">
                <li>What time will the food be delivered?</li>
                <li>Do you deliver on weekends?</li>
                <li>Do you deliver on public holidays?</li>
                <li>Do you deliver during rain or extreme weather?</li>
                <li>Do you have fixed delivery slots?</li>
                <li>Do you deliver in early mornings?</li>
              </ul>
              <p className="mb-6 primary-font pl-5">
                Our delivery slots are crafted around natural meal timings.
                Lunch is delivered between 11 AM and 1 PM, and dinner arrives
                between 6 PM and 8 PM. While we observe Sundays and select
                public holidays to maintain kitchen standards and team wellness,
                our weekday delivery is designed to be reliable and timely, even
                during seasonal weather challenges.
              </p>
              <p className="mb-4 font-semibold primary-font font-base pl-5">
                Flexible Delivery Preferences
              </p>
              <ul className="list-disc primary-font list-inside mb-4 pl-10">
                <li>
                  Can I get meals delivered to my office and home on different
                  days?
                </li>
                <li>
                  How do you handle complaints about food safety?Can I get
                  same-day subscription and delivery?
                </li>
                <li>
                  What happens if I’m not available to receive the delivery?
                </li>
                <li>Can I shift my delivery location mid-plan?</li>
              </ul>
              <p className="mb-6 primary-font pl-5">
                Your convenience is at the heart of our model. Whether you’d
                like your meals delivered to different addresses on different
                days or need to initiate your plan with short notice, our system
                offers flexibility with structured coordination. With a 48-hour
                buffer, we’re happy to accommodate pauses or address shifts, and
                subscription setup is activated within one full business cycle
                from your booking.
              </p>
              <p className="mb-4 font-semibold font-base pl-5">
                Delivery Experience
              </p>
              <ul className="list-disc primary-font list-inside mb-4 pl-10">
                <li>Can I track my delivery?</li>
              </ul>
              <p className="mb-6 primary-font pl-5">
                Constant tracking is an anxiety-ridden hassle. Providing the
                same on an everyday basis proves only counter-productive to our
                mission.
              </p>
            </AccordionContent>
          </AccordionItem>
          <AccordionItem
            value="item-3"
            className="border border-[#e6af55] rounded-lg mb-4 p-2"
          >
            <AccordionTrigger className="secondary-font faqFont">
              Meal Customization & Flexibility
            </AccordionTrigger>
            <AccordionContent className="transition-all duration-500">
              <p className="mb-4 font-semibold primary-font font-base pl-5">
                Personal Preferences
              </p>
              <ul className="list-disc primary-font list-inside mb-4 pl-10">
                <li>Can I choose what meals I want?</li>
                <li>Can I choose spicy/non-spicy preferences?</li>
                <li>Can I request less oil or less salt?</li>
                <li>Can I request a favourite dish again?</li>
              </ul>
              <p className="mb-6 primary-font pl-5">
                Rooted menus are curated to offer variety, balance, and deep
                cultural flavor. While we cannot personalize every meal, we do
                our best to align to broad preferences such as spice level or
                reduced oil. Our evolving menu system takes user feedback
                seriously, so while exact repeat requests may not be guaranteed,
                beloved dishes often make their way back based on popular
                demand.
              </p>
              <p className="mb-4 font-semibold primary-font font-base pl-5">
                Dietary & Religious Preferences
              </p>
              <ul className="list-disc primary-font list-inside mb-4 pl-10">
                <li>Can I get Jain or Satvik food?</li>
                <li>Do you accommodate dietary restrictions?</li>
                <li>Can I request no onions or garlic?</li>
              </ul>
              <p className="mb-6 primary-font pl-5">
                Our meals are designed around inclusive regional diets, and we
                strive to honor food beliefs. For requests related to Satvik,
                Jain, or onion-garlic-free meals, we offer guidance on what
                dishes naturally fit those parameters. We encourage customers to
                communicate preferences so we can support them as best as
                possible within our menu structure.
              </p>
              <p className="mb-4 font-semibold primary-font font-base pl-5">
                Meal Type & Timing
              </p>
              <ul className="list-disc primary-font list-inside mb-4 pl-10">
                <li>Do you offer breakfast or snacks?</li>
                <li>Can I mix lunch and dinner in one plan?</li>
                <li>Can I switch from lunch to dinner mid-plan?</li>
              </ul>
              <p className="mb-6 primary-font pl-5">
                Our focus is on wholesome lunch and dinner meals. These are
                offered as independent plans, allowing you to subscribe to
                either or both as needed. Switching between lunch and dinner is
                made simple through our system, and our streamlined model
                ensures every plan receives the same thought and culinary care.
              </p>
              <p className="mb-4 font-semibold font-base pl-5">
                Meal Planning & Family Orders
              </p>
              <ul className="list-disc primary-font list-inside mb-4 pl-10">
                <li>Can I order meals for multiple people in one plan?</li>
                <li>Are the meals suitable for kids?</li>
              </ul>
              <p className="mb-6 primary-font pl-5">
                Rooted plans are crafted for individual experiences but can
                easily be scaled for households. You can purchase multiple
                subscriptions under a single account. Our meals are designed to
                be balanced and generally family-friendly, making them shareable
                with children depending on individual dietary habits.
              </p>
              <p className="mb-4 font-semibold font-base pl-5">
                Subscription Flexibility
              </p>
              <ul className="list-disc primary-font list-inside mb-4 pl-10">
                <li>Can I pause my subscription?</li>
                <li>Can I skip a day?</li>
                <li>What if I forget to pause and the food gets delivered?</li>
                <li>Can I order for only weekdays?</li>
              </ul>
              <p className="mb-6 primary-font pl-5">
                Your lifestyle drives our system. Whether you need to pause your
                plan, skip a day, or schedule meals for weekdays only, we
                provide intuitive tools to manage it all. A 48-hour notice helps
                us ensure everything is executed smoothly, and any skipped days
                can be held as credits within your subscription.
              </p>
              <p className="mb-4 font-semibold font-base pl-5">
                Menu & Cuisine Info
              </p>
              <ul className="list-disc primary-font list-inside mb-4 pl-10">
                <li>Can I see the menu in advance?</li>
                <li>Do you serve regional cuisines?</li>
                <li>Do you offer calorie-counted meals?</li>
              </ul>
              <p className="mb-6 primary-font pl-5">
                We publish our menus in advance so customers can plan their week
                with ease. Rooted celebrates India’s regional culinary
                heritage—each week offers a different combination across our
                featured cuisines. While calorie counts aren’t currently
                specified, the meals are consciously portioned and prepared with
                balance in mind.
              </p>
              <p className="mb-4 font-semibold font-base pl-5">
                Trial & Testing
              </p>
              <ul className="list-disc primary-font list-inside mb-4 pl-10">
                <li>Can I start with a trial before committing?</li>
              </ul>
              <p className="mb-6 primary-font pl-5">
                We welcome new customers to explore our food through a trial
                plan. This allows for a nopressure experience that lets you
                explore our culinary approach before committing to a longer
                subscription. Many of our happiest subscribers began with a
                simple taste test.
              </p>
            </AccordionContent>
          </AccordionItem>
          <AccordionItem
            value="item-4"
            className="border border-[#e6af55] rounded-lg mb-4 p-2"
          >
            <AccordionTrigger className="secondary-font faqFont">
              Pricing, Offers & Payments
            </AccordionTrigger>
            <AccordionContent className="transition-all duration-500">
              <p className="mb-4 font-semibold primary-font font-base pl-5">
                Plan Pricing & Payment Options
              </p>
              <ul className="list-disc primary-font list-inside mb-4 pl-10">
                <li>What is the price of your meal plans?</li>
                <li>Do I have to pay upfront?</li>
                <li>Can I pay in installments?</li>
                <li>Do you accept UPI or bank transfers?</li>
                <li>Do you provide receipts after payment?</li>
              </ul>
              <p className="mb-6 primary-font pl-5">
                Rooted plans are competitively priced to offer everyday
                nourishment with quality. All plans are prepaid, and payments
                can be made via UPI, net banking, or other major digital
                platforms. Every order includes delivery and taxes, so there are
                no hidden surprises.
              </p>
              <p className="mb-4 font-semibold primary-font font-base pl-5">
                Offers & Discounts
              </p>
              <ul className="list-disc primary-font list-inside mb-4 pl-10">
                <li>Do you have any current offers?</li>
                <li>Is there a trial offer available?</li>
                <li>Do you offer corporate pricing for companies?</li>
                <li>Do you offer student discounts?</li>
                <li>Do you offer festive/seasonal offers?</li>
                <li>Is there a referral discount?</li>
                <li>Is there a loyalty program?</li>
                <li>Can I apply multiple offers at once?</li>
              </ul>
              <p className="mb-6 primary-font pl-5">
                From seasonal specials to referral rewards and occasional
                student or corporate offers, we aim to create value beyond just
                meals. While offers cannot be combined, our system always
                provides the best available deal at checkout. Keep an eye on our
                announcements for the latest promotions.
              </p>
              <p className="mb-4 font-semibold primary-font font-base pl-5">
                Plan Management (Upgrades, Cancellations, etc.)
              </p>
              <ul className="list-disc primary-font list-inside mb-4 pl-10">
                <li>Can I upgrade my plan mid-way?</li>
                <li>Can I downgrade my plan?</li>
                <li>
                  Can I pause my subscription and resume it later without losing
                  days?
                </li>
                <li>Can I cancel mid-plan and get a refund?</li>
                <li>Is there a cancellation fee?</li>
                <li>Do you offer group plans?</li>
                <li>Do I have to re-subscribe every month?</li>
              </ul>
              <p className="mb-6 primary-font pl-5">
                Plans can be upgraded, paused, or modified mid-way with ease. We
                offer a wallet-based system to manage transitions and ensure
                that unused days can be credited or reapplied. Our cancellation
                and refund process is transparent, and we support monthly
                renewals to keep the process streamlined.
              </p>
              <p className="mb-4 font-semibold font-base pl-5">
                Invoicing & Refunds
              </p>
              <ul className="list-disc primary-font list-inside mb-4 pl-10">
                <li>Are there extra charges beyond the plan price?</li>
                <li>Can I get a refund if I don’t like the food?</li>
                <li>Can I get a GST invoice?</li>
              </ul>
              <p className="mb-6 primary-font pl-5">
                Our billing process is automated and generates GST-compliant
                invoices for each transaction. Any extras are reflected clearly,
                and refund requests—where applicable—are handled as per policy
                with dedicated support to ensure fairness and clarity
              </p>
              <p className="mb-4 font-semibold font-base pl-5">
                Payment Convenience
              </p>
              <ul className="list-disc primary-font list-inside mb-4 pl-10">
                <li>Do you have cash on delivery?</li>
              </ul>
              <p className="mb-6 primary-font pl-5">
                We currently accept all digital payment methods. This ensures a
                secure, efficient transaction process that fits today’s
                digital-first lifestyle.
              </p>
            </AccordionContent>
          </AccordionItem>
          <AccordionItem
            value="item-5"
            className="border border-[#e6af55] rounded-lg mb-4 p-2"
          >
            <AccordionTrigger className="secondary-font faqFont">
              Company, Brand & Team Info
            </AccordionTrigger>
            <AccordionContent className="transition-all duration-500">
              <p className="mb-4 font-semibold primary-font font-base pl-5">
                Company Overview
              </p>
              <ul className="list-disc primary-font list-inside mb-4 pl-10">
                <li>What is Rooted?</li>
                <li>Who started Rooted?</li>
                <li>Are you a startup?</li>
                <li>Where are you based?</li>
              </ul>
              <p className="mb-6 primary-font pl-5">
                Rooted is a food experience company dedicated to reviving the
                joy of everyday eating. Our founders bring culinary depth and
                operational insight, and the company is proudly based in Mumbai.
                We’re a modern startup grounded in timeless food wisdom.
              </p>
              <p className="mb-4 font-semibold primary-font font-base pl-5">
                Food Philosophy
              </p>
              <ul className="list-disc primary-font list-inside mb-4 pl-10">
                <li>Is your food homemade?</li>
                <li>What cuisines do you cover?</li>
              </ul>
              <p className="mb-6 primary-font pl-5">
                Rooted meals are inspired by the kitchens of India. They’re not
                commercial reproductions but regionally true dishes made with
                care. From Maharashtra to Bengal, Gujarat to Tamil Nadu, our
                menus rotate to highlight the diversity of Indian cuisine while
                maintaining a sense of home.
              </p>
              <p className="mb-4 font-semibold primary-font font-base pl-5">
                Values & Sustainability
              </p>
              <ul className="list-disc primary-font list-inside mb-4 pl-10">
                <li>How environment friendly are you?</li>
                <li>Do you work with local suppliers?</li>
              </ul>
              <p className="mb-6 primary-font pl-5">
                We believe in food that’s good for you and for the environment.
                Rooted actively sources from local vendors and aims to use
                packaging that is responsible and evolving with sustainability
                in mind. We constantly refine our processes to reduce our
                ecological footprint.
              </p>
              <p className="mb-4 font-semibold font-base pl-5">
                Team & Community
              </p>
              <ul className="list-disc primary-font list-inside mb-4 pl-10">
                <li>
                  How is Rooted different from tiffin or delivery services?
                </li>
                <li>Can I meet the team?</li>
                <li>Are you available outside Mumbai?</li>
              </ul>
              <p className="mb-6 primary-font pl-5">
                What sets Rooted apart is the love and storytelling behind every
                dish. We are not just a tiffin or delivery service—we’re a
                curated food journey. Our team loves engaging with the
                community, and while we currently operate in and around Mumbai,
                we’re exploring meaningful expansion to more cities. We remain
                open to collaborations and feedback that support this mission
              </p>
            </AccordionContent>
          </AccordionItem>
          <AccordionItem
            value="item-6"
            className="border border-[#e6af55] rounded-lg mb-4 p-2"
          >
            <AccordionTrigger className="secondary-font faqFont">
              Special Requests & Miscellaneous
            </AccordionTrigger>
            <AccordionContent className="transition-all duration-500">
              <p className="mb-4 font-semibold primary-font font-base pl-5">
                One-Time or Occasion-Based Requests
              </p>
              <ul className="list-disc primary-font list-inside mb-4 pl-10">
                <li>Can I get a customized gift card for someone?</li>
                <li>Do you offer catering for events?</li>
                <li>
                  Can I add an extra meal for a guest on a particular day?
                </li>
              </ul>
              <p className="mb-6 primary-font pl-5">
                You can share the joy of Rooted by gifting someone a trial or
                plan in their name. While we don’t offer custom gift cards or
                single-meal add-ons at this time, our subscription structure is
                flexible enough to be personalized for such occasions. We also
                offer limited event catering with prior discussion.
              </p>
              <p className="mb-4 font-semibold primary-font font-base pl-5">
                Feedback & Reviews
              </p>
              <ul className="list-disc primary-font list-inside mb-4 pl-10">
                <li>Can I rate or review the meals?</li>
                <li>Can I give feedback on a specific meal?</li>
              </ul>
              <p className="mb-6 primary-font pl-5">
                Rooted thrives on feedback. Whether it’s a thoughtful compliment
                or constructive input, we consider it essential to our
                evolution. You can share your thoughts through our contact
                channels, and we regularly use this input to improve menus and
                service.
              </p>
              <p className="mb-4 font-semibold primary-font font-base pl-5">
                App, Access & Communication
              </p>
              <ul className="list-disc primary-font list-inside mb-4 pl-10">
                <li>Do you have an App?</li>
                <li>Can I speak to someone before subscribing?</li>
                <li>How can I get support quickly?</li>
              </ul>
              <p className="mb-6 primary-font pl-5">
                Our app is under development, but in the meantime, we offer a
                simple, responsive web experience and WhatsApp-based support.
                For any query—pre-subscription or post-delivery— our team is
                quick to respond and always ready to help.
              </p>
              <p className="mb-4 font-semibold font-base pl-5">
                Order Logistics Variants
              </p>
              <ul className="list-disc primary-font list-inside mb-4 pl-10">
                <li>Can I request meals without delivery and pick them up?</li>
                <li>Do you offer delivery via Swiggy/Zomato?</li>
                <li>What if my meal is late?</li>
              </ul>
              <p className="mb-6 primary-font pl-5">
                Currently, Rooted meals are delivered directly by our internal
                logistics system. We do not operate through aggregator
                platforms, ensuring tighter quality control. We are a
                delivery-first brand and do not support pickups at the moment.
                In case of unexpected delays, you’ll receive proactive
                communication from our team
              </p>
              <p className="mb-4 font-semibold font-base pl-5">
                Daily Menu Info
              </p>
              <ul className="list-disc primary-font list-inside mb-4 pl-10">
                <li>How do I know what’s on the menu tomorrow?</li>
              </ul>
              <p className="mb-6 primary-font pl-5">
                Our daily or weekly menu is always available in advance. We
                share menu updates regularly via preferred communication
                channels, ensuring you’re never left guessing about what’s on
                your plate next.
              </p>
            </AccordionContent>
          </AccordionItem>
        </Accordion>
      </div>
    </section>
  );
};

export default page;
