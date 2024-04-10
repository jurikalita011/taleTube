"use client";

import React, { BaseSyntheticEvent, useState } from "react";
import ShowUploadModelButton from "../UploadModelButton";

function SliderImagesWithCheckBox() {
  const [sliderCheckBox, setSliderCheckbox] = useState<boolean>(false);
  console.log(sliderCheckBox);
  const handleCheckbox = (e: BaseSyntheticEvent): void => {
    setSliderCheckbox(e.target.checked);
  };

  return (
    <>
      <div className="flex items-center gap-x-2 mb-2">
        <input
          onChange={handleCheckbox}
          className="w-5 h-5"
          id="slider_checkbox"
          type="checkbox"
        />
        <label htmlFor="slider_checkbox" className="text-md font-extrabold">
          Slider Required
        </label>
      </div>
      {sliderCheckBox && (
        <>
          <label className="text-[#4f4f4f] mb-2">Slider Images</label>
          <div className="flex items-center mb-2 gap-x-5 scroll-snap-type-x-mandatory h-fit">
            <ShowUploadModelButton aspectRation={"16:9"} />
            {/* <div className="p-1 rounded-md bg-white border scroll-snap-align-left">
                <Image
                  style={{
                    maxWidth: 300,
                  }}
                  src={
                    "https://cdn.penguin.co.uk/dam-assets/books/9781785299360/9781785299360-jacket-large.jpg"
                  }
                  height={300}
                  width={300}
                  className="w-[150px] h-[150px]"
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
                  className="w-[150px] h-[150px]"
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
                  className="w-[150px] h-[150px]"
                  objectFit="cover"
                  objectPosition="center"
                  alt="image-1"
                />
              </div> */}
          </div>
          <p>Images must be PNG or JPEG and 16:9 aspect ratio</p>
        </>
      )}
    </>
  );
}

export default SliderImagesWithCheckBox;
