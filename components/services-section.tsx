"use client"

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Zap, Droplets, Cog, Settings, MessageCircle, ArrowRight, Star } from "lucide-react"
import { useState } from "react"

const services = [
  {
    icon: Zap,
    title: "Mantenimiento de Plantas Eléctricas",
    description:
      "Servicio completo de mantenimiento preventivo, correctivo, tipo A y tipo B para plantas eléctricas de todas las marcas.",
    features: [
      "Mantenimiento preventivo",
      "Mantenimiento correctivo",
      "Mantenimiento tipo A y B",
      "Repuestos originales",
    ],
    image: "/placeholder-5fupr.png",
    rating: 4.9,
    projects: 150,
  },
  {
    icon: Droplets,
    title: "Mantenimiento de Electrobombas",
    description: "Especialistas en mantenimiento y reparación de sistemas de bombeo para uso residencial e industrial.",
    features: ["Diagnóstico completo", "Reparación de motores", "Cambio de sellos", "Optimización de rendimiento"],
    image: "/placeholder-ctdoc.png",
    rating: 4.8,
    projects: 200,
  },
  {
    icon: Cog,
    title: "Mantenimiento de Sistemas de Bombeo",
    description: "Servicio integral para sistemas de bombeo, incluyendo instalación y optimización.",
    features: ["Instalación profesional", "Mantenimiento programado", "Monitoreo de sistemas", "Soporte técnico"],
    image: "/placeholder-5di46.png",
    rating: 4.9,
    projects: 120,
  },
  {
    icon: Settings,
    title: "Adecuación de Tableros de Transferencias",
    description:
      "Instalación y adecuación de tableros de transferencia automática para sistemas de respaldo eléctrico.",
    features: [
      "Instalación profesional",
      "Configuración automática",
      "Pruebas de funcionamiento",
      "Certificación técnica",
    ],
    image: "/placeholder-37hz8.png",
    rating: 4.8,
    projects: 85,
  },
]

export function ServicesSection() {
  const [hoveredCard, setHoveredCard] = useState<number | null>(null)

  const openWhatsApp = (service: string) => {
    const message = `Hola, me interesa el servicio de ${service}. ¿Podrían proporcionarme más información?`
    const whatsappUrl = `https://wa.me/1234567890?text=${encodeURIComponent(message)}`
    window.open(whatsappUrl, "_blank")
  }

  return (
    <section id="servicios" className="py-20 bg-muted/30 relative overflow-hidden">
      <div className="absolute inset-0 overflow-hidden">
        <div className="absolute top-0 left-1/4 w-32 h-32 bg-primary/5 rounded-full blur-2xl animate-float"></div>
        <div className="absolute bottom-0 right-1/4 w-48 h-48 bg-accent/5 rounded-full blur-3xl animate-float-delayed"></div>
      </div>

      <div className="container mx-auto px-4 relative z-10">
        <div className="text-center mb-16">
          <div className="inline-flex items-center px-4 py-2 bg-white rounded-full mb-4 animate-bounce-subtle shadow-lg">
            <Star className="h-4 w-4 text-primary mr-2" />
            <span className="text-sm font-medium text-primary">Servicios de Excelencia</span>
          </div>

          <h2 className="text-3xl lg:text-4xl font-bold text-balance mb-4">
            Nuestros <span className="text-primary">Servicios</span>
          </h2>
          <p className="text-xl text-muted-foreground text-pretty max-w-2xl mx-auto">
            Ofrecemos servicios especializados en mantenimiento electromecánico con la más alta calidad y
            profesionalismo.
          </p>
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-2 gap-8">
          {services.map((service, index) => (
            <Card
              key={index}
              className={`hover-lift bg-card border-border hover:border-primary/20 transition-all duration-500 overflow-hidden group ${
                hoveredCard === index ? "scale-105 shadow-2xl" : ""
              }`}
              onMouseEnter={() => setHoveredCard(index)}
              onMouseLeave={() => setHoveredCard(null)}
            >
              <div className="relative h-48 overflow-hidden">
                <img
                  src={service.image || "/placeholder.svg"}
                  alt={service.title}
                  className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-black/20 to-transparent"></div>

                {/* Stats overlay */}
                <div className="absolute top-4 right-4 bg-white/90 backdrop-blur-sm rounded-lg p-2">
                  <div className="flex items-center space-x-1">
                    <Star className="h-4 w-4 text-yellow-500 fill-current" />
                    <span className="text-sm font-medium">{service.rating}</span>
                  </div>
                </div>

                <div className="absolute bottom-4 left-4 bg-white/90 backdrop-blur-sm rounded-lg p-2">
                  <span className="text-sm font-medium text-primary">{service.projects}+ proyectos</span>
                </div>
              </div>

              <CardHeader>
                <div className="flex items-center space-x-4">
                  <div className="bg-primary/10 p-3 rounded-lg group-hover:bg-primary/20 transition-colors">
                    <service.icon className="h-8 w-8 text-primary" />
                  </div>
                  <div>
                    <CardTitle className="text-xl text-balance group-hover:text-primary transition-colors">
                      {service.title}
                    </CardTitle>
                  </div>
                </div>
                <CardDescription className="text-pretty leading-relaxed">{service.description}</CardDescription>
              </CardHeader>

              <CardContent>
                <div className="grid grid-cols-2 gap-2 mb-6">
                  {service.features.map((feature, featureIndex) => (
                    <div
                      key={featureIndex}
                      className="flex items-center space-x-2 animate-fade-in-up"
                      style={{ animationDelay: `${featureIndex * 0.1}s` }}
                    >
                      <div className="w-2 h-2 bg-accent rounded-full animate-pulse"></div>
                      <span className="text-sm">{feature}</span>
                    </div>
                  ))}
                </div>

                <Button
                  variant="outline"
                  className="w-full group bg-transparent hover:bg-primary hover:text-white transition-all duration-300"
                  onClick={() => openWhatsApp(service.title)}
                >
                  <MessageCircle className="mr-2 h-4 w-4" />
                  Consultar por WhatsApp
                  <ArrowRight className="ml-2 h-4 w-4 group-hover:translate-x-1 transition-transform" />
                </Button>
              </CardContent>
            </Card>
          ))}
        </div>

        <div className="mt-20">
          <h3 className="text-2xl font-bold text-center mb-12">
            Proyectos <span className="text-primary">Destacados</span>
          </h3>

          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            {[
              { image: "/placeholder-2u968.png", title: "Instalación Industrial" },
              { image: "/placeholder-ytrx0.png", title: "Mantenimiento Planta" },
              { image: "/placeholder-qok5r.png", title: "Sistema de Bombeo" },
              { image: "/placeholder-ni2ka.png", title: "Tablero de Control" },
            ].map((project, index) => (
              <div
                key={index}
                className="relative group cursor-pointer animate-fade-in-up"
                style={{ animationDelay: `${index * 0.1}s` }}
              >
                <img
                  src={project.image || "/placeholder.svg"}
                  alt={project.title}
                  className="w-full h-32 object-cover rounded-lg transition-transform duration-300 group-hover:scale-105"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/80 to-transparent rounded-lg opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
                <div className="absolute bottom-2 left-2 bg-black/70 backdrop-blur-sm rounded px-2 py-1 text-white text-sm font-medium opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                  {project.title}
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  )
}
