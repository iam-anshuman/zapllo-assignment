import {
    Card,
    CardContent,
    CardDescription,
    CardFooter,
    CardHeader,
    CardTitle,
  } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import axios from "axios";

interface Employee {
    id: string | undefined;
    firstName: string | undefined;
    lastName: string | undefined;
    email: string | undefined;
    phone: string | undefined;
    company: string | undefined;

}

async function handleDelete(id:string | undefined){
    try {
      await axios.delete(`/api/employee/?id=${id}`);
      window.location.reload();
    } catch (error) {
      console.log(error);
    }
}

export default function CardComponent({firstName,lastName,email,phone,company,id}: Employee) {
  return (
    <Card className="w-80 bg-slate-100 text-black text-center">
      <CardHeader>
        <CardTitle>{firstName+" "+lastName}</CardTitle>
        <CardDescription>
            {company}
        </CardDescription>
      </CardHeader>
      <CardContent>
          <div>Email: {email}</div>
          <div>Phone: {phone}</div>
      </CardContent>
      <CardFooter>
        <Button variant={"outline"} className="bg-slate-50 text-black block mx-auto" onClick={()=>handleDelete(id)}>Remove</Button>
      </CardFooter>
    </Card>
  )
}