"use client"

import { Button } from "@/components/ui/button"
import { ArrowRight, Zap, Shield, Clock, Play } from "lucide-react"
import { useState } from "react"
import Image from "next/image"

export function HeroSection() {
  const [isVideoPlaying, setIsVideoPlaying] = useState(false)

  const scrollToContact = () => {
    const message = "Hola, me gustaría solicitar una cotización para sus servicios electromecánicos."
    const whatsappUrl = `https://wa.me/3002680520?text=${encodeURIComponent(message)}`
    window.open(whatsappUrl, "_blank")
  }

  const scrollToServices = () => {
    const servicesSection = document.getElementById("servicios")
    if (servicesSection) {
      servicesSection.scrollIntoView({ behavior: "smooth" })
    }
  }

  return (
    <section
      id="inicio"
      className="relative bg-gradient-to-br from-primary/5 via-accent/5 to-secondary/5 py-20 lg:py-32 overflow-hidden"
    >
      <div className="absolute inset-0 overflow-hidden">
        <div className="absolute top-1/4 left-1/4 w-64 h-64 bg-primary/10 rounded-full blur-3xl animate-float"></div>
        <div className="absolute bottom-1/4 right-1/4 w-96 h-96 bg-accent/10 rounded-full blur-3xl animate-float-delayed"></div>
        <div className="absolute top-1/2 left-1/2 w-32 h-32 bg-secondary/10 rounded-full blur-2xl animate-pulse"></div>
        <div className="absolute top-1/2 right-10 opacity-5 animate-float-slow">
          <Image src="/images/logo-oficial.png" alt="" width={200} height={200} className="pointer-events-none" />
        </div>
      </div>

      <div className="container mx-auto px-4 relative z-10">
        <div className="grid lg:grid-cols-2 gap-12 items-center">
          {/* Content */}
          <div className="animate-slide-in-left">
            <div className="inline-flex items-center px-4 py-2 bg-white rounded-full mb-6 animate-bounce-subtle shadow-lg">
              <Zap className="h-4 w-4 text-primary mr-2" />
              <span className="text-sm font-medium text-primary">9 años de experiencia</span>
            </div>

            <h1 className="text-4xl lg:text-6xl font-bold text-balance mb-6">
              <span className="text-foreground font-extrabold">Electromecánica JL</span>
              <br />
              <span className="text-foreground">Servicios Profesionales</span>
            </h1>
            <p className="text-xl text-muted-foreground text-pretty mb-8 leading-relaxed">
              Empresa líder en servicios electromecánicos con 9 años de experiencia. Ofrecemos mantenimiento
              especializado, productos de calidad y atención personalizada.
            </p>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-8">
              <div className="flex items-center space-x-3 animate-fade-in-up" style={{ animationDelay: "0.1s" }}>
                <div className="bg-primary/10 p-2 rounded-lg hover:bg-primary/20 transition-colors">
                  <Zap className="h-5 w-5 text-primary" />
                </div>
                <span className="text-sm font-medium">Servicio Rápido</span>
              </div>
              <div className="flex items-center space-x-3 animate-fade-in-up" style={{ animationDelay: "0.2s" }}>
                <div className="bg-accent/10 p-2 rounded-lg hover:bg-accent/20 transition-colors">
                  <Shield className="h-5 w-5 text-accent" />
                </div>
                <span className="text-sm font-medium">Garantía Total</span>
              </div>
              <div className="flex items-center space-x-3 animate-fade-in-up" style={{ animationDelay: "0.3s" }}>
                <div className="bg-secondary/10 p-2 rounded-lg hover:bg-secondary/20 transition-colors">
                  <Clock className="h-5 w-5 text-secondary" />
                </div>
                <span className="text-sm font-medium">24/7 Disponible</span>
              </div>
            </div>

            <div className="flex flex-col sm:flex-row gap-4">
              <Button
                size="lg"
                className="animate-pulse-glow hover:scale-105 transition-transform"
                onClick={scrollToContact}
              >
                Solicitar Cotización
                <ArrowRight className="ml-2 h-5 w-5" />
              </Button>
              <Button
                variant="outline"
                size="lg"
                className="hover:scale-105 transition-transform bg-transparent"
                onClick={scrollToServices}
              >
                Ver Servicios
              </Button>
            </div>
          </div>

          <div className="animate-fade-in-up">
            <div className="relative">
              {/* Main image with overlay */}
              <div className="relative group cursor-pointer" onClick={() => setIsVideoPlaying(!isVideoPlaying)}>
                <img
                  src="/placeholder-qj6w1.png"
                  alt="Taller Electromecánico Profesional"
                  className="rounded-2xl shadow-2xl w-full h-auto transition-transform group-hover:scale-105"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-primary/30 to-transparent rounded-2xl"></div>

                {/* Video play button */}
                <div className="absolute inset-0 flex items-center justify-center">
                  <div className="bg-white/90 backdrop-blur-sm rounded-full p-4 hover:bg-white transition-colors animate-pulse-subtle">
                    <Play className="h-8 w-8 text-primary ml-1" />
                  </div>
                </div>
              </div>

              <div className="absolute -top-4 -right-4 bg-white rounded-lg shadow-lg p-3 animate-float">
                <img src="/placeholder-7zhgl.png" alt="Motor eléctrico" className="w-16 h-16 rounded-lg object-cover" />
              </div>

              <div className="absolute -bottom-4 -left-4 bg-white rounded-lg shadow-lg p-3 animate-float-delayed">
                <img src="/placeholder-i1hq3.png" alt="Electrobomba" className="w-16 h-16 rounded-lg object-cover" />
              </div>

              <div className="absolute top-1/2 -right-8 bg-white rounded-lg shadow-lg p-3 animate-bounce-subtle">
                <img
                  src="/placeholder-d0k6m.png"
                  alt="Tablero eléctrico"
                  className="w-16 h-16 rounded-lg object-cover"
                />
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
