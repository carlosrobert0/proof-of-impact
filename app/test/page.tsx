"use client"

import { Header } from "@/components/header"
import { Card, CardContent } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Badge } from "@/components/ui/badge"
import { Alert, AlertDescription } from "@/components/ui/alert"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Checkbox } from "@/components/ui/checkbox"
import { Progress } from "@/components/ui/progress"
import { Wallet, User, Leaf, Shield, CheckCircle2, AlertCircle, Loader2 } from "lucide-react"
import { useState } from "react"
import Link from "next/link"
import { ethers } from "ethers"
import { contractAddress, getContract } from "@/utils/contract"
import { th } from "date-fns/locale"

type Step = 1 | 2 | 3 | 4

export default function CadastroPage() {
  const [currentStep, setCurrentStep] = useState<Step>(1)
  const [isConnecting, setIsConnecting] = useState(false)
  const [isVerifying, setIsVerifying] = useState(false)
  const [walletConnected, setWalletConnected] = useState(false)
  const [kiltVerified, setKiltVerified] = useState(false)
  const [walletAddress, setWalletAddress] = useState("")
  const [isCreatingPolicy, setIsCreatingPolicy] = useState(false)
  const [policyCreated, setPolicyCreated] = useState<any>(null)

  // Form state
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    country: "",
    state: "",
    city: "",
    cropType: "",
    farmSize: "",
    coverage: "",
    acceptTerms: false,
  })

  const handleCreatePolicy = async () => {
    if (!formData.coverage) {
      alert("Selecione a cobertura antes de prosseguir.")
      return
    }
    try {
      setIsCreatingPolicy(true)
      const provider = new ethers.BrowserProvider(window.ethereum)
      const signer = await provider.getSigner()
      const contract = getContract(signer)

      // Converte cobertura (R$) em ETH simbólico (exemplo: cada 1000 R$ = 1 ETH)
      const coverageNumber = Number(formData.coverage)
      if (isNaN(coverageNumber) || coverageNumber <= 0) {
        throw new Error("Valor de cobertura inválido")
      }

      const payoutEth = (coverageNumber / 1000).toFixed(6)       // ex: "2500" -> "2.500000"
      const premiumEth = ((coverageNumber * 0.03) / 1000).toFixed(6) // 3% da cobertura

      console.log("Coverage:", formData.coverage)
      console.log("payoutEth:", payoutEth)
      console.log("premiumEth:", premiumEth)

      const payout = ethers.parseEther(payoutEth)   // BigInt válido
      const premium = ethers.parseEther(premiumEth) // BigInt válido

      const tx = await contract.createPolicy(payout, { value: premium })
      const receipt = await tx.wait()

      const nextId = await contract.nextId()
      const lastId = Number(nextId) - 1
      const policy = await contract.getPolicy(lastId)

      setPolicyCreated({
        id: lastId,
        premium: ethers.formatEther(policy.premium) + " PAS",
        payout: ethers.formatEther(policy.payout) + " PAS",
        active: policy.active,
        txHash: receipt.hash,
      })

      setCurrentStep(4)
    } catch (err: any) {
      // alert("Erro ao criar apólice: " + err.message)
      // console.error(err)
      if (err.code === "INSUFFICIENT_FUNDS") {
        alert("Saldo insuficiente em PAS para pagar prêmio + taxa de rede (gas).")
      } else if (err.code === "UNPREDICTABLE_GAS_LIMIT") {
        alert("Erro ao estimar o gas. Verifique os parâmetros da transação.")
      } else {
        alert("Erro ao criar apólice: " + (err.message || "Erro desconhecido"))
      }
    } finally {
      setIsCreatingPolicy(false)
    }
  }

  async function connectWallet() {
    if (!window.ethereum) throw new Error("MetaMask não encontrada.")

    const paseoConfig = {
      chainId: "0x190f1b46", // 420420422
      chainName: "Polkadot Hub TestNet",
      nativeCurrency: { name: "Polkadot Asset Hub", symbol: "PAS", decimals: 18 },
      rpcUrls: ["https://testnet-passet-hub-eth-rpc.polkadot.io"],
      blockExplorerUrls: ["https://blockscout-passet-hub.parity-testnet.parity.io"],
    }

    // pede para adicionar a rede se ainda não estiver no MetaMask
    await window.ethereum.request({
      method: "wallet_addEthereumChain",
      params: [paseoConfig],
    })

    // conecta contas
    await window.ethereum.request({ method: "eth_requestAccounts" })

    const provider = new ethers.BrowserProvider(window.ethereum)
    const signer = await provider.getSigner()
    const address = await signer.getAddress()

    setWalletAddress(address)
    setWalletConnected(true)
    return signer
  }


  const handleConnectWallet = async () => {
    setIsConnecting(true)
    // Simulate wallet connection
    await connectWallet()
    setIsConnecting(false)
  }

  const handleVerifyKilt = async () => {
    setIsVerifying(true)
    // Simulate KILT verification
    setTimeout(() => {
      setKiltVerified(true)
      setIsVerifying(false)
    }, 3000)
  }

  const handleNextStep = () => {
    if (currentStep < 4) {
      setCurrentStep((currentStep + 1) as Step)
    }
  }

  const handlePreviousStep = () => {
    if (currentStep > 1) {
      setCurrentStep((currentStep - 1) as Step)
    }
  }

  const progressPercentage = (currentStep / 4) * 100

  return (
    <div className="flex min-h-screen flex-col">
      <Header />

      <main className="flex-1 px-4 py-8">
        <div className="container mx-auto max-w-4xl">
          {/* Header */}
          <div className="mb-8 text-center">
            <h1 className="font-heading mb-4 text-balance text-3xl font-bold md:text-4xl">
              Criar Minha Apólice de Proteção
            </h1>
            <p className="text-pretty text-lg leading-relaxed text-muted-foreground">
              Complete o cadastro em 4 passos simples para começar a proteger sua colheita
            </p>
          </div>

          {/* Progress Bar */}
          <div className="mb-8">
            <div className="mb-4 flex items-center justify-between text-sm">
              <span className="text-muted-foreground">Passo {currentStep} de 4</span>
              <span className="font-medium">{progressPercentage}% completo</span>
            </div>
            <Progress value={progressPercentage} className="h-2" />
          </div>

          {/* Steps Indicator */}
          <div className="mb-8 grid grid-cols-4 gap-2">
            <div className={`flex flex-col items-center gap-2 ${currentStep >= 1 ? "opacity-100" : "opacity-40"}`}>
              <div
                className={`flex h-10 w-10 items-center justify-center rounded-full ${currentStep >= 1 ? "bg-primary text-primary-foreground" : "bg-muted"
                  }`}
              >
                <Wallet className="h-5 w-5" />
              </div>
              <span className="text-xs font-medium">Carteira</span>
            </div>
            <div className={`flex flex-col items-center gap-2 ${currentStep >= 2 ? "opacity-100" : "opacity-40"}`}>
              <div
                className={`flex h-10 w-10 items-center justify-center rounded-full ${currentStep >= 2 ? "bg-primary text-primary-foreground" : "bg-muted"
                  }`}
              >
                <User className="h-5 w-5" />
              </div>
              <span className="text-xs font-medium">Dados</span>
            </div>
            <div className={`flex flex-col items-center gap-2 ${currentStep >= 3 ? "opacity-100" : "opacity-40"}`}>
              <div
                className={`flex h-10 w-10 items-center justify-center rounded-full ${currentStep >= 3 ? "bg-primary text-primary-foreground" : "bg-muted"
                  }`}
              >
                <Leaf className="h-5 w-5" />
              </div>
              <span className="text-xs font-medium">Apólice</span>
            </div>
            <div className={`flex flex-col items-center gap-2 ${currentStep >= 4 ? "opacity-100" : "opacity-40"}`}>
              <div
                className={`flex h-10 w-10 items-center justify-center rounded-full ${currentStep >= 4 ? "bg-primary text-primary-foreground" : "bg-muted"
                  }`}
              >
                <Shield className="h-5 w-5" />
              </div>
              <span className="text-xs font-medium">Verificação</span>
            </div>
          </div>

          {/* Step Content */}
          <Card className="border-2">
            <CardContent className="p-6 md:p-8">
              {/* Step 1: Connect Wallet */}
              {currentStep === 1 && (
                <div className="space-y-6">
                  <div>
                    <h2 className="font-heading mb-2 text-2xl font-bold">Conecte Sua Carteira</h2>
                    <p className="text-muted-foreground">Conecte sua carteira Web3 para receber pagamentos on-chain</p>
                  </div>

                  {!walletConnected ? (
                    <div className="space-y-4">
                      <Alert>
                        <AlertCircle className="h-4 w-4" />
                        <AlertDescription>
                          Você precisará de uma carteira compatível com Polkadot/Substrate para usar a plataforma.
                        </AlertDescription>
                      </Alert>

                      <div className="flex flex-col gap-3">
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

                        <p className="text-center text-xs text-muted-foreground">
                          Suportamos Polkadot.js, Talisman, SubWallet e outras carteiras Substrate
                        </p>
                      </div>
                    </div>
                  ) : (
                    <div className="space-y-4">
                      <Alert className="border-success bg-success/10">
                        <CheckCircle2 className="h-4 w-4 text-success" />
                        <AlertDescription className="text-success">Carteira conectada com sucesso!</AlertDescription>
                      </Alert>

                      <div className="rounded-lg border bg-muted/50 p-4">
                        <p className="mb-2 text-sm font-medium">Endereço da Carteira</p>
                        <code className="block rounded bg-background p-3 font-mono text-sm">{walletAddress}</code>
                      </div>

                      <Button size="lg" className="w-full" onClick={handleNextStep}>
                        Continuar
                      </Button>
                    </div>
                  )}
                </div>
              )}

              {/* Step 2: Personal Information */}
              {currentStep === 2 && (
                <div className="space-y-6">
                  <div>
                    <h2 className="font-heading mb-2 text-2xl font-bold">Informações Pessoais</h2>
                    <p className="text-muted-foreground">Preencha seus dados para criar sua conta</p>
                  </div>

                  <div className="space-y-4">
                    <div className="space-y-2">
                      <Label htmlFor="name">Nome Completo *</Label>
                      <Input
                        id="name"
                        placeholder="João Silva"
                        value={formData.name}
                        onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                      />
                    </div>

                    <div className="space-y-2">
                      <Label htmlFor="email">Email *</Label>
                      <Input
                        id="email"
                        type="email"
                        placeholder="joao@exemplo.com"
                        value={formData.email}
                        onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                      />
                    </div>

                    <div className="space-y-2">
                      <Label htmlFor="phone">Telefone *</Label>
                      <Input
                        id="phone"
                        type="tel"
                        placeholder="+55 11 98765-4321"
                        value={formData.phone}
                        onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                      />
                    </div>

                    <div className="grid gap-4 md:grid-cols-3">
                      <div className="space-y-2">
                        <Label htmlFor="country">País *</Label>
                        <Select
                          value={formData.country}
                          onValueChange={(value) => setFormData({ ...formData, country: value })}
                        >
                          <SelectTrigger id="country">
                            <SelectValue placeholder="Selecione" />
                          </SelectTrigger>
                          <SelectContent>
                            <SelectItem value="brasil">Brasil</SelectItem>
                            <SelectItem value="argentina">Argentina</SelectItem>
                            <SelectItem value="colombia">Colômbia</SelectItem>
                            <SelectItem value="mexico">México</SelectItem>
                            <SelectItem value="chile">Chile</SelectItem>
                          </SelectContent>
                        </Select>
                      </div>

                      <div className="space-y-2">
                        <Label htmlFor="state">Estado *</Label>
                        <Input
                          id="state"
                          placeholder="São Paulo"
                          value={formData.state}
                          onChange={(e) => setFormData({ ...formData, state: e.target.value })}
                        />
                      </div>

                      <div className="space-y-2">
                        <Label htmlFor="city">Cidade *</Label>
                        <Input
                          id="city"
                          placeholder="Campinas"
                          value={formData.city}
                          onChange={(e) => setFormData({ ...formData, city: e.target.value })}
                        />
                      </div>
                    </div>
                  </div>

                  <div className="flex gap-3">
                    <Button variant="outline" onClick={handlePreviousStep}>
                      Voltar
                    </Button>
                    <Button className="flex-1" onClick={handleNextStep}>
                      Continuar
                    </Button>
                  </div>
                </div>
              )}

              {/* Step 3: Policy Configuration */}
              {currentStep === 3 && (
                <div className="space-y-6">
                  <p>Contrato:
                    <a href={`https://blockscout-passet-hub.parity-testnet.parity.io/address/${contractAddress}`} target="_blank">
                      {contractAddress}
                    </a>
                  </p>
                  <div>
                    <h2 className="font-heading mb-2 text-2xl font-bold">Configure Sua Apólice</h2>
                    <p className="text-muted-foreground">Defina os detalhes da sua proteção climática</p>
                  </div>

                  <div className="space-y-4">
                    <div className="space-y-2">
                      <Label htmlFor="cropType">Tipo de Cultivo *</Label>
                      <Select
                        value={formData.cropType}
                        onValueChange={(value) => setFormData({ ...formData, cropType: value })}
                      >
                        <SelectTrigger id="cropType">
                          <SelectValue placeholder="Selecione o cultivo" />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="cafe">Café</SelectItem>
                          <SelectItem value="soja">Soja</SelectItem>
                          <SelectItem value="milho">Milho</SelectItem>
                          <SelectItem value="cana">Cana-de-açúcar</SelectItem>
                          <SelectItem value="trigo">Trigo</SelectItem>
                          <SelectItem value="arroz">Arroz</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>

                    <div className="space-y-2">
                      <Label htmlFor="farmSize">Tamanho da Propriedade (hectares) *</Label>
                      <Input
                        id="farmSize"
                        type="number"
                        placeholder="50"
                        value={formData.farmSize}
                        onChange={(e) => setFormData({ ...formData, farmSize: e.target.value })}
                      />
                    </div>

                    <div className="space-y-2">
                      <Label htmlFor="coverage">Cobertura Desejada (R$) *</Label>
                      <Select
                        value={formData.coverage}
                        onValueChange={(value) => setFormData({ ...formData, coverage: value })}
                      >
                        <SelectTrigger id="coverage">
                          <SelectValue placeholder="Selecione a cobertura" />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="2500">R$ 2.500</SelectItem>
                          <SelectItem value="5000">R$ 5.000</SelectItem>
                          <SelectItem value="10000">R$ 10.000</SelectItem>
                          <SelectItem value="25000">R$ 25.000</SelectItem>
                          <SelectItem value="50000">R$ 50.000</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>

                    {formData.coverage && (
                      <Alert className="border-primary/20 bg-primary/5">
                        <AlertCircle className="h-4 w-4 text-primary" />
                        <AlertDescription>
                          <span className="font-medium">Prêmio estimado:</span> R${" "}
                          {(Number.parseInt(formData.coverage) * 0.03).toFixed(2)} por mês
                        </AlertDescription>
                      </Alert>
                    )}

                    <div className="rounded-lg border bg-muted/50 p-4">
                      <h4 className="mb-2 font-medium">Eventos Cobertos:</h4>
                      <ul className="space-y-1 text-sm text-muted-foreground">
                        <li>• Seca extrema ou prolongada</li>
                        <li>• Chuvas excessivas</li>
                        <li>• Geada severa</li>
                        <li>• Tempestades e granizo</li>
                      </ul>
                    </div>
                  </div>

                  <div className="flex gap-3">
                    <Button variant="outline" onClick={handlePreviousStep}>
                      Voltar
                    </Button>
                    {/* <Button className="flex-1" onClick={handleNextStep}>
                      Continuar
                    </Button> */}
                    <Button className="flex-1" onClick={handleCreatePolicy} disabled={isCreatingPolicy}>
                      {isCreatingPolicy ? (
                        <>
                          <Loader2 className="mr-2 h-5 w-5 animate-spin" />
                          Criando...
                        </>
                      ) : (
                        "Criar Apólice"
                      )}
                    </Button>
                  </div>
                </div>
              )}

              {/* Step 4: KILT Verification */}
              {currentStep === 4 && (
                policyCreated ? (
                  <Alert className="border-success bg-success/10 mb-4">
                    <CheckCircle2 className="h-4 w-4 text-success" />
                    <AlertDescription>
                      Apólice criada na blockchain! <br />
                      ID: {policyCreated.id} <br />
                      Prêmio: {policyCreated.premium} PAS <br />
                      Cobertura: {policyCreated.payout} PAS <br />
                      Status: {policyCreated.active ? "Ativa ✅" : "Inativa ❌"} <br />
                      Tx: {policyCreated.txHash.slice(0, 12)}...
                    </AlertDescription>
                    <a
                      href={`https://blockscout-passet-hub.parity-testnet.parity.io/tx/${policyCreated.txHash}`}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="mt-3 inline-block text-primary hover:underline text-sm"
                    >
                      Ver no Explorer
                    </a>
                  </Alert>
                ) :
                  <div className="space-y-6">
                    <div>
                      <h2 className="font-heading mb-2 text-2xl font-bold">Verificação de Identidade</h2>
                      <p className="text-muted-foreground">
                        Verifique sua identidade com KILT Protocol para garantir a segurança da plataforma
                      </p>
                    </div>

                    {!kiltVerified ? (
                      <div className="space-y-4">
                        <Alert>
                          <Shield className="h-4 w-4" />
                          <AlertDescription>
                            A verificação KILT garante que você é um agricultor real e protege a plataforma contra
                            fraudes. Seus dados são criptografados e você mantém controle total sobre suas credenciais.
                          </AlertDescription>
                        </Alert>

                        <div className="rounded-lg border bg-muted/50 p-6">
                          <div className="mb-4 flex items-center gap-3">
                            <div className="flex h-12 w-12 items-center justify-center rounded-full bg-secondary/10">
                              <Shield className="h-6 w-6 text-secondary" />
                            </div>
                            <div>
                              <h4 className="font-medium">KILT Protocol</h4>
                              <p className="text-sm text-muted-foreground">Identidade descentralizada e verificável</p>
                            </div>
                          </div>

                          <ul className="mb-4 space-y-2 text-sm">
                            <li className="flex items-center gap-2">
                              <CheckCircle2 className="h-4 w-4 text-success" />
                              Privacidade preservada
                            </li>
                            <li className="flex items-center gap-2">
                              <CheckCircle2 className="h-4 w-4 text-success" />
                              Você controla seus dados
                            </li>
                            <li className="flex items-center gap-2">
                              <CheckCircle2 className="h-4 w-4 text-success" />
                              Verificação instantânea
                            </li>
                          </ul>

                          <Button
                            size="lg"
                            className="w-full bg-secondary text-secondary-foreground hover:bg-secondary/90"
                            onClick={handleVerifyKilt}
                            disabled={isVerifying}
                          >
                            {isVerifying ? (
                              <>
                                <Loader2 className="mr-2 h-5 w-5 animate-spin" />
                                Verificando Identidade...
                              </>
                            ) : (
                              <>
                                <Shield className="mr-2 h-5 w-5" />
                                Iniciar Verificação KILT
                              </>
                            )}
                          </Button>
                        </div>
                      </div>
                    ) : (
                      <div className="space-y-4">
                        <Alert className="border-success bg-success/10">
                          <CheckCircle2 className="h-4 w-4 text-success" />
                          <AlertDescription className="text-success">
                            Identidade verificada com sucesso! Você recebeu uma credencial KILT.
                          </AlertDescription>
                        </Alert>

                        <div className="rounded-lg border bg-gradient-to-br from-primary/5 to-secondary/5 p-6">
                          <div className="mb-4 flex items-center justify-between">
                            <div className="flex items-center gap-3">
                              <div className="flex h-12 w-12 items-center justify-center rounded-full bg-success">
                                <CheckCircle2 className="h-6 w-6 text-white" />
                              </div>
                              <div>
                                <h4 className="font-medium">Agricultor Verificado</h4>
                                <p className="text-sm text-muted-foreground">Credencial KILT emitida</p>
                              </div>
                            </div>
                            <Badge className="bg-success text-white">Verificado</Badge>
                          </div>

                          <div className="space-y-2 text-sm">
                            <div className="flex justify-between">
                              <span className="text-muted-foreground">Nome:</span>
                              <span className="font-medium">{formData.name || "João Silva"}</span>
                            </div>
                            <div className="flex justify-between">
                              <span className="text-muted-foreground">Localização:</span>
                              <span className="font-medium">
                                {formData.city || "Campinas"}, {formData.state || "SP"}
                              </span>
                            </div>
                            <div className="flex justify-between">
                              <span className="text-muted-foreground">Cultivo:</span>
                              <span className="font-medium">{formData.cropType || "Café"}</span>
                            </div>
                          </div>
                        </div>

                        <div className="flex items-start gap-2">
                          <Checkbox
                            id="terms"
                            checked={formData.acceptTerms}
                            onCheckedChange={(checked) => setFormData({ ...formData, acceptTerms: checked as boolean })}
                          />
                          <Label htmlFor="terms" className="text-sm leading-relaxed">
                            Eu aceito os{" "}
                            <Link href="/termos" className="text-primary hover:underline">
                              termos de uso
                            </Link>{" "}
                            e a{" "}
                            <Link href="/privacidade" className="text-primary hover:underline">
                              política de privacidade
                            </Link>
                          </Label>
                        </div>

                        <div className="flex gap-3">
                          <Button variant="outline" onClick={handlePreviousStep}>
                            Voltar
                          </Button>
                          <Button
                            className="flex-1 bg-accent text-accent-foreground hover:bg-accent/90"
                            disabled={!formData.acceptTerms}
                            asChild
                          >
                            <Link href="/dashboard">Criar Apólice</Link>
                          </Button>
                        </div>
                      </div>
                    )}
                  </div>
              )}
            </CardContent>
          </Card>

          {/* Help Section */}
          <div className="mt-8 text-center">
            <p className="text-sm text-muted-foreground">
              Precisa de ajuda?{" "}
              <Link href="/suporte" className="text-primary hover:underline">
                Entre em contato com o suporte
              </Link>
            </p>
          </div>
        </div>
      </main>
    </div>
  )
}
