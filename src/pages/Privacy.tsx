
import MainLayout from "@/components/layout/MainLayout";

const Privacy = () => {
  return (
    <MainLayout>
      <div className="max-w-4xl mx-auto py-12 px-4">
        <h1 className="text-3xl md:text-4xl font-bold mb-6">Privacy Policy</h1>
        
        <div className="prose prose-lg max-w-none">
          <p>
            At UpTodateKE, we take your privacy seriously. This Privacy Policy explains how we collect, use, 
            disclose, and safeguard your information when you visit our website or use our services.
          </p>
          
          <h2 className="text-2xl font-semibold mt-6 mb-4">1. Information We Collect</h2>
          <p>
            We may collect personal information that you voluntarily provide to us when you:
          </p>
          <ul className="list-disc pl-6 mb-4">
            <li>Register for an account</li>
            <li>Subscribe to our newsletter</li>
            <li>Contact us</li>
            <li>Participate in polls or surveys</li>
            <li>Comment on articles</li>
          </ul>
          <p>
            This information may include your name, email address, and any other information you choose to provide.
          </p>
          <p>
            We also automatically collect certain information when you visit our website, including:
          </p>
          <ul className="list-disc pl-6 mb-4">
            <li>IP address</li>
            <li>Browser type</li>
            <li>Device information</li>
            <li>Pages visited</li>
            <li>Time spent on pages</li>
          </ul>
          
          <h2 className="text-2xl font-semibold mt-6 mb-4">2. How We Use Your Information</h2>
          <p>
            We may use your information to:
          </p>
          <ul className="list-disc pl-6 mb-4">
            <li>Provide, operate, and maintain our website</li>
            <li>Improve, personalize, and expand our website</li>
            <li>Understand how you use our website</li>
            <li>Develop new products, services, and features</li>
            <li>Communicate with you about news, updates, and other information</li>
            <li>Process transactions</li>
            <li>Prevent fraudulent activities</li>
          </ul>
          
          <h2 className="text-2xl font-semibold mt-6 mb-4">3. Disclosure of Your Information</h2>
          <p>
            We may share your information with:
          </p>
          <ul className="list-disc pl-6 mb-4">
            <li>Service providers who perform services on our behalf</li>
            <li>Business partners with whom we jointly offer products or services</li>
            <li>Third parties as required by law</li>
            <li>In connection with a merger, sale, or acquisition</li>
          </ul>
          
          <h2 className="text-2xl font-semibold mt-6 mb-4">4. Cookies and Tracking Technologies</h2>
          <p>
            We use cookies and similar tracking technologies to collect and use information about you.
            You can instruct your browser to refuse all cookies or to indicate when a cookie is being sent.
          </p>
          
          <h2 className="text-2xl font-semibold mt-6 mb-4">5. Data Security</h2>
          <p>
            We implement appropriate security measures to protect your information.
            However, no method of transmission over the Internet or electronic storage is 100% secure.
          </p>
          
          <h2 className="text-2xl font-semibold mt-6 mb-4">6. Your Rights</h2>
          <p>
            You have the right to access, update, or delete your personal information.
            You can do this by contacting us at privacy@uptodateke.com.
          </p>
          
          <h2 className="text-2xl font-semibold mt-6 mb-4">7. Changes to This Privacy Policy</h2>
          <p>
            We may update this Privacy Policy from time to time. We will notify you of any changes by
            posting the new Privacy Policy on this page and updating the "Last Updated" date.
          </p>
          
          <h2 className="text-2xl font-semibold mt-6 mb-4">8. Contact Us</h2>
          <p>
            If you have any questions about this Privacy Policy, please contact us at privacy@uptodateke.com.
          </p>
          
          <p className="mt-8">
            Last updated: April 29, 2025
          </p>
        </div>
      </div>
    </MainLayout>
  );
};

export default Privacy;
