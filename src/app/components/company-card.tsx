import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Building2, MapPin, Users } from "lucide-react";
import Image from "next/image";
import Link from "next/link";

interface CompanyCardProps {
  company: {
    id: string;
    name: string;
    domaine: string;
    location: string;
    employeeCount: string;
    logo: string;
  };
}

export function CompanyCard({ company }: CompanyCardProps) {
  return (
    <Card className="hover:shadow-lg transition-shadow">
      <CardHeader className="flex flex-row items-center gap-2 w-fit">
        <Image
          src={company?.logo || "/placeholder.svg"}
          alt="Company logo preview"
          width={50}
          height={50}
          className="rounded-full w-[4rem] h-[4rem] bg-cover  max-w-full max-h-full "
        />
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
            <span>{company?.employeeCount || 0} employés</span>
          </div>
        </div>
        <Link
          href={`/companies/${company.id}`}
          className="mt-4 inline-block text-primary font-semibold hover:underline"
        >
          Voir le profil
        </Link>
      </CardContent>
    </Card>
  );
}
