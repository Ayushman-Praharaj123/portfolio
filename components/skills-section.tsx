"use client";

import { motion } from "framer-motion";
import { Card, CardContent } from "@/components/ui/card";
import type { Skill } from "@/types";

const skills: Skill[] = [
  // Frontend
  { name: "React", category: "Frontend", proficiency: 90 },
  { name: "Next.js", category: "Frontend", proficiency: 85 },
  { name: "HTML5", category: "Frontend", proficiency: 95 },
  { name: "CSS3", category: "Frontend", proficiency: 90 },
  { name: "JavaScript", category: "Frontend", proficiency: 90 },
  { name: "TypeScript", category: "Frontend", proficiency: 80 },
  
  // Backend
  { name: "Node.js", category: "Backend", proficiency: 85 },
  { name: "Express.js", category: "Backend", proficiency: 85 },
  { name: "Python", category: "Backend", proficiency: 80 },
  
  // Database
  { name: "MongoDB", category: "Database", proficiency: 80 },
  { name: "SQL", category: "Database", proficiency: 75 },
  
  // Languages
  { name: "Python", category: "Language", proficiency: 80 },
  { name: "C Programming", category: "Language", proficiency: 70 },
];

const skillCategories = ["Frontend", "Backend", "Database", "Language"] as const;

export function SkillsSection() {
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1,
      },
    },
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        duration: 0.5,
      },
    },
  };

  return (
    <section id="skills" className="py-12 sm:py-16 lg:py-20 bg-muted/30">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          viewport={{ once: true }}
          className="text-center mb-16"
        >
          <h2 className="text-3xl sm:text-4xl font-bold text-foreground mb-4">
            Technical Skills
          </h2>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
            Here are the technologies and tools I work with to bring ideas to life
          </p>
        </motion.div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 md:gap-8">
          {skillCategories.map((category, categoryIndex) => (
            <motion.div
              key={category}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: categoryIndex * 0.1 }}
              viewport={{ once: true }}
            >
              <Card className="h-full">
                <CardContent className="p-4 sm:p-6">
                  <h3 className="text-lg sm:text-xl font-semibold text-foreground mb-4 text-center">
                    {category}
                  </h3>
                  <motion.div
                    variants={containerVariants}
                    initial="hidden"
                    whileInView="visible"
                    viewport={{ once: true }}
                    className="space-y-4"
                  >
                    {skills
                      .filter((skill) => skill.category === category)
                      .map((skill, index) => (
                        <motion.div
                          key={skill.name}
                          variants={itemVariants}
                          className="space-y-2"
                        >
                          <div className="flex justify-between items-center">
                            <span className="text-sm font-medium text-foreground">
                              {skill.name}
                            </span>
                            <span className="text-xs text-muted-foreground">
                              {skill.proficiency}%
                            </span>
                          </div>
                          <div className="w-full bg-secondary rounded-full h-2">
                            <motion.div
                              className="bg-primary h-2 rounded-full"
                              initial={{ width: 0 }}
                              whileInView={{ width: `${skill.proficiency}%` }}
                              transition={{ duration: 1, delay: index * 0.1 }}
                              viewport={{ once: true }}
                            />
                          </div>
                        </motion.div>
                      ))}
                  </motion.div>
                </CardContent>
              </Card>
            </motion.div>
          ))}
        </div>

        {/* Additional Skills Summary */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.4 }}
          viewport={{ once: true }}
          className="mt-16 text-center"
        >
          <Card className="max-w-4xl mx-auto">
            <CardContent className="p-8">
              <h3 className="text-2xl font-semibold text-foreground mb-4">
                MERN Stack Expertise
              </h3>
              <p className="text-muted-foreground mb-6">
                Specialized in full-stack development using MongoDB, Express.js, React, and Node.js
              </p>
              <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                {["MongoDB", "Express.js", "React", "Node.js"].map((tech, index) => (
                  <motion.div
                    key={tech}
                    initial={{ opacity: 0, scale: 0.8 }}
                    whileInView={{ opacity: 1, scale: 1 }}
                    transition={{ duration: 0.5, delay: index * 0.1 }}
                    viewport={{ once: true }}
                    className="p-4 bg-primary/10 rounded-lg"
                  >
                    <span className="text-sm font-medium text-primary">{tech}</span>
                  </motion.div>
                ))}
              </div>
            </CardContent>
          </Card>
        </motion.div>
      </div>
    </section>
  );
}
