
import MainLayout from "@/components/layout/MainLayout";

const Cookies = () => {
  return (
    <MainLayout>
      <div className="max-w-4xl mx-auto py-12 px-4">
        <h1 className="text-3xl md:text-4xl font-bold mb-6">Cookie Policy</h1>
        
        <div className="prose prose-lg max-w-none">
          <p>
            This Cookie Policy explains how UpTodateKE uses cookies and similar technologies
            to recognize you when you visit our website. It explains what these technologies are
            and why we use them, as well as your rights to control our use of them.
          </p>
          
          <h2 className="text-2xl font-semibold mt-6 mb-4">What are cookies?</h2>
          <p>
            Cookies are small data files that are placed on your computer or mobile device when you visit a website.
            Cookies are widely used by website owners to make their websites work, or to work more efficiently,
            as well as to provide reporting information.
          </p>
          
          <h2 className="text-2xl font-semibold mt-6 mb-4">Why do we use cookies?</h2>
          <p>
            We use first-party and third-party cookies for several reasons. Some cookies are required for technical
            reasons in order for our website to operate, and we refer to these as "essential" or "strictly necessary"
            cookies. Other cookies enable us to track and target the interests of our users to enhance the experience
            on our website. Third parties serve cookies through our website for advertising, analytics, and other purposes.
          </p>
          
          <h2 className="text-2xl font-semibold mt-6 mb-4">Types of cookies we use</h2>
          <p>
            The types of cookies we use include:
          </p>
          <ul className="list-disc pl-6 mb-4">
            <li>
              <strong>Essential cookies:</strong> These cookies are strictly necessary to provide you with services
              available through our website and to use some of its features, such as access to secure areas.
            </li>
            <li>
              <strong>Performance cookies:</strong> These cookies collect information about how visitors use a website,
              for instance which pages visitors go to most often, and if they get error messages from web pages.
              These cookies don't collect information that identifies a visitor.
            </li>
            <li>
              <strong>Functionality cookies:</strong> These cookies allow the website to remember choices you make
              (such as your username, language or the region you are in) and provide enhanced, more personal features.
            </li>
            <li>
              <strong>Advertising cookies:</strong> These cookies are used to make advertising messages more relevant to you.
              They perform functions like preventing the same ad from continuously reappearing, ensuring that ads are
              properly displayed for advertisers, and in some cases selecting advertisements that are based on your interests.
            </li>
          </ul>
          
          <h2 className="text-2xl font-semibold mt-6 mb-4">How can you control cookies?</h2>
          <p>
            You have the right to decide whether to accept or reject cookies. You can exercise your cookie preferences
            by clicking on the appropriate opt-out links provided in the cookie banner.
          </p>
          <p>
            You can also set or amend your web browser controls to accept or refuse cookies. If you choose to reject cookies,
            you may still use our website though your access to some functionality and areas of our website may be restricted.
          </p>
          
          <h2 className="text-2xl font-semibold mt-6 mb-4">Changes to this Cookie Policy</h2>
          <p>
            We may update this Cookie Policy from time to time in order to reflect, for example, changes to the cookies
            we use or for other operational, legal or regulatory reasons. Please therefore re-visit this Cookie Policy
            regularly to stay informed about our use of cookies and related technologies.
          </p>
          
          <h2 className="text-2xl font-semibold mt-6 mb-4">Contact us</h2>
          <p>
            If you have any questions about our use of cookies or other technologies, please email us at privacy@uptodateke.com.
          </p>
          
          <p className="mt-8">
            Last updated: April 29, 2025
          </p>
        </div>
      </div>
    </MainLayout>
  );
};

export default Cookies;
