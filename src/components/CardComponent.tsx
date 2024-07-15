import {
    Card,
    CardContent,
    CardDescription,
    CardFooter,
    CardHeader,
    CardTitle,
  } from "@/components/ui/card";
import { Button } from "@/components/ui/button";

export default function CardComponent() {
  return (
    <Card className="w-80 bg-slate-100 text-black text-center">
      <CardHeader>
        <CardTitle>Full Name</CardTitle>
        <CardDescription>
            Job Title
        </CardDescription>
      </CardHeader>
      <CardContent>
          <div>Email: Anshuman</div>
          <div>Phone: 9654086085</div>
      </CardContent>
      <CardFooter>
        <Button variant={"outline"} className="bg-slate-50 text-black block mx-auto">Remove</Button>
      </CardFooter>
    </Card>
  )
}