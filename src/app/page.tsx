import { AddButton } from "@/components/AddButton";
import CardComponent from "@/components/CardComponent";
import AddEmployeeForm from "@/components/AddEmployeeForm";

export default function Home() {
  return (
    <>
      <div className="container relative">
        <h1 className="my-4 font-bold text-4xl text-center">Zapllo Assignment</h1>
        <CardComponent/>
        <AddButton/>
        <AddEmployeeForm/>
      </div>
    </>
  );
}
