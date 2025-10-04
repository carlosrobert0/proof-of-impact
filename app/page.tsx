import { Header } from "@/components/header"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Leaf, Shield, Coins, TrendingUp, Sun, CloudRain, Wallet, Award } from "lucide-react"
import Link from "next/link"

export default function HomePage() {
  return (
    <div className="flex min-h-screen flex-col">
      <Header />

      {/* Hero Section */}
      <section className="relative overflow-hidden bg-accent px-4 py-20 md:py-32">
        <div className="container relative z-10 mx-auto">
          <div className="mx-auto max-w-4xl text-center">
            <Badge className="mb-6 bg-primary text-primary-foreground" variant="secondary">
              <Leaf className="mr-1 h-3 w-3" />
              Blockchain para o Bem Social
            </Badge>

            <h1 className="font-heading mb-6 text-balance text-4xl font-bold leading-tight text-foreground md:text-6xl">
              Proteção Climática Transparente para Agricultores
            </h1>

            <p className="mb-8 text-pretty text-lg leading-relaxed text-foreground/80 md:text-xl">
              Microseguros climáticos on-chain que pagam automaticamente quando eventos climáticos extremos acontecem.
              Sem burocracia, com total transparência.
            </p>

            <div className="flex flex-col items-center justify-center gap-4 sm:flex-row">
              <Button size="lg" className="bg-primary text-primary-foreground hover:bg-primary/90" asChild>
                <Link href="/test">Criar Minha Apólice</Link>
              </Button>
              <Button
                size="lg"
                variant="outline"
                className="border-foreground/20 bg-background/50 backdrop-blur"
                asChild
              >
                <Link href="#como-funciona">Como Funciona</Link>
              </Button>
            </div>
          </div>
        </div>

        {/* Decorative elements */}
        <div className="absolute -right-20 -top-20 h-64 w-64 rounded-full bg-primary/10 blur-3xl" />
        <div className="absolute -bottom-20 -left-20 h-64 w-64 rounded-full bg-secondary/10 blur-3xl" />
      </section>

      {/* Stats Section */}
      <section className="border-b bg-card px-4 py-12">
        <div className="container mx-auto">
          <div className="grid gap-8 md:grid-cols-4">
            <div className="text-center">
              <div className="mb-2 font-heading text-4xl font-bold text-primary">$2.4M</div>
              <div className="text-sm text-muted-foreground">Pagos em Proteção</div>
            </div>
            <div className="text-center">
              <div className="mb-2 font-heading text-4xl font-bold text-primary">15,000+</div>
              <div className="text-sm text-muted-foreground">Agricultores Protegidos</div>
            </div>
            <div className="text-center">
              <div className="mb-2 font-heading text-4xl font-bold text-primary">98%</div>
              <div className="text-sm text-muted-foreground">Satisfação</div>
            </div>
            <div className="text-center">
              <div className="mb-2 font-heading text-4xl font-bold text-primary">24h</div>
              <div className="text-sm text-muted-foreground">Tempo de Pagamento</div>
            </div>
          </div>
        </div>
      </section>

      {/* How It Works Section */}
      <section id="como-funciona" className="px-4 py-20">
        <div className="container mx-auto">
          <div className="mb-12 text-center">
            <h2 className="font-heading mb-4 text-balance text-3xl font-bold md:text-4xl">Como Funciona</h2>
            <p className="mx-auto max-w-2xl text-pretty text-lg leading-relaxed text-muted-foreground">
              Proteção climática simplificada em três passos
            </p>
          </div>

          <div className="grid gap-8 md:grid-cols-3">
            <Card className="border-2 transition-shadow hover:shadow-lg">
              <CardContent className="p-6">
                <div className="mb-4 flex h-12 w-12 items-center justify-center rounded-xl bg-primary/10">
                  <Shield className="h-6 w-6 text-primary" />
                </div>
                <h3 className="font-heading mb-2 text-xl font-semibold">1. Crie Sua Apólice</h3>
                <p className="leading-relaxed text-muted-foreground">
                  Conecte sua carteira, verifique sua identidade com KILT e escolha a cobertura ideal para sua região e
                  cultivo.
                </p>
              </CardContent>
            </Card>

            <Card className="border-2 transition-shadow hover:shadow-lg">
              <CardContent className="p-6">
                <div className="mb-4 flex h-12 w-12 items-center justify-center rounded-xl bg-secondary/10">
                  <CloudRain className="h-6 w-6 text-secondary" />
                </div>
                <h3 className="font-heading mb-2 text-xl font-semibold">2. Monitoramento Automático</h3>
                <p className="leading-relaxed text-muted-foreground">
                  Oráculos climáticos monitoram condições em tempo real. Quando eventos extremos ocorrem, o contrato é
                  ativado automaticamente.
                </p>
              </CardContent>
            </Card>

            <Card className="border-2 transition-shadow hover:shadow-lg">
              <CardContent className="p-6">
                <div className="mb-4 flex h-12 w-12 items-center justify-center rounded-xl bg-accent/20">
                  <Coins className="h-6 w-6 text-accent-foreground" />
                </div>
                <h3 className="font-heading mb-2 text-xl font-semibold">3. Pagamento Instantâneo</h3>
                <p className="leading-relaxed text-muted-foreground">
                  Receba o pagamento direto na sua carteira em até 24h. Sem formulários, sem espera. Você também recebe
                  um NFT de Impacto como prova.
                </p>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>

      {/* Benefits Section */}
      <section className="bg-muted/30 px-4 py-20">
        <div className="container mx-auto">
          <div className="mb-12 text-center">
            <h2 className="font-heading mb-4 text-balance text-3xl font-bold md:text-4xl">
              Por Que Escolher Proof of Impact?
            </h2>
          </div>

          <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-4">
            <div className="flex flex-col items-center text-center">
              <div className="mb-4 flex h-16 w-16 items-center justify-center rounded-full bg-primary">
                <TrendingUp className="h-8 w-8 text-primary-foreground" />
              </div>
              <h3 className="font-heading mb-2 text-lg font-semibold">100% Transparente</h3>
              <p className="text-sm leading-relaxed text-muted-foreground">
                Todos os pagamentos são registrados on-chain e podem ser auditados publicamente
              </p>
            </div>

            <div className="flex flex-col items-center text-center">
              <div className="mb-4 flex h-16 w-16 items-center justify-center rounded-full bg-secondary">
                <Wallet className="h-8 w-8 text-secondary-foreground" />
              </div>
              <h3 className="font-heading mb-2 text-lg font-semibold">Sem Intermediários</h3>
              <p className="text-sm leading-relaxed text-muted-foreground">
                Contratos inteligentes eliminam burocracia e reduzem custos operacionais
              </p>
            </div>

            <div className="flex flex-col items-center text-center">
              <div className="mb-4 flex h-16 w-16 items-center justify-center rounded-full bg-accent">
                <Sun className="h-8 w-8 text-accent-foreground" />
              </div>
              <h3 className="font-heading mb-2 text-lg font-semibold">Dados Climáticos Reais</h3>
              <p className="text-sm leading-relaxed text-muted-foreground">
                Oráculos confiáveis fornecem dados meteorológicos precisos e verificáveis
              </p>
            </div>

            <div className="flex flex-col items-center text-center">
              <div className="mb-4 flex h-16 w-16 items-center justify-center rounded-full bg-success">
                <Award className="h-8 w-8 text-white" />
              </div>
              <h3 className="font-heading mb-2 text-lg font-semibold">NFTs de Impacto</h3>
              <p className="text-sm leading-relaxed text-muted-foreground">
                Cada pagamento gera um certificado NFT que comprova o impacto social
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="px-4 py-20">
        <div className="container mx-auto">
          <Card className="overflow-hidden border-2 border-primary/20 bg-gradient-to-br from-primary/5 to-secondary/5">
            <CardContent className="p-8 md:p-12">
              <div className="mx-auto max-w-3xl text-center">
                <h2 className="font-heading mb-4 text-balance text-3xl font-bold md:text-4xl">
                  Pronto para Proteger Sua Colheita?
                </h2>
                <p className="mb-8 text-pretty text-lg leading-relaxed text-muted-foreground">
                  Junte-se a milhares de agricultores que já confiam na tecnologia blockchain para proteger seu
                  sustento.
                </p>
                <Button size="lg" className="bg-primary text-primary-foreground hover:bg-primary/90" asChild>
                  <Link href="/test">Começar Agora - É Grátis</Link>
                </Button>
              </div>
            </CardContent>
          </Card>
        </div>
      </section>

      {/* Footer */}
      <footer className="border-t bg-card px-4 py-12">
        <div className="container mx-auto">
          <div className="grid gap-8 md:grid-cols-4">
            <div>
              <div className="mb-4 flex items-center gap-2">
                <div className="flex h-8 w-8 items-center justify-center rounded-full bg-primary">
                  <Leaf className="h-5 w-5 text-primary-foreground" />
                </div>
                <span className="font-heading text-lg font-bold">Proof of Impact</span>
              </div>
              <p className="text-sm leading-relaxed text-muted-foreground">
                Microseguros climáticos transparentes e acessíveis para a América Latina.
              </p>
            </div>

            <div>
              <h4 className="font-heading mb-4 text-sm font-semibold">Produto</h4>
              <ul className="space-y-2 text-sm text-muted-foreground">
                <li>
                  <Link href="#como-funciona" className="hover:text-foreground">
                    Como Funciona
                  </Link>
                </li>
                <li>
                  <Link href="#impacto" className="hover:text-foreground">
                    Impacto
                  </Link>
                </li>
                <li>
                  <Link href="/dashboard" className="hover:text-foreground">
                    Dashboard
                  </Link>
                </li>
              </ul>
            </div>

            <div>
              <h4 className="font-heading mb-4 text-sm font-semibold">Recursos</h4>
              <ul className="space-y-2 text-sm text-muted-foreground">
                <li>
                  <Link href="/docs" className="hover:text-foreground">
                    Documentação
                  </Link>
                </li>
                <li>
                  <Link href="/api" className="hover:text-foreground">
                    API
                  </Link>
                </li>
                <li>
                  <Link href="/suporte" className="hover:text-foreground">
                    Suporte
                  </Link>
                </li>
              </ul>
            </div>

            <div>
              <h4 className="font-heading mb-4 text-sm font-semibold">Legal</h4>
              <ul className="space-y-2 text-sm text-muted-foreground">
                <li>
                  <Link href="/privacidade" className="hover:text-foreground">
                    Privacidade
                  </Link>
                </li>
                <li>
                  <Link href="/termos" className="hover:text-foreground">
                    Termos
                  </Link>
                </li>
              </ul>
            </div>
          </div>

          <div className="mt-8 border-t pt-8 text-center text-sm text-muted-foreground">
            <p>&copy; 2025 Proof of Impact. Construído com tecnologia blockchain para o bem social.</p>
          </div>
        </div>
      </footer>
    </div>
  )
}
