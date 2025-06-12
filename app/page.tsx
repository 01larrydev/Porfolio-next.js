"use client";

import type React from "react";

import { useState, useEffect, useRef } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import {
  Mail,
  Linkedin,
  Github,
  Download,
  Menu,
  X,
  Sun,
  Moon,
} from "lucide-react";
import Image from "next/image";
import { motion, useInView, useReducedMotion } from "framer-motion";

export default function Portfolio() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isDarkMode, setIsDarkMode] = useState(false);
  const [typewriterText1, setTypewriterText1] = useState("");
  const [typewriterText2, setTypewriterText2] = useState("");

  // Respect user's motion preferences
  const shouldReduceMotion = useReducedMotion();

  const text1 = "Web Developer💎";
  const text2 = "inbox Me!💎";

  // Enhanced typewriter effect with cursor
  const [showCursor1, setShowCursor1] = useState(true);
  const [showCursor2, setShowCursor2] = useState(false);

  useEffect(() => {
    let i = 0;
    const timer1 = setInterval(() => {
      if (i < text1.length) {
        setTypewriterText1(text1.slice(0, i + 1));
        i++;
      } else {
        clearInterval(timer1);
        setShowCursor1(false);
        setShowCursor2(true);
        let j = 0;
        const timer2 = setInterval(() => {
          if (j < text2.length) {
            setTypewriterText2(text2.slice(0, j + 1));
            j++;
          } else {
            clearInterval(timer2);
            setShowCursor2(false);
          }
        }, 80); // Slightly faster for mobile
      }
    }, 80); // Slightly faster for mobile

    return () => {
      clearInterval(timer1);
    };
  }, []);

  const toggleMenu = () => setIsMenuOpen(!isMenuOpen);
  const toggleDarkMode = () => setIsDarkMode(!isDarkMode);

  const scrollToSection = (sectionId: string) => {
    document.getElementById(sectionId)?.scrollIntoView({ behavior: "smooth" });
    setIsMenuOpen(false);
  };

  // Optimized animation variants for mobile
  const mobileOptimizedVariants = {
    hidden: { opacity: 0, y: shouldReduceMotion ? 0 : 20 },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        duration: shouldReduceMotion ? 0.1 : 0.6,
        ease: "easeOut",
      },
    },
  };

  // Animated Section Component - Mobile Optimized
  const AnimatedSection = ({
    children,
    className = "",
  }: {
    children: React.ReactNode;
    className?: string;
  }) => {
    const ref = useRef(null);
    const isInView = useInView(ref, { once: true, margin: "-50px" });

    return (
      <motion.div
        ref={ref}
        variants={mobileOptimizedVariants}
        initial="hidden"
        animate={isInView ? "visible" : "hidden"}
        className={className}
      >
        {children}
      </motion.div>
    );
  };

  return (
    <div className={isDarkMode ? "dark" : ""}>
      <div className="min-h-screen bg-white dark:bg-gray-900 text-gray-900 dark:text-white transition-colors duration-300">
        {/* Mobile-First Navigation */}
        <nav className="flex justify-between items-center px-3 sm:px-6 md:px-8 py-3 sm:py-4 fixed w-full top-0 bg-white/90 dark:bg-gray-900/90 backdrop-blur-sm z-50 border-b border-gray-200/20 dark:border-gray-700/20">
          <div className="text-lg sm:text-xl md:text-2xl font-bold truncate">
            Larry.Dev
          </div>

          {/* Desktop Navigation */}
          <div className="hidden lg:flex items-center space-x-6 xl:space-x-8">
            <button
              onClick={() => scrollToSection("about")}
              className="hover:text-blue-600 transition-colors text-sm xl:text-base"
            >
              About
            </button>
            <button
              onClick={() => scrollToSection("experience")}
              className="hover:text-blue-600 transition-colors text-sm xl:text-base"
            >
              Experience
            </button>
            <button
              onClick={() => scrollToSection("projects")}
              className="hover:text-blue-600 transition-colors text-sm xl:text-base"
            >
              Projects
            </button>
            <button
              onClick={() => scrollToSection("contact")}
              className="hover:text-blue-600 transition-colors text-sm xl:text-base"
            >
              Contact
            </button>
            <Button
              onClick={toggleDarkMode}
              variant="outline"
              size="sm"
              className="text-xs"
            >
              {isDarkMode ? (
                <Sun className="w-3 h-3" />
              ) : (
                <Moon className="w-3 h-3" />
              )}
              <span className="hidden xl:inline ml-1">
                {isDarkMode ? "Light" : "Dark"}
              </span>
            </Button>
          </div>

          {/* Mobile Menu Button */}
          <div className="flex items-center gap-2 lg:hidden">
            <Button
              onClick={toggleDarkMode}
              variant="outline"
              size="sm"
              className="p-2"
            >
              {isDarkMode ? (
                <Sun className="w-4 h-4" />
              ) : (
                <Moon className="w-4 h-4" />
              )}
            </Button>
            <button
              onClick={toggleMenu}
              className="p-2 rounded-md hover:bg-gray-100 dark:hover:bg-gray-800 transition-colors min-w-[44px] min-h-[44px] flex items-center justify-center"
              aria-label="Toggle menu"
            >
              {isMenuOpen ? (
                <X className="w-5 h-5" />
              ) : (
                <Menu className="w-5 h-5" />
              )}
            </button>
          </div>
        </nav>

        {/* Mobile Menu Overlay */}
        {isMenuOpen && (
          <motion.div
            className="lg:hidden fixed inset-0 bg-white/95 dark:bg-gray-900/95 backdrop-blur-sm z-40 pt-16"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.2 }}
          >
            <div className="flex flex-col items-center justify-center h-full space-y-8 px-4">
              {["about", "experience", "projects", "contact"].map(
                (section, index) => (
                  <motion.button
                    key={section}
                    onClick={() => scrollToSection(section)}
                    className="text-2xl font-medium hover:text-blue-600 transition-colors capitalize min-h-[44px] px-4"
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: index * 0.1 }}
                  >
                    {section}
                  </motion.button>
                )
              )}
            </div>
          </motion.div>
        )}

        {/* Hero Section - Mobile Optimized */}
        <section
          id="profile"
          className="min-h-screen flex items-center justify-center px-3 sm:px-4 pt-16 sm:pt-20"
        >
          <div className="max-w-6xl mx-auto w-full">
            <div className="flex flex-col lg:grid lg:grid-cols-2 gap-6 sm:gap-8 items-center">
              <motion.div
                className="flex justify-center order-1 lg:order-none"
                initial={{ opacity: 0, scale: shouldReduceMotion ? 1 : 0.8 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{
                  duration: shouldReduceMotion ? 0.1 : 0.8,
                  ease: "easeOut",
                }}
              >
                <div className="w-48 h-48 sm:w-64 sm:h-64 md:w-80 md:h-80 rounded-full overflow-hidden bg-gray-200 dark:bg-gray-700 shadow-xl">
                  <Image
                    src="/profile-pic.png"
                    alt="Larry profile picture"
                    width={320}
                    height={320}
                    className="w-full h-full object-cover"
                    priority
                  />
                </div>
              </motion.div>

              <motion.div
                className="text-center lg:text-left space-y-3 sm:space-y-4 order-2 lg:order-none w-full"
                initial={{ opacity: 0, x: shouldReduceMotion ? 0 : 30 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{
                  duration: shouldReduceMotion ? 0.1 : 0.8,
                  delay: 0.2,
                }}
              >
                <motion.p
                  className="text-sm sm:text-base md:text-lg text-gray-600 dark:text-gray-400"
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  transition={{ delay: shouldReduceMotion ? 0 : 0.5 }}
                >
                  Hello, I'm
                </motion.p>

                <motion.h1
                  className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-bold leading-tight"
                  initial={{ opacity: 0, y: shouldReduceMotion ? 0 : 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: shouldReduceMotion ? 0 : 0.7 }}
                >
                  Larry Dev
                </motion.h1>

                <div className="text-base sm:text-lg md:text-xl text-blue-600 min-h-[4rem] sm:min-h-[5rem]">
                  <motion.p
                    className="inline-block leading-relaxed"
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ delay: shouldReduceMotion ? 0 : 1 }}
                  >
                    {typewriterText1}
                    {showCursor1 && !shouldReduceMotion && (
                      <motion.span
                        animate={{ opacity: [1, 0] }}
                        transition={{
                          duration: 0.8,
                          repeat: Number.POSITIVE_INFINITY,
                          repeatType: "reverse",
                        }}
                        className="ml-1"
                      >
                        |
                      </motion.span>
                    )}
                  </motion.p>
                  <br />
                  <motion.p
                    className="inline-block leading-relaxed"
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ delay: shouldReduceMotion ? 0 : 2.5 }}
                  >
                    {typewriterText2}
                    {showCursor2 && !shouldReduceMotion && (
                      <motion.span
                        animate={{ opacity: [1, 0] }}
                        transition={{
                          duration: 0.8,
                          repeat: Number.POSITIVE_INFINITY,
                          repeatType: "reverse",
                        }}
                        className="ml-1"
                      >
                        |
                      </motion.span>
                    )}
                  </motion.p>
                </div>

                <motion.div
                  className="flex flex-col sm:flex-row gap-3 sm:gap-4 justify-center lg:justify-start"
                  initial={{ opacity: 0, y: shouldReduceMotion ? 0 : 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: shouldReduceMotion ? 0 : 1.2 }}
                >
                  <a href="/CV.pdf" download="Larry-CV.pdf">
                    <Button
                      variant="outline"
                      className="flex items-center justify-center gap-2 min-h-[44px] text-sm sm:text-base hover:scale-105 transition-transform"
                      size="lg"
                    >
                      <Download className="w-4 h-4" />
                      Download CV
                    </Button>
                  </a>
                  <Button
                    onClick={() => scrollToSection("contact")}
                    className="min-h-[44px] text-sm sm:text-base hover:scale-105 transition-transform"
                    size="lg"
                  >
                    Contact Info
                  </Button>
                </motion.div>

                <motion.div
                  className="flex gap-4 justify-center lg:justify-start pt-2 sm:pt-4"
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  transition={{ delay: shouldReduceMotion ? 0 : 1.4 }}
                >
                  <motion.button
                    onClick={() =>
                      window.open(
                        "https://www.linkedin.com/in/larry-hery-5b9b942a8/",
                        "_blank"
                      )
                    }
                    className="p-3 rounded-full bg-gray-100 dark:bg-gray-800 hover:bg-gray-200 dark:hover:bg-gray-700 transition-colors min-w-[44px] min-h-[44px] flex items-center justify-center"
                    whileHover={
                      shouldReduceMotion ? {} : { scale: 1.1, rotate: 5 }
                    }
                    whileTap={{ scale: 0.95 }}
                    aria-label="LinkedIn Profile"
                  >
                    <Linkedin className="w-5 h-5 sm:w-6 sm:h-6" />
                  </motion.button>
                  <motion.button
                    onClick={() =>
                      window.open("https://github.com/01larrydev", "_blank")
                    }
                    className="p-3 rounded-full bg-gray-100 dark:bg-gray-800 hover:bg-gray-200 dark:hover:bg-gray-700 transition-colors min-w-[44px] min-h-[44px] flex items-center justify-center"
                    whileHover={
                      shouldReduceMotion ? {} : { scale: 1.1, rotate: -5 }
                    }
                    whileTap={{ scale: 0.95 }}
                    aria-label="GitHub Profile"
                  >
                    <Github className="w-5 h-5 sm:w-6 sm:h-6" />
                  </motion.button>
                </motion.div>
              </motion.div>
            </div>
          </div>
        </section>

        {/* About Section - Mobile Optimized */}
        <section id="about" className="py-12 sm:py-16 md:py-20 px-3 sm:px-4">
          <div className="max-w-6xl mx-auto">
            <AnimatedSection>
              <div className="text-center mb-8 sm:mb-12">
                <p className="text-gray-600 dark:text-gray-400 mb-2 text-sm sm:text-base">
                  Get To Know More
                </p>
                <h2 className="text-2xl sm:text-3xl md:text-4xl font-bold">
                  About Me
                </h2>
              </div>
            </AnimatedSection>

            <div className="flex flex-col lg:grid lg:grid-cols-2 gap-8 sm:gap-12 items-center">
              <AnimatedSection>
                <div className="flex justify-center">
                  <motion.div
                    className="w-64 h-64 sm:w-80 sm:h-80 rounded-lg overflow-hidden bg-gray-200 dark:bg-gray-700 shadow-xl"
                    whileHover={shouldReduceMotion ? {} : { scale: 1.02 }}
                    transition={{ duration: 0.3 }}
                  >
                    <Image
                      src="/about-pic.JPG"
                      alt="About picture"
                      width={320}
                      height={320}
                      className="w-full h-full object-cover"
                    />
                  </motion.div>
                </div>
              </AnimatedSection>

              <AnimatedSection>
                <div className="space-y-6 sm:space-y-8">
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 sm:gap-6">
                    <motion.div
                      whileHover={shouldReduceMotion ? {} : { scale: 1.02 }}
                      transition={{ duration: 0.2 }}
                      className="w-full"
                    >
                      <Card className="h-full">
                        <CardContent className="p-4 sm:p-6 text-center">
                          <motion.div
                            className="w-10 h-10 sm:w-12 sm:h-12 mx-auto mb-3 sm:mb-4 bg-blue-100 dark:bg-blue-900 rounded-full flex items-center justify-center"
                            animate={
                              shouldReduceMotion ? {} : { rotate: [0, 360] }
                            }
                            transition={{
                              duration: 4,
                              repeat: Number.POSITIVE_INFINITY,
                              ease: "linear",
                            }}
                          >
                            <span className="text-lg sm:text-2xl">🏆</span>
                          </motion.div>
                          <h3 className="font-bold mb-2 text-sm sm:text-base">
                            Experience
                          </h3>
                          <p className="text-xs sm:text-sm text-gray-600 dark:text-gray-400">
                            2+ years
                            <br />
                            Frontend/Backend Development
                          </p>
                        </CardContent>
                      </Card>
                    </motion.div>

                    <motion.div
                      whileHover={shouldReduceMotion ? {} : { scale: 1.02 }}
                      transition={{ duration: 0.2 }}
                      className="w-full"
                    >
                      <Card className="h-full">
                        <CardContent className="p-4 sm:p-6 text-center">
                          <motion.div
                            className="w-10 h-10 sm:w-12 sm:h-12 mx-auto mb-3 sm:mb-4 bg-blue-100 dark:bg-blue-900 rounded-full flex items-center justify-center"
                            animate={
                              shouldReduceMotion ? {} : { y: [0, -5, 0] }
                            }
                            transition={{
                              duration: 2,
                              repeat: Number.POSITIVE_INFINITY,
                              ease: "easeInOut",
                            }}
                          >
                            <span className="text-lg sm:text-2xl">🎓</span>
                          </motion.div>
                          <h3 className="font-bold mb-2 text-sm sm:text-base">
                            Education
                          </h3>
                          <p className="text-xs sm:text-sm text-gray-600 dark:text-gray-400">
                            B.Sc. Bachelors Degree
                            <br />
                            D.T.Superior Degree
                          </p>
                        </CardContent>
                      </Card>
                    </motion.div>
                  </div>

                  <div className="text-gray-600 dark:text-gray-400 leading-relaxed text-sm sm:text-base">
                    <p>
                      I am a developer specialized in ReactJS and PHP. I have a
                      passion for creating effective and innovative software
                      solutions. My goal is to create applications that not only
                      work well, but are also pleasant to use. I have a solid
                      understanding of programming principles and the ability to
                      quickly learn new technologies.
                    </p>
                  </div>
                </div>
              </AnimatedSection>
            </div>
          </div>
        </section>

        {/* Experience Section - Mobile Optimized */}
        <section
          id="experience"
          className="py-12 sm:py-16 md:py-20 px-3 sm:px-4 bg-gray-50 dark:bg-gray-800"
        >
          <div className="max-w-6xl mx-auto">
            <AnimatedSection>
              <div className="text-center mb-8 sm:mb-12">
                <p className="text-gray-600 dark:text-gray-400 mb-2 text-sm sm:text-base">
                  Explore My
                </p>
                <h2 className="text-2xl sm:text-3xl md:text-4xl font-bold">
                  Experience
                </h2>
              </div>
            </AnimatedSection>

            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 sm:gap-8">
              <AnimatedSection>
                <motion.div
                  whileHover={shouldReduceMotion ? {} : { scale: 1.01 }}
                  transition={{ duration: 0.2 }}
                  className="h-full"
                >
                  <Card className="h-full">
                    <CardContent className="p-4 sm:p-6 md:p-8">
                      <h3 className="text-lg sm:text-xl md:text-2xl font-bold mb-4 sm:mb-6 text-center">
                        Frontend Development
                      </h3>
                      <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 sm:gap-4">
                        {[
                          { skill: "HTML", level: "Experienced" },
                          { skill: "CSS", level: "Experienced" },
                          { skill: "SASS", level: "Intermediate" },
                          { skill: "JavaScript", level: "Intermediate" },
                          { skill: "React JS", level: "Experienced" },
                          { skill: "PHP", level: "Intermediate" },
                        ].map((item, index) => (
                          <motion.div
                            key={index}
                            className="flex items-center gap-3 p-2 rounded-lg hover:bg-gray-50 dark:hover:bg-gray-700/50 transition-colors"
                            initial={{ opacity: 0, x: -20 }}
                            whileInView={{ opacity: 1, x: 0 }}
                            transition={{
                              delay: shouldReduceMotion ? 0 : index * 0.1,
                            }}
                            viewport={{ once: true }}
                          >
                            <motion.div
                              className="w-5 h-5 sm:w-6 sm:h-6 bg-green-500 rounded-full flex items-center justify-center flex-shrink-0"
                              whileHover={
                                shouldReduceMotion
                                  ? {}
                                  : { scale: 1.2, rotate: 360 }
                              }
                              transition={{ duration: 0.3 }}
                            >
                              <span className="text-white text-xs">✓</span>
                            </motion.div>
                            <div className="min-w-0 flex-1">
                              <h4 className="font-semibold text-sm sm:text-base truncate">
                                {item.skill}
                              </h4>
                              <p className="text-xs sm:text-sm text-gray-600 dark:text-gray-400">
                                {item.level}
                              </p>
                            </div>
                          </motion.div>
                        ))}
                      </div>
                    </CardContent>
                  </Card>
                </motion.div>
              </AnimatedSection>

              <AnimatedSection>
                <motion.div
                  whileHover={shouldReduceMotion ? {} : { scale: 1.01 }}
                  transition={{ duration: 0.2 }}
                  className="h-full"
                >
                  <Card className="h-full">
                    <CardContent className="p-4 sm:p-6 md:p-8">
                      <h3 className="text-lg sm:text-xl md:text-2xl font-bold mb-4 sm:mb-6 text-center">
                        Backend Development
                      </h3>
                      <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 sm:gap-4">
                        {[
                          { skill: "PostgreSQL", level: "Intermediate" },
                          { skill: "Node JS", level: "Basic" },
                          { skill: "Laravel", level: "Intermediate" },
                          { skill: "Git", level: "Intermediate" },
                          { skill: "Wordpress", level: "Outil CMS" },
                          { skill: "Prestashop", level: "Outil CMS" },
                        ].map((item, index) => (
                          <motion.div
                            key={index}
                            className="flex items-center gap-3 p-2 rounded-lg hover:bg-gray-50 dark:hover:bg-gray-700/50 transition-colors"
                            initial={{ opacity: 0, x: -20 }}
                            whileInView={{ opacity: 1, x: 0 }}
                            transition={{
                              delay: shouldReduceMotion ? 0 : index * 0.1,
                            }}
                            viewport={{ once: true }}
                          >
                            <motion.div
                              className="w-5 h-5 sm:w-6 sm:h-6 bg-green-500 rounded-full flex items-center justify-center flex-shrink-0"
                              whileHover={
                                shouldReduceMotion
                                  ? {}
                                  : { scale: 1.2, rotate: 360 }
                              }
                              transition={{ duration: 0.3 }}
                            >
                              <span className="text-white text-xs">✓</span>
                            </motion.div>
                            <div className="min-w-0 flex-1">
                              <h4 className="font-semibold text-sm sm:text-base truncate">
                                {item.skill}
                              </h4>
                              <p className="text-xs sm:text-sm text-gray-600 dark:text-gray-400">
                                {item.level}
                              </p>
                            </div>
                          </motion.div>
                        ))}
                      </div>
                    </CardContent>
                  </Card>
                </motion.div>
              </AnimatedSection>
            </div>
          </div>
        </section>

        {/* Projects Section - Mobile Optimized */}
        <section id="projects" className="py-12 sm:py-16 md:py-20 px-3 sm:px-4">
          <div className="max-w-6xl mx-auto">
            <AnimatedSection>
              <div className="text-center mb-8 sm:mb-12">
                <p className="text-gray-600 dark:text-gray-400 mb-2 text-sm sm:text-base">
                  Browse My Recent
                </p>
                <h2 className="text-2xl sm:text-3xl md:text-4xl font-bold">
                  Projects
                </h2>
              </div>
            </AnimatedSection>

            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-6 md:gap-8">
              {[
                {
                  title: "Web Site Restaurant",
                  image: "/food_project.png",
                },
                {
                  title: "Project Two",
                  image: "/placeholder.svg?height=200&width=300",
                },
                {
                  title: "Project Three",
                  image: "/placeholder.svg?height=200&width=300",
                },
              ].map((project, index) => (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, y: 30 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  transition={{
                    delay: shouldReduceMotion ? 0 : index * 0.2,
                    duration: 0.6,
                  }}
                  viewport={{ once: true }}
                  whileHover={shouldReduceMotion ? {} : { y: -5, scale: 1.02 }}
                  className="w-full"
                >
                  <Card className="overflow-hidden shadow-lg hover:shadow-xl transition-shadow duration-300 h-full">
                    <motion.div
                      className="aspect-video bg-gray-200 dark:bg-gray-700 overflow-hidden"
                      whileHover={shouldReduceMotion ? {} : { scale: 1.05 }}
                      transition={{ duration: 0.3 }}
                    >
                      <Image
                        src={project.image || "/placeholder.svg"}
                        alt={project.title}
                        width={300}
                        height={200}
                        className="w-full h-full object-cover"
                      />
                    </motion.div>
                    <CardContent className="p-4 sm:p-6">
                      <h3 className="text-base sm:text-lg md:text-xl font-bold mb-3 sm:mb-4 text-center line-clamp-2">
                        {project.title}
                      </h3>
                      <div className="flex flex-col sm:flex-row gap-2 sm:gap-4 justify-center">
                        <motion.div
                          whileHover={shouldReduceMotion ? {} : { scale: 1.05 }}
                          whileTap={{ scale: 0.95 }}
                          className="w-full sm:w-auto"
                        >
                          <Button
                            variant="outline"
                            onClick={() =>
                              window.open(
                                "https://github.com/01larrydev",
                                "_blank"
                              )
                            }
                            className="w-full sm:w-auto min-h-[44px] text-sm"
                          >
                            Github
                          </Button>
                        </motion.div>
                        <motion.div
                          whileHover={shouldReduceMotion ? {} : { scale: 1.05 }}
                          whileTap={{ scale: 0.95 }}
                          className="w-full sm:w-auto"
                        >
                          <Button
                            variant="outline"
                            onClick={() =>
                              window.open(
                                "https://github.com/01larrydev",
                                "_blank"
                              )
                            }
                            className="w-full sm:w-auto min-h-[44px] text-sm"
                          >
                            Live Demo
                          </Button>
                        </motion.div>
                      </div>
                    </CardContent>
                  </Card>
                </motion.div>
              ))}
            </div>
          </div>
        </section>

        {/* Contact Section - Mobile Optimized */}
        <section
          id="contact"
          className="py-12 sm:py-16 md:py-20 px-3 sm:px-4 bg-gray-50 dark:bg-gray-800"
        >
          <div className="max-w-4xl mx-auto">
            <AnimatedSection>
              <div className="text-center mb-8 sm:mb-12">
                <p className="text-gray-600 dark:text-gray-400 mb-2 text-sm sm:text-base">
                  Get in Touch
                </p>
                <h2 className="text-2xl sm:text-3xl md:text-4xl font-bold">
                  Contact Me
                </h2>
              </div>
            </AnimatedSection>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 sm:gap-6 md:gap-8 max-w-2xl mx-auto">
              <AnimatedSection>
                <motion.div
                  whileHover={shouldReduceMotion ? {} : { scale: 1.02 }}
                  transition={{ duration: 0.2 }}
                  className="h-full"
                >
                  <Card className="h-full">
                    <CardContent className="p-4 sm:p-6 text-center">
                      <motion.div
                        animate={shouldReduceMotion ? {} : { y: [0, -3, 0] }}
                        transition={{
                          duration: 2,
                          repeat: Number.POSITIVE_INFINITY,
                          ease: "easeInOut",
                        }}
                        className="mb-3 sm:mb-4"
                      >
                        <Mail className="w-8 h-8 sm:w-10 sm:h-10 md:w-12 md:h-12 mx-auto text-blue-600" />
                      </motion.div>
                      <a
                        href="mailto:larryrasolohe@gmail.com"
                        className="text-blue-600 hover:underline text-sm sm:text-base break-all"
                      >
                        larryrasolohe@gmail.com
                      </a>
                    </CardContent>
                  </Card>
                </motion.div>
              </AnimatedSection>

              <AnimatedSection>
                <motion.div
                  whileHover={shouldReduceMotion ? {} : { scale: 1.02 }}
                  transition={{ duration: 0.2 }}
                  className="h-full"
                >
                  <Card className="h-full">
                    <CardContent className="p-4 sm:p-6 text-center">
                      <motion.div
                        animate={
                          shouldReduceMotion ? {} : { rotate: [0, 5, -5, 0] }
                        }
                        transition={{
                          duration: 3,
                          repeat: Number.POSITIVE_INFINITY,
                          ease: "easeInOut",
                        }}
                        className="mb-3 sm:mb-4"
                      >
                        <Linkedin className="w-8 h-8 sm:w-10 sm:h-10 md:w-12 md:h-12 mx-auto text-blue-600" />
                      </motion.div>
                      <a
                        href="https://www.linkedin.com/in/larry-hery-5b9b942a8/"
                        target="_blank"
                        rel="noopener noreferrer"
                        className="text-blue-600 hover:underline text-sm sm:text-base"
                      >
                        LinkedIn
                      </a>
                    </CardContent>
                  </Card>
                </motion.div>
              </AnimatedSection>
            </div>
          </div>
        </section>

        {/* Footer - Mobile Optimized */}
        <footer className="py-6 sm:py-8 px-3 sm:px-4 border-t dark:border-gray-700">
          <div className="max-w-6xl mx-auto">
            <div className="flex flex-wrap justify-center gap-4 sm:gap-6 md:gap-8 mb-4">
              {["about", "experience", "projects", "contact"].map((section) => (
                <button
                  key={section}
                  onClick={() => scrollToSection(section)}
                  className="hover:text-blue-600 transition-colors text-sm sm:text-base capitalize min-h-[44px] px-2"
                >
                  {section}
                </button>
              ))}
            </div>
            <p className="text-center text-gray-600 dark:text-gray-400 text-xs sm:text-sm leading-relaxed">
              Copyright © 2024 Larry Roots. All Rights Reserved.
            </p>
          </div>
        </footer>
      </div>
    </div>
  );
}
