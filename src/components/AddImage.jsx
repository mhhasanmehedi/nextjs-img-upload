"use client";
import axios from "axios";
import Image from "next/image";
import React, { useState } from "react";

const AddImage = () => {
  const [file, setFile] = useState(null);

  const onSubmit = async (e) => {
    e.preventDefault();
    if (!file) return;

    try {
      const data = new FormData();
      data.set("file", file);

      axios
        .post("/api/gallery", data)
        .then((res) => {
          console.log("Finallay Upload");
        })
        .catch((err) => {
          console.log(err);
        });
    } catch (error) {
      console.error(error);
    }
  };
  return (
    <div className="text-center my-10">
      <form onSubmit={onSubmit} className="border border-teal-600 inline-block mx-auto">
        <input
          type="file"
          name="file"
          onChange={(e) => setFile(e.target.files?.[0])}
        />
        <button
          type="submit"
          className="bg-teal-600 text-white px-4 py-2 border-none outline-none"
        >
          Upload
        </button>
      </form>
    </div>
  );
};

export default AddImage;
