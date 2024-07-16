'use client'
import { Card,CardContent, CardTitle } from "@/components/ui/card";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { Button } from "@/components/ui/button"
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form"
import { Input } from "@/components/ui/input";
import {
    Select,
    SelectContent,
    SelectGroup,
    SelectItem,
    SelectLabel,
    SelectTrigger,
    SelectValue,
  } from "@/components/ui/select"
import axios from "axios";  



const formSchema = z.object({
    email: z.string().email({ message: "Invalid email" }),
    phone: z.string().min(10, { message: "Invalid phone number" }),
    firstName: z.string().min(3, { message: "Invalid First name" }),
    lastName: z.string().min(3, { message: "Invalid Last name" }),
    company: z.string().min(5, { message: "Invalid job title" }),
    priorityStatus: z.enum(['High', 'Medium', 'Low'], { message: "Invalid priority status" }),
})


function AddEmployeeForm({editMode,setEditMode}: {editMode: boolean,setEditMode:(editMode:boolean)=>void}) {

    const form = useForm<z.infer<typeof formSchema>>({
        resolver: zodResolver(formSchema),
        defaultValues: {
            email: "",
            phone: "",
            firstName: "",
            lastName: "",
            company: "",
            priorityStatus: "Low",
        },
      })

      async function onSubmit(values: z.infer<typeof formSchema>) {
        try {
          const res = await axios.post("/api/employee", values).then((res) => {
            if(res.status === 201){
              setEditMode(false);
              window.location.reload();
            }
          });
        } catch (error) {
          console.log(error);
        }
      }


  return (
    <>
        <Card className={`${editMode?"block":"hidden"} w-1/2 bg-slate-100 text-black top-10 left-1/4 absolute z-50 px-4 py-2`}>
            <CardTitle className="text-center">Fill up the details given below</CardTitle>
            <CardContent>
            <Form {...form}>
                  <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
                    <FormField
                      control={form.control}
                      name="email"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>Email</FormLabel>
                          <FormControl>
                            <Input placeholder="Email Address" {...field} />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                    <FormField
                      control={form.control}
                      name="phone"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>Phone Number</FormLabel>
                          <FormControl>
                            <Input placeholder="Phone Number" {...field} />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                    <FormField
                      control={form.control}
                      name="firstName"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>First Name</FormLabel>
                          <FormControl>
                            <Input placeholder="First Name" {...field} />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                    <FormField
                      control={form.control}
                      name="lastName"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>Last Name</FormLabel>
                          <FormControl>
                            <Input placeholder="Last Name" {...field} />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                    <FormField
                      control={form.control}
                      name="company"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>Company Name</FormLabel>
                          <FormControl>
                            <Input placeholder="Company" {...field} />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                    <FormField
                      control={form.control}
                      name="priorityStatus"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>Priority Status</FormLabel>
                          <FormControl>
                            <Select onValueChange={field.onChange} value={field.value}>
                              <SelectTrigger className="text-black">
                                <SelectValue className="text-black">{field.value}</SelectValue>
                              </SelectTrigger>
                              <SelectContent className="bg-white text-black">
                                <SelectGroup>
                                  <SelectLabel>Priority Status</SelectLabel>
                                  <SelectItem value="High">High</SelectItem>
                                  <SelectItem value="Mid">Mid</SelectItem>
                                  <SelectItem value="Low">Low</SelectItem>
                                </SelectGroup>
                              </SelectContent>
                            </Select>
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                    <Button className="bg-black text-white hover:bg-slate-700 hover:text-white mr-4" type="submit">Save Changes</Button>
                    <Button variant={"destructive"} onClick={()=>setEditMode(false)} type="submit">Close Form</Button>
                  </form>
                </Form>
            </CardContent>
        </Card>

    </>
  )
}

export default AddEmployeeForm;