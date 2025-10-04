import { Header } from "@/components/header"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Progress } from "@/components/ui/progress"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Leaf, Wallet, TrendingUp, Calendar, MapPin, CloudRain, Sun, Award, ExternalLink, Plus } from "lucide-react"
import Link from "next/link"

export default function DashboardPage() {
  // Mock data - in production this would come from blockchain/SubQuery
  const balance = "1,250.00"
  const activePolicy = {
    id: "POL-2025-001",
    status: "active",
    coverage: "5,000.00",
    premium: "150.00",
    location: "São Paulo, Brasil",
    crop: "Café",
    startDate: "2025-01-15",
    endDate: "2025-12-15",
    daysRemaining: 259,
    weatherCondition: "Seca Extrema",
    riskLevel: "medium",
  }

  const payoutHistory = [
    {
      id: "PAY-2024-045",
      date: "2024-11-20",
      amount: "2,500.00",
      event: "Seca Prolongada",
      nftId: "NFT-2024-045",
      txHash: "0x742d35Cc6634C0532925a3b844Bc9e7595f0bEb",
    },
    {
      id: "PAY-2024-032",
      date: "2024-08-15",
      amount: "1,800.00",
      event: "Chuva Excessiva",
      nftId: "NFT-2024-032",
      txHash: "0x8f3c2a9b1e4d5f6c7a8b9c0d1e2f3a4b5c6d7e8f",
    },
    {
      id: "PAY-2024-018",
      date: "2024-05-10",
      amount: "3,200.00",
      event: "Geada Severa",
      nftId: "NFT-2024-018",
      txHash: "0x1a2b3c4d5e6f7a8b9c0d1e2f3a4b5c6d7e8f9a0b",
    },
  ]

  const nftCertificates = [
    {
      id: "NFT-2024-045",
      image: "/climate-impact-certificate-drought.jpg",
      event: "Seca Prolongada",
      date: "2024-11-20",
      amount: "2,500.00",
    },
    {
      id: "NFT-2024-032",
      image: "/climate-impact-certificate-rain.jpg",
      event: "Chuva Excessiva",
      date: "2024-08-15",
      amount: "1,800.00",
    },
    {
      id: "NFT-2024-018",
      image: "/climate-impact-certificate-frost.jpg",
      event: "Geada Severa",
      date: "2024-05-10",
      amount: "3,200.00",
    },
  ]

  return (
    <div className="flex min-h-screen flex-col">
      <Header />

      <main className="flex-1 px-4 py-8">
        <div className="container mx-auto">
          {/* Header Section */}
          <div className="mb-8">
            <h1 className="font-heading mb-2 text-3xl font-bold">Meu Dashboard</h1>
            <p className="text-muted-foreground">Gerencie suas apólices e acompanhe seus pagamentos</p>
          </div>

          {/* Balance & Quick Stats */}
          <div className="mb-8 grid gap-6 md:grid-cols-3">
            <Card className="border-2 border-primary/20 bg-gradient-to-br from-primary/5 to-primary/10">
              <CardHeader className="pb-3">
                <CardDescription className="flex items-center gap-2 text-xs">
                  <Wallet className="h-4 w-4" />
                  Saldo Disponível
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="font-heading text-3xl font-bold text-primary">R$ {balance}</div>
                <p className="mt-1 text-xs text-muted-foreground">Conectado: 0x742d...0bEb</p>
              </CardContent>
            </Card>

            <Card>
              <CardHeader className="pb-3">
                <CardDescription className="flex items-center gap-2 text-xs">
                  <TrendingUp className="h-4 w-4" />
                  Total Recebido
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="font-heading text-3xl font-bold">R$ 7,500.00</div>
                <p className="mt-1 text-xs text-success">+3 pagamentos este ano</p>
              </CardContent>
            </Card>

            <Card>
              <CardHeader className="pb-3">
                <CardDescription className="flex items-center gap-2 text-xs">
                  <Award className="h-4 w-4" />
                  NFTs de Impacto
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="font-heading text-3xl font-bold">3</div>
                <p className="mt-1 text-xs text-muted-foreground">Certificados emitidos</p>
              </CardContent>
            </Card>
          </div>

          {/* Main Content Tabs */}
          <Tabs defaultValue="policy" className="space-y-6">
            <TabsList className="grid w-full grid-cols-3 lg:w-auto">
              <TabsTrigger value="policy">Minha Apólice</TabsTrigger>
              <TabsTrigger value="history">Histórico</TabsTrigger>
              <TabsTrigger value="nfts">NFTs</TabsTrigger>
            </TabsList>

            {/* Policy Tab */}
            <TabsContent value="policy" className="space-y-6">
              <Card className="border-2">
                <CardHeader>
                  <div className="flex items-start justify-between">
                    <div>
                      <CardTitle className="font-heading text-2xl">Apólice Ativa</CardTitle>
                      <CardDescription className="mt-1">ID: {activePolicy.id}</CardDescription>
                    </div>
                    <Badge className="bg-success text-white">Ativa</Badge>
                  </div>
                </CardHeader>
                <CardContent className="space-y-6">
                  {/* Coverage Info */}
                  <div className="grid gap-4 md:grid-cols-2">
                    <div className="space-y-1">
                      <p className="text-sm text-muted-foreground">Cobertura Total</p>
                      <p className="font-heading text-2xl font-bold text-primary">R$ {activePolicy.coverage}</p>
                    </div>
                    <div className="space-y-1">
                      <p className="text-sm text-muted-foreground">Prêmio Mensal</p>
                      <p className="font-heading text-2xl font-bold">R$ {activePolicy.premium}</p>
                    </div>
                  </div>

                  {/* Policy Details */}
                  <div className="grid gap-4 rounded-lg bg-muted/50 p-4 md:grid-cols-2">
                    <div className="flex items-center gap-3">
                      <MapPin className="h-5 w-5 text-muted-foreground" />
                      <div>
                        <p className="text-xs text-muted-foreground">Localização</p>
                        <p className="font-medium">{activePolicy.location}</p>
                      </div>
                    </div>
                    <div className="flex items-center gap-3">
                      <Leaf className="h-5 w-5 text-muted-foreground" />
                      <div>
                        <p className="text-xs text-muted-foreground">Cultivo</p>
                        <p className="font-medium">{activePolicy.crop}</p>
                      </div>
                    </div>
                    <div className="flex items-center gap-3">
                      <Calendar className="h-5 w-5 text-muted-foreground" />
                      <div>
                        <p className="text-xs text-muted-foreground">Período</p>
                        <p className="font-medium">
                          {activePolicy.startDate} - {activePolicy.endDate}
                        </p>
                      </div>
                    </div>
                    <div className="flex items-center gap-3">
                      <CloudRain className="h-5 w-5 text-muted-foreground" />
                      <div>
                        <p className="text-xs text-muted-foreground">Condição Monitorada</p>
                        <p className="font-medium">{activePolicy.weatherCondition}</p>
                      </div>
                    </div>
                  </div>

                  {/* Time Remaining */}
                  <div className="space-y-2">
                    <div className="flex items-center justify-between text-sm">
                      <span className="text-muted-foreground">Dias Restantes</span>
                      <span className="font-medium">{activePolicy.daysRemaining} de 365 dias</span>
                    </div>
                    <Progress value={(activePolicy.daysRemaining / 365) * 100} className="h-2" />
                  </div>

                  {/* Risk Level */}
                  <div className="flex items-center justify-between rounded-lg border border-accent/30 bg-accent/10 p-4">
                    <div className="flex items-center gap-3">
                      <Sun className="h-6 w-6 text-accent-foreground" />
                      <div>
                        <p className="font-medium">Nível de Risco Atual</p>
                        <p className="text-sm text-muted-foreground">Baseado em dados climáticos em tempo real</p>
                      </div>
                    </div>
                    <Badge variant="outline" className="border-accent text-accent-foreground">
                      Médio
                    </Badge>
                  </div>

                  {/* Actions */}
                  <div className="flex gap-3">
                    <Button variant="outline" className="flex-1 bg-transparent">
                      Ver Contrato On-Chain
                    </Button>
                    <Button variant="outline" className="flex-1 bg-transparent">
                      Renovar Apólice
                    </Button>
                  </div>
                </CardContent>
              </Card>

              {/* Create New Policy CTA */}
              <Card className="border-2 border-dashed">
                <CardContent className="flex flex-col items-center justify-center py-12 text-center">
                  <div className="mb-4 flex h-16 w-16 items-center justify-center rounded-full bg-primary/10">
                    <Plus className="h-8 w-8 text-primary" />
                  </div>
                  <h3 className="font-heading mb-2 text-xl font-semibold">Criar Nova Apólice</h3>
                  <p className="mb-4 text-sm text-muted-foreground">
                    Proteja outras áreas ou cultivos com uma apólice adicional
                  </p>
                  <Button className="bg-primary text-primary-foreground hover:bg-primary/90" asChild>
                    <Link href="/test">Criar Apólice</Link>
                  </Button>
                </CardContent>
              </Card>
            </TabsContent>

            {/* History Tab */}
            <TabsContent value="history" className="space-y-4">
              <Card>
                <CardHeader>
                  <CardTitle className="font-heading">Histórico de Pagamentos</CardTitle>
                  <CardDescription>Todos os pagamentos recebidos via contrato inteligente</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    {payoutHistory.map((payout) => (
                      <div
                        key={payout.id}
                        className="flex flex-col gap-4 rounded-lg border p-4 transition-colors hover:bg-muted/50 md:flex-row md:items-center md:justify-between"
                      >
                        <div className="flex items-start gap-4">
                          <div className="flex h-12 w-12 items-center justify-center rounded-full bg-success/10">
                            <CloudRain className="h-6 w-6 text-success" />
                          </div>
                          <div className="flex-1">
                            <div className="mb-1 flex items-center gap-2">
                              <h4 className="font-medium">{payout.event}</h4>
                              <Badge variant="outline" className="text-xs">
                                {payout.id}
                              </Badge>
                            </div>
                            <p className="text-sm text-muted-foreground">{payout.date}</p>
                            <div className="mt-2 flex items-center gap-2">
                              <code className="rounded bg-muted px-2 py-1 font-mono text-xs">{payout.txHash}</code>
                              <Button variant="ghost" size="sm" className="h-6 w-6 p-0">
                                <ExternalLink className="h-3 w-3" />
                              </Button>
                            </div>
                          </div>
                        </div>
                        <div className="flex items-center gap-4 md:flex-col md:items-end">
                          <div className="text-right">
                            <p className="font-heading text-xl font-bold text-success">+R$ {payout.amount}</p>
                            <p className="text-xs text-muted-foreground">NFT: {payout.nftId}</p>
                          </div>
                          <Button variant="outline" size="sm" asChild>
                            <Link href={`/nft/${payout.nftId}`}>Ver NFT</Link>
                          </Button>
                        </div>
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>
            </TabsContent>

            {/* NFTs Tab */}
            <TabsContent value="nfts" className="space-y-4">
              <Card>
                <CardHeader>
                  <CardTitle className="font-heading">Meus NFTs de Impacto</CardTitle>
                  <CardDescription>Certificados digitais que comprovam o impacto social recebido</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
                    {nftCertificates.map((nft) => (
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
                            <Award className="h-4 w-4 text-accent-foreground" />
                          </div>
                          <h4 className="font-heading mb-1 font-semibold">{nft.event}</h4>
                          <p className="mb-2 text-xs text-muted-foreground">{nft.date}</p>
                          <p className="font-heading text-lg font-bold text-primary">R$ {nft.amount}</p>
                          <Button variant="outline" size="sm" className="mt-3 w-full bg-transparent" asChild>
                            <Link href={`/nft/${nft.id}`}>
                              Ver Detalhes
                              <ExternalLink className="ml-2 h-3 w-3" />
                            </Link>
                          </Button>
                        </CardContent>
                      </Card>
                    ))}
                  </div>
                </CardContent>
              </Card>
            </TabsContent>
          </Tabs>
        </div>
      </main>
    </div>
  )
}
