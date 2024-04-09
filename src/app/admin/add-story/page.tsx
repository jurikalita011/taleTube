import { withPageAuthRequired } from "@auth0/nextjs-auth0";
import Image from "next/image";
import React from "react";

import UploadImageModel from "@/components/UploadImageModel";

async function page() {
  return (
    <>
      <div className="w-screen h-screen bg-[#F6F6F7]">
        <div className="w-full h-full container">
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
              className="h-15 w-full rounded-md border border-[rgba(0,0,0,0.1)] p-3 mb-4"
              placeholder="Type here"></textarea>
            <label className="text-[#4f4f4f] mb-2">Images</label>
            <div
              style={{
                WebkitOverflowScrolling: "touch",
              }}
              className="flex items-start mb-4 gap-x-5 overflow-x-auto scroll-snap-type-x-mandatory h-fit py-5">
              <div className="p-1 rounded-md bg-white border scroll-snap-align-left">
                <Image
                  style={{
                    maxWidth: 300,
                  }}
                  src={
                    "https://cdn.penguin.co.uk/dam-assets/books/9781785299360/9781785299360-jacket-large.jpg"
                  }
                  height={300}
                  width={300}
                  className="w-[300px] h-[300px]"
                  objectFit="cover"
                  objectPosition="center"
                  alt="image-1"
                />
              </div>
              <div className="p-1 rounded-md bg-white border scroll-snap-align-left">
                <Image
                  style={{
                    maxWidth: 300,
                  }}
                  src={
                    "https://cdn.penguin.co.uk/dam-assets/books/9781785299360/9781785299360-jacket-large.jpg"
                  }
                  height={300}
                  width={300}
                  className="w-[300px] h-[300px]"
                  objectFit="cover"
                  objectPosition="center"
                  alt="image-1"
                />
              </div>
              <div className="p-1 rounded-md bg-white border scroll-snap-align-left">
                <Image
                  style={{
                    maxWidth: 300,
                  }}
                  src={
                    "https://cdn.penguin.co.uk/dam-assets/books/9781785299360/9781785299360-jacket-large.jpg"
                  }
                  height={300}
                  width={300}
                  className="w-[300px] h-[300px]"
                  objectFit="cover"
                  objectPosition="center"
                  alt="image-1"
                />
              </div>
              <div className="p-1 rounded-md bg-white border scroll-snap-align-left">
                <Image
                  style={{
                    maxWidth: 300,
                  }}
                  src={
                    "https://cdn.penguin.co.uk/dam-assets/books/9781785299360/9781785299360-jacket-large.jpg"
                  }
                  height={300}
                  width={300}
                  className="w-[300px] h-[300px]"
                  objectFit="cover"
                  objectPosition="center"
                  alt="image-1"
                />
              </div>
            </div>
          </form>
        </div>
      </div>
      <UploadImageModel />
    </>
  );
}

export default withPageAuthRequired(page, { returnTo: "/admin/add-story" });
