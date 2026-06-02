import { NextResponse } from "next/server";
import connectToDatabase from "@/lib/mongodb";
import Password from "@/models/Password";
import { getServerSession } from "next-auth/next";
import { authOptions } from "@/app/api/auth/[...nextauth]/route";

export async function POST(req) {
  try {
    const session = await getServerSession(authOptions);
    
    if (!session || !session.user || !session.user.id) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    const { websiteName, username, password, url, isFavorite } = await req.json();

    if (!websiteName || !username || !password) {
      return NextResponse.json({ error: "Missing required fields" }, { status: 400 });
    }

    await connectToDatabase();

    const newPassword = await Password.create({
      userId: session.user.id,
      websiteName,
      username,
      password,
      url,
      isFavorite: isFavorite || false,
    });

    return NextResponse.json(newPassword, { status: 201 });
  } catch (error) {
    console.error("Error creating password:", error);
    return NextResponse.json({ error: "Internal Server Error" }, { status: 500 });
  }
}

export async function GET(req) {
  try {
    const session = await getServerSession(authOptions);
    
    if (!session || !session.user || !session.user.id) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    await connectToDatabase();

    const passwords = await Password.find({ userId: session.user.id }).sort({ createdAt: -1 });

    return NextResponse.json(passwords, { status: 200 });
  } catch (error) {
    console.error("Error fetching passwords:", error);
    return NextResponse.json({ error: "Internal Server Error" }, { status: 500 });
  }
}
