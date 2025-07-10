import React, { JSX } from "react";
import { Card, CardContent } from "@/components/ui/card"; 
import { Skeleton } from "@/components/ui/skeleton";
import { MapPin, Briefcase } from "lucide-react"; 

/**
 * @function JobCardSkeleton
 * @description Composant de squelette de chargement pour une carte d'emploi.
 * Il affiche un état visuel de chargement pour une meilleure expérience utilisateur
 * en attendant que les données réelles soient récupérées.
 *
 * @returns {JSX.Element} Un composant de carte avec des placeholders de squelette.
 */
export function JobCardSkeleton(): JSX.Element {
  return (
    <Card className="p-4 rounded-lg shadow-md hover:shadow-lg transition-shadow duration-300">
      <CardContent className="p-0">
        {/* En-tête de la carte : Titre et entreprise */}
        <div className="flex flex-col space-y-2 mb-4">
          <Skeleton className="h-6 w-[85%]" />
          <Skeleton className="h-4 w-[60%]" />
        </div>

        {/* Détails du lieu et du type de travail */}
        <div className="space-y-2 mb-4">
          <div className="flex items-center space-x-2">
            <MapPin className="h-4 w-4 text-gray-400 animate-pulse" />
            <Skeleton className="h-4 w-1/4" />
          </div>
          <div className="flex items-center space-x-2">
            <Briefcase className="h-4 w-4 text-gray-400 animate-pulse" />
            <Skeleton className="h-4 w-1/3" />
          </div>
        </div>

        {/* Mots-clés / Tags */}
        <div className="flex flex-wrap gap-2 mb-4">
          <Skeleton className="h-6 w-16 rounded-full" />
          <Skeleton className="h-6 w-12 rounded-full" />
          <Skeleton className="h-6 w-20 rounded-full" />
        </div>

        {/* Section des actions/boutons */}
        <div className="flex justify-between items-center pt-2">
          <Skeleton className="h-9 w-24" />
          <Skeleton className="h-9 w-24" />
        </div>
      </CardContent>
    </Card>
  );
}