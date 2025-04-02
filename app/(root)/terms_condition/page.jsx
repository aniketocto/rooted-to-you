import Image from "next/image";
import React from "react";

const page = () => {
  return (
    <section className="w-full h-fit flex justify-center items-center my-20 mt-36">
      <Image
        src="/images/nav-bg.jpg"
        alt="bg"
        width={1440}
        height={270}
        quality={100}
        className="absolute top-0 z-[-1]"
      />
      <div className="max-w-[1240px] w-full h-full flex flex-col items-baseline justify-center md:mx-10 mx-5">
        <h2 className="secondary-font text-[#e6af55] text-center w-full mb-10">
          Terms & Conditions
        </h2>
        <p className="font-base primary-font text-left">
          This document is published in accordance with the provisions of Rule 3
          (1) and Rule 3(2) of the Information Technology (Intermediary
          Guidelines and Digital Media Ethics Code) Rules, 2021 that requires
          publishing the rules and regulations, privacy policy, terms of use for
          access or usage of our website/app and details of grievance redressal
          mechanism on www.rootedtoyou.com ("Website") and for the mobile
          application Rooted Fresh Food Delivery ("App").
        </p>
        <br />
        <p className="font-base primary-font text-left">
          For the purpose of these terms of service ("Terms of Service"),
          wherever the context so requires "You" or "User" shall mean any
          natural or legal person who visits our platform, either just for the
          purpose of browsing the Website/App or engages to buy our products and
          services ("Service"). The term "We", "Us", "Our" shall mean Ingenium
          Food Ventures Private Limited ("Rooted"). Reference to a singular term
          shall also include reference to its plural and viceversa.
        </p>
        <br />
        <p className="font-base primary-font text-left">
          All Users of this Website/App, including without limitation browser
          users, vendors, consumers, merchants, and/or content creators, are
          subject to the Terms of Service stated below.
        </p>
        <br />
        <p className="font-base primary-font text-left">
          Before using Our Website/App or accessing it, please carefully read
          these Terms of Service. You accept these Terms of Service by using or
          accessing any portion of the Website/App. The Website/App and its
          services are not available to You if You do not accept the Terms of
          Service. If these Terms of Service are considered an offer, acceptance
          is expressly limited to these Terms of Service. The Terms of Service
          will also apply to any new features or tools that are introduced to
          the existing store.
        </p>
        <br />
        <p className="font-base primary-font text-left">
          On this website/app, You can always check the most recent version of
          the Terms of Service. By releasing updates and/or modifications to Our
          Website/App, We reserve the right to update, modify, or replace any
          element of these Terms of Service. It is your obligation to
          periodically review this page for updates. After such modifications
          are posted, You agree to those changes by continuing to use or access
          the Website/App.
        </p>
        <br />
        <br />
        {/* section 1 */}
        <h4 className="text-2xl md:text-3xl font-bold secondary-font text-[#e6af55] mb-10">
          SECTION 1. GENERAL TERMS
        </h4>
        <ul className="numberPointList">
          <li
            num="1.1"
            className="font-base primary-font text-left pl-10 relative mb-5"
          >
            You affirm that You are at least eighteen (18) years old and that
            You have given Us permission to let any of your minor dependents to
            use this website by accepting these Terms of Service. You may not
            breach any laws in your jurisdiction (including but not limited to
            copyright laws) or use Our Service for any illicit or unauthorized
            purpose. It is forbidden for You to send any viruses, worms, or
            damaging codes. The Service will be immediately terminated in the
            event that any of the Terms of Service are broken.
          </li>
          <li
            num="1.2"
            className="font-base primary-font text-left pl-10 relative"
          >
            We maintain the right, at any time and for any cause, to deny
            Service to anybody. You acknowledge that your content—which does not
            include credit card information—may be sent over different networks
            in an unencrypted manner and that there may be modifications
            necessary to ensure that it complies with the technical
            specifications of any connected networks or devices. Every time
            credit card information is transferred across a network, it is
            encrypted. Without Our prior written consent, You undertake not to
            replicate, copy, sell, resell, or exploit any part of the Service,
            use of the Service, access to the Service, or any contact on the
            Website/App through which the Service is offered. The headings used
            in the Terms of Service are included for convenience only
          </li>
        </ul>
        <br />
        <br />
        {/* Section 2 */}
        <h4 className="text-2xl md:text-3xl font-bold secondary-font text-[#e6af55] mb-10">
          SECTION 2. PRICES AND SERVICE MODIFICATIONS
        </h4>
        <ul className="numberPointList">
          <li
            num="2.1"
            className="font-base primary-font text-left pl-10 relative mb-5"
          >
            Our Service's prices are subject to change at any time. We maintain
            the right, at any time and without prior notice, to alter or
            terminate the Service (or any portion or content thereof). We shall
            not be responsible to You or any other party regarding any
            alteration, pricing adjustment, suspension, or termination of the
            Service.
          </li>
        </ul>
        <br />
        <br />
        {/* Section 3 */}
        <h4 className="text-2xl md:text-3xl font-bold secondary-font text-[#e6af55] mb-10">
          SECTION 3. PRODUCTS OR SERVICES
        </h4>
        <ul className="numberPointList">
          <li
            num="3.1"
            className="font-base primary-font text-left pl-10 relative mb-5"
          >
            The Website/App will be the only place where Users can access all
            Services. These Services might only be available in certain
            quantities, and refunds will only be granted in accordance with Our
            refund policy in Section SECTION 15. We may restrict the sales of
            Our Services to any individual, group of people, area, or legal
            authority. We maintain the right to impose restrictions on the
            number of Services we provide. All Service descriptions and prices
            are subject to change at any moment, without prior notice, and at
            Our exclusive discretion. Anytime, we have the right to stop
            providing any Service. We don't guarantee that the information or
            Services you receive will live up to your expectations.
          </li>
        </ul>
        <br />
        <br />
        {/* section 4 */}
        <h4 className="text-2xl md:text-3xl font-bold secondary-font text-[#e6af55] mb-10">
          SECTION 4. BILLING AND ACCOUNT INFORMATION ACCURACY
        </h4>
        <ul className="numberPointList">
          <li
            num="4.1"
            className="font-base primary-font text-left pl-10 relative mb-5"
          >
            We maintain the right to reject any order that You submit to Us. We
            reserve the right to restrict or cancel the number of items that can
            be bought by a single individual, household, or order. Orders made
            using the same credit card, the same User account, or the same
            billing and/or delivery address may all be subject to these
            limitations. If We modify or cancel an order, We could try to get in
            touch with You by calling the phone number or email address You gave
            Us when You placed the order. When making any purchases using Our
            Website / App, You promise to provide correct, full, and upto-date
            purchase and account information.
          </li>
        </ul>
        <br />
        <br />
        {/* Section 5 */}
        <h4 className="text-2xl md:text-3xl font-bold secondary-font text-[#e6af55] mb-10">
          SECTION 5. OPTIONAL TOOLS
        </h4>
        <ul className="numberPointList">
          <li
            num="5.1"
            className="font-base primary-font text-left pl-10 relative mb-5"
          >
            We shall provide You with access to third-party tools which are
            payment gateways. Such services shall be provided by Razorpay
            Software Private Limited ("Razorpay") whereby the token details of
            the card shall be saved on the Razorpay platform, which We neither
            monitor nor We have any control nor input. You acknowledge and agree
            that We provide access to such tools "as is" and "as available"
            without any warranties, representations or conditions of any kind
            and without any endorsement.
          </li>
          <li
            num="5.2"
            className="font-base primary-font text-left pl-10 relative mb-5"
          >
            We do not accept any liability for your use of optional third-party
            tools. Your use of optional tools provided through the Website/App
            is at your own risk and discretion, and You should ensure that You
            are familiar with and approve of the terms under which the tools are
            provided by the relevant third-party provider(s). In the future, We
            may introduce new services and/or features through the Website/App,
            including the release of new tools and resources. These new features
            and/or services will also be governed by these Terms of Service.
          </li>
        </ul>
        <br />
        <br />
        {/* Section 6 */}
        <h4 className="text-2xl md:text-3xl font-bold secondary-font text-[#e6af55] mb-10">
          SECTION 6. THIRD-PARTY LINKS
        </h4>
        <ul className="numberPointList">
          <li
            num="6.1"
            className="font-base primary-font text-left pl-10 relative mb-5"
          >
            Materials from third parties may be included in some of the
            products, Services, and content that are made available via our
            Service. This Website/App may contain links to other websites or
            applications that are not associated with Us. We do not guarantee or
            assume any duty or obligation for any third-party materials,
            websites, or applications, or for any other third-party materials,
            products, or services. We are also not in charge of inspecting or
            assessing the content or correctness. When You buy or utilize
            products, services, resources, material, or engage in any other
            transactions through any thirdparty website or app, You assume all
            risk and liability.
          </li>
          <li
            num="6.2"
            className="font-base primary-font text-left pl-10 relative mb-5"
          >
            Before engaging in any transaction, it's important to thoroughly
            review the policies and practices of the third-party and ensure that
            you understand them. Any complaints, claims, concerns, or questions
            about third-party products should be addressed directly to the
            relevant third-party.
          </li>
        </ul>
        <br />
        <br />
        {/* Section 7 */}
        <h4 className="text-2xl md:text-3xl font-bold secondary-font text-[#e6af55] mb-10">
          SECTION 7. PERSONAL INFORMATION
        </h4>
        <ul className="numberPointList">
          <li
            num="7.1"
            className="font-base primary-font text-left pl-10 relative mb-5"
          >
            Our Privacy Policy governs the submission of personal information by
            You through the Website/App.
          </li>
        </ul>
        <br />
        <br />
        {/* Section 8 */}
        <h4 className="text-2xl md:text-3xl font-bold secondary-font text-[#e6af55] mb-10">
          SECTION 8. OMISSIONS, INACCURACIES, AND ERRORS{" "}
        </h4>
        <ul className="numberPointList">
          <li
            num="7.1"
            className="font-base primary-font text-left pl-10 relative mb-5"
          >
            At times, there might be errors, inaccuracies, or omissions in the
            information found on Our Website/App or in the Service. These may
            pertain to product descriptions, pricing, promotions, offers,
            product delivery charges, transit times, and availability. We retain
            the right to rectify any errors, inaccuracies, or omissions and to
            modify or update information, or cancel orders if any information in
            the Service or on any related website/app is found to be inaccurate
            at any time without prior notice (even after You have placed your
            order). We are not bound to update, amend, or clarify information in
            the Service or on any related website/app, such as pricing
            information, except as required by law. The absence of a specified
            update or refresh date in the Service or on any related website/app
            should not be interpreted to mean that all information in the
            Service or on any related website/app has been altered or updated.
          </li>
        </ul>
        <br />
        <br />
        {/* Section 9 */}
        <h4 className="text-2xl md:text-3xl font-bold secondary-font text-[#e6af55] mb-10">
          SECTION 9. PROPRIETARY RIGHTS
        </h4>
        <ul className="numberPointList">
          <li
            num="9.1"
            className="font-base primary-font text-left pl-10 relative mb-5"
          >
            Our name and logo used on the Website/App, (collectively,
            "Material") are protected by copyrights, trademarks and/or other
            intellectual property rights owned and controlled by Rooted or are
            in the process of being registered with the relevant Governmental
            authorities. You understand and agree that all content on the
            Website/App is provided for limited, non-commercial, personal use
            only. Unless specifically stated on the Website/App, no content may
            be copied, reproduced, republished, sold, downloaded, posted,
            transmitted, or distributed in any manner, or used for any purpose,
            by any individual or entity, without the express written permission
            of Rooted. Modifying the content in any way, such as adding,
            deleting, or distorting it, is not permitted. Any unauthorized
            attempt to alter the content, bypass security features, or use the
            Website/App or any part of the content for purposes other than its
            intended use is strictly prohibited.
          </li>
          <li
            num="9.2"
            className="font-base primary-font text-left pl-10 relative mb-5"
          >
            Except in cases where Rooted expressly grants permission, the
            Website/App may not be utilized in conjunction with any commercial
            purposes.
          </li>
        </ul>
        <br />
        <br />
        {/* Section 10 */}
        <h4 className="text-2xl md:text-3xl font-bold secondary-font text-[#e6af55] mb-10">
          SECTION 10. PROHIBITED USE
        </h4>
        <ul className="numberPointList">
          <li
            num="10.1"
            className="font-base primary-font text-left pl-10 relative mb-5"
          >
            You are not permitted to use the Website/App or any of its content,
            in addition to the other limitations stated in the Terms of Service:
            (a) for any illicit purpose; (b) to encourage others to carry out or
            take part in illicit activities; (c) to breach any international,
            federal, provincial, or state regulations, rules, laws, or local
            ordinances; (d) to infringe upon or violate Our intellectual
            property rights or the intellectual property rights of others; (e)
            to engage in any form of harassment, abuse, insulting, harm,
            defamation, slander, disparage, intimidation, or discrimination on
            the basis of gender, sexual orientation, religion, ethnicity, race,
            age, national origin, or disability; (f) to submit false or
            misleading information; (g) to upload or transmit malware, viruses,
            or any other kind of malicious code that could be used to interfere
            with the Service's functionality or operation, that of any
            associated website or app, that of other websites or apps, or that
            of the Internet; (h) to gather or track the personal information of
            others; (i) to spam, phish, pharm, pretext, spider, crawl, or
            scrape; (j) for any obscene or immoral purpose; or (k) to interfere
            with or circumvent the security features of the Service, any related
            website/app, other website/apps, or the internet. (g) to upload or
            transmit viruses or any other type of malicious code that will or
            may be used in any way that will affect the functionality or
            operation of the Service or of any related website/app, other
            website/apps, or the internet. If You violate any of the prohibited
            uses, We have the right to cancel your usage of the Service and any
            associated website or app.
          </li>
        </ul>
        <br />
        <br />
        {/* Section 11 */}
        <h4 className="text-2xl md:text-3xl font-bold secondary-font text-[#e6af55] mb-10">
          SECTION 11. DISCLAIMER OF WARRANTIES; LIMITATION OF LIABILITY
        </h4>
        <ul className="numberPointList">
          <li
            num="11.1"
            className="font-base primary-font text-left pl-10 relative mb-5"
          >
            Your use of Our Service is not guaranteed to be speedy, secure,
            error-free, or uninterrupted by us. You acknowledge that We may
            occasionally remove the Services for an unlimited amount of time or
            cancel the Service at any time, without providing You with prior
            notice. You specifically acknowledge that the whole risk associated
            with using—or not using—the Service rests with You. Under no
            circumstances will We, Our directors, officers, employees,
            affiliates, agents, contractors, interns, suppliers, service
            providers, or licensors be held responsible for any harm, loss,
            claim, or direct, indirect, incidental, punitive, special, or
            consequential damages of any kind, including, but not limited to,
            lost profits, lost revenue, lost savings, loss of data, replacement
            costs, or any similar damages, whether based in contract, tort
            (including negligence), strict liability, or otherwise. This also
            applies to any other claims connected in any way to your use of the
            Service, including, but not limited to, any errors or omissions in
            any content, or any loss or damage of any kind incurred as a result
            of using the Service or from any content uploaded, sent, or
            otherwise made available via the Service.
          </li>
        </ul>
        <br />
        <br />
        {/* Section 12 */}
        <h4 className="text-2xl md:text-3xl font-bold secondary-font text-[#e6af55] mb-10">
          SECTION 12. INDEMNIFICATION
        </h4>
        <ul className="numberPointList">
          <li
            num="12.1"
            className="font-base primary-font text-left pl-10 relative mb-5"
          >
            You agree to release and fully indemnify Us and / or any of Our
            officers and representatives from any cost, damage, liability or
            other consequence of any of your actions related to the use of the
            Website / App and specifically waive any claims that You may have in
            this regard under any applicable laws of India. Despite Our
            reasonable efforts in this regard, We cannot take responsibility or
            control of the information provided by other Users (such as user
            reviews) which is made available on the Website/App. You may
            encounter other user's information that is offensive, harmful,
            inconsistent, inaccurate, or deceptive. It's important to use
            caution and practice safe trading when using the Website / App.
          </li>
        </ul>
        <br />
        <br />
        <h4 className="text-2xl md:text-3xl font-bold secondary-font text-[#e6af55] mb-10">
          SECTION 13. SEVERABILITY
        </h4>
        <ul className="numberPointList">
          <li
            num="13.1"
            className="font-base primary-font text-left pl-10 relative mb-5"
          >
            If any provision of these Terms of Service is found to be unlawful,
            void, or unenforceable, it will still be enforced to the maximum
            extent allowed by law. The unenforceable part will be considered
            separately from these Terms of Service, and this decision will not
            impact the validity and enforceability of the remaining provisions.
          </li>
        </ul>
        <br />
        <br />
        <h4 className="text-2xl md:text-3xl font-bold secondary-font text-[#e6af55] mb-10">
          SECTION 14. GOVERNING LAW
        </h4>
        <ul className="numberPointList">
          <li
            num="14.1"
            className="font-base primary-font text-left pl-10 relative mb-5"
          >
            These Terms of Service and any separate agreements whereby We
            provide You Services shall be governed by and construed in
            accordance with the laws of India and shall be subject to the
            jurisdiction of the courts in Mumbai.
          </li>
        </ul>
        <br />
        <br />
        <h4 className="text-2xl md:text-3xl font-bold secondary-font text-[#e6af55] mb-10">
          SECTION 15. CANCELLATION AND REFUND POLICY
        </h4>
        <ul className="numberPointList">
          <li
            num="15.1"
            className="font-base primary-font text-left pl-10 relative mb-5"
          >
            <p className="font-base primary-font text-left mb-2">
              Cancellation of Subscription Service. The immediate cancellation
              of any subscribed Service should be done within 1 (One) hour of
              subscribing for the Service. Any cancellation made after such
              period of 1 (One) hour shall not be entertained and We shall be
              entitled to retain the entire amount of the subscription Service.
            </p>
            <p className="font-base primary-font text-left mb-2">
              To intimate Us about the cancellation of the subscription Service
              for any other reason post the time period provided in this Section
              above, You will be required to email Us at info@rootedtoyou.com.
              Upon cancellation, the remainder, post deductions, if any, will be
              refunded to You, on a case to case basis after due investigation,
              to the same account from which the payment was made in accordance
              with the formula provided hereunder:
            </p>
            <p className="font-base primary-font text-left mb-2">
              Total Subscription Amount (before GST) (÷) 26 subscriptions days)
              (–) the number of used service days (=) Refund Amount.
            </p>
            <p className="font-base primary-font text-left mb-2">
              Any of the cancellation request will be processed, at Our sole
              discretion, in ten (10) business days. If You choose to get the
              amount credited to your Rooted wallet, the same amount can be used
              by You to resubscribe to the Service within a period of one (1)
              year from the date of refund.
            </p>
          </li>
          <li
            num="15.2"
            className="font-base primary-font text-left pl-10 relative mb-5"
          >
            Temporary pausing of Subscription Service. Any temporary pausing of
            subscription should be done a day prior to the next subscription day
            before 4 pm. Any temporary pausing of subscription done after the
            prescribed time period will not be taken into consideration and
            Service will be delivered on the following day. The paused days will
            result in money being held in the Rooted wallet as per the above
            mentioned calculation formula, by the end of the subscription. In
            case of such temporary pause of the subscription, there shall be no
            refund of the subscription amount in the bank account through which
            the payment was made.
          </li>
          <li
            num="15.3"
            className="font-base primary-font text-left pl-10 relative mb-5"
          >
            Cancellation of Order. In the event, the cancellation of your order
            happens due to reasons not attributable to Rooted, i.e., You provide
            incorrect contact details, or do not respond to the delivery
            partner’s call, such actions would tantamount to unconditional or
            irrevocable breach of authorisation and Rooted shall not be liable
            to refund the amount for that particular order.
          </li>
          <li
            num="15.4"
            className="font-base primary-font text-left pl-10 relative mb-5"
          >
            Deficiency in Service. We are sure You would love our food. In case
            You were not happy with your Rooted meal, let Us know at
            info@rootedtoyou.com. You have to intimate Us about any deficiency
            within 12 (twelve) hours of the delivery of your order and You shall
            be required to provide proof of any such deficiency. Rooted reserves
            the right to carry out investigation of such deficiency before
            processing the refund amount. In the event, You fail to intimate us
            within 12 (twelve) hours, there shall not be any refund to You.
            Further, in the event, it has been determined by Rooted that there
            has been such deficiency, Rooted shall either extend the period of
            your subscription by the number of days of deficient service or
            refund the amount in relation to that order in your Rooted wallet
          </li>
        </ul>
        <br />
        <br />
        <h4 className="text-2xl md:text-3xl font-bold secondary-font text-[#e6af55] mb-10">
          SECTION 16. GENERAL
        </h4>
        <ul className="numberPointList">
          <li
            num="16.1"
            className="font-base primary-font text-left pl-10 relative mb-5"
          >
            The Terms of Service may be updated at any time without notice, and
            it is your responsibility to check for any changes. Your continued
            use of the Website/App after any changes to the Terms of Service
            indicates your agreement to the updated terms.
          </li>
          <li
            num="16.2"
            className="font-base primary-font text-left pl-10 relative mb-5"
          >
            If You have any concerns regarding the use of the Website/App,
            please reach out to the grievance officer using the provided details
            within 24 hours. Any complaints will be addressed within 48 hours of
            receipt
            <p>
              Contact Details: <br /> Email: info@rootedtoyou.com <br /> Contact
              Centre- +91-22-606-000-12/ 1800-268-0268
            </p>
          </li>
        </ul>
        <br />
        <br />
        <h4 className="text-2xl md:text-3xl font-bold secondary-font text-[#e6af55] mb-10">
          SECTION 17. ACCOUNT DELETION
        </h4>
        <ul className="numberPointList">
          <li
            num="17.1"
            className="font-base primary-font text-left pl-10 relative mb-5"
          >
            If a User wishes to delete their account, they can send an email to
            info@rootedtoyou.com.
          </li>
          <li
            num="17.2"
            className="font-base primary-font text-left pl-10 relative mb-5"
          >
            The User's profile, including name, email, date of birth, address,
            order history, and payment details, will be removed from Our
            database.
          </li>
          <li
            num="17.3"
            className="font-base primary-font text-left pl-10 relative mb-5"
          >
            Regarding account deletion, Rooted's decision will be conclusive and
            binding. By participating in the offer, Users agree to be bound by
            the Terms of Service stated here.
          </li>
        </ul>
        <br />
        <br />
      </div>
    </section>
  );
};

export default page;
