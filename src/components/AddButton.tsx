import { Button } from "@/components/ui/button"

export function AddButton({handleAddEmployee}: {handleAddEmployee: () => void}) {
  return <Button className="bg-gradient-to-r from-pink-500 to-orange-400 text-white fixed bottom-10 right-10 transition hover:scale-110 hover:bottom-11" onClick={handleAddEmployee}>Add Employee</Button>
}
