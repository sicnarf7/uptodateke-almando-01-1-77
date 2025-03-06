
import { CheckIcon } from "lucide-react";
import { Button } from "@/components/ui/button";

const SubscriptionSection = () => {
  const features = [
    "Ad-free browsing experience",
    "Exclusive premium content",
    "Early access to events and tickets",
    "Exclusive podcasts and video series",
    "Support quality journalism in Kenya",
  ];

  return (
    <section className="py-16 px-4 sm:px-6 lg:px-8 bg-black text-white relative overflow-hidden">
      <div className="absolute inset-0 opacity-30">
        <div className="absolute inset-0 bg-gradient-to-r from-kenya-purple/30 to-kenya-red/30"></div>
        <div className="absolute w-full h-full" style={{ 
          backgroundImage: "url('https://via.placeholder.com/2000x1000/000000/000000?text=')",
          backgroundSize: "cover",
          backgroundPosition: "center",
          mixBlendMode: "overlay" 
        }}></div>
      </div>

      <div className="max-w-5xl mx-auto relative z-10">
        <div className="text-center mb-12">
          <span className="inline-block px-4 py-1 mb-4 rounded-full bg-kenya-gold text-black font-bold text-sm">
            PREMIUM MEMBERSHIP
          </span>
          <h2 className="text-4xl md:text-5xl font-bold mb-4">Elevate Your Experience</h2>
          <p className="text-lg md:text-xl text-gray-300 max-w-3xl mx-auto">
            Get unlimited access to Kenya's most trusted source of news and entertainment,
            with exclusive benefits that keep you ahead of the curve.
          </p>
        </div>

        <div className="bg-white/5 backdrop-blur-lg border border-white/10 rounded-2xl p-8 md:p-10 shadow-xl">
          <div className="grid md:grid-cols-2 gap-8 md:gap-12 items-center">
            <div>
              <h3 className="text-2xl font-bold mb-6">UpTodateKE Premium</h3>
              <ul className="space-y-4 mb-8">
                {features.map((feature, index) => (
                  <li key={index} className="flex items-start">
                    <div className="flex-shrink-0 h-6 w-6 rounded-full bg-kenya-red flex items-center justify-center mt-0.5">
                      <CheckIcon className="h-3.5 w-3.5 text-white" />
                    </div>
                    <span className="ml-3">{feature}</span>
                  </li>
                ))}
              </ul>
            </div>

            <div className="bg-black/30 backdrop-blur-md rounded-xl p-6 border border-white/10">
              <div className="text-center mb-6">
                <p className="text-sm uppercase tracking-wider text-gray-400 mb-1">Starting at just</p>
                <div className="flex items-center justify-center">
                  <span className="text-4xl font-bold">KSh 199</span>
                  <span className="ml-2 text-gray-400">/month</span>
                </div>
                <p className="mt-1 text-sm text-gray-400">or KSh 1,999 per year (save 16%)</p>
              </div>

              <div className="space-y-3">
                <Button className="w-full bg-kenya-red hover:bg-kenya-red/90 text-white h-12 rounded-lg font-bold">
                  Subscribe Monthly
                </Button>
                <Button variant="outline" className="w-full border-kenya-red text-kenya-red hover:bg-kenya-red/10 h-12 rounded-lg font-bold">
                  Subscribe Yearly
                </Button>
              </div>

              <p className="text-xs text-center text-gray-400 mt-4">
                Payments secured via M-Pesa. Cancel anytime.
              </p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default SubscriptionSection;
