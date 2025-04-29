
import MainLayout from "@/components/layout/MainLayout";
import { Button } from "@/components/ui/button";

const Careers = () => {
  const positions = [
    {
      id: 1,
      title: "Political Reporter",
      department: "News",
      location: "Nairobi",
      type: "Full-Time"
    },
    {
      id: 2,
      title: "Entertainment Writer",
      department: "Entertainment",
      location: "Nairobi",
      type: "Full-Time"
    },
    {
      id: 3,
      title: "Social Media Manager",
      department: "Marketing",
      location: "Remote",
      type: "Full-Time"
    },
    {
      id: 4,
      title: "Video Editor",
      department: "Production",
      location: "Nairobi",
      type: "Contract"
    }
  ];

  return (
    <MainLayout>
      <div className="max-w-4xl mx-auto py-12 px-4">
        <h1 className="text-3xl md:text-4xl font-bold mb-6">Careers</h1>
        
        <div className="mb-8">
          <h2 className="text-2xl font-semibold mb-4">Join Our Team</h2>
          <p className="text-muted-foreground mb-4">
            UpTodateKE is looking for talented individuals who are passionate about journalism,
            technology, and storytelling. Join our dynamic team and help shape the future of digital
            news in Kenya.
          </p>
        </div>
        
        <div className="mb-12">
          <h2 className="text-xl font-semibold mb-4">Open Positions</h2>
          
          <div className="space-y-4">
            {positions.map(position => (
              <div 
                key={position.id}
                className="border rounded-lg p-6 hover:shadow-md transition-shadow"
              >
                <div className="flex flex-wrap justify-between items-start gap-2">
                  <div>
                    <h3 className="font-bold text-lg">{position.title}</h3>
                    <p className="text-muted-foreground">{position.department}</p>
                  </div>
                  <div className="flex gap-2">
                    <span className="text-sm px-3 py-1 rounded-full bg-muted">
                      {position.location}
                    </span>
                    <span className="text-sm px-3 py-1 rounded-full bg-muted">
                      {position.type}
                    </span>
                  </div>
                </div>
                <div className="mt-4 flex justify-end">
                  <Button variant="outline" className="text-kenya-red hover:text-kenya-red/90 hover:bg-kenya-red/10">
                    Apply Now
                  </Button>
                </div>
              </div>
            ))}
          </div>
        </div>
        
        <div>
          <h2 className="text-xl font-semibold mb-4">Don't see a fit?</h2>
          <p className="text-muted-foreground mb-6">
            We're always looking for talented individuals. Send us your resume and we'll keep it on file for future opportunities.
          </p>
          <Button className="bg-kenya-red hover:bg-kenya-red/90 text-white">
            Submit General Application
          </Button>
        </div>
      </div>
    </MainLayout>
  );
};

export default Careers;
