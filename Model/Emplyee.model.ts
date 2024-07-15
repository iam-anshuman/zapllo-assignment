import mongoose from "mongoose";

const EmployeeSchema = new mongoose.Schema({
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
  },
    phone: {
        type: String,
        required: true,
    },
    company: {
        type: String,
        required: true,
    },
});

const Employee = mongoose.models.Employee || mongoose.model("Employee", EmployeeSchema);