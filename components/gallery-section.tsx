"use client"

import { useState } from "react"
import { Card } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Dialog, DialogContent, DialogTrigger } from "@/components/ui/dialog"
import { ChevronLeft, ChevronRight, Play, Eye, Calendar, MapPin } from "lucide-react"

const galleryItems = [
  {
    id: 1,
    type: "image",
    src: "/electromecanica-jl/nuestros-trabajos/mantenimiento-planta-electrica.jpg",
    title: "Mantenimiento Planta Eléctrica 100KW",
    category: "Mantenimiento",
    date: "2024-01-15",
    location: "Zona Industrial Barranquilla",
    description: "Mantenimiento preventivo completo de planta eléctrica industrial",
  },
  {
    id: 2,
    type: "video",
    src: "/electromecanica-jl/nuestros-trabajos/reparacion-electrobomba.jpg",
    title: "Reparación Electrobomba Sumergible",
    category: "Reparación",
    date: "2024-01-10",
    location: "Soledad, Atlántico",
    description: "Proceso completo de reparación de electrobomba sumergible",
  },
  {
    id: 3,
    type: "image",
    src: "/electromecanica-jl/nuestros-trabajos/instalacion-sistema-bombeo.jpg",
    title: "Instalación Sistema de Bombeo",
    category: "Instalación",
    date: "2024-01-08",
    location: "Malambo, Atlántico",
    description: "Instalación de sistema de bombeo automático con tanque hidroneumático",
  },
  {
    id: 4,
    type: "image",
    src: "/electromecanica-jl/nuestros-trabajos/tablero-control-industrial.jpg",
    title: "Tablero de Control Industrial",
    category: "Instalación",
    date: "2024-01-05",
    location: "Puerto Colombia",
    description: "Instalación y configuración de tablero de control para maquinaria industrial",
  },
  {
    id: 5,
    type: "video",
    src: "/electromecanica-jl/nuestros-trabajos/restauracion-motor-electrico.jpg",
    title: "Antes y Después - Motor Eléctrico",
    category: "Restauración",
    date: "2024-01-03",
    location: "Taller JL - Barranquilla",
    description: "Proceso de restauración completa de motor eléctrico industrial",
  },
]

export function GallerySection() {
  const [selectedItem, setSelectedItem] = useState<(typeof galleryItems)[0] | null>(null)
  const [currentIndex, setCurrentIndex] = useState(0)
  const [filter, setFilter] = useState("all")

  const categories = ["all", "Mantenimiento", "Reparación", "Instalación", "Restauración"]

  const filteredItems = filter === "all" ? galleryItems : galleryItems.filter((item) => item.category === filter)

  const nextItem = () => {
    setCurrentIndex((prev) => (prev + 1) % filteredItems.length)
  }

  const prevItem = () => {
    setCurrentIndex((prev) => (prev - 1 + filteredItems.length) % filteredItems.length)
  }

  return (
    <section className="py-20 bg-muted/30 relative overflow-hidden">
      {/* Animated background */}
      <div className="absolute inset-0 overflow-hidden">
        <div className="absolute top-1/3 left-1/3 w-72 h-72 bg-secondary/5 rounded-full blur-3xl animate-float"></div>
        <div className="absolute bottom-1/3 right-1/3 w-96 h-96 bg-primary/5 rounded-full blur-3xl animate-float-delayed"></div>
      </div>

      <div className="container mx-auto px-4 relative z-10">
        <div className="text-center mb-16">
          <div className="inline-flex items-center px-4 py-2 bg-secondary/10 rounded-full mb-4 animate-bounce-subtle">
            <Eye className="h-4 w-4 text-secondary mr-2" />
            <span className="text-sm font-medium text-secondary">Galería de Proyectos</span>
          </div>

          <h2 className="text-3xl lg:text-4xl font-bold text-balance mb-4">
            Nuestros <span className="text-secondary animate-gradient-text">Trabajos</span>
          </h2>
          <p className="text-xl text-muted-foreground text-pretty max-w-2xl mx-auto">
            Explora algunos de nuestros proyectos más destacados y conoce la calidad de nuestro trabajo
          </p>
        </div>

        {/* Filter buttons */}
        <div className="flex flex-wrap justify-center gap-2 mb-12">
          {categories.map((category, index) => (
            <Button
              key={category}
              variant={filter === category ? "default" : "outline"}
              size="sm"
              onClick={() => setFilter(category)}
              className={`animate-fade-in-up stagger-${index + 1} hover:scale-105 transition-transform`}
            >
              {category === "all" ? "Todos" : category}
            </Button>
          ))}
        </div>

        {/* Gallery grid */}
        <div className="mosaic-grid mb-12">
          {filteredItems.map((item, index) => (
            <Dialog key={item.id}>
              <DialogTrigger asChild>
                <Card
                  className="mosaic-item cursor-pointer group animate-mosaic-reveal overflow-hidden"
                  style={{ animationDelay: `${index * 0.1}s` }}
                  onClick={() => setSelectedItem(item)}
                >
                  <div className="relative">
                    <img
                      src={item.src || "/placeholder.svg"}
                      alt={item.title}
                      className="w-full h-48 object-cover transition-transform duration-500 group-hover:scale-110"
                    />

                    {/* Video indicator */}
                    {item.type === "video" && (
                      <div className="absolute inset-0 flex items-center justify-center">
                        <div className="bg-white/90 backdrop-blur-sm rounded-full p-3 animate-pulse-subtle">
                          <Play className="h-6 w-6 text-primary ml-1" />
                        </div>
                      </div>
                    )}

                    {/* Overlay */}
                    <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/20 to-transparent"></div>

                    {/* Glass effect on hover */}
                    <div className="absolute inset-0 glass-effect opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>

                    {/* Content */}
                    <div className="absolute bottom-4 left-4 right-4">
                      <Badge variant="secondary" className="mb-2 text-xs">
                        {item.category}
                      </Badge>
                      <h3 className="text-white font-semibold text-sm mb-1 line-clamp-2">{item.title}</h3>
                      <div className="flex items-center text-white/80 text-xs space-x-2">
                        <Calendar className="h-3 w-3" />
                        <span>{new Date(item.date).toLocaleDateString()}</span>
                        <MapPin className="h-3 w-3 ml-2" />
                        <span className="truncate">{item.location}</span>
                      </div>
                    </div>
                  </div>
                </Card>
              </DialogTrigger>

              <DialogContent className="max-w-4xl">
                <div className="relative">
                  <img
                    src={selectedItem?.src || item.src}
                    alt={selectedItem?.title || item.title}
                    className="w-full h-96 object-cover rounded-lg"
                  />

                  {selectedItem?.type === "video" && (
                    <div className="absolute inset-0 flex items-center justify-center">
                      <Button size="lg" className="animate-pulse-glow">
                        <Play className="h-6 w-6 mr-2" />
                        Reproducir Video
                      </Button>
                    </div>
                  )}
                </div>

                <div className="mt-4">
                  <div className="flex items-center justify-between mb-2">
                    <Badge variant="outline">{selectedItem?.category || item.category}</Badge>
                    <div className="flex items-center text-sm text-muted-foreground space-x-4">
                      <div className="flex items-center space-x-1">
                        <Calendar className="h-4 w-4" />
                        <span>{new Date(selectedItem?.date || item.date).toLocaleDateString()}</span>
                      </div>
                      <div className="flex items-center space-x-1">
                        <MapPin className="h-4 w-4" />
                        <span>{selectedItem?.location || item.location}</span>
                      </div>
                    </div>
                  </div>
                  <h3 className="text-xl font-bold mb-2">{selectedItem?.title || item.title}</h3>
                  <p className="text-muted-foreground">{selectedItem?.description || item.description}</p>
                </div>

                {/* Navigation */}
                <div className="flex justify-between items-center mt-4">
                  <Button variant="outline" onClick={prevItem}>
                    <ChevronLeft className="h-4 w-4 mr-2" />
                    Anterior
                  </Button>
                  <span className="text-sm text-muted-foreground">
                    {currentIndex + 1} de {filteredItems.length}
                  </span>
                  <Button variant="outline" onClick={nextItem}>
                    Siguiente
                    <ChevronRight className="h-4 w-4 ml-2" />
                  </Button>
                </div>
              </DialogContent>
            </Dialog>
          ))}
        </div>
      </div>
    </section>
  )
}
