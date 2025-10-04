import { Card, CardContent } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { MapPin, ExternalLink, Sun, CloudRain, Snowflake } from "lucide-react"
import Link from "next/link"

interface NFTCertificateCardProps {
  id: string
  image: string
  event: string
  farmer: string
  location: string
  amount: string
  date: string
  compact?: boolean
}

export function NFTCertificateCard({
  id,
  image,
  event,
  farmer,
  location,
  amount,
  date,
  compact = false,
}: NFTCertificateCardProps) {
  const getEventIcon = () => {
    if (event.includes("Seca")) return <Sun className="h-4 w-4 text-accent-foreground" />
    if (event.includes("Chuva") || event.includes("Tempestade")) return <CloudRain className="h-4 w-4 text-secondary" />
    if (event.includes("Geada")) return <Snowflake className="h-4 w-4 text-chart-2" />
    return <CloudRain className="h-4 w-4" />
  }

  return (
    <Card className="overflow-hidden border-2 transition-shadow hover:shadow-lg">
      <div
        className={`overflow-hidden bg-gradient-to-br from-primary/10 to-accent/10 ${compact ? "aspect-video" : "aspect-square"}`}
      >
        <img src={image || "/placeholder.svg"} alt={event} className="h-full w-full object-cover" />
      </div>
      <CardContent className="p-4">
        <div className="mb-2 flex items-center justify-between">
          <Badge variant="outline" className="text-xs">
            {id}
          </Badge>
          {getEventIcon()}
        </div>
        <h4 className="font-heading mb-1 font-semibold">{event}</h4>
        {!compact && <p className="mb-1 text-sm text-muted-foreground">{farmer}</p>}
        <p className="mb-2 flex items-center gap-1 text-xs text-muted-foreground">
          <MapPin className="h-3 w-3" />
          {location}
        </p>
        <div className="mb-3 flex items-center justify-between">
          <p className="font-heading text-lg font-bold text-primary">R$ {amount}</p>
          <p className="text-xs text-muted-foreground">{date}</p>
        </div>
        <Button variant="outline" size="sm" className="w-full bg-transparent" asChild>
          <Link href={`/nft/${id}`}>
            Ver Detalhes
            <ExternalLink className="ml-2 h-3 w-3" />
          </Link>
        </Button>
      </CardContent>
    </Card>
  )
}
