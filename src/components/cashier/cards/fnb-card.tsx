import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { formatCurrency } from "@/lib";
import { Fnb } from "@/types";
import { Beer, Sandwich, UtensilsCrossed } from "lucide-react";

type FnbCardProps = {
  fnb: Fnb;
};

export default function FnbCard(
  { fnb }: FnbCardProps
) {
  return (
    <Card>
      <CardHeader className="flex items-center justify-between space-y-0 pb-2">
        {fnb.image ? (
          <div className="w-full h-40 flex items-center justify-center">
            <img
              src={fnb.image!}
              alt={fnb.name}
              width={0}
              height={0}
              className="h-40 w-full"
            />
          </div>
        ) : (
          <div className="w-full h-40 flex items-center justify-center">
            {fnb.category == "food" ? (
              <Sandwich className="h-36 w-36" />
            ) : fnb.category == "beverage" ? (
              <Beer className="h-36 w-36" />
            ) : (
              <UtensilsCrossed className="h-36 w-36" />
            )}
          </div>
        )}
        <CardTitle className="text-sm font-medium">
          <p className="text-xl font-bold">{fnb.name}</p>
        </CardTitle>
      </CardHeader>
      <CardContent>
        <div className="text-2xl font-bold"></div>
        <p className="text-xs text-center">
          Harga{" "}
          {formatCurrency(fnb.price)}
        </p>
      </CardContent>
    </Card>
  );
}
