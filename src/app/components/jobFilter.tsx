import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Checkbox } from "@/components/ui/checkbox"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Button } from "@/components/ui/button"

interface JobFiltersProps {
  sortBy: string
  contractTypes: Record<string, boolean>
  experienceLevels: Record<string, boolean>
  onSortChange: (value: string) => void
  onContractTypeChange: (type: string) => void
  onExperienceLevelChange: (level: string) => void
  onClearFilters: () => void
}

export function JobFilters({
  sortBy,
  contractTypes,
  experienceLevels,
  onSortChange,
  onContractTypeChange,
  onExperienceLevelChange,
  onClearFilters,
}: JobFiltersProps) {
  return (
    <Card>
      <CardHeader>
        <CardTitle>Filtres</CardTitle>
      </CardHeader>
      <CardContent>
        <div className="space-y-4">
          <div>
            <h3 className="font-semibold mb-2">Trier par</h3>
            <Select onValueChange={onSortChange} value={sortBy}>
              <SelectTrigger className="w-full">
                <SelectValue placeholder="Sélectionnez un tri" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="recent">Plus récent</SelectItem>
                <SelectItem value="salary-high">Salaire décroissant</SelectItem>
                <SelectItem value="salary-low">Salaire croissant</SelectItem>
                <SelectItem value="company">Entreprise</SelectItem>
              </SelectContent>
            </Select>
          </div>
          <div>
            <h3 className="font-semibold mb-2">Type de contrat</h3>
            <div className="space-y-2">
              {Object.entries(contractTypes).map(([type, checked]) => (
                <div key={type} className="flex items-center space-x-2">
                  <Checkbox id={type} checked={checked} onCheckedChange={() => onContractTypeChange(type)} />
                  <label htmlFor={type}>{type.toUpperCase()}</label>
                </div>
              ))}
            </div>
          </div>
          <div>
            <h3 className="font-semibold mb-2">Niveau d&apos;expérience</h3>
            <div className="space-y-2">
              {Object.entries(experienceLevels).map(([level, checked]) => (
                <div key={level} className="flex items-center space-x-2">
                  <Checkbox id={level} checked={checked} onCheckedChange={() => onExperienceLevelChange(level)} />
                  <label htmlFor={level}>{level.charAt(0).toUpperCase() + level.slice(1)}</label>
                </div>
              ))}
            </div>
          </div>
          <Button onClick={onClearFilters} variant="outline" className="w-full mt-4">
            Effacer les filtres
          </Button>
        </div>
      </CardContent>
    </Card>
  )
}

