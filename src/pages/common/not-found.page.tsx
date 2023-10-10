import { Button } from "@/components/ui/button";
import { Card, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Link } from "react-router-dom";

export default function NotFoundPage() {
  return (
    <main className="flex items-center justify-center h-screen">
      <Card className="w-[420px]">
        <CardHeader className="text-center">
          <CardTitle className="lg:text-7xl text-4xl">404</CardTitle>
          <CardDescription>
            Halaman tidak ditemukan
          </CardDescription>
        </CardHeader>
        <CardFooter className="flex justify-center">
          <Button asChild>
            <Link to="/">Ke Beranda</Link>
          </Button>
        </CardFooter>
      </Card>
    </main>
  );
}
