import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Building2, MapPin, Users } from "lucide-react"
import Link from "next/link"

interface CompanyCardProps {
  company: {
    id: string
    name: string
    domaine: string
    location: string
    employeeCount: string
  }
}

export function CompanyCard({ company }: CompanyCardProps) {
  return (
    <Card className="hover:shadow-lg transition-shadow">
      <CardHeader>
        <CardTitle>{company.name}</CardTitle>
      </CardHeader>
      <CardContent>
        <div className="space-y-2">
          <div className="flex items-center">
            <Building2 className="w-4 h-4 mr-2" />
            <span>{company?.domaine}</span>
          </div>
          <div className="flex items-center">
            <MapPin className="w-4 h-4 mr-2" />
            <span>{company.location}</span>
          </div>
          <div className="flex items-center">
            <Users className="w-4 h-4 mr-2" />
            <span>{company?.employeeCount} employés</span>
          </div>
        </div>
        <Link href={`/companies/${company.id}`} className="mt-4 inline-block text-blue-600 hover:underline">
          Voir le profil
        </Link>
      </CardContent>
    </Card>
  )
}