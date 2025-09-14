"use client"

import Image from "next/image"
import { Button } from "@/components/ui/button"
import { Phone, Mail, MapPin, Facebook, Instagram, MessageCircle } from "lucide-react"

export function Footer() {
  const openWhatsApp = () => {
    const message = "Hola, me gustaría obtener más información sobre sus servicios."
    const whatsappUrl = `https://wa.me/3002680520?text=${encodeURIComponent(message)}`
    window.open(whatsappUrl, "_blank")
  }

  const openSocialMedia = (platform: string) => {
    const urls = {
      facebook: "https://facebook.com/electromecanicajl",
      instagram: "https://instagram.com/electromecanicajl",
    }
    window.open(urls[platform as keyof typeof urls], "_blank")
  }

  return (
    <footer className="bg-foreground text-background">
      <div className="container mx-auto px-4 py-12">
        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
          {/* Company Info */}
          <div className="lg:col-span-2">
            <div className="flex items-center space-x-3 mb-4">
              <div className="relative">
                <Image
                  src="/images/logo-oficial.png"
                  alt="Electromecánica JL"
                  width={50}
                  height={50}
                  className="hover:scale-105 transition-transform duration-300"
                />
              </div>
              <div>
                <h3 className="text-xl font-bold text-white">Electromecánica JL</h3>
                <p className="text-sm text-gray-300">Servicios Profesionales</p>
              </div>
            </div>
            <p className="text-gray-300 text-pretty leading-relaxed mb-6">
              Empresa líder en servicios electromecánicos con 9 años de experiencia. Ofrecemos mantenimiento
              especializado, productos de calidad y atención personalizada para satisfacer todas sus necesidades
              industriales y comerciales.
            </p>
            <div className="flex space-x-4">
              <Button
                variant="outline"
                size="icon"
                className="bg-transparent border-gray-600 text-gray-300 hover:bg-primary hover:text-white"
                onClick={() => openSocialMedia("facebook")}
              >
                <Facebook className="h-4 w-4" />
              </Button>
              <Button
                variant="outline"
                size="icon"
                className="bg-transparent border-gray-600 text-gray-300 hover:bg-primary hover:text-white"
                onClick={() => openSocialMedia("instagram")}
              >
                <Instagram className="h-4 w-4" />
              </Button>
              <Button
                variant="outline"
                size="icon"
                className="bg-transparent border-gray-600 text-gray-300 hover:bg-accent hover:text-white"
                onClick={openWhatsApp}
              >
                <MessageCircle className="h-4 w-4" />
              </Button>
            </div>
          </div>

          {/* Contact Info */}
          <div>
            <h4 className="text-lg font-semibold text-white mb-4">Contacto</h4>
            <div className="space-y-3">
              <div className="flex items-center space-x-3">
                <Phone className="h-4 w-4 text-primary" />
                <span className="text-gray-300 text-sm">3002680520</span>
              </div>
              <div className="flex items-center space-x-3">
                <Mail className="h-4 w-4 text-accent" />
                <span className="text-gray-300 text-sm">electromecanicajl@gmail.com</span>
              </div>
              <div className="flex items-start space-x-3">
                <MapPin className="h-4 w-4 text-secondary mt-1" />
                <span className="text-gray-300 text-sm">
                  Cra 9G #131-88
                  <br />
                  Zona Industrial
                  <br />
                  Bogotá, Colombia
                </span>
              </div>
            </div>
          </div>

          {/* Services */}
          <div>
            <h4 className="text-lg font-semibold text-white mb-4">Servicios</h4>
            <ul className="space-y-2">
              <li>
                <span className="text-gray-300 text-sm hover:text-primary transition-colors cursor-pointer">
                  Mantenimiento de Plantas Eléctricas
                </span>
              </li>
              <li>
                <span className="text-gray-300 text-sm hover:text-primary transition-colors cursor-pointer">
                  Mantenimiento de Electrobombas
                </span>
              </li>
              <li>
                <span className="text-gray-300 text-sm hover:text-primary transition-colors cursor-pointer">
                  Sistemas de Bombeo
                </span>
              </li>
              <li>
                <span className="text-gray-300 text-sm hover:text-primary transition-colors cursor-pointer">
                  Mantenimientos Correctivos
                </span>
              </li>
            </ul>
          </div>
        </div>

        <div className="border-t border-gray-700 mt-8 pt-8">
          <div className="flex flex-col md:flex-row justify-between items-center">
            <p className="text-gray-400 text-sm">© 2024 Electromecánica JL. Todos los derechos reservados.</p>
            <div className="flex space-x-6 mt-4 md:mt-0">
              <span className="text-gray-400 text-sm hover:text-primary transition-colors cursor-pointer">
                Información Legal
              </span>
              <span className="text-gray-400 text-sm hover:text-primary transition-colors cursor-pointer">
                Política de Privacidad
              </span>
              <span className="text-gray-400 text-sm hover:text-primary transition-colors cursor-pointer">
                Términos y Condiciones
              </span>
            </div>
          </div>
        </div>
      </div>
    </footer>
  )
}
