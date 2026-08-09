import { NextResponse } from "next/server";
import { connectDB } from "@/lib/db";
import { Room } from "@/models/Room";

// POST: Save room to MongoDB
export async function POST(req: Request) {
  try {
    await connectDB();
    const body = await req.json();
    const newRoom = await Room.create(body);
    return NextResponse.json(newRoom, { status: 201 });
  } catch (error) {
    return NextResponse.json({ error: "Failed to create room" }, { status: 500 });
  }
}

// GET: Retrieve all rooms
export async function GET() {
  try {
    await connectDB();
    const rooms = await Room.find({}).sort({ createdAt: -1 });
    return NextResponse.json(rooms, { status: 200 });
  } catch (error) {
    return NextResponse.json({ error: "Failed to fetch rooms" }, { status: 500 });
  }
}