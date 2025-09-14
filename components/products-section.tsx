"use client"

import type React from "react"
import { useState } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { Label } from "@/components/ui/label"
import { MessageCircle, Eye, ShoppingCart, Star, ArrowRight, Package } from "lucide-react"
import Link from "next/link"

const mainProduct = {
  id: 1,
  name: "Repuestos y Accesorios",
  category: "Repuestos",
  price: "Varios",
  image: "/placeholder.svg?height=300&width=400&text=Repuestos+y+Accesorios+Electromecánicos",
  description:
    "Amplio catálogo de repuestos originales y accesorios para equipos electromecánicos de todas las marcas.",
  features: [
    "Repuestos originales certificados",
    "Filtros y lubricantes especializados",
    "Sellos, empaques y juntas",
    "Componentes eléctricos industriales",
    "Accesorios para mantenimiento",
    "Herramientas especializadas",
  ],
  inStock: true,
  rating: 4.8,
  sales: 256,
}

const accessoryCategories = [
  {
    image: "/placeholder.svg?height=200&width=300&text=Filtros+y+Lubricantes",
    title: "Filtros y Lubricantes",
    category: "Mantenimiento",
    description: "Filtros de aire, aceite y combustible. Lubricantes industriales.",
  },
  {
    image: "/placeholder.svg?height=200&width=300&text=Sellos+y+Empaques",
    title: "Sellos y Empaques",
    category: "Sellado",
    description: "Sellos mecánicos, empaques, juntas y retenes.",
  },
  {
    image: "/placeholder.svg?height=200&width=300&text=Componentes+Eléctricos",
    title: "Componentes Eléctricos",
    category: "Eléctricos",
    description: "Contactores, relés, fusibles y componentes de control.",
  },
  {
    image: "/placeholder.svg?height=200&width=300&text=Herramientas+Especializadas",
    title: "Herramientas Especializadas",
    category: "Herramientas",
    description: "Herramientas para mantenimiento y reparación especializada.",
  },
  {
    image: "/placeholder.svg?height=200&width=300&text=Repuestos+Motores",
    title: "Repuestos para Motores",
    category: "Motores",
    description: "Rodamientos, carbones, bobinas y repuestos para motores.",
  },
]

export function ProductsSection() {
  const [selectedProduct, setSelectedProduct] = useState<typeof mainProduct | null>(null)
  const [inquiryForm, setInquiryForm] = useState({
    name: "",
    email: "",
    phone: "",
    message: "",
  })

  const openWhatsApp = (productName: string) => {
    const message = `Hola, me interesa información sobre: ${productName}. ¿Podrían proporcionarme más detalles y precios?`
    const whatsappUrl = `https://wa.me/3002680520?text=${encodeURIComponent(message)}`
    window.open(whatsappUrl, "_blank")
  }

  const handleInquirySubmit = (e: React.FormEvent) => {
    e.preventDefault()
    const message = `Consulta sobre ${selectedProduct?.name}:\n\nNombre: ${inquiryForm.name}\nEmail: ${inquiryForm.email}\nTeléfono: ${inquiryForm.phone}\nMensaje: ${inquiryForm.message}`
    const whatsappUrl = `https://wa.me/3002680520?text=${encodeURIComponent(message)}`
    window.open(whatsappUrl, "_blank")
    setInquiryForm({ name: "", email: "", phone: "", message: "" })
  }

  return (
    <section id="productos" className="py-20 relative overflow-hidden">
      <div className="absolute inset-0 overflow-hidden">
        <div className="absolute top-1/4 right-1/4 w-64 h-64 bg-accent/5 rounded-full blur-3xl animate-float"></div>
        <div className="absolute bottom-1/4 left-1/4 w-96 h-96 bg-primary/5 rounded-full blur-3xl animate-float-delayed"></div>
      </div>

      <div className="container mx-auto px-4 relative z-10">
        <div className="text-center mb-16">
          <div className="inline-flex items-center px-4 py-2 bg-white rounded-full mb-4 animate-bounce-subtle shadow-lg">
            <Package className="h-4 w-4 text-primary mr-2" />
            <span className="text-sm font-medium text-primary">Repuestos de Calidad</span>
          </div>

          <h2 className="text-3xl lg:text-4xl font-bold text-balance mb-4">
            <span className="text-primary">Repuestos y Accesorios</span>
          </h2>
          <p className="text-xl text-muted-foreground text-pretty max-w-2xl mx-auto">
            Ofrecemos repuestos originales y accesorios de la más alta calidad para equipos electromecánicos de todas
            las marcas.
          </p>
        </div>

        <div className="max-w-4xl mx-auto mb-20">
          <Card className="hover-lift overflow-hidden group transition-all duration-500">
            <div className="grid md:grid-cols-2 gap-0">
              <div className="relative overflow-hidden">
                <img
                  src={mainProduct.image || "/placeholder.svg"}
                  alt={mainProduct.name}
                  className="w-full h-64 md:h-full object-cover transition-transform duration-500 group-hover:scale-110"
                />
                <div className="absolute inset-0 bg-gradient-to-r from-black/60 via-black/20 to-transparent"></div>

                <div className="absolute top-4 left-4">
                  <Badge variant="default" className="animate-pulse-subtle">
                    En Stock
                  </Badge>
                </div>

                <div className="absolute bottom-4 left-4 flex items-center space-x-2">
                  <div className="bg-white/90 backdrop-blur-sm rounded-lg px-2 py-1 flex items-center space-x-1">
                    <Star className="h-3 w-3 text-yellow-500 fill-current" />
                    <span className="text-xs font-medium">{mainProduct.rating}</span>
                  </div>
                  <div className="bg-primary/90 backdrop-blur-sm rounded-lg px-2 py-1">
                    <span className="text-xs font-medium text-white">{mainProduct.sales}+ productos</span>
                  </div>
                </div>
              </div>

              <div className="p-8">
                <CardHeader className="p-0 mb-4">
                  <CardTitle className="text-2xl group-hover:text-primary transition-colors">
                    {mainProduct.name}
                  </CardTitle>
                  <CardDescription className="text-pretty text-base">{mainProduct.description}</CardDescription>
                </CardHeader>

                <CardContent className="p-0">
                  <div className="space-y-3 mb-6">
                    {mainProduct.features.slice(0, 4).map((feature, index) => (
                      <div key={index} className="flex items-center space-x-2">
                        <div className="w-2 h-2 bg-primary rounded-full"></div>
                        <span className="text-sm">{feature}</span>
                      </div>
                    ))}
                  </div>

                  <div className="flex flex-col sm:flex-row gap-3">
                    <Dialog>
                      <DialogTrigger asChild>
                        <Button
                          variant="outline"
                          onClick={() => setSelectedProduct(mainProduct)}
                          className="hover:scale-105 transition-transform"
                        >
                          <Eye className="mr-2 h-4 w-4" />
                          Ver Detalles
                        </Button>
                      </DialogTrigger>
                      <DialogContent className="max-w-2xl">
                        <DialogHeader>
                          <DialogTitle>{selectedProduct?.name}</DialogTitle>
                          <DialogDescription>{selectedProduct?.description}</DialogDescription>
                        </DialogHeader>

                        {selectedProduct && (
                          <div className="space-y-4">
                            <img
                              src={selectedProduct.image || "/placeholder.svg"}
                              alt={selectedProduct.name}
                              className="w-full h-64 object-cover rounded-lg"
                            />

                            <div>
                              <h4 className="font-semibold mb-2">Características:</h4>
                              <ul className="space-y-1">
                                {selectedProduct.features.map((feature, index) => (
                                  <li key={index} className="flex items-center space-x-2">
                                    <div className="w-2 h-2 bg-primary rounded-full"></div>
                                    <span className="text-sm">{feature}</span>
                                  </li>
                                ))}
                              </ul>
                            </div>

                            <form onSubmit={handleInquirySubmit} className="space-y-4">
                              <div className="grid grid-cols-2 gap-4">
                                <div>
                                  <Label htmlFor="name">Nombre</Label>
                                  <Input
                                    id="name"
                                    value={inquiryForm.name}
                                    onChange={(e) => setInquiryForm({ ...inquiryForm, name: e.target.value })}
                                    required
                                  />
                                </div>
                                <div>
                                  <Label htmlFor="phone">Teléfono</Label>
                                  <Input
                                    id="phone"
                                    value={inquiryForm.phone}
                                    onChange={(e) => setInquiryForm({ ...inquiryForm, phone: e.target.value })}
                                    required
                                  />
                                </div>
                              </div>
                              <div>
                                <Label htmlFor="email">Email</Label>
                                <Input
                                  id="email"
                                  type="email"
                                  value={inquiryForm.email}
                                  onChange={(e) => setInquiryForm({ ...inquiryForm, email: e.target.value })}
                                  required
                                />
                              </div>
                              <div>
                                <Label htmlFor="message">Mensaje</Label>
                                <Textarea
                                  id="message"
                                  value={inquiryForm.message}
                                  onChange={(e) => setInquiryForm({ ...inquiryForm, message: e.target.value })}
                                  placeholder="Cuéntanos qué repuesto o accesorio necesitas..."
                                />
                              </div>
                              <Button type="submit" className="w-full">
                                <MessageCircle className="mr-2 h-4 w-4" />
                                Enviar Consulta por WhatsApp
                              </Button>
                            </form>
                          </div>
                        )}
                      </DialogContent>
                    </Dialog>

                    <Button
                      className="flex-1 hover:scale-105 transition-transform"
                      onClick={() => openWhatsApp(mainProduct.name)}
                    >
                      <ShoppingCart className="mr-2 h-4 w-4" />
                      Consultar Precios
                    </Button>
                  </div>
                </CardContent>
              </div>
            </div>
          </Card>
        </div>

        <div className="mb-20">
          <div className="text-center mb-12">
            <h3 className="text-2xl lg:text-3xl font-bold text-balance mb-4">
              Categorías de <span className="text-accent animate-gradient-text">Repuestos</span>
            </h3>
            <p className="text-lg text-muted-foreground">Explora nuestras categorías especializadas</p>
          </div>

          <div className="mosaic-grid">
            {accessoryCategories.map((category, index) => (
              <div
                key={index}
                className={`mosaic-item animate-mosaic-reveal stagger-${index + 1} cursor-pointer group`}
                onClick={() => openWhatsApp(category.title)}
              >
                <div className="relative overflow-hidden">
                  <img
                    src={category.image || "/placeholder.svg"}
                    alt={category.title}
                    className="w-full h-48 object-cover transition-transform duration-500 group-hover:scale-110"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/20 to-transparent"></div>

                  <div className="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-center justify-center">
                    <div className="text-center text-white bg-black/60 backdrop-blur-sm rounded-lg px-4 py-2">
                      <Package className="h-8 w-8 mx-auto mb-2 animate-pulse" />
                      <p className="font-medium">Ver Categoría</p>
                    </div>
                  </div>

                  <div className="absolute bottom-4 left-4 right-4">
                    <div className="bg-black/70 backdrop-blur-sm rounded-lg p-3 text-white">
                      <h4 className="font-semibold text-sm mb-1">{category.title}</h4>
                      <p className="text-xs text-white/90 mb-2">{category.description}</p>
                      <Badge variant="secondary" className="text-xs bg-white/20 text-white border-white/30">
                        {category.category}
                      </Badge>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>

        <div className="text-center bg-gradient-to-r from-primary/10 via-accent/10 to-secondary/10 rounded-2xl p-8 animate-scale-in">
          <h3 className="text-2xl font-bold mb-4">¿Necesitas ver nuestro catálogo completo?</h3>
          <p className="text-muted-foreground mb-6">
            Explora nuestro catálogo completo con búsqueda avanzada, filtros y sistema de presupuestos
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link href="/catalogo">
              <Button size="lg" className="animate-pulse-glow">
                <Package className="mr-2 h-5 w-5" />
                Ver Catálogo Completo
                <ArrowRight className="ml-2 h-5 w-5" />
              </Button>
            </Link>
            <Button
              size="lg"
              variant="outline"
              onClick={() => openWhatsApp("Consulta general sobre repuestos y accesorios")}
            >
              <MessageCircle className="mr-2 h-5 w-5" />
              Consultar por WhatsApp
            </Button>
          </div>
        </div>
      </div>
    </section>
  )
}
