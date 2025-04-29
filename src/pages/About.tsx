
import MainLayout from "@/components/layout/MainLayout";

const About = () => {
  return (
    <MainLayout>
      <div className="max-w-4xl mx-auto py-12 px-4">
        <h1 className="text-3xl md:text-4xl font-bold mb-6">About UpTodateKE</h1>
        <div className="prose prose-lg">
          <p className="mb-4">
            UpTodateKE is Kenya's premier digital news platform, committed to delivering timely, 
            accurate, and engaging content that matters to Kenyans at home and abroad.
          </p>
          <p className="mb-4">
            Founded in 2023, our platform brings together news, entertainment, and trending topics
            in a modern, user-friendly format accessible to all Kenyans.
          </p>
          <p className="mb-4">
            Our mission is to inform, engage, and connect Kenyans through high-quality journalism
            and diverse content that reflects the vibrancy and dynamism of Kenyan culture and society.
          </p>
          <h2 className="text-2xl font-semibold mt-8 mb-4">Our Vision</h2>
          <p>
            To be the most trusted and preferred source of news and entertainment in Kenya, 
            setting the standard for digital journalism in East Africa.
          </p>
        </div>
      </div>
    </MainLayout>
  );
};

export default About;
