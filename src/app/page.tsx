'use client'
import { useEffect,useState } from "react";
import axios from "axios";
import { AddButton } from "@/components/AddButton";
import CardComponent from "@/components/CardComponent";
import AddEmployeeForm from "@/components/AddEmployeeForm";
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectLabel,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select"

interface Employee {
  _id?: string;
  firstName?: string;
  lastName?: string;
  email?: string;
  phone?: string;
  company?: string;
  priorityStatus?: string;
}

export default function Home() {

  const [editMode, setEditMode] = useState<boolean>(false);
  const [employees, setEmployees] = useState<Employee[]>(
    [{
      _id: '',
      firstName: '',
      lastName: '',
      email: '',
      phone: '',
      company:'',
      priorityStatus:''
    }]
  );
  const [filteredEmployees, setFilteredEmployees] = useState<Employee[] | null>(null);

  useEffect(() => {
    axios.get("/api/employee").then((res) => {
      console.log(res.data.data);
      setEmployees(res.data.data);
    }).catch((error) => {
      console.log(error);
    });
  }, []);

  useEffect(() => {

    setEmployees(employees.sort((a, b) => {
      if (a.priorityStatus === "High" && b.priorityStatus === "Mid") {
        return -1;
      }
      if (a.priorityStatus === "Mid" && b.priorityStatus === "High") {
        return 1;
      }
      if (a.priorityStatus === "High" && b.priorityStatus === "Low") {
        return -1;
      }
      if (a.priorityStatus === "Low" && b.priorityStatus === "High") {
        return 1;
      }
      if (a.priorityStatus === "Mid" && b.priorityStatus === "Low") {
        return -1;
      }
      if (a.priorityStatus === "Low" && b.priorityStatus === "Mid") {
        return 1;
      }
      return 0;
    }
    ));

  }, [filteredEmployees]);

  const handleAddEmployee = () => {
    setEditMode(true);
  };

  function handleValueChange(value:String){
    const filteredEmployee = employees.filter((employee)=>{
      return employee.priorityStatus === value;
    });
    setFilteredEmployees(filteredEmployee);
  }

  return (
    <>
      <div className={`container relative ${editMode?"blur-lg":"blur-none"}`}>
        <h1 className="my-4 font-bold text-4xl text-center">Zapllo Assignment</h1>
        <div className="my-4">
          <Select onValueChange={handleValueChange}>
            <SelectTrigger className="w-[180px] bg-black text-white">
              <SelectValue placeholder="Select Priority" />
            </SelectTrigger>
            <SelectContent>
              <SelectGroup>
                <SelectLabel>Select Priority</SelectLabel>
                <SelectItem value="High">High</SelectItem>
                <SelectItem value="Mid">Mid</SelectItem>
                <SelectItem value="Low">Low</SelectItem>
              </SelectGroup>
            </SelectContent>
          </Select>
        </div>
        <div className="grid grid-cols-3 gap-3">
          {!filteredEmployees ? employees.map((employee)=>{
            return <CardComponent key={employee._id} id={employee._id} firstName={employee.firstName} lastName={employee.lastName} email={employee.email} phone={employee.phone} company={employee.company}/>;
          })
          :
          filteredEmployees.map((employee)=>{
            return <CardComponent key={employee._id} id={employee._id} firstName={employee.firstName} lastName={employee.lastName} email={employee.email} phone={employee.phone} company={employee.company}/>;
          })
          }
        </div>
        <AddButton handleAddEmployee={handleAddEmployee}/>
      </div>
      <AddEmployeeForm editMode={editMode} setEditMode={setEditMode}/>
    </>
  );
}
