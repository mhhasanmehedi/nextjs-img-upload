import { NextResponse } from "next/server";
import { writeFile } from "fs/promises";
import { join } from "path";
import uniqid from "uniqid";


export const POST = async (req) => {
  try {
    const data = await req.formData();
    const file = data.get("file");

    if (!file) {
      return NextResponse.json({ success: false });
    }

    const bytes = await file.arrayBuffer()
    
    const buffer = Buffer.from(bytes);
    
    const uploadDir = join(process.cwd(), "public/upload");
    const path = join(uploadDir, `${uniqid()}-${file.name}`);
    await writeFile(path, buffer);

    return NextResponse.json({ message: `/upload/${uniqid()}-${file.name}` });
  } catch (error) {
    return NextResponse.json({ message: "Post Error", error }, { status: 500 });
  }
};

export const GET = async () => {
  try {
    return NextResponse.json({message: "Hlw"});
  } catch (err) {
    return NextResponse.json({ message: "GET Error", err }, { status: 500 });
  }
};


