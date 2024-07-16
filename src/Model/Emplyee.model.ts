import {model,models,Schema} from "mongoose";

export interface IEmployee {
    firstName: string;
    lastName: string;
    email: string;
    phone: string;
    company: string;
    priorityStatus:string;
}

const EmployeeSchema = new Schema<IEmployee>({
  firstName: {
    type: String,
    required: true,
  },
    lastName: {
        type: String,
        required: true,
    },
  email: {
    type: String,
    required: true,
    unique: true,
  },
    phone: {
        type: String,
        required: true,
    },
    company: {
        type: String,
        required: true,
    },
    priorityStatus: {
        type: String,
        required: true,
    },
},{timestamps:true});

const Employee = models.Employee || model("Employee", EmployeeSchema);
export default Employee;