"use client"

import type React from "react"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import {
  Mail,
  Phone,
  MapPin,
  Linkedin,
  Github,
  Send,
  Clock,
  MessageSquare,
  CheckCircle,
  AlertCircle,
  Star,
  Zap,
  Shield,
  Award,
  Code,
  Smartphone,
  Globe,
  Rocket,
} from "lucide-react"
import { useToast } from "@/hooks/use-toast"
import apiClient from "../api"

interface FormData {
  name: string
  email: string
  subject: string
  message: string
}

export const Contact = () => {
  const [formData, setFormData] = useState<FormData>({
    name: "",
    email: "",
    subject: "",
    message: "",
  })
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [submitStatus, setSubmitStatus] = useState<"idle" | "success" | "error">("idle")
  const { toast } = useToast()

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setIsSubmitting(true)
    setSubmitStatus("idle")

    try {
      await apiClient.post("/contact", formData)

      setSubmitStatus("success")
      toast({
        title: "Message sent successfully!",
        description: "Thank you for reaching out. I'll get back to you within 24 hours.",
      })

      // Reset form
      setFormData({ name: "", email: "", subject: "", message: "" })
    } catch (error) {
      setSubmitStatus("error")
      toast({
        title: "Failed to send message",
        description: "Please try again or contact me directly via email.",
        variant: "destructive",
      })
    } finally {
      setIsSubmitting(false)
    }
  }

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setFormData((prev) => ({ ...prev, [e.target.name]: e.target.value }))
  }

  const contactInfo = [
    {
      icon: Mail,
      title: "Email",
      value: "krishnachavan.tech@gmail.com",
      link: "mailto:krishnachavan.tech@gmail.com",
      description: "Best way to reach me",
    },
    {
      icon: Phone,
      title: "Phone",
      value: "9284769125",
      link: "tel:9284769125",
      description: "Available 9 AM - 8 PM IST",
    },
    {
      icon: MapPin,
      title: "Location",
      value: "India",
      link: "#",
      description: "Remote work available",
    },
    {
      icon: Linkedin,
      title: "LinkedIn",
      value: "Krishna Chavan",
      link: "https://www.linkedin.com/in/krishna-chavan-882516249",
      description: "Professional network",
    },
    {
      icon: Github,
      title: "GitHub",
      value: "Krishnachavan1930",
      link: "https://github.com/Krishnachavan1930",
      description: "View my code",
    },
  ]

  const services = [
    {
      icon: Code,
      title: "Full-Stack Development",
      description: "End-to-end web applications",
    },
    {
      icon: Smartphone,
      title: "Mobile Development",
      description: "iOS & Android applications",
    },
    {
      icon: Globe,
      title: "Web Design",
      description: "Modern & responsive designs",
    },
    {
      icon: Rocket,
      title: "Performance Optimization",
      description: "Fast & scalable solutions",
    },
  ]

  return (
    <section
      id="contact"
      className="min-h-screen py-8 sm:py-12 lg:py-20 bg-gradient-to-br from-slate-50 via-blue-50 to-indigo-50 relative overflow-hidden"
    >
      {/* Background Decorations */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute -top-40 -right-40 w-80 h-80 bg-gradient-to-br from-blue-400/20 to-purple-400/20 rounded-full blur-3xl"></div>
        <div className="absolute -bottom-40 -left-40 w-80 h-80 bg-gradient-to-tr from-purple-400/20 to-blue-400/20 rounded-full blur-3xl"></div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        {/* Header - Enhanced */}
        <div className="text-center mb-8 sm:mb-12 lg:mb-20">
          <div className="inline-flex items-center gap-2 px-4 py-2 bg-gradient-to-r from-blue-100 to-purple-100 text-blue-800 rounded-full text-xs sm:text-sm font-medium mb-4 border border-blue-200">
            <Star className="w-4 h-4" />
            GET IN TOUCH
          </div>
          <h2 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-bold mb-4 sm:mb-6 bg-gradient-to-r from-gray-900 via-blue-900 to-purple-900 bg-clip-text text-transparent leading-tight">
            Let's Work Together
          </h2>
          <p className="text-base sm:text-lg lg:text-xl text-gray-600 max-w-3xl mx-auto leading-relaxed px-4">
            Ready to bring your project to life? I'm here to help you build something amazing.
          </p>
        </div>

        {/* Main Content Grid */}
        <div className="space-y-6 lg:space-y-0 lg:grid lg:grid-cols-5 lg:gap-6 xl:gap-8 2xl:gap-12">
          {/* Left Column - Form and CTA */}
          <div className="order-2 lg:order-1 lg:col-span-3 space-y-6">
            {/* Contact Form */}
            <Card className="shadow-xl sm:shadow-2xl border-0 bg-white/90 backdrop-blur-sm overflow-hidden">
              <CardHeader className="pb-6 sm:pb-8 px-4 sm:px-6 bg-gradient-to-r from-blue-50/50 to-purple-50/50">
                <CardTitle className="text-xl sm:text-2xl lg:text-3xl font-bold flex items-center gap-2 sm:gap-3">
                  <div className="w-10 h-10 sm:w-12 sm:h-12 bg-gradient-to-r from-blue-600 to-purple-600 rounded-xl flex items-center justify-center">
                    <MessageSquare className="w-5 h-5 sm:w-6 sm:h-6 text-white" />
                  </div>
                  <span className="leading-tight">Send Me a Message</span>
                </CardTitle>
                <p className="text-sm sm:text-base text-gray-600 mt-2">
                  Fill out the form below and I'll get back to you within 24 hours.
                </p>
              </CardHeader>
              <CardContent className="px-4 sm:px-6">
                <form onSubmit={handleSubmit} className="space-y-4 sm:space-y-6">
                  {/* Name and Email */}
                  <div className="space-y-4 sm:space-y-6 md:grid md:grid-cols-2 md:gap-4 md:space-y-0 lg:gap-6">
                    <div className="space-y-2">
                      <label htmlFor="name" className="block text-sm font-semibold text-gray-700">
                        Full Name *
                      </label>
                      <Input
                        id="name"
                        name="name"
                        value={formData.name}
                        onChange={handleChange}
                        required
                        placeholder="Krishna Chavan"
                        className="h-11 sm:h-12 border-gray-200 focus:border-blue-500 focus:ring-blue-500 text-base transition-all duration-200"
                      />
                    </div>
                    <div className="space-y-2">
                      <label htmlFor="email" className="block text-sm font-semibold text-gray-700">
                        Email Address *
                      </label>
                      <Input
                        id="email"
                        name="email"
                        type="email"
                        value={formData.email}
                        onChange={handleChange}
                        required
                        placeholder="krishna@example.com"
                        className="h-11 sm:h-12 border-gray-200 focus:border-blue-500 focus:ring-blue-500 text-base transition-all duration-200"
                      />
                    </div>
                  </div>

                  <div className="space-y-2">
                    <label htmlFor="subject" className="block text-sm font-semibold text-gray-700">
                      Subject *
                    </label>
                    <Input
                      id="subject"
                      name="subject"
                      value={formData.subject}
                      onChange={handleChange}
                      required
                      placeholder="Project inquiry, consultation, etc."
                      className="h-11 sm:h-12 border-gray-200 focus:border-blue-500 focus:ring-blue-500 text-base transition-all duration-200"
                    />
                  </div>

                  <div className="space-y-2">
                    <label htmlFor="message" className="block text-sm font-semibold text-gray-700">
                      Message *
                    </label>
                    <Textarea
                      id="message"
                      name="message"
                      value={formData.message}
                      onChange={handleChange}
                      required
                      placeholder="Tell me about your project requirements, budget, timeline, and any specific features you need..."
                      rows={5}
                      className="border-gray-200 focus:border-blue-500 focus:ring-blue-500 resize-none text-base min-h-[120px] sm:min-h-[140px] transition-all duration-200"
                    />
                  </div>

                  <Button
                    type="submit"
                    disabled={isSubmitting}
                    className="w-full h-12 sm:h-14 bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 text-white font-semibold rounded-xl transition-all duration-300 hover:shadow-lg hover:scale-[1.02] disabled:opacity-50 text-base"
                  >
                    {isSubmitting ? (
                      <>
                        <div className="animate-spin rounded-full h-4 w-4 sm:h-5 sm:w-5 border-b-2 border-white mr-2 sm:mr-3"></div>
                        Sending...
                      </>
                    ) : (
                      <>
                        Send Message
                        <Send className="w-4 h-4 sm:w-5 sm:h-5 ml-2" />
                      </>
                    )}
                  </Button>

                  {/* Status Messages */}
                  {submitStatus === "success" && (
                    <div className="flex items-center gap-2 p-3 bg-green-50 border border-green-200 rounded-lg">
                      <CheckCircle className="w-5 h-5 text-green-600 flex-shrink-0" />
                      <p className="text-sm text-green-800">Message sent successfully!</p>
                    </div>
                  )}

                  {submitStatus === "error" && (
                    <div className="flex items-center gap-2 p-3 bg-red-50 border border-red-200 rounded-lg">
                      <AlertCircle className="w-5 h-5 text-red-600 flex-shrink-0" />
                      <p className="text-sm text-red-800">Failed to send message. Please try again.</p>
                    </div>
                  )}
                </form>
              </CardContent>
            </Card>

            {/* Enhanced CTA Section - Now positioned below form */}
            <div className="hidden lg:block">
              <Card className="shadow-2xl border-0 bg-gradient-to-br from-blue-600 via-purple-600 to-indigo-700 text-white overflow-hidden relative">
                {/* Background Pattern */}
                <div className="absolute inset-0 bg-gradient-to-br from-blue-600/90 to-purple-700/90"></div>
                <div className="absolute inset-0 opacity-10">
                  <div
                    className="absolute inset-0 bg-repeat"
                    style={{
                      backgroundImage: `url("data:image/svg+xml,%3Csvg width='60' height='60' viewBox='0 0 60 60' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='none' fillRule='evenodd'%3E%3Cg fill='%23ffffff' fillOpacity='0.4'%3E%3Ccircle cx='30' cy='30' r='2'/%3E%3C/g%3E%3C/g%3E%3C/svg%3E")`,
                    }}
                  ></div>
                </div>

                <CardContent className="p-6 lg:p-8 relative z-10">
                  <div className="text-center mb-6">
                    <div className="inline-flex items-center gap-2 px-4 py-2 bg-white/20 backdrop-blur-sm rounded-full text-sm font-medium mb-4">
                      <Zap className="w-4 h-4" />
                      {"Let's Build Something Amazing"}
                    </div>
                    <h3 className="text-2xl lg:text-3xl font-bold mb-4 leading-tight">
                      Transform Your Ideas Into Reality
                    </h3>
                    <p className="text-blue-100 text-base lg:text-lg leading-relaxed">
                      Whether it's a web application, mobile app, or custom solution, I'm here to help bring your vision
                      to life with cutting-edge technology.
                    </p>
                  </div>

                  {/* Services Grid */}
                  <div className="grid grid-cols-2 gap-4 mb-6">
                    {services.map((service, index) => (
                      <div
                        key={index}
                        className="bg-white/10 backdrop-blur-sm rounded-xl p-4 hover:bg-white/20 transition-all duration-300 hover:scale-105"
                      >
                        <div className="w-10 h-10 bg-white/20 rounded-lg flex items-center justify-center mb-3">
                          <service.icon className="w-5 h-5 text-white" />
                        </div>
                        <h4 className="font-semibold text-white mb-1 text-sm">{service.title}</h4>
                        <p className="text-blue-100 text-xs">{service.description}</p>
                      </div>
                    ))}
                  </div>

                  {/* Stats */}
                  <div className="grid grid-cols-3 gap-4 pt-6 border-t border-white/20">
                    <div className="text-center">
                      <div className="text-2xl font-bold text-white">5+</div>
                      <div className="text-blue-100 text-xs">Projects</div>
                    </div>
                    <div className="text-center">
                      <div className="text-2xl font-bold text-white">2+</div>
                      <div className="text-blue-100 text-xs">Years Exp</div>
                    </div>
                    <div className="text-center">
                      <div className="text-2xl font-bold text-white">24h</div>
                      <div className="text-blue-100 text-xs">Response</div>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </div>
          </div>

          {/* Right Column - Contact Information */}
          <div className="order-1 lg:order-2 lg:col-span-2 space-y-4 sm:space-y-6">
            {/* Contact Info Cards */}
            <div className="bg-white/90 backdrop-blur-sm rounded-2xl sm:rounded-3xl p-4 sm:p-6 lg:p-8 shadow-xl sm:shadow-2xl border-0">
              <h3 className="text-xl sm:text-2xl font-bold mb-4 sm:mb-6 text-gray-900 flex items-center gap-2">
                <div className="w-8 h-8 bg-gradient-to-r from-blue-600 to-purple-600 rounded-lg flex items-center justify-center">
                  <Mail className="w-4 h-4 text-white" />
                </div>
                Contact Information
              </h3>

              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-1 xl:grid-cols-2 gap-3 sm:gap-4 lg:gap-4 xl:gap-3">
                {contactInfo.map((info, index) => (
                  <a
                    key={index}
                    href={info.link}
                    className="flex items-start p-3 sm:p-4 lg:p-3 xl:p-4 bg-gradient-to-r from-blue-50 to-purple-50 rounded-xl hover:from-blue-100 hover:to-purple-100 transition-all duration-300 hover:-translate-y-1 hover:shadow-lg group border border-blue-100 min-h-[80px] sm:min-h-[90px]"
                  >
                    <div className="w-10 h-10 sm:w-12 sm:h-12 lg:w-10 lg:h-10 xl:w-12 xl:h-12 bg-gradient-to-r from-blue-600 to-purple-600 rounded-lg sm:rounded-xl flex items-center justify-center mr-3 sm:mr-4 lg:mr-3 xl:mr-4 group-hover:scale-110 transition-transform duration-300 shadow-lg flex-shrink-0">
                      <info.icon className="h-4 w-4 sm:h-6 sm:w-6 lg:h-5 lg:w-5 xl:h-6 xl:w-6 text-white" />
                    </div>
                    <div className="flex-1 min-w-0">
                      <h4 className="font-semibold text-gray-900 mb-1 text-sm sm:text-base lg:text-sm xl:text-base leading-tight">
                        {info.title}
                      </h4>
                      <p className="text-gray-800 font-medium text-xs sm:text-sm lg:text-xs xl:text-sm break-all leading-tight">
                        {info.value}
                      </p>
                      <p className="text-xs text-gray-500 mt-0.5 leading-tight">{info.description}</p>
                    </div>
                  </a>
                ))}
              </div>
            </div>

            {/* Quick Response Card */}
            <Card className="shadow-xl sm:shadow-2xl border-0 bg-gradient-to-br from-green-600 to-emerald-600 text-white overflow-hidden">
              <CardContent className="p-4 sm:p-6 lg:p-6 xl:p-8">
                <div className="flex items-center mb-3 sm:mb-4">
                  <div className="w-10 h-10 bg-white/20 rounded-lg flex items-center justify-center mr-3">
                    <Clock className="w-5 h-5 text-white" />
                  </div>
                  <h4 className="text-lg sm:text-xl font-bold">Quick Response</h4>
                </div>
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-1 xl:grid-cols-2 gap-2 sm:gap-3 lg:gap-2 xl:gap-3">
                  {[
                    { text: "Response within 24 hours", icon: "⚡" },
                    { text: "Free initial consultation", icon: "💬" },
                    { text: "Available for urgent projects", icon: "🚀" },
                    { text: "Competitive pricing", icon: "💰" },
                  ].map((item, index) => (
                    <div key={index} className="flex items-center text-sm sm:text-base lg:text-sm xl:text-base">
                      <span className="mr-2 text-base">{item.icon}</span>
                      <span className="text-green-100">{item.text}</span>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>

            {/* Why Choose Me Card */}
            <Card className="shadow-xl border-0 bg-gradient-to-br from-orange-500 to-red-500 text-white overflow-hidden">
              <CardContent className="p-4 sm:p-6 lg:p-6 xl:p-8">
                <div className="flex items-center mb-4">
                  <div className="w-10 h-10 bg-white/20 rounded-lg flex items-center justify-center mr-3">
                    <Award className="w-5 h-5 text-white" />
                  </div>
                  <h4 className="text-lg font-bold">Why Choose Me?</h4>
                </div>
                <div className="space-y-3">
                  {[
                    { icon: Shield, text: "Reliable & Professional" },
                    { icon: Zap, text: "Fast Delivery" },
                    { icon: Star, text: "Quality Guaranteed" },
                  ].map((item, index) => (
                    <div key={index} className="flex items-center gap-3">
                      <item.icon className="w-4 h-4 text-orange-200 flex-shrink-0" />
                      <span className="text-sm text-orange-100">{item.text}</span>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>

            {/* Mobile CTA Card */}
            <div className="block lg:hidden bg-gradient-to-r from-purple-600 to-blue-600 rounded-2xl p-4 text-white text-center">
              <h4 className="font-bold text-lg mb-2">Ready to Start?</h4>
              <p className="text-purple-100 text-sm">Fill out the form above and let's discuss your project!</p>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
