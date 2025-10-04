"use client"

import { Header } from "@/components/header"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Badge } from "@/components/ui/badge"
import { Alert, AlertDescription } from "@/components/ui/alert"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Wallet, ExternalLink, CheckCircle2, AlertCircle, Loader2, FileText, Database } from "lucide-react"
import { useState } from "react"
import Link from "next/link"
import { ethers } from "ethers"
import { getContract, contractAddress } from "@/utils/contract"

export default function TestPage() {
  const [isConnecting, setIsConnecting] = useState(false)
  const [walletConnected, setWalletConnected] = useState(false)
  const [walletAddress, setWalletAddress] = useState("")
  const [isCreatingPolicy, setIsCreatingPolicy] = useState(false)
  const [policyCreated, setPolicyCreated] = useState<any>(null)
  const [txHash, setTxHash] = useState("")

  // Form state for policy creation
  const [policyData, setPolicyData] = useState({
    cropType: "",
    farmSize: "",
    coverage: "",
  })

  // Contract info
  const CONTRACT_ADDRESS = contractAddress
  const BLOCK_EXPLORER_URL = "https://blockscout-paseo.polkadot.io" // ajuste se usar outro explorer

  const handleConnectWallet = async () => {
    try {
      setIsConnecting(true)
      if (!window.ethereum) throw new Error("Carteira não encontrada")

      const provider = new ethers.BrowserProvider(window.ethereum)
      await provider.send("eth_requestAccounts", [])
      const signer = await provider.getSigner()
      const address = await signer.getAddress()

      setWalletAddress(address)
      setWalletConnected(true)
    } catch (err) {
      console.error("Erro ao conectar carteira:", err)
      alert("Erro ao conectar carteira. Verifique se o MetaMask/Talisman/SubWallet está ativo.")
    } finally {
      setIsConnecting(false)
    }
  }

  const handleCreatePolicy = async () => {
    try {
      setIsCreatingPolicy(true)
      setPolicyCreated(null)
      setTxHash("")

      const provider = new ethers.BrowserProvider(window.ethereum)
      const signer = await provider.getSigner()
      const contract = getContract(signer)

      const coverageNumber = Number(policyData.coverage)
      if (!coverageNumber || coverageNumber <= 0) throw new Error("Cobertura inválida")

      const payoutEth = (coverageNumber / 1000).toString()
      const premiumEth = ((coverageNumber * 0.03) / 1000).toString()

      const payout = ethers.parseEther(payoutEth)
      const premium = ethers.parseEther(premiumEth)

      const tx = await contract.createPolicy(payout, { value: premium })
      const receipt = await tx.wait()

      setTxHash(receipt.hash)

      // pega o último ID e consulta detalhes
      const nextId = await contract.nextId()
      const lastId = Number(nextId) - 1
      const policy = await contract.getPolicy(lastId)

      setPolicyCreated({
        id: lastId,
        premium: ethers.formatEther(policy.premium) + " PAS",
        payout: ethers.formatEther(policy.payout) + " PAS",
        active: policy.active,
      })
    } catch (err: any) {
      console.error("Erro ao criar apólice:", err)
      alert("Erro ao criar apólice: " + (err.message || "Erro desconhecido"))
    } finally {
      setIsCreatingPolicy(false)
    }
  }

  // Read function - get active policies count
  const [activePolicies, setActivePolicies] = useState<number | null>(null)
  const [isReading, setIsReading] = useState(false)

  const handleReadPolicies = async () => {
    try {
      setIsReading(true)
      const provider = new ethers.BrowserProvider(window.ethereum)
      const contract = getContract(provider)
      const nextId = await contract.nextId()
      setActivePolicies(Number(nextId))
    } catch (err) {
      console.error("Erro ao ler apólices:", err)
      alert("Erro ao ler apólices ativas")
    } finally {
      setIsReading(false)
    }
  }

  return (
    <div className="flex min-h-screen flex-col">
      <Header />

      <main className="flex-1 px-4 py-8">
        <div className="container mx-auto max-w-6xl">
          {/* Header */}
          <div className="mb-8">
            <Badge className="mb-4 bg-accent text-accent-foreground">LATIN HACK - Test Page</Badge>
            <h1 className="font-heading mb-4 text-balance text-3xl font-bold md:text-4xl">
              Smart Contract Test Interface
            </h1>
            <p className="text-pretty text-lg leading-relaxed text-muted-foreground">
              Página de teste obrigatória para demonstrar integração com smart contract na Polkadot Paseo Testnet
            </p>
          </div>

          <div className="grid gap-6 lg:grid-cols-2">
            {/* Left Column - Contract Info & Wallet */}
            <div className="space-y-6">
              {/* Contract Address Card */}
              <Card className="border-2">
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <FileText className="h-5 w-5" />
                    Contract Address
                  </CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="rounded-lg border bg-muted/50 p-4">
                    <p className="mb-2 text-sm font-medium text-muted-foreground">Polkadot Paseo Testnet</p>
                    <code className="block break-all rounded bg-background p-3 font-mono text-sm">
                      {CONTRACT_ADDRESS}
                    </code>
                  </div>

                  <Button variant="outline" className="w-full bg-transparent" asChild>
                    <a href={`${BLOCK_EXPLORER_URL}/address/${CONTRACT_ADDRESS}`} target="_blank" rel="noopener noreferrer">
                      <ExternalLink className="mr-2 h-4 w-4" />
                      Ver no Block Explorer
                    </a>
                  </Button>
                </CardContent>
              </Card>

              {/* Wallet Connection Card */}
              <Card className="border-2">
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <Wallet className="h-5 w-5" />
                    Wallet Connection
                  </CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  {!walletConnected ? (
                    <>
                      <Alert>
                        <AlertCircle className="h-4 w-4" />
                        <AlertDescription>
                          Conecte sua carteira para interagir com o smart contract na Paseo Testnet
                        </AlertDescription>
                      </Alert>

                      <Button
                        size="lg"
                        className="w-full bg-primary text-primary-foreground hover:bg-primary/90"
                        onClick={handleConnectWallet}
                        disabled={isConnecting}
                      >
                        {isConnecting ? (
                          <>
                            <Loader2 className="mr-2 h-5 w-5 animate-spin" />
                            Conectando...
                          </>
                        ) : (
                          <>
                            <Wallet className="mr-2 h-5 w-5" />
                            Conectar Carteira
                          </>
                        )}
                      </Button>
                    </>
                  ) : (
                    <>
                      <Alert className="border-success bg-success/10">
                        <CheckCircle2 className="h-4 w-4 text-success" />
                        <AlertDescription className="text-success">Carteira conectada!</AlertDescription>
                      </Alert>

                      <div className="rounded-lg border bg-muted/50 p-4">
                        <p className="mb-2 text-sm font-medium">Seu Endereço</p>
                        <code className="block break-all rounded bg-background p-3 font-mono text-sm">
                          {walletAddress}
                        </code>
                      </div>
                    </>
                  )}
                </CardContent>
              </Card>

              {/* Read Function Card */}
              <Card className="border-2 border-secondary/50">
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <Database className="h-5 w-5 text-secondary" />
                    Read Function
                  </CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  <Button
                    variant="outline"
                    className="w-full border-secondary text-secondary hover:bg-secondary/10 bg-transparent"
                    onClick={handleReadPolicies}
                    disabled={isReading}
                  >
                    {isReading ? (
                      <>
                        <Loader2 className="mr-2 h-5 w-5 animate-spin" />
                        Lendo...
                      </>
                    ) : (
                      "nextId()"
                    )}
                  </Button>

                  {activePolicies !== null && (
                    <div className="rounded-lg border bg-secondary/5 p-4">
                      <p className="mb-2 text-sm font-medium text-muted-foreground">Resultado:</p>
                      <div className="flex items-center gap-2">
                        <code className="rounded bg-background px-3 py-2 font-mono text-lg font-bold text-secondary">
                          {activePolicies}
                        </code>
                        <span className="text-sm text-muted-foreground">apólices criadas</span>
                      </div>
                    </div>
                  )}
                </CardContent>
              </Card>
            </div>

            {/* Right Column - Write Function */}
            <div className="space-y-6">
              {/* Write Function Card */}
              <Card className="border-2 border-primary/50">
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <FileText className="h-5 w-5 text-primary" />
                    Write Function - Criar Apólice
                  </CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="space-y-2">
                    <Label htmlFor="coverage">Cobertura (USDC)</Label>
                    <Select
                      value={policyData.coverage}
                      onValueChange={(value) => setPolicyData({ ...policyData, coverage: value })}
                      disabled={!walletConnected}
                    >
                      <SelectTrigger id="coverage">
                        <SelectValue placeholder="Selecione a cobertura" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="2500">2,500 USDC</SelectItem>
                        <SelectItem value="5000">5,000 USDC</SelectItem>
                        <SelectItem value="10000">10,000 USDC</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>

                  <Button
                    size="lg"
                    className="w-full bg-primary text-primary-foreground hover:bg-primary/90"
                    onClick={handleCreatePolicy}
                    disabled={!walletConnected || !policyData.coverage || isCreatingPolicy}
                  >
                    {isCreatingPolicy ? (
                      <>
                        <Loader2 className="mr-2 h-5 w-5 animate-spin" />
                        Criando Apólice...
                      </>
                    ) : (
                      "createPolicy()"
                    )}
                  </Button>
                </CardContent>
              </Card>

              {/* Transaction Result */}
              {policyCreated && txHash && (
                <Card className="border-2 border-success">
                  <CardHeader>
                    <CardTitle className="flex items-center gap-2 text-success">
                      <CheckCircle2 className="h-5 w-5" />
                      Transação Confirmada
                    </CardTitle>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    <Alert className="border-success bg-success/10">
                      <CheckCircle2 className="h-4 w-4 text-success" />
                      <AlertDescription className="text-success">
                        Apólice criada com sucesso na blockchain!
                      </AlertDescription>
                    </Alert>

                    <div className="space-y-2 text-sm">
                      <p><strong>ID:</strong> {policyCreated.id}</p>
                      <p><strong>Prêmio:</strong> {policyCreated.premium}</p>
                      <p><strong>Cobertura:</strong> {policyCreated.payout}</p>
                      <p><strong>Status:</strong> {policyCreated.active ? "Ativa ✅" : "Inativa ❌"}</p>
                      <p><strong>TxHash:</strong> {txHash}</p>
                    </div>

                    <Button variant="outline" size="sm" className="w-full bg-transparent" asChild>
                      <a href={`${BLOCK_EXPLORER_URL}/tx/${txHash}`} target="_blank" rel="noopener noreferrer">
                        <ExternalLink className="mr-2 h-4 w-4" />
                        Ver Transação
                      </a>
                    </Button>
                  </CardContent>
                </Card>
              )}
            </div>
          </div>
        </div>
      </main>
    </div>
  )
}
