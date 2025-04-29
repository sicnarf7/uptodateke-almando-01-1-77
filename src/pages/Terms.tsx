
import MainLayout from "@/components/layout/MainLayout";

const Terms = () => {
  return (
    <MainLayout>
      <div className="max-w-4xl mx-auto py-12 px-4">
        <h1 className="text-3xl md:text-4xl font-bold mb-6">Terms of Service</h1>
        
        <div className="prose prose-lg max-w-none">
          <p>
            These Terms of Service ("Terms") govern your access to and use of the UpTodateKE website and services.
            By accessing or using our services, you agree to be bound by these Terms.
          </p>
          
          <h2 className="text-2xl font-semibold mt-6 mb-4">1. Acceptance of Terms</h2>
          <p>
            By accessing or using UpTodateKE, you agree to these Terms and our Privacy Policy.
            If you do not agree to these Terms, you may not access or use our services.
          </p>
          
          <h2 className="text-2xl font-semibold mt-6 mb-4">2. Use of Services</h2>
          <p>
            You may use our services only as permitted by these Terms and any applicable laws.
            You may not:
          </p>
          <ul className="list-disc pl-6 mb-4">
            <li>Use our services in any way that violates any applicable laws;</li>
            <li>Use our services for any illegal or unauthorized purpose;</li>
            <li>Interfere with or disrupt the operation of our services;</li>
            <li>Attempt to gain unauthorized access to our services;</li>
            <li>Collect or harvest any information from our services without authorization;</li>
            <li>Impersonate another person or entity.</li>
          </ul>
          
          <h2 className="text-2xl font-semibold mt-6 mb-4">3. Content and Intellectual Property</h2>
          <p>
            All content on UpTodateKE, including text, graphics, logos, and images, is the property
            of UpTodateKE or its licensors and is protected by copyright and other intellectual property laws.
            You may not reproduce, distribute, modify, or create derivative works of our content without
            explicit permission.
          </p>
          
          <h2 className="text-2xl font-semibold mt-6 mb-4">4. User Content</h2>
          <p>
            You are responsible for any content you submit to our services. By submitting content,
            you grant us a non-exclusive, royalty-free, worldwide license to use, display, and
            distribute your content in connection with our services.
          </p>
          
          <h2 className="text-2xl font-semibold mt-6 mb-4">5. Disclaimers</h2>
          <p>
            Our services are provided "as is" without warranties of any kind, either express or implied.
            We do not guarantee that our services will be error-free or uninterrupted.
          </p>
          
          <h2 className="text-2xl font-semibold mt-6 mb-4">6. Limitation of Liability</h2>
          <p>
            To the maximum extent permitted by law, UpTodateKE shall not be liable for any indirect,
            incidental, special, consequential, or punitive damages arising out of or relating to your
            use of our services.
          </p>
          
          <h2 className="text-2xl font-semibold mt-6 mb-4">7. Modifications to Terms</h2>
          <p>
            We may modify these Terms at any time. We will notify you of significant changes by posting
            a notice on our website. Your continued use of our services after such modifications
            constitutes your acceptance of the modified Terms.
          </p>
          
          <h2 className="text-2xl font-semibold mt-6 mb-4">8. Termination</h2>
          <p>
            We may terminate or suspend your access to our services at any time, without notice,
            for any reason, including for violations of these Terms.
          </p>
          
          <h2 className="text-2xl font-semibold mt-6 mb-4">9. Contact Information</h2>
          <p>
            If you have any questions about these Terms, please contact us at legal@uptodateke.com.
          </p>
          
          <p className="mt-8">
            Last updated: April 29, 2025
          </p>
        </div>
      </div>
    </MainLayout>
  );
};

export default Terms;
