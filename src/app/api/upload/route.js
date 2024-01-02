import { NextRequest, NextResponse } from "next/server";
import { connect } from "../../../dbConfig/dbConfig";
import Movies from "@/models/movieModel";

export async function POST(request) {
  const data = await request.formData();
  const image = data.get("image");
  const title = data.get("title");
  const publishing_year = data.get("publishing_year");

  if (!image) {
    return NextResponse.json({ success: false });
  }

  await connect();
  await Movies.create({ title, publishing_year, image });
  return NextResponse.json({ message: "Created" }, { status: 201 });
}

export async function GET() {
  await connect();
  const movieData = await Movies.find();
  return NextResponse.json({ movieData });
}
