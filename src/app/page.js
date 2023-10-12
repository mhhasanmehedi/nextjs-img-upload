'use client';
import AddImage from "@/components/AddImage";
import Image from "next/image";
import { useEffect, useState } from "react";

function UploadForm() {
  const [galleries, setGalleries] = useState([]);

  useEffect(() => {
    fetch("/api/gallery")
      .then((response) => response.json())
      .then((data) => setGalleries(data))
      .catch((error) => console.error("Error fetching gallery data:", error));
  }, []);

  return (
    <>
      <AddImage/>
      
      <div className="container px-4 mx-auto grid grid-cols-4 gap-10">
        {
          galleries?.map((gallery) =>{
            const {path,id} = gallery || {};
            return (
              <Image
                className="aspect-square w-full object-contain border border-teal-600"
                alt=""
                key={id}
                src={path}
                height={400}
                width={400}
              />
            );
          })
        }
      </div>
    </>
  );
}

export default UploadForm;
