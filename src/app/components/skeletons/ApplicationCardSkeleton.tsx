import React, { JSX } from "react";
import { Card, CardContent } from "@/components/ui/card";
import { Skeleton } from "@/components/ui/skeleton";
import { User, Mail, Briefcase } from "lucide-react"; 

/**
 * @function ApplicationCardSkeleton
 * @description Composant de squelette de chargement pour une carte de candidature.
 * Il simule l'apparence d'une candidature dans une liste, affichant des placeholders
 * pour le titre du job, le nom du candidat, l'email et le statut.
 *
 * @returns {JSX.Element} Un composant de carte avec des placeholders de squelette.
 */
export function ApplicationCardSkeleton(): JSX.Element {
  return (
    <Card className="p-4 rounded-lg shadow-sm">
      <CardContent className="p-0 flex justify-between items-center">
        <div className="flex flex-col space-y-2 flex-grow">
          {/* Titre du job */}
          <div className="flex items-center space-x-2">
            <Briefcase className="h-4 w-4 text-gray-400 animate-pulse" />
            <Skeleton className="h-5 w-2/3" />
          </div>
          {/* Nom et email du candidat */}
          <div className="flex items-center space-x-2">
            <User className="h-4 w-4 text-gray-400 animate-pulse" />
            <Skeleton className="h-4 w-1/2" />
          </div>
          <div className="flex items-center space-x-2">
            <Mail className="h-4 w-4 text-gray-400 animate-pulse" />
            <Skeleton className="h-4 w-2/5" />
          </div>
        </div>

        <div className="flex flex-col items-end space-y-2 ml-4">
          {/* Statut de la candidature */}
          <Skeleton className="h-6 w-24 rounded-full" />
          {/* Bouton "Voir détails" */}
          <Skeleton className="h-9 w-28 rounded-md" />
        </div>
      </CardContent>
    </Card>
  );
}
