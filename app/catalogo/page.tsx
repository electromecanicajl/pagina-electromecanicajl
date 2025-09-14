"use client"

import { useState, useMemo } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Checkbox } from "@/components/ui/checkbox"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog"
import { Sheet, SheetContent, SheetDescription, SheetHeader, SheetTitle, SheetTrigger } from "@/components/ui/sheet"
import {
  Search,
  ShoppingCart,
  MessageCircle,
  Star,
  Package,
  Grid3X3,
  List,
  SlidersHorizontal,
  Plus,
  Minus,
  Download,
  ArrowLeft,
  Eye,
} from "lucide-react"
import Link from "next/link"
import { Header } from "@/components/header"
import { Footer } from "@/components/footer"

// Datos del catálogo
const catalogItems = [
  {
    id: 1,
    name: "Filtro de Aire Industrial",
    category: "Filtros",
    subcategory: "Aire",
    brand: "Mann Filter",
    price: 45000,
    image: "/placeholder.svg?height=300&width=300&text=Filtro+Aire+Industrial",
    description: "Filtro de aire de alta eficiencia para equipos industriales",
    inStock: true,
    rating: 4.8,
    code: "FA-001",
    specifications: ["Dimensiones: 200x150x50mm", "Eficiencia: 99.5%", "Material: Papel plisado"],
  },
  {
    id: 2,
    name: "Sello Mecánico 25mm",
    category: "Sellos",
    subcategory: "Mecánicos",
    brand: "John Crane",
    price: 120000,
    image: "/placeholder.svg?height=300&width=300&text=Sello+Mecánico+25mm",
    description: "Sello mecánico para bombas centrífugas de 25mm",
    inStock: true,
    rating: 4.9,
    code: "SM-025",
    specifications: ["Diámetro: 25mm", "Material: Carburo de silicio", "Temperatura: -20°C a 200°C"],
  },
  {
    id: 3,
    name: "Contactor 40A",
    category: "Eléctricos",
    subcategory: "Contactores",
    brand: "Schneider Electric",
    price: 85000,
    image: "/placeholder.svg?height=300&width=300&text=Contactor+40A",
    description: "Contactor electromagnético 40A para control de motores",
    inStock: false,
    rating: 4.7,
    code: "CT-040",
    specifications: ["Corriente: 40A", "Voltaje: 220V/440V", "Polos: 3P"],
  },
  {
    id: 4,
    name: "Rodamiento 6205",
    category: "Rodamientos",
    subcategory: "Rígidos",
    brand: "SKF",
    price: 35000,
    image: "/placeholder.svg?height=300&width=300&text=Rodamiento+6205",
    description: "Rodamiento rígido de bolas 6205 para aplicaciones generales",
    inStock: true,
    rating: 4.8,
    code: "RD-6205",
    specifications: ["Diámetro interior: 25mm", "Diámetro exterior: 52mm", "Ancho: 15mm"],
  },
  {
    id: 5,
    name: "Aceite Hidráulico ISO 68",
    category: "Lubricantes",
    subcategory: "Hidráulicos",
    brand: "Shell",
    price: 65000,
    image: "/placeholder.svg?height=300&width=300&text=Aceite+Hidráulico+ISO68",
    description: "Aceite hidráulico de alta calidad ISO VG 68",
    inStock: true,
    rating: 4.6,
    code: "AH-068",
    specifications: ["Viscosidad: ISO VG 68", "Presentación: 20L", "Temperatura: -30°C a 100°C"],
  },
  {
    id: 6,
    name: "Empaque Tórico NBR",
    category: "Sellos",
    subcategory: "O-Rings",
    brand: "Parker",
    price: 8000,
    image: "/placeholder.svg?height=300&width=300&text=Empaque+Tórico+NBR",
    description: "O-ring de nitrilo para aplicaciones hidráulicas",
    inStock: true,
    rating: 4.5,
    code: "OR-NBR",
    specifications: ["Material: NBR", "Dureza: 70 Shore A", "Temperatura: -40°C a 120°C"],
  },
  {
    id: 7,
    name: "Relé Térmico 10-16A",
    category: "Eléctricos",
    subcategory: "Protección",
    brand: "ABB",
    price: 95000,
    image: "/placeholder.svg?height=300&width=300&text=Relé+Térmico+10-16A",
    description: "Relé térmico de sobrecarga para protección de motores",
    inStock: true,
    rating: 4.9,
    code: "RT-1016",
    specifications: ["Rango: 10-16A", "Clase: 10A", "Montaje: Sobre contactor"],
  },
  {
    id: 8,
    name: "Impulsor Bomba Centrífuga",
    category: "Bombas",
    subcategory: "Impulsores",
    brand: "Grundfos",
    price: 180000,
    image: "/placeholder.svg?height=300&width=300&text=Impulsor+Bomba+Centrífuga",
    description: "Impulsor de bronce para bomba centrífuga 3HP",
    inStock: false,
    rating: 4.8,
    code: "IB-3HP",
    specifications: ["Material: Bronce", "Diámetro: 150mm", "Para bomba: 3HP"],
  },
]

const categories = ["Todos", "Filtros", "Sellos", "Eléctricos", "Rodamientos", "Lubricantes", "Bombas"]
const brands = ["Todas", "Mann Filter", "John Crane", "Schneider Electric", "SKF", "Shell", "Parker", "ABB", "Grundfos"]

export default function CatalogoPage() {
  const [searchTerm, setSearchTerm] = useState("")
  const [selectedCategory, setSelectedCategory] = useState("Todos")
  const [selectedBrand, setSelectedBrand] = useState("Todas")
  const [priceRange, setPriceRange] = useState({ min: "", max: "" })
  const [inStockOnly, setInStockOnly] = useState(false)
  const [viewMode, setViewMode] = useState<"grid" | "list">("grid")
  const [sortBy, setSortBy] = useState("name")
  const [cart, setCart] = useState<Array<{ item: (typeof catalogItems)[0]; quantity: number }>>([])
  const [selectedItem, setSelectedItem] = useState<(typeof catalogItems)[0] | null>(null)

  // Filtrar y ordenar productos
  const filteredItems = useMemo(() => {
    const filtered = catalogItems.filter((item) => {
      const matchesSearch =
        item.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
        item.description.toLowerCase().includes(searchTerm.toLowerCase()) ||
        item.code.toLowerCase().includes(searchTerm.toLowerCase())
      const matchesCategory = selectedCategory === "Todos" || item.category === selectedCategory
      const matchesBrand = selectedBrand === "Todas" || item.brand === selectedBrand
      const matchesStock = !inStockOnly || item.inStock
      const matchesPrice =
        (!priceRange.min || item.price >= Number.parseInt(priceRange.min)) &&
        (!priceRange.max || item.price <= Number.parseInt(priceRange.max))

      return matchesSearch && matchesCategory && matchesBrand && matchesStock && matchesPrice
    })

    // Ordenar
    filtered.sort((a, b) => {
      switch (sortBy) {
        case "price-asc":
          return a.price - b.price
        case "price-desc":
          return b.price - a.price
        case "rating":
          return b.rating - a.rating
        case "name":
        default:
          return a.name.localeCompare(b.name)
      }
    })

    return filtered
  }, [searchTerm, selectedCategory, selectedBrand, priceRange, inStockOnly, sortBy])

  const addToCart = (item: (typeof catalogItems)[0]) => {
    setCart((prev) => {
      const existing = prev.find((cartItem) => cartItem.item.id === item.id)
      if (existing) {
        return prev.map((cartItem) =>
          cartItem.item.id === item.id ? { ...cartItem, quantity: cartItem.quantity + 1 } : cartItem,
        )
      }
      return [...prev, { item, quantity: 1 }]
    })
  }

  const removeFromCart = (itemId: number) => {
    setCart((prev) => prev.filter((cartItem) => cartItem.item.id !== itemId))
  }

  const updateQuantity = (itemId: number, quantity: number) => {
    if (quantity <= 0) {
      removeFromCart(itemId)
      return
    }
    setCart((prev) => prev.map((cartItem) => (cartItem.item.id === itemId ? { ...cartItem, quantity } : cartItem)))
  }

  const getTotalPrice = () => {
    return cart.reduce((total, cartItem) => total + cartItem.item.price * cartItem.quantity, 0)
  }

  const openWhatsApp = (message: string) => {
    const whatsappUrl = `https://wa.me/3002680520?text=${encodeURIComponent(message)}`
    window.open(whatsappUrl, "_blank")
  }

  const sendQuoteRequest = () => {
    const cartDetails = cart
      .map(
        (cartItem) =>
          `${cartItem.item.name} (${cartItem.item.code}) - Cantidad: ${cartItem.quantity} - Precio unitario: $${cartItem.item.price.toLocaleString()}`,
      )
      .join("\n")

    const total = getTotalPrice()
    const message = `Solicitud de Cotización - Electromecánica JL\n\nProductos solicitados:\n${cartDetails}\n\nTotal estimado: $${total.toLocaleString()}\n\nPor favor, envíenme una cotización formal con disponibilidad y tiempos de entrega.`

    openWhatsApp(message)
  }

  return (
    <div className="min-h-screen bg-background">
      <Header />

      <main className="pt-20">
        {/* Hero Section */}
        <section className="bg-gradient-to-r from-primary/10 via-accent/10 to-secondary/10 py-16">
          <div className="container mx-auto px-4">
            <div className="flex items-center gap-4 mb-6">
              <Link href="/">
                <Button variant="outline" size="sm">
                  <ArrowLeft className="h-4 w-4 mr-2" />
                  Volver al Inicio
                </Button>
              </Link>
            </div>

            <div className="text-center">
              <h1 className="text-4xl lg:text-5xl font-bold text-balance mb-4">
                Catálogo de <span className="text-primary">Repuestos</span>
              </h1>
              <p className="text-xl text-muted-foreground text-pretty max-w-2xl mx-auto">
                Encuentra todos los repuestos y accesorios que necesitas con nuestro sistema de búsqueda avanzada
              </p>
            </div>
          </div>
        </section>

        {/* Search and Filters */}
        <section className="py-8 border-b">
          <div className="container mx-auto px-4">
            <div className="flex flex-col lg:flex-row gap-4 items-center justify-between mb-6">
              {/* Search Bar */}
              <div className="relative flex-1 max-w-md">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground h-4 w-4" />
                <Input
                  placeholder="Buscar por nombre, código o descripción..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="pl-10"
                />
              </div>

              {/* View Mode and Sort */}
              <div className="flex items-center gap-2">
                <div className="flex border rounded-lg">
                  <Button
                    variant={viewMode === "grid" ? "default" : "ghost"}
                    size="sm"
                    onClick={() => setViewMode("grid")}
                  >
                    <Grid3X3 className="h-4 w-4" />
                  </Button>
                  <Button
                    variant={viewMode === "list" ? "default" : "ghost"}
                    size="sm"
                    onClick={() => setViewMode("list")}
                  >
                    <List className="h-4 w-4" />
                  </Button>
                </div>

                <Select value={sortBy} onValueChange={setSortBy}>
                  <SelectTrigger className="w-48">
                    <SelectValue placeholder="Ordenar por" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="name">Nombre A-Z</SelectItem>
                    <SelectItem value="price-asc">Precio: Menor a Mayor</SelectItem>
                    <SelectItem value="price-desc">Precio: Mayor a Menor</SelectItem>
                    <SelectItem value="rating">Mejor Calificación</SelectItem>
                  </SelectContent>
                </Select>

                {/* Mobile Filters */}
                <Sheet>
                  <SheetTrigger asChild>
                    <Button variant="outline" size="sm" className="lg:hidden bg-transparent">
                      <SlidersHorizontal className="h-4 w-4 mr-2" />
                      Filtros
                    </Button>
                  </SheetTrigger>
                  <SheetContent>
                    <SheetHeader>
                      <SheetTitle>Filtros</SheetTitle>
                      <SheetDescription>Refina tu búsqueda</SheetDescription>
                    </SheetHeader>
                    <div className="space-y-6 mt-6">
                      <div>
                        <Label>Categoría</Label>
                        <Select value={selectedCategory} onValueChange={setSelectedCategory}>
                          <SelectTrigger>
                            <SelectValue />
                          </SelectTrigger>
                          <SelectContent>
                            {categories.map((category) => (
                              <SelectItem key={category} value={category}>
                                {category}
                              </SelectItem>
                            ))}
                          </SelectContent>
                        </Select>
                      </div>

                      <div>
                        <Label>Marca</Label>
                        <Select value={selectedBrand} onValueChange={setSelectedBrand}>
                          <SelectTrigger>
                            <SelectValue />
                          </SelectTrigger>
                          <SelectContent>
                            {brands.map((brand) => (
                              <SelectItem key={brand} value={brand}>
                                {brand}
                              </SelectItem>
                            ))}
                          </SelectContent>
                        </Select>
                      </div>

                      <div>
                        <Label>Rango de Precio</Label>
                        <div className="flex gap-2 mt-2">
                          <Input
                            placeholder="Mín"
                            value={priceRange.min}
                            onChange={(e) => setPriceRange((prev) => ({ ...prev, min: e.target.value }))}
                          />
                          <Input
                            placeholder="Máx"
                            value={priceRange.max}
                            onChange={(e) => setPriceRange((prev) => ({ ...prev, max: e.target.value }))}
                          />
                        </div>
                      </div>

                      <div className="flex items-center space-x-2">
                        <Checkbox id="inStock" checked={inStockOnly} onCheckedChange={setInStockOnly} />
                        <Label htmlFor="inStock">Solo productos en stock</Label>
                      </div>
                    </div>
                  </SheetContent>
                </Sheet>
              </div>
            </div>

            {/* Desktop Filters */}
            <div className="hidden lg:flex gap-4 items-center flex-wrap">
              <Select value={selectedCategory} onValueChange={setSelectedCategory}>
                <SelectTrigger className="w-48">
                  <SelectValue placeholder="Categoría" />
                </SelectTrigger>
                <SelectContent>
                  {categories.map((category) => (
                    <SelectItem key={category} value={category}>
                      {category}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>

              <Select value={selectedBrand} onValueChange={setSelectedBrand}>
                <SelectTrigger className="w-48">
                  <SelectValue placeholder="Marca" />
                </SelectTrigger>
                <SelectContent>
                  {brands.map((brand) => (
                    <SelectItem key={brand} value={brand}>
                      {brand}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>

              <div className="flex gap-2">
                <Input
                  placeholder="Precio mín"
                  value={priceRange.min}
                  onChange={(e) => setPriceRange((prev) => ({ ...prev, min: e.target.value }))}
                  className="w-32"
                />
                <Input
                  placeholder="Precio máx"
                  value={priceRange.max}
                  onChange={(e) => setPriceRange((prev) => ({ ...prev, max: e.target.value }))}
                  className="w-32"
                />
              </div>

              <div className="flex items-center space-x-2">
                <Checkbox id="inStockDesktop" checked={inStockOnly} onCheckedChange={setInStockOnly} />
                <Label htmlFor="inStockDesktop">Solo en stock</Label>
              </div>

              {/* Cart Summary */}
              <div className="ml-auto">
                <Sheet>
                  <SheetTrigger asChild>
                    <Button variant="outline" className="relative bg-transparent">
                      <ShoppingCart className="h-4 w-4 mr-2" />
                      Presupuesto ({cart.length})
                      {cart.length > 0 && (
                        <Badge className="absolute -top-2 -right-2 h-5 w-5 rounded-full p-0 flex items-center justify-center text-xs">
                          {cart.reduce((sum, item) => sum + item.quantity, 0)}
                        </Badge>
                      )}
                    </Button>
                  </SheetTrigger>
                  <SheetContent className="w-full sm:max-w-lg">
                    <SheetHeader>
                      <SheetTitle>Presupuesto</SheetTitle>
                      <SheetDescription>Productos seleccionados para cotización</SheetDescription>
                    </SheetHeader>

                    <div className="space-y-4 mt-6">
                      {cart.length === 0 ? (
                        <p className="text-muted-foreground text-center py-8">No hay productos en el presupuesto</p>
                      ) : (
                        <>
                          {cart.map((cartItem) => (
                            <div key={cartItem.item.id} className="flex items-center gap-3 p-3 border rounded-lg">
                              <img
                                src={cartItem.item.image || "/placeholder.svg"}
                                alt={cartItem.item.name}
                                className="w-12 h-12 object-cover rounded"
                              />
                              <div className="flex-1 min-w-0">
                                <h4 className="font-medium text-sm truncate">{cartItem.item.name}</h4>
                                <p className="text-xs text-muted-foreground">{cartItem.item.code}</p>
                                <p className="text-sm font-medium">${cartItem.item.price.toLocaleString()}</p>
                              </div>
                              <div className="flex items-center gap-2">
                                <Button
                                  size="sm"
                                  variant="outline"
                                  onClick={() => updateQuantity(cartItem.item.id, cartItem.quantity - 1)}
                                >
                                  <Minus className="h-3 w-3" />
                                </Button>
                                <span className="w-8 text-center text-sm">{cartItem.quantity}</span>
                                <Button
                                  size="sm"
                                  variant="outline"
                                  onClick={() => updateQuantity(cartItem.item.id, cartItem.quantity + 1)}
                                >
                                  <Plus className="h-3 w-3" />
                                </Button>
                              </div>
                            </div>
                          ))}

                          <div className="border-t pt-4">
                            <div className="flex justify-between items-center mb-4">
                              <span className="font-semibold">Total Estimado:</span>
                              <span className="font-bold text-lg">${getTotalPrice().toLocaleString()}</span>
                            </div>

                            <div className="space-y-2">
                              <Button onClick={sendQuoteRequest} className="w-full">
                                <MessageCircle className="h-4 w-4 mr-2" />
                                Solicitar Cotización por WhatsApp
                              </Button>
                              <Button variant="outline" className="w-full bg-transparent">
                                <Download className="h-4 w-4 mr-2" />
                                Descargar Lista
                              </Button>
                            </div>
                          </div>
                        </>
                      )}
                    </div>
                  </SheetContent>
                </Sheet>
              </div>
            </div>
          </div>
        </section>

        {/* Results */}
        <section className="py-8">
          <div className="container mx-auto px-4">
            <div className="flex justify-between items-center mb-6">
              <p className="text-muted-foreground">
                Mostrando {filteredItems.length} de {catalogItems.length} productos
              </p>
            </div>

            {/* Products Grid/List */}
            <div
              className={
                viewMode === "grid"
                  ? "grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6"
                  : "space-y-4"
              }
            >
              {filteredItems.map((item) => (
                <Card key={item.id} className="hover-lift overflow-hidden group">
                  {viewMode === "grid" ? (
                    <>
                      <div className="relative">
                        <img
                          src={item.image || "/placeholder.svg"}
                          alt={item.name}
                          className="w-full h-48 object-cover transition-transform duration-300 group-hover:scale-105"
                        />
                        <div className="absolute top-2 left-2">
                          <Badge variant={item.inStock ? "default" : "secondary"}>
                            {item.inStock ? "En Stock" : "Consultar"}
                          </Badge>
                        </div>
                        <div className="absolute top-2 right-2">
                          <Badge variant="outline" className="bg-white/90">
                            {item.brand}
                          </Badge>
                        </div>
                      </div>

                      <CardHeader className="pb-2">
                        <div className="flex justify-between items-start gap-2">
                          <CardTitle className="text-sm line-clamp-2">{item.name}</CardTitle>
                          <div className="flex items-center gap-1">
                            <Star className="h-3 w-3 text-yellow-500 fill-current" />
                            <span className="text-xs">{item.rating}</span>
                          </div>
                        </div>
                        <CardDescription className="text-xs line-clamp-2">{item.description}</CardDescription>
                        <div className="flex justify-between items-center">
                          <span className="font-bold text-primary">${item.price.toLocaleString()}</span>
                          <span className="text-xs text-muted-foreground">{item.code}</span>
                        </div>
                      </CardHeader>

                      <CardContent className="pt-0">
                        <div className="flex gap-2">
                          <Dialog>
                            <DialogTrigger asChild>
                              <Button
                                variant="outline"
                                size="sm"
                                className="flex-1 bg-transparent"
                                onClick={() => setSelectedItem(item)}
                              >
                                <Eye className="h-3 w-3 mr-1" />
                                Ver
                              </Button>
                            </DialogTrigger>
                            <DialogContent className="max-w-2xl">
                              <DialogHeader>
                                <DialogTitle>{selectedItem?.name}</DialogTitle>
                                <DialogDescription>{selectedItem?.description}</DialogDescription>
                              </DialogHeader>

                              {selectedItem && (
                                <div className="space-y-4">
                                  <img
                                    src={selectedItem.image || "/placeholder.svg"}
                                    alt={selectedItem.name}
                                    className="w-full h-64 object-cover rounded-lg"
                                  />

                                  <div className="grid grid-cols-2 gap-4">
                                    <div>
                                      <Label>Código</Label>
                                      <p className="font-mono">{selectedItem.code}</p>
                                    </div>
                                    <div>
                                      <Label>Marca</Label>
                                      <p>{selectedItem.brand}</p>
                                    </div>
                                    <div>
                                      <Label>Categoría</Label>
                                      <p>{selectedItem.category}</p>
                                    </div>
                                    <div>
                                      <Label>Precio</Label>
                                      <p className="font-bold text-primary">${selectedItem.price.toLocaleString()}</p>
                                    </div>
                                  </div>

                                  <div>
                                    <Label>Especificaciones</Label>
                                    <ul className="list-disc list-inside space-y-1 mt-2">
                                      {selectedItem.specifications.map((spec, index) => (
                                        <li key={index} className="text-sm">
                                          {spec}
                                        </li>
                                      ))}
                                    </ul>
                                  </div>

                                  <div className="flex gap-2">
                                    <Button onClick={() => addToCart(selectedItem)} className="flex-1">
                                      <Plus className="h-4 w-4 mr-2" />
                                      Agregar al Presupuesto
                                    </Button>
                                    <Button
                                      variant="outline"
                                      onClick={() =>
                                        openWhatsApp(`Consulta sobre ${selectedItem.name} (${selectedItem.code})`)
                                      }
                                    >
                                      <MessageCircle className="h-4 w-4 mr-2" />
                                      Consultar
                                    </Button>
                                  </div>
                                </div>
                              )}
                            </DialogContent>
                          </Dialog>

                          <Button size="sm" onClick={() => addToCart(item)} className="flex-1">
                            <Plus className="h-3 w-3 mr-1" />
                            Agregar
                          </Button>
                        </div>
                      </CardContent>
                    </>
                  ) : (
                    <div className="flex gap-4 p-4">
                      <img
                        src={item.image || "/placeholder.svg"}
                        alt={item.name}
                        className="w-24 h-24 object-cover rounded-lg"
                      />
                      <div className="flex-1">
                        <div className="flex justify-between items-start mb-2">
                          <h3 className="font-semibold">{item.name}</h3>
                          <div className="flex items-center gap-2">
                            <Badge variant={item.inStock ? "default" : "secondary"}>
                              {item.inStock ? "En Stock" : "Consultar"}
                            </Badge>
                            <div className="flex items-center gap-1">
                              <Star className="h-3 w-3 text-yellow-500 fill-current" />
                              <span className="text-sm">{item.rating}</span>
                            </div>
                          </div>
                        </div>
                        <p className="text-sm text-muted-foreground mb-2">{item.description}</p>
                        <div className="flex justify-between items-center">
                          <div>
                            <span className="font-bold text-primary text-lg">${item.price.toLocaleString()}</span>
                            <span className="text-sm text-muted-foreground ml-2">{item.code}</span>
                          </div>
                          <div className="flex gap-2">
                            <Button
                              variant="outline"
                              size="sm"
                              onClick={() => {
                                setSelectedItem(item)
                                // Trigger dialog open
                              }}
                            >
                              <Eye className="h-4 w-4 mr-1" />
                              Ver
                            </Button>
                            <Button size="sm" onClick={() => addToCart(item)}>
                              <Plus className="h-4 w-4 mr-1" />
                              Agregar
                            </Button>
                          </div>
                        </div>
                      </div>
                    </div>
                  )}
                </Card>
              ))}
            </div>

            {filteredItems.length === 0 && (
              <div className="text-center py-12">
                <Package className="h-12 w-12 text-muted-foreground mx-auto mb-4" />
                <h3 className="text-lg font-semibold mb-2">No se encontraron productos</h3>
                <p className="text-muted-foreground">Intenta ajustar los filtros o términos de búsqueda</p>
              </div>
            )}
          </div>
        </section>
      </main>

      <Footer />
    </div>
  )
}
