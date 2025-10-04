"use client"

import { Header } from "@/components/header"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { TrendingUp, Users, Award, MapPin, Leaf, CloudRain, Sun, Snowflake, ExternalLink } from "lucide-react"
import { useState } from "react"

export default function ImpactoPage() {
  const [selectedRegion, setSelectedRegion] = useState<string | null>(null)

  // Mock data - in production this would come from SubQuery
  const globalStats = {
    totalPaid: "2,450,000",
    totalFarmers: "15,234",
    totalNFTs: "8,456",
    avgPayout: "1,850",
  }

  const regionalData = [
    {
      country: "Brasil",
      region: "São Paulo",
      farmers: 4521,
      payouts: "850,000",
      events: 234,
      color: "bg-primary",
    },
    {
      country: "Brasil",
      region: "Minas Gerais",
      farmers: 3210,
      payouts: "620,000",
      events: 189,
      color: "bg-secondary",
    },
    {
      country: "Argentina",
      region: "Buenos Aires",
      farmers: 2845,
      payouts: "540,000",
      events: 156,
      color: "bg-accent",
    },
    {
      country: "Colômbia",
      region: "Antioquia",
      farmers: 2134,
      payouts: "380,000",
      events: 128,
      color: "bg-success",
    },
    {
      country: "México",
      region: "Jalisco",
      farmers: 1524,
      payouts: "290,000",
      events: 98,
      color: "bg-chart-2",
    },
    {
      country: "Chile",
      region: "Valparaíso",
      farmers: 1000,
      payouts: "180,000",
      events: 67,
      color: "bg-chart-3",
    },
  ]

  const recentPayouts = [
    {
      id: "PAY-2025-156",
      farmer: "João Silva",
      location: "São Paulo, Brasil",
      event: "Seca Extrema",
      amount: "3,200",
      date: "2025-01-28",
      nftId: "NFT-2025-156",
    },
    {
      id: "PAY-2025-155",
      farmer: "María González",
      location: "Buenos Aires, Argentina",
      event: "Chuva Excessiva",
      amount: "2,800",
      date: "2025-01-27",
      nftId: "NFT-2025-155",
    },
    {
      id: "PAY-2025-154",
      farmer: "Carlos Rodríguez",
      location: "Jalisco, México",
      event: "Geada Severa",
      amount: "2,100",
      date: "2025-01-26",
      nftId: "NFT-2025-154",
    },
    {
      id: "PAY-2025-153",
      farmer: "Ana Martins",
      location: "Minas Gerais, Brasil",
      event: "Seca Prolongada",
      amount: "1,950",
      date: "2025-01-25",
      nftId: "NFT-2025-153",
    },
  ]

  const nftGallery = [
    {
      id: "NFT-2025-156",
      image: "/climate-impact-certificate-drought.jpg",
      farmer: "João Silva",
      event: "Seca Extrema",
      location: "São Paulo, Brasil",
      amount: "3,200",
      date: "2025-01-28",
    },
    {
      id: "NFT-2025-155",
      image: "/climate-impact-certificate-rain.jpg",
      farmer: "María González",
      event: "Chuva Excessiva",
      location: "Buenos Aires, Argentina",
      amount: "2,800",
      date: "2025-01-27",
    },
    {
      id: "NFT-2025-154",
      image: "/climate-impact-certificate-frost.jpg",
      farmer: "Carlos Rodríguez",
      event: "Geada Severa",
      location: "Jalisco, México",
      amount: "2,100",
      date: "2025-01-26",
    },
    {
      id: "NFT-2025-153",
      image: "/climate-impact-certificate-drought.jpg",
      farmer: "Ana Martins",
      event: "Seca Prolongada",
      location: "Minas Gerais, Brasil",
      amount: "1,950",
      date: "2025-01-25",
    },
    {
      id: "NFT-2025-152",
      image: "/climate-impact-certificate-rain.jpg",
      farmer: "Pedro Sánchez",
      event: "Tempestade Severa",
      location: "Antioquia, Colômbia",
      amount: "2,650",
      date: "2025-01-24",
    },
    {
      id: "NFT-2025-151",
      image: "/climate-impact-certificate-frost.jpg",
      farmer: "Lucía Torres",
      event: "Geada Intensa",
      location: "Valparaíso, Chile",
      amount: "1,800",
      date: "2025-01-23",
    },
  ]

  const getEventIcon = (event: string) => {
    if (event.includes("Seca")) return <Sun className="h-5 w-5 text-accent-foreground" />
    if (event.includes("Chuva") || event.includes("Tempestade")) return <CloudRain className="h-5 w-5 text-secondary" />
    if (event.includes("Geada")) return <Snowflake className="h-5 w-5 text-chart-2" />
    return <CloudRain className="h-5 w-5" />
  }

  return (
    <div className="flex min-h-screen flex-col">
      <Header />

      <main className="flex-1 px-4 py-8">
        <div className="container mx-auto">
          {/* Header Section */}
          <div className="mb-8 text-center">
            <h1 className="font-heading mb-4 text-balance text-4xl font-bold md:text-5xl">
              Transparência Total do Impacto
            </h1>
            <p className="mx-auto max-w-3xl text-pretty text-lg leading-relaxed text-muted-foreground">
              Todos os pagamentos são registrados on-chain e podem ser auditados publicamente. Veja o impacto real que
              estamos gerando na América Latina.
            </p>
          </div>

          {/* Global Stats */}
          <div className="mb-12 grid gap-6 md:grid-cols-4">
            <Card className="border-2 border-primary/20 bg-gradient-to-br from-primary/5 to-primary/10">
              <CardHeader className="pb-3">
                <CardDescription className="flex items-center gap-2 text-xs">
                  <TrendingUp className="h-4 w-4" />
                  Total Pago
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="font-heading text-3xl font-bold text-primary">R$ {globalStats.totalPaid}</div>
                <p className="mt-1 text-xs text-muted-foreground">Em proteção climática</p>
              </CardContent>
            </Card>

            <Card className="border-2 border-secondary/20 bg-gradient-to-br from-secondary/5 to-secondary/10">
              <CardHeader className="pb-3">
                <CardDescription className="flex items-center gap-2 text-xs">
                  <Users className="h-4 w-4" />
                  Agricultores
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="font-heading text-3xl font-bold text-secondary">{globalStats.totalFarmers}</div>
                <p className="mt-1 text-xs text-muted-foreground">Protegidos na LATAM</p>
              </CardContent>
            </Card>

            <Card className="border-2 border-accent/20 bg-gradient-to-br from-accent/5 to-accent/10">
              <CardHeader className="pb-3">
                <CardDescription className="flex items-center gap-2 text-xs">
                  <Award className="h-4 w-4" />
                  NFTs Emitidos
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="font-heading text-3xl font-bold text-accent-foreground">{globalStats.totalNFTs}</div>
                <p className="mt-1 text-xs text-muted-foreground">Certificados de impacto</p>
              </CardContent>
            </Card>

            <Card className="border-2 border-success/20 bg-gradient-to-br from-success/5 to-success/10">
              <CardHeader className="pb-3">
                <CardDescription className="flex items-center gap-2 text-xs">
                  <Leaf className="h-4 w-4" />
                  Pagamento Médio
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="font-heading text-3xl font-bold text-success">R$ {globalStats.avgPayout}</div>
                <p className="mt-1 text-xs text-muted-foreground">Por evento climático</p>
              </CardContent>
            </Card>
          </div>

          {/* Main Content Tabs */}
          <Tabs defaultValue="map" className="space-y-6">
            <TabsList className="grid w-full grid-cols-3 lg:w-auto">
              <TabsTrigger value="map">Mapa Regional</TabsTrigger>
              <TabsTrigger value="recent">Pagamentos Recentes</TabsTrigger>
              <TabsTrigger value="gallery">Galeria de NFTs</TabsTrigger>
            </TabsList>

            {/* Map Tab */}
            <TabsContent value="map" className="space-y-6">
              <Card>
                <CardHeader>
                  <CardTitle className="font-heading">Distribuição por Região</CardTitle>
                  <CardDescription>Impacto geográfico dos microseguros climáticos na América Latina</CardDescription>
                </CardHeader>
                <CardContent>
                  {/* Map Visualization - Simplified representation */}
                  <div className="mb-6 rounded-lg bg-gradient-to-br from-primary/5 via-secondary/5 to-accent/5 p-8">
                    <div className="mx-auto max-w-4xl">
                      <div className="relative aspect-[4/3] rounded-lg border-2 border-dashed border-border bg-background/50 p-8">
                        <div className="flex h-full items-center justify-center">
                          <div className="text-center">
                            <MapPin className="mx-auto mb-4 h-16 w-16 text-primary" />
                            <p className="font-heading text-xl font-semibold">Mapa Interativo LATAM</p>
                            <p className="mt-2 text-sm text-muted-foreground">
                              Visualização de payouts por região com dados do SubQuery
                            </p>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>

                  {/* Regional Stats Table */}
                  <div className="space-y-3">
                    {regionalData.map((region, index) => (
                      <div
                        key={index}
                        className="flex cursor-pointer flex-col gap-4 rounded-lg border p-4 transition-all hover:border-primary hover:bg-muted/50 md:flex-row md:items-center md:justify-between"
                        onClick={() => setSelectedRegion(region.region)}
                      >
                        <div className="flex items-center gap-4">
                          <div className={`h-12 w-12 rounded-full ${region.color} flex items-center justify-center`}>
                            <MapPin className="h-6 w-6 text-white" />
                          </div>
                          <div>
                            <h4 className="font-heading font-semibold">
                              {region.region}, {region.country}
                            </h4>
                            <p className="text-sm text-muted-foreground">
                              {region.farmers.toLocaleString()} agricultores
                            </p>
                          </div>
                        </div>
                        <div className="grid grid-cols-2 gap-4 md:flex md:gap-8">
                          <div className="text-center md:text-right">
                            <p className="text-xs text-muted-foreground">Total Pago</p>
                            <p className="font-heading font-bold text-primary">R$ {region.payouts}</p>
                          </div>
                          <div className="text-center md:text-right">
                            <p className="text-xs text-muted-foreground">Eventos</p>
                            <p className="font-heading font-bold">{region.events}</p>
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>
            </TabsContent>

            {/* Recent Payouts Tab */}
            <TabsContent value="recent" className="space-y-4">
              <Card>
                <CardHeader>
                  <CardTitle className="font-heading">Pagamentos Recentes</CardTitle>
                  <CardDescription>Últimos pagamentos realizados via contrato inteligente</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    {recentPayouts.map((payout) => (
                      <div
                        key={payout.id}
                        className="flex flex-col gap-4 rounded-lg border p-4 transition-colors hover:bg-muted/50 md:flex-row md:items-center md:justify-between"
                      >
                        <div className="flex items-start gap-4">
                          <div className="flex h-12 w-12 items-center justify-center rounded-full bg-success/10">
                            {getEventIcon(payout.event)}
                          </div>
                          <div className="flex-1">
                            <div className="mb-1 flex items-center gap-2">
                              <h4 className="font-medium">{payout.farmer}</h4>
                              <Badge variant="outline" className="text-xs">
                                Verificado
                              </Badge>
                            </div>
                            <p className="text-sm text-muted-foreground">
                              {payout.location} • {payout.event}
                            </p>
                            <p className="mt-1 text-xs text-muted-foreground">{payout.date}</p>
                          </div>
                        </div>
                        <div className="flex items-center gap-4 md:flex-col md:items-end">
                          <div className="text-right">
                            <p className="font-heading text-xl font-bold text-success">+R$ {payout.amount}</p>
                            <p className="text-xs text-muted-foreground">{payout.nftId}</p>
                          </div>
                          <Button variant="outline" size="sm">
                            <ExternalLink className="mr-2 h-3 w-3" />
                            Ver On-Chain
                          </Button>
                        </div>
                      </div>
                    ))}
                  </div>

                  <div className="mt-6 text-center">
                    <Button variant="outline">Carregar Mais Pagamentos</Button>
                  </div>
                </CardContent>
              </Card>
            </TabsContent>

            {/* NFT Gallery Tab */}
            <TabsContent value="gallery" className="space-y-4">
              <Card>
                <CardHeader>
                  <CardTitle className="font-heading">Galeria de NFTs de Impacto</CardTitle>
                  <CardDescription>
                    Certificados digitais que comprovam o impacto social gerado pela plataforma
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
                    {nftGallery.map((nft) => (
                      <Card key={nft.id} className="overflow-hidden border-2 transition-shadow hover:shadow-lg">
                        <div className="aspect-square overflow-hidden bg-gradient-to-br from-primary/10 to-accent/10">
                          <img
                            src={nft.image || "/placeholder.svg"}
                            alt={nft.event}
                            className="h-full w-full object-cover"
                          />
                        </div>
                        <CardContent className="p-4">
                          <div className="mb-2 flex items-center justify-between">
                            <Badge variant="outline" className="text-xs">
                              {nft.id}
                            </Badge>
                            {getEventIcon(nft.event)}
                          </div>
                          <h4 className="font-heading mb-1 font-semibold">{nft.event}</h4>
                          <p className="mb-1 text-sm text-muted-foreground">{nft.farmer}</p>
                          <p className="mb-2 flex items-center gap-1 text-xs text-muted-foreground">
                            <MapPin className="h-3 w-3" />
                            {nft.location}
                          </p>
                          <div className="mb-3 flex items-center justify-between">
                            <p className="font-heading text-lg font-bold text-primary">R$ {nft.amount}</p>
                            <p className="text-xs text-muted-foreground">{nft.date}</p>
                          </div>
                          <Button variant="outline" size="sm" className="w-full bg-transparent">
                            Ver Certificado
                            <ExternalLink className="ml-2 h-3 w-3" />
                          </Button>
                        </CardContent>
                      </Card>
                    ))}
                  </div>

                  <div className="mt-6 text-center">
                    <Button variant="outline">Carregar Mais NFTs</Button>
                  </div>
                </CardContent>
              </Card>
            </TabsContent>
          </Tabs>

          {/* Call to Action */}
          <Card className="mt-12 overflow-hidden border-2 border-primary/20 bg-gradient-to-br from-primary/5 to-secondary/5">
            <CardContent className="p-8 md:p-12">
              <div className="mx-auto max-w-3xl text-center">
                <h2 className="font-heading mb-4 text-balance text-3xl font-bold md:text-4xl">
                  Faça Parte Desta Transformação
                </h2>
                <p className="mb-8 text-pretty text-lg leading-relaxed text-muted-foreground">
                  Junte-se aos milhares de agricultores que já estão protegidos com tecnologia blockchain transparente e
                  acessível.
                </p>
                <div className="flex flex-col items-center justify-center gap-4 sm:flex-row">
                  <Button size="lg" className="bg-primary text-primary-foreground hover:bg-primary/90">
                    Criar Minha Apólice
                  </Button>
                  <Button size="lg" variant="outline">
                    Ver Documentação
                  </Button>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>
      </main>
    </div>
  )
}
