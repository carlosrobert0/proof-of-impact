"use client"

import { Header } from "@/components/header"
import { Card, CardContent } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Separator } from "@/components/ui/separator"
import {
  Award,
  Leaf,
  CloudRain,
  ExternalLink,
  Download,
  Share2,
  CheckCircle2,
  Copy,
  Sun,
  Snowflake,
} from "lucide-react"
import { useState } from "react"
import Link from "next/link"
import { useParams } from "next/navigation"

export default function NFTDetailPage() {
  const params = useParams()
  const nftId = params.id as string
  const [copied, setCopied] = useState(false)

  // Mock NFT data - in production this would come from blockchain
  const nftData = {
    id: nftId || "NFT-2025-156",
    tokenId: "1234567890",
    image: "/climate-impact-certificate-drought.jpg",
    name: "Climate Impact Certificate #156",
    description: "Certificado de impacto social emitido após pagamento automático de microseguro climático",
    farmer: {
      name: "João Silva",
      wallet: "0x742d35Cc6634C0532925a3b844Bc9e7595f0bEb",
      verified: true,
    },
    event: {
      type: "Seca Extrema",
      date: "2025-01-28",
      location: "São Paulo, Brasil",
      coordinates: "-23.5505, -46.6333",
      severity: "Alta",
    },
    payout: {
      amount: "3,200.00",
      currency: "BRL",
      txHash: "0x742d35Cc6634C0532925a3b844Bc9e7595f0bEb9c0d1e2f3a4b5c6d7e8f9a0b1",
      blockNumber: "12345678",
      timestamp: "2025-01-28T14:32:00Z",
    },
    policy: {
      id: "POL-2025-001",
      coverage: "5,000.00",
      cropType: "Café",
      farmSize: "50 hectares",
    },
    metadata: {
      standard: "ERC-721",
      blockchain: "Polkadot",
      contract: "0x1a2b3c4d5e6f7a8b9c0d1e2f3a4b5c6d7e8f9a0b",
      mintDate: "2025-01-28T14:35:00Z",
    },
  }

  const handleCopyAddress = (address: string) => {
    navigator.clipboard.writeText(address)
    setCopied(true)
    setTimeout(() => setCopied(false), 2000)
  }

  const getEventIcon = () => {
    if (nftData.event.type.includes("Seca")) return <Sun className="h-6 w-6 text-accent-foreground" />
    if (nftData.event.type.includes("Chuva")) return <CloudRain className="h-6 w-6 text-secondary" />
    if (nftData.event.type.includes("Geada")) return <Snowflake className="h-6 w-6 text-chart-2" />
    return <CloudRain className="h-6 w-6" />
  }

  return (
    <div className="flex min-h-screen flex-col">
      <Header />

      <main className="flex-1 px-4 py-8">
        <div className="container mx-auto max-w-6xl">
          {/* Back Button */}
          <div className="mb-6">
            <Button variant="ghost" asChild>
              <Link href="/dashboard">← Voltar ao Dashboard</Link>
            </Button>
          </div>

          <div className="grid gap-8 lg:grid-cols-2">
            {/* Left Column - NFT Image */}
            <div className="space-y-6">
              <Card className="overflow-hidden border-2">
                <div className="aspect-square overflow-hidden bg-gradient-to-br from-primary/10 via-accent/10 to-secondary/10">
                  <img
                    src={nftData.image || "/placeholder.svg"}
                    alt={nftData.name}
                    className="h-full w-full object-cover"
                  />
                </div>
                <CardContent className="p-4">
                  <div className="flex items-center justify-between">
                    <Badge variant="outline" className="font-mono text-xs">
                      {nftData.id}
                    </Badge>
                    <div className="flex gap-2">
                      <Button size="sm" variant="outline">
                        <Download className="h-4 w-4" />
                      </Button>
                      <Button size="sm" variant="outline">
                        <Share2 className="h-4 w-4" />
                      </Button>
                    </div>
                  </div>
                </CardContent>
              </Card>

              {/* Quick Actions */}
              <Card>
                <CardContent className="p-4">
                  <h3 className="mb-3 font-heading text-sm font-semibold">Ações Rápidas</h3>
                  <div className="flex flex-col gap-2">
                    <Button variant="outline" className="w-full justify-start bg-transparent" asChild>
                      <a
                        href={`https://polkadot.subscan.io/tx/${nftData.payout.txHash}`}
                        target="_blank"
                        rel="noopener noreferrer"
                      >
                        <ExternalLink className="mr-2 h-4 w-4" />
                        Ver no Block Explorer
                      </a>
                    </Button>
                    <Button variant="outline" className="w-full justify-start bg-transparent">
                      <Download className="mr-2 h-4 w-4" />
                      Baixar Certificado
                    </Button>
                    <Button variant="outline" className="w-full justify-start bg-transparent">
                      <Share2 className="mr-2 h-4 w-4" />
                      Compartilhar NFT
                    </Button>
                  </div>
                </CardContent>
              </Card>
            </div>

            {/* Right Column - NFT Details */}
            <div className="space-y-6">
              {/* Header */}
              <div>
                <div className="mb-2 flex items-center gap-2">
                  <Award className="h-6 w-6 text-primary" />
                  <h1 className="font-heading text-3xl font-bold">{nftData.name}</h1>
                </div>
                <p className="leading-relaxed text-muted-foreground">{nftData.description}</p>
              </div>

              {/* Payout Amount */}
              <Card className="border-2 border-success/20 bg-gradient-to-br from-success/5 to-success/10">
                <CardContent className="p-6">
                  <p className="mb-2 text-sm text-muted-foreground">Valor do Pagamento</p>
                  <p className="font-heading text-4xl font-bold text-success">R$ {nftData.payout.amount}</p>
                  <p className="mt-1 text-xs text-muted-foreground">
                    Pago em {new Date(nftData.payout.timestamp).toLocaleDateString("pt-BR")}
                  </p>
                </CardContent>
              </Card>

              {/* Farmer Information */}
              <Card>
                <CardContent className="p-6">
                  <h3 className="mb-4 flex items-center gap-2 font-heading text-lg font-semibold">
                    <Leaf className="h-5 w-5 text-primary" />
                    Agricultor
                  </h3>
                  <div className="space-y-3">
                    <div className="flex items-center justify-between">
                      <span className="text-sm text-muted-foreground">Nome</span>
                      <div className="flex items-center gap-2">
                        <span className="font-medium">{nftData.farmer.name}</span>
                        {nftData.farmer.verified && (
                          <Badge className="bg-success text-white">
                            <CheckCircle2 className="mr-1 h-3 w-3" />
                            Verificado
                          </Badge>
                        )}
                      </div>
                    </div>
                    <Separator />
                    <div className="flex items-center justify-between">
                      <span className="text-sm text-muted-foreground">Carteira</span>
                      <div className="flex items-center gap-2">
                        <code className="rounded bg-muted px-2 py-1 font-mono text-xs">
                          {nftData.farmer.wallet.slice(0, 6)}...{nftData.farmer.wallet.slice(-4)}
                        </code>
                        <Button
                          size="sm"
                          variant="ghost"
                          className="h-6 w-6 p-0"
                          onClick={() => handleCopyAddress(nftData.farmer.wallet)}
                        >
                          {copied ? <CheckCircle2 className="h-3 w-3 text-success" /> : <Copy className="h-3 w-3" />}
                        </Button>
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>

              {/* Event Details */}
              <Card>
                <CardContent className="p-6">
                  <h3 className="mb-4 flex items-center gap-2 font-heading text-lg font-semibold">
                    {getEventIcon()}
                    Evento Climático
                  </h3>
                  <div className="space-y-3">
                    <div className="flex items-center justify-between">
                      <span className="text-sm text-muted-foreground">Tipo</span>
                      <span className="font-medium">{nftData.event.type}</span>
                    </div>
                    <Separator />
                    <div className="flex items-center justify-between">
                      <span className="text-sm text-muted-foreground">Data</span>
                      <span className="font-medium">{nftData.event.date}</span>
                    </div>
                    <Separator />
                    <div className="flex items-center justify-between">
                      <span className="text-sm text-muted-foreground">Localização</span>
                      <span className="font-medium">{nftData.event.location}</span>
                    </div>
                    <Separator />
                    <div className="flex items-center justify-between">
                      <span className="text-sm text-muted-foreground">Severidade</span>
                      <Badge variant="destructive">{nftData.event.severity}</Badge>
                    </div>
                  </div>
                </CardContent>
              </Card>

              {/* Policy Details */}
              <Card>
                <CardContent className="p-6">
                  <h3 className="mb-4 flex items-center gap-2 font-heading text-lg font-semibold">
                    <Award className="h-5 w-5 text-primary" />
                    Detalhes da Apólice
                  </h3>
                  <div className="space-y-3">
                    <div className="flex items-center justify-between">
                      <span className="text-sm text-muted-foreground">ID da Apólice</span>
                      <code className="rounded bg-muted px-2 py-1 font-mono text-xs">{nftData.policy.id}</code>
                    </div>
                    <Separator />
                    <div className="flex items-center justify-between">
                      <span className="text-sm text-muted-foreground">Cobertura Total</span>
                      <span className="font-medium">R$ {nftData.policy.coverage}</span>
                    </div>
                    <Separator />
                    <div className="flex items-center justify-between">
                      <span className="text-sm text-muted-foreground">Cultivo</span>
                      <span className="font-medium">{nftData.policy.cropType}</span>
                    </div>
                    <Separator />
                    <div className="flex items-center justify-between">
                      <span className="text-sm text-muted-foreground">Tamanho</span>
                      <span className="font-medium">{nftData.policy.farmSize}</span>
                    </div>
                  </div>
                </CardContent>
              </Card>

              {/* Blockchain Metadata */}
              <Card>
                <CardContent className="p-6">
                  <h3 className="mb-4 font-heading text-lg font-semibold">Metadados On-Chain</h3>
                  <div className="space-y-3">
                    <div className="flex items-center justify-between">
                      <span className="text-sm text-muted-foreground">Token ID</span>
                      <code className="rounded bg-muted px-2 py-1 font-mono text-xs">{nftData.tokenId}</code>
                    </div>
                    <Separator />
                    <div className="flex items-center justify-between">
                      <span className="text-sm text-muted-foreground">Padrão</span>
                      <span className="font-medium">{nftData.metadata.standard}</span>
                    </div>
                    <Separator />
                    <div className="flex items-center justify-between">
                      <span className="text-sm text-muted-foreground">Blockchain</span>
                      <span className="font-medium">{nftData.metadata.blockchain}</span>
                    </div>
                    <Separator />
                    <div className="flex flex-col gap-1">
                      <span className="text-sm text-muted-foreground">Contrato</span>
                      <div className="flex items-center gap-2">
                        <code className="flex-1 overflow-hidden text-ellipsis rounded bg-muted px-2 py-1 font-mono text-xs">
                          {nftData.metadata.contract}
                        </code>
                        <Button
                          size="sm"
                          variant="ghost"
                          className="h-6 w-6 p-0"
                          onClick={() => handleCopyAddress(nftData.metadata.contract)}
                        >
                          <Copy className="h-3 w-3" />
                        </Button>
                      </div>
                    </div>
                    <Separator />
                    <div className="flex flex-col gap-1">
                      <span className="text-sm text-muted-foreground">Hash da Transação</span>
                      <div className="flex items-center gap-2">
                        <code className="flex-1 overflow-hidden text-ellipsis rounded bg-muted px-2 py-1 font-mono text-xs">
                          {nftData.payout.txHash}
                        </code>
                        <Button
                          size="sm"
                          variant="ghost"
                          className="h-6 w-6 p-0"
                          onClick={() => handleCopyAddress(nftData.payout.txHash)}
                        >
                          <Copy className="h-3 w-3" />
                        </Button>
                      </div>
                    </div>
                    <Separator />
                    <div className="flex items-center justify-between">
                      <span className="text-sm text-muted-foreground">Bloco</span>
                      <code className="rounded bg-muted px-2 py-1 font-mono text-xs">{nftData.payout.blockNumber}</code>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </div>
          </div>
        </div>
      </main>
    </div>
  )
}
