import { HttpStatusCode } from "axios";
import {connectDB} from "@/lib/ConntectDB";
import Employee,{IEmployee} from "@/Model/Emplyee.model";
import { NextRequest, NextResponse } from "next/server";

export async function POST(req:NextRequest){
    try {
        await connectDB();
        const body: IEmployee = await req.json() as any;
        console.log(body)
        if (!body) {
            return NextResponse.json({ message: "Invalid data" },{ status: HttpStatusCode.BadRequest });
        }
        const employee = await Employee.create({
            firstName: body.firstName,
            lastName: body.lastName,
            email: body.email,
            phone: body.phone,
            company: body.company,
            priorityStatus: body.priorityStatus
        });
        return NextResponse.json({employee,message:"Employee has been created"}, { status: HttpStatusCode.Created });
    } catch (error) {
        return NextResponse.json({ message: error },{ status: HttpStatusCode.InternalServerError });
    }
}

export async function GET(){
    try {
        await connectDB();
        const employees = await Employee.find({});
        console.log(employees)
        return NextResponse.json({data:employees}, { status: HttpStatusCode.Ok });
    } catch (error) {
        return NextResponse.json({error},{ status: HttpStatusCode.InternalServerError });
    }
}

export async function DELETE(req:NextRequest){
    try {
        await connectDB();
        const query = req.nextUrl.searchParams;
        const id = query.get("id");

        if (!id) {
            return NextResponse.json({ message: "Invalid data" },{ status: HttpStatusCode.BadRequest });
        }
        const employee = await Employee.findByIdAndDelete(id);
        if (!employee) {
            return NextResponse.json({ message: "Employee not found" },{ status: HttpStatusCode.NotFound });
        }
        return NextResponse.json({message:"Employee has been deleted"}, { status: HttpStatusCode.Ok });
    } catch (error) {
        return NextResponse.json({ message: error },{ status: HttpStatusCode.InternalServerError });
    }
}