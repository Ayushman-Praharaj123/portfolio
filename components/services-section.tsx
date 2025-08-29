"use client";

import { motion } from "framer-motion";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { 
  Code, 
  Server, 
  Layers, 
  ProjectorIcon as Project, 
  Palette,
  ArrowRight 
} from "lucide-react";
import { scrollToSection } from "@/lib/utils";
import type { Service } from "@/types";

const services: Service[] = [
  {
    id: "frontend",
    title: "Frontend Development",
    description: "Creating responsive and interactive user interfaces using modern frameworks and libraries.",
    icon: "Code",
    features: [
      "React & Next.js Development",
      "Responsive Design",
      "Modern CSS & Tailwind",
      "Performance Optimization",
      "Cross-browser Compatibility"
    ]
  },
  {
    id: "backend",
    title: "Backend Development",
    description: "Building robust server-side applications and APIs with scalable architecture.",
    icon: "Server",
    features: [
      "Node.js & Express.js",
      "RESTful API Development",
      "Database Design & Integration",
      "Authentication & Security",
      "Server Optimization"
    ]
  },
  {
    id: "fullstack",
    title: "Full Stack Development",
    description: "End-to-end web application development from concept to deployment.",
    icon: "Layers",
    features: [
      "MERN Stack Applications",
      "Database Architecture",
      "API Integration",
      "Deployment & DevOps",
      "Maintenance & Support"
    ]
  },
  {
    id: "project-management",
    title: "Project Management",
    description: "Planning, executing, and delivering projects on time with quality assurance.",
    icon: "Project",
    features: [
      "Project Planning & Strategy",
      "Timeline Management",
      "Quality Assurance",
      "Client Communication",
      "Agile Methodology"
    ]
  },
  {
    id: "website-redesign",
    title: "Website Redesign",
    description: "Modernizing existing websites with improved UI/UX and performance.",
    icon: "Palette",
    features: [
      "UI/UX Improvements",
      "Performance Enhancement",
      "Mobile Optimization",
      "SEO Optimization",
      "Modern Technology Migration"
    ]
  }
];

const iconMap = {
  Code,
  Server,
  Layers,
  Project,
  Palette
};

export function ServicesSection() {
  const handleGetStarted = () => {
    scrollToSection("contact");
  };

  return (
    <section id="services" className="py-12 sm:py-16 lg:py-20">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          viewport={{ once: true }}
          className="text-center mb-16"
        >
          <h2 className="text-3xl sm:text-4xl font-bold text-foreground mb-4">
            Services I Offer
          </h2>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
            Comprehensive web development services to help bring your ideas to life
          </p>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6 md:gap-8">
          {services.map((service, index) => {
            const IconComponent = iconMap[service.icon as keyof typeof iconMap];
            
            return (
              <motion.div
                key={service.id}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8, delay: index * 0.1 }}
                viewport={{ once: true }}
              >
                <Card className="h-full group hover:shadow-lg transition-all duration-300 hover:-translate-y-1">
                  <CardHeader className="text-center p-4 sm:p-6">
                    <div className="mx-auto mb-4 p-3 bg-primary/10 rounded-full w-fit group-hover:bg-primary/20 transition-colors">
                      <IconComponent className="h-6 w-6 sm:h-8 sm:w-8 text-primary" />
                    </div>
                    <CardTitle className="text-lg sm:text-xl mb-2">{service.title}</CardTitle>
                    <p className="text-muted-foreground text-sm">
                      {service.description}
                    </p>
                  </CardHeader>
                  <CardContent className="pt-0 p-4 sm:p-6">
                    <ul className="space-y-2 mb-6">
                      {service.features.map((feature, featureIndex) => (
                        <motion.li
                          key={featureIndex}
                          initial={{ opacity: 0, x: -10 }}
                          whileInView={{ opacity: 1, x: 0 }}
                          transition={{ duration: 0.5, delay: featureIndex * 0.1 }}
                          viewport={{ once: true }}
                          className="flex items-center text-sm text-muted-foreground"
                        >
                          <div className="w-1.5 h-1.5 bg-primary rounded-full mr-3 flex-shrink-0" />
                          {feature}
                        </motion.li>
                      ))}
                    </ul>
                    <Button
                      onClick={handleGetStarted}
                      variant="outline"
                      className="w-full group-hover:bg-primary group-hover:text-primary-foreground transition-colors"
                    >
                      Get Started
                      <ArrowRight className="ml-2 h-4 w-4" />
                    </Button>
                  </CardContent>
                </Card>
              </motion.div>
            );
          })}
        </div>

        {/* Call to Action */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.6 }}
          viewport={{ once: true }}
          className="text-center mt-16"
        >
          <Card className="max-w-2xl mx-auto bg-gradient-to-r from-primary/5 to-accent/5">
            <CardContent className="p-8">
              <h3 className="text-2xl font-semibold text-foreground mb-4">
                Ready to Start Your Project?
              </h3>
              <p className="text-muted-foreground mb-6">
                Let&apos;s discuss your requirements and create something amazing together.
              </p>
              <Button onClick={handleGetStarted} size="lg">
                Let&apos;s Talk
                <ArrowRight className="ml-2 h-5 w-5" />
              </Button>
            </CardContent>
          </Card>
        </motion.div>
      </div>
    </section>
  );
}
