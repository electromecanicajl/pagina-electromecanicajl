"use client"

import type React from "react"

import { useState } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { Label } from "@/components/ui/label"
import { Phone, Mail, MapPin, Clock, MessageCircle, Send } from "lucide-react"

export function ContactSection() {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    service: "",
    message: "",
  })

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    const subject = encodeURIComponent(`Nuevo contacto desde la web - ${formData.name}`)
    const body = encodeURIComponent(`
Nuevo contacto desde la página web:

Nombre: ${formData.name}
Email: ${formData.email}
Teléfono: ${formData.phone}
Servicio de Interés: ${formData.service}
Mensaje: ${formData.message}

---
Este mensaje fue enviado desde el formulario de contacto de la página web.
    `)

    window.location.href = `mailto:electromecanicajl@gmail.com?subject=${subject}&body=${body}`

    const whatsappMessage = `Nuevo contacto desde la web:\n\nNombre: ${formData.name}\nEmail: ${formData.email}\nTeléfono: ${formData.phone}\nServicio: ${formData.service}\nMensaje: ${formData.message}`
    const whatsappUrl = `https://wa.me/3002680520?text=${encodeURIComponent(whatsappMessage)}`
    setTimeout(() => {
      window.open(whatsappUrl, "_blank")
    }, 1000)

    setFormData({ name: "", email: "", phone: "", service: "", message: "" })
  }

  const openWhatsApp = () => {
    const message = "Hola, me gustaría obtener más información sobre sus servicios."
    const whatsappUrl = `https://wa.me/3002680520?text=${encodeURIComponent(message)}`
    window.open(whatsappUrl, "_blank")
  }

  return (
    <section id="contacto" className="py-20 bg-muted/30">
      <div className="container mx-auto px-4">
        <div className="text-center mb-16">
          <h2 className="text-3xl lg:text-4xl font-bold text-balance mb-4">
            <span className="text-primary">Contacto</span>
          </h2>
          <p className="text-xl text-muted-foreground text-pretty max-w-2xl mx-auto">
            Estamos aquí para ayudarte. Contáctanos para cualquier consulta o solicitud de servicio.
          </p>
        </div>

        <div className="grid lg:grid-cols-2 gap-12">
          {/* Contact Information */}
          <div className="space-y-8">
            <div>
              <h3 className="text-2xl font-bold mb-6">Información de Contacto</h3>
              <div className="space-y-6">
                <div className="flex items-start space-x-4">
                  <div className="bg-primary/10 p-3 rounded-lg">
                    <Phone className="h-6 w-6 text-primary" />
                  </div>
                  <div>
                    <h4 className="font-semibold mb-1">Teléfono</h4>
                    <p className="text-muted-foreground">3002680520</p>
                  </div>
                </div>

                <div className="flex items-start space-x-4">
                  <div className="bg-accent/10 p-3 rounded-lg">
                    <Mail className="h-6 w-6 text-accent" />
                  </div>
                  <div>
                    <h4 className="font-semibold mb-1">Email</h4>
                    <p className="text-muted-foreground">electromecanicajl@gmail.com</p>
                  </div>
                </div>

                <div className="flex items-start space-x-4">
                  <div className="bg-secondary/10 p-3 rounded-lg">
                    <MapPin className="h-6 w-6 text-secondary" />
                  </div>
                  <div>
                    <h4 className="font-semibold mb-1">Dirección</h4>
                    <p className="text-muted-foreground">
                      Cra 9G #131-88
                      <br />
                      Barranquilla, Atlántico
                      <br />
                      Colombia
                    </p>
                  </div>
                </div>

                <div className="flex items-start space-x-4">
                  <div className="bg-primary/10 p-3 rounded-lg">
                    <Clock className="h-6 w-6 text-primary" />
                  </div>
                  <div>
                    <h4 className="font-semibold mb-1">Horarios</h4>
                    <p className="text-muted-foreground">
                      Lunes - Viernes: 8:00 AM - 6:00 PM
                      <br />
                      Sábados: 8:00 AM - 2:00 PM
                      <br />
                      Emergencias: 24/7
                    </p>
                  </div>
                </div>
              </div>
            </div>

            <Button size="lg" className="w-full animate-pulse-glow" onClick={openWhatsApp}>
              <MessageCircle className="mr-2 h-5 w-5" />
              Contactar por WhatsApp
            </Button>
          </div>

          {/* Contact Form */}
          <Card className="hover-lift">
            <CardHeader>
              <CardTitle>Envíanos un Mensaje</CardTitle>
              <CardDescription>
                Completa el formulario y nos pondremos en contacto contigo lo antes posible.
              </CardDescription>
            </CardHeader>
            <CardContent>
              <form onSubmit={handleSubmit} className="space-y-4">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <Label htmlFor="contact-name">Nombre *</Label>
                    <Input
                      id="contact-name"
                      value={formData.name}
                      onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                      required
                    />
                  </div>
                  <div>
                    <Label htmlFor="contact-phone">Teléfono *</Label>
                    <Input
                      id="contact-phone"
                      value={formData.phone}
                      onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                      required
                    />
                  </div>
                </div>

                <div>
                  <Label htmlFor="contact-email">Email *</Label>
                  <Input
                    id="contact-email"
                    type="email"
                    value={formData.email}
                    onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                    required
                  />
                </div>

                <div>
                  <Label htmlFor="contact-service">Servicio de Interés</Label>
                  <Input
                    id="contact-service"
                    value={formData.service}
                    onChange={(e) => setFormData({ ...formData, service: e.target.value })}
                    placeholder="Ej: Mantenimiento de plantas eléctricas"
                  />
                </div>

                <div>
                  <Label htmlFor="contact-message">Mensaje *</Label>
                  <Textarea
                    id="contact-message"
                    value={formData.message}
                    onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                    placeholder="Cuéntanos sobre tu proyecto o necesidad..."
                    required
                  />
                </div>

                <Button type="submit" className="w-full">
                  <Send className="mr-2 h-4 w-4" />
                  Enviar Mensaje
                </Button>
              </form>
            </CardContent>
          </Card>
        </div>
      </div>
    </section>
  )
}
