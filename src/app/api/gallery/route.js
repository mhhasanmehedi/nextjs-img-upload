import { NextResponse } from "next/server";
import prisma from "../../../../prisma";
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

    const bytes = await file.arrayBuffer();

    const buffer = Buffer.from(bytes);

    const uniqId = uniqid();

    const uploadDir = join(process.cwd(), "public/upload");
    const path = join(uploadDir, `${uniqId}-${file.name}`);
    await writeFile(path, buffer);

    const newGallery = await prisma.gallery.create({
      data: {
        path: `/upload/${uniqId}-${file.name}`,
      },
    });

    return NextResponse.json(newGallery);
  } catch (error) {
    return NextResponse.json(
      { message: "Gallery Error", error },
      { status: 500 }
    );
  }
};

export const GET = async () => {
  try {
    const gallery = await prisma.gallery.findMany();

    return NextResponse.json(gallery);
  } catch (err) {
    return NextResponse.json({ message: "GET Error", err }, { status: 500 });
  }
};

