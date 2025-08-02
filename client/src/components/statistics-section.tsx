import { useEffect, useState } from "react";

const stats = [
  { value: "1,00,000+", label: "Indian AI Consultations" },
  { value: "94%", label: "Indian Law Accuracy" },
  { value: "2.3s", label: "Avg Response Time" },
  { value: "4.8/5", label: "User Satisfaction" }
];

export default function StatisticsSection() {
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsVisible(true);
        }
      },
      { threshold: 0.5, rootMargin: "0px 0px -100px 0px" }
    );

    const section = document.getElementById("statistics");
    if (section) {
      observer.observe(section);
    }

    return () => observer.disconnect();
  }, []);

  return (
    <section id="statistics" className="py-16 bg-legal-navy">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8 text-center">
          {stats.map((stat, index) => (
            <div key={index} className="text-white">
              <div 
                className={`text-4xl font-bold text-legal-gold mb-2 transition-all duration-1000 ${
                  isVisible ? "opacity-100 transform translate-y-0" : "opacity-0 transform translate-y-8"
                }`}
                style={{ transitionDelay: `${index * 200}ms` }}
              >
                {stat.value}
              </div>
              <div className="text-lg text-gray-300">{stat.label}</div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
