
import Navbar from "@/components/Navbar";
import { Instagram } from "lucide-react";
import { Button } from "@/components/ui/button";

const Portfolio = () => {
  // Example portfolio items - replace with your actual content
  const portfolioItems = [
    {
      id: 1,
      image: "/placeholder.svg",
      description: "Custom vintage-style t-shirt printing",
    },
    {
      id: 2,
      image: "/placeholder.svg",
      description: "Retro sportswear collection",
    },
    {
      id: 3,
      image: "/placeholder.svg",
      description: "Limited edition designs",
    },
    {
      id: 4,
      image: "/placeholder.svg",
      description: "Custom team uniforms",
    },
    {
      id: 5,
      image: "/placeholder.svg",
      description: "Specialty printing techniques",
    },
    {
      id: 6,
      image: "/placeholder.svg",
      description: "Brand collaborations",
    },
  ];

  return (
    <div className="min-h-screen bg-background">
      <Navbar />
      <div className="container mx-auto px-4 pt-24 pb-12">
        {/* Instagram Header */}
        <div className="flex items-center justify-center gap-4 mb-8">
          <Instagram className="w-8 h-8 text-brand-navy" />
          <a 
            href="https://www.instagram.com/projectprinting_miami/" 
            target="_blank" 
            rel="noopener noreferrer"
            className="text-xl font-semibold text-brand-navy hover:text-brand-yellow transition-colors"
          >
            @projectprinting_miami
          </a>
        </div>

        {/* Follow Button */}
        <div className="flex justify-center mb-12">
          <a 
            href="https://www.instagram.com/projectprinting_miami/" 
            target="_blank" 
            rel="noopener noreferrer"
          >
            <Button
              className="bg-brand-yellow text-brand-navy hover:bg-brand-navy hover:text-white transition-colors"
            >
              Follow us on Instagram
            </Button>
          </a>
        </div>

        {/* Instagram Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">
          {portfolioItems.map((item) => (
            <div 
              key={item.id} 
              className="group relative aspect-square bg-gray-100 overflow-hidden"
            >
              <img
                src={item.image}
                alt={item.description}
                className="w-full h-full object-cover transition-transform duration-300 group-hover:scale-105"
              />
              <div className="absolute inset-0 bg-brand-navy/80 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-center justify-center p-4">
                <p className="text-white text-center text-sm">{item.description}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Portfolio;
