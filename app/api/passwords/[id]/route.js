import { NextResponse } from "next/server";
import connectToDatabase from "@/lib/mongodb";
import Password from "@/models/Password";
import { getServerSession } from "next-auth/next";
import { authOptions } from "@/app/api/auth/[...nextauth]/route";

export async function PATCH(req, { params }) {
  try {
    const session = await getServerSession(authOptions);
    
    if (!session || !session.user || !session.user.id) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    const { isFavorite } = await req.json();
    const { id } = await params;

    await connectToDatabase();

    const updatedPassword = await Password.findOneAndUpdate(
      { _id: id, userId: session.user.id },
      { $set: { isFavorite: isFavorite } },
      { returnDocument: 'after' }
    );

    if (!updatedPassword) {
      return NextResponse.json({ error: "Password not found" }, { status: 404 });
    }

    return NextResponse.json(updatedPassword, { status: 200 });
  } catch (error) {
    console.error("Error updating password:", error);
    return NextResponse.json({ error: "Internal Server Error" }, { status: 500 });
  }
}

export async function DELETE(req, { params }) {
  try {
    const session = await getServerSession(authOptions);
    
    if (!session || !session.user || !session.user.id) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    const { id } = await params;

    await connectToDatabase();

    const deletedPassword = await Password.findOneAndDelete({ 
      _id: id, 
      userId: session.user.id 
    });

    if (!deletedPassword) {
      return NextResponse.json({ error: "Password not found" }, { status: 404 });
    }

    return NextResponse.json({ success: true }, { status: 200 });
  } catch (error) {
    console.error("Error deleting password:", error);
    return NextResponse.json({ error: "Internal Server Error" }, { status: 500 });
  }
}

export async function GET(req, { params }) {
  try {
    const session = await getServerSession(authOptions);
    
    if (!session || !session.user || !session.user.id) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    const { id } = await params;

    await connectToDatabase();

    const password = await Password.findOne({ _id: id, userId: session.user.id });

    if (!password) {
      return NextResponse.json({ error: "Password not found" }, { status: 404 });
    }

    return NextResponse.json(password, { status: 200 });
  } catch (error) {
    console.error("Error fetching password:", error);
    return NextResponse.json({ error: "Internal Server Error" }, { status: 500 });
  }
}

export async function PUT(req, { params }) {
  try {
    const session = await getServerSession(authOptions);
    
    if (!session || !session.user || !session.user.id) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    const { websiteName, username, password, url } = await req.json();
    const { id } = await params;

    await connectToDatabase();

    const updatedPassword = await Password.findOneAndUpdate(
      { _id: id, userId: session.user.id },
      { $set: { websiteName, username, password, url } },
      { returnDocument: 'after' }
    );

    if (!updatedPassword) {
      return NextResponse.json({ error: "Password not found" }, { status: 404 });
    }

    return NextResponse.json(updatedPassword, { status: 200 });
  } catch (error) {
    console.error("Error updating password:", error);
    return NextResponse.json({ error: "Internal Server Error" }, { status: 500 });
  }
}
