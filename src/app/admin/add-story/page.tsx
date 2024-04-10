import { withPageAuthRequired } from "@auth0/nextjs-auth0";
import Image from "next/image";
import React from "react";

import ShowUploadModelButton from "@/components/UploadModelButton";
import ImageUploadModal from "@/modals/ImageUploadModal";
import SliderImagesWithCheckBox from "@/components/Add-Book/SliderImagesWithCheckBox";

async function page() {
  return (
    <>
      <div className="w-full min-h-screen bg-[#F6F6F7]">
        <div className="w-full container">
          <h2 className="font-extrabold text-2xl mb-4">Create product</h2>
          <form className="flex flex-col px-10 py-8 bg-white rounded-lg">
            <label className="text-[#4f4f4f] mb-2" htmlFor="bookTitle">
              Book Title
            </label>
            <input
              className="h-11 px-3 rounded-md border border-[rgba(0,0,0,0.1) mb-4"
              type="text"
              id="bookTitle"
              name="bookTitle"
              placeholder="What is your book name?"></input>
            <label className="text-[#4f4f4f] mb-2" htmlFor="description">
              Description
            </label>
            <textarea
              id="description"
              name="bookDescription"
              className="min-h-15 h-15 w-full rounded-md border border-[rgba(0,0,0,0.1)] p-3 mb-4"
              placeholder="Type here"></textarea>

            <label className="text-[#4f4f4f] mb-2">Book Cover</label>
            <ShowUploadModelButton aspectRation={"1.6:1"} />
            <p className="mt-2 ">
              Images must be PNG or JPEG and 1.6:1 aspect ratio
            </p>

            <div className="mb-4"></div>

            <SliderImagesWithCheckBox />
          </form>
        </div>
      </div>
      <ImageUploadModal />
    </>
  );
}

export default withPageAuthRequired(page, { returnTo: "/admin/add-story" });
