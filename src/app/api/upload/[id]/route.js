import { NextRequest, NextResponse } from "next/server";
// import { connect } from "../../../dbConfig/dbConfig";
import { connect } from "../../../../dbConfig/dbConfig";
import Movies from "@/models/movieModel";

export async function GET(req) {
  await connect();
  const url = new URL(req.url);
  const pathname = url.pathname;
  const Id = pathname.split("/").pop();
  try {
    const movie = await Movies.findById(Id);
    if (movie) {
      return NextResponse.json({ movieData: movie });
    } else {
      return NextResponse.json({ error: "Movie not found" }, { status: 404 });
    }
  } catch (error) {
    console.error("Error finding movie by id:", error);
    return NextResponse.json(
      { error: "Internal Server Error" },
      { status: 500 }
    );
  }
}

export async function PUT(req) {
  await connect();

  const url = new URL(req.url);
  const pathname = url.pathname;
  const id = pathname.split("/").pop();

  try {
    const data = await req.formData();
    const image = data.get("image");
    const title = data.get("title");
    const publishing_year = data.get("publishing_year");

    const updatedMovie = await Movies.findOneAndUpdate(
      { _id: id },
      { title, publishing_year, image },
      { new: true, runValidators: true }
    );

    // Check if the movie was found and updated
    if (!updatedMovie) {
      return NextResponse.json({ error: "Movie not found" }, { status: 404 });
    }

    // Return the updated movie data in the response
    return NextResponse.json({ movieData: updatedMovie });
  } catch (error) {
    console.error("Error updating movie by id:", error);
    return NextResponse.json(
      { error: "Internal Server Error" },
      { status: 500 }
    );
  }
}
