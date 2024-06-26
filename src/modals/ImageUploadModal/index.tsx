"use client";

import { useAppDispatch, useAppSelector } from "@/redux/hooks";
import { toogleImageModal } from "@/redux/slices/imageUploadModalSlice";
import NextImage from "next/image";
import React, { useEffect, useState, type BaseSyntheticEvent } from "react";

// react icons
import { MdDelete } from "react-icons/md";
import { FaInfoCircle } from "react-icons/fa";

//interfaces
import { ImagesInterface } from "./interfaces";

//helper
import { getAspectRatio } from "@/helper";

function ImageUploadModal() {
  const { isOpen: isImageUploadModalOpen, requiredAspectRatio } =
    useAppSelector((state) => state.image_upload_modal);

  const [error, setError] = useState<boolean>(false);
  const [selectedImages, setSelectedImages] = useState<ImagesInterface[]>([]);

  const dispatch = useAppDispatch();

  useEffect(() => {
    if (isImageUploadModalOpen) {
      setError(false);
      for (let i = 0; i < selectedImages.length; i++) {
        if (selectedImages[i].aspectRatio !== requiredAspectRatio) {
          setError(true);
          break;
        }
      }
    }
  }, [selectedImages]);

  const getImageInfo = (file: File) => {
    return new Promise<ImagesInterface>((resolve, reject) => {
      const blob = new Blob([file], { type: file.type }); // create blob for the image
      const reader = new FileReader();

      // Set up FileReader onload event
      reader.onload = (event: ProgressEvent<FileReader>) => {
        if (event.target && event.target.result) {
          const img = new Image();

          // Set up Image onload event
          img.onload = () => {
            const aspectRatio = getAspectRatio(
              img.naturalWidth,
              img.naturalHeight
            );
            resolve({
              blob,
              aspectRatio,
              width: img.naturalWidth,
              height: img.naturalHeight,
            });
          };

          img.src = event.target.result.toString();
        }
      };

      // Read the file as a data URL
      reader.readAsDataURL(blob);
    });
  };

  const handleFileChange = async (e: BaseSyntheticEvent) => {
    const imageFilesWithBlob = await Promise.all(
      Array.from(e.target.files).map(async (file) => {
        const imageBlobWithAspectRatio = await getImageInfo(file as File);
        return imageBlobWithAspectRatio;
      })
    );
    console.log(imageFilesWithBlob);
    setSelectedImages(imageFilesWithBlob);
    // dispatch(
    //   updateUploadImages({ images: imageFilesWithBlob, isLoading: false })
    // );
  };

  const handleModalClose = () => {
    dispatch(toogleImageModal("16:9"));
  };

  const handleCancelUpload = () => {
    dispatch(toogleImageModal("16:9"));
    setSelectedImages([]);
    setError(false);
  };

  return (
    <>
      {isImageUploadModalOpen && (
        <div className="fixed z-[999] top-0 left-0 bg-[rgba(0,0,0,0.3)] w-screen h-screen flex justify-center items-center">
          <div className="modal w-90 min-w-[370px] max-w-500 mx-auto my-10 bg-white rounded-lg shadow-md">
            <div className="modal-header flex items-start justify-between px-6 py-4">
              <div className="logo-circle w-14 h-14 flex justify-center items-center rounded-full bg-purple-100">
                <span className="text-green-500">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    xmlnsXlink="http://www.w3.org/1999/xlink"
                    className="w-7 h-7"
                    viewBox="0 0 512 419.116">
                    <defs>
                      <clipPath id="clip-folder-new">
                        <rect width="512" height="419.116"></rect>
                      </clipPath>
                    </defs>
                    <g id="folder-new" clipPath="url(#clip-folder-new)">
                      <path
                        id="Union_1"
                        data-name="Union 1"
                        d="M16.991,419.116A16.989,16.989,0,0,1,0,402.125V16.991A16.989,16.989,0,0,1,16.991,0H146.124a17,17,0,0,1,10.342,3.513L227.217,57.77H437.805A16.989,16.989,0,0,1,454.8,74.761v53.244h40.213A16.992,16.992,0,0,1,511.6,148.657L454.966,405.222a17,17,0,0,1-16.6,13.332H410.053v.562ZM63.06,384.573H424.722L473.86,161.988H112.2Z"
                        fill="var(--c-action-primary)"
                        stroke=""
                        strokeWidth="1"></path>
                    </g>
                  </svg>
                </span>
              </div>
              <button
                onClick={handleModalClose}
                className="btn-close flex items-center justify-center w-9 h-9 rounded-md border border-transparent hover:bg-purple-100 focus:bg-purple-100 focus:outline-none">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className="w-6 h-6"
                  viewBox="0 0 24 24">
                  <path fill="none" d="M0 0h24v24H0V0z"></path>
                  <path
                    d="M19 6.41L17.59 5 12 10.59 6.41 5 5 6.41 10.59 12 5 17.59 6.41 19 12 13.41 17.59 19 19 17.59 13.41 12 19 6.41z"
                    fill="var(--c-text-secondary)"></path>
                </svg>
              </button>
            </div>
            <div className="modal-body px-6 py-1">
              <p className="modal-title font-bold">Upload a file</p>
              <p className="modal-description mb-3">Attach the file below</p>
              {selectedImages && selectedImages.length > 0 ? (
                <>
                  {/* Render selected images */}
                  <div className={"relative mt-4 grid grid-cols-3 gap-4 "}>
                    {selectedImages.map((file, index) => (
                      <div
                        key={index}
                        style={{
                          aspectRatio: requiredAspectRatio?.replace(":", "/"),
                        }}
                        onClick={() => {
                          const imagesCopy = [...selectedImages];
                          imagesCopy.splice(index, 1); // will return the spliced element
                          setSelectedImages(imagesCopy);
                        }}
                        // aspect-[${requiredAspectRatio?.replace(
                        //   ":",
                        //   "/"
                        // )}]
                        className={`border w-[150px] h-auto p-1 relative rounded-md ${
                          file.aspectRatio !== requiredAspectRatio
                            ? "border-[#D93124] border-[1px]"
                            : ""
                        }`}>
                        {file.aspectRatio !== requiredAspectRatio && (
                          <>
                            <div className="absolute backdrop-blur-[2px] top-0 left-0 w-full h-full bg-[rgba(0,0,0,0.2)] flex items-center justify-center">
                              <FaInfoCircle
                                size={20}
                                color="white"
                                title="Only 16:9 files are allowed"
                              />
                            </div>
                          </>
                        )}

                        <MdDelete
                          size={25}
                          className="absolute m-1 bottom-0 right-0 bg-white border cursor-pointer"
                        />
                        <NextImage
                          src={URL.createObjectURL(file.blob)}
                          alt={`Image ${index}`}
                          height={150}
                          width={150}
                          objectFit="cover"
                          className={`w-[150px] h-auto aspect-[${requiredAspectRatio?.replace(
                            ":",
                            "/"
                          )}]`}
                        />
                      </div>
                    ))}
                  </div>
                </>
              ) : (
                <label
                  htmlFor="file-input"
                  className="cursor-pointer upload-area flex flex-col rounded-sm items-center w-full border-dashed border border-gray-400 hover:border-gray-500 focus:border-gray-500 px-12 py-16">
                  <span className="upload-area-icon w-9 h-9 fill-green-500">
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      xmlnsXlink="http://www.w3.org/1999/xlink"
                      className="w-7 h-7"
                      viewBox="0 0 340.531 419.116">
                      <g id="files-new" clipPath="url(#clip-files-new)">
                        <path
                          id="Union_2"
                          data-name="Union 2"
                          d="M-2904.708-8.885A39.292,39.292,0,0,1-2944-48.177V-388.708A39.292,39.292,0,0,1-2904.708-428h209.558a13.1,13.1,0,0,1,9.3,3.8l78.584,78.584a13.1,13.1,0,0,1,3.8,9.3V-48.177a39.292,39.292,0,0,1-39.292,39.292Zm-13.1-379.823V-48.177a13.1,13.1,0,0,0,13.1,13.1h261.947a13.1,13.1,0,0,0,13.1-13.1V-323.221h-52.39a26.2,26.2,0,0,1-26.194-26.195v-52.39h-196.46A13.1,13.1,0,0,0-2917.805-388.708Zm146.5,241.621a14.269,14.269,0,0,1-7.883-12.758v-19.113h-68.841c-7.869,0-7.87-47.619,0-47.619h68.842v-18.8a14.271,14.271,0,0,1,7.882-12.758,14.239,14.239,0,0,1,14.925,1.354l57.019,42.764c.242.185.328.485.555.671a13.9,13.9,0,0,1,2.751,3.292,14.57,14.57,0,0,1,.984,1.454,14.114,14.114,0,0,1,1.411,5.987,14.006,14.006,0,0,1-1.411,5.973,14.653,14.653,0,0,1-.984,1.468,13.9,13.9,0,0,1-2.751,3.293c-.228.2-.313.485-.555.671l-57.019,42.764a14.26,14.26,0,0,1-8.558,2.847A14.326,14.326,0,0,1-2771.3-147.087Z"
                          transform="translate(2944 428)"
                          fill="var(--c-action-primary)"></path>
                      </g>
                    </svg>
                  </span>
                  {/* <span className="upload-area-title mt-2 font-bold text-gray-800">
                        Drag file(s) here to upload.
                      </span>
                      <span className="upload-area-description text-gray-600 mt-2">
                        Alternatively, you can select a file by <br />
                        <strong>clicking here</strong>
                      </span> */}

                  <input
                    type="file"
                    onChange={handleFileChange}
                    accept="image/*"
                    multiple
                    className="hidden"
                    id="file-input"
                  />

                  <span className="upload-area-description text-gray-600 mt-2 flex flex-col items-center justify-center">
                    You can select files by <br />
                    <strong>clicking here</strong>
                  </span>
                </label>
              )}
              {error && (
                <div className="py-1">
                  <span className="text-sm text-[#D93124]">
                    Only {requiredAspectRatio} ration images are allowed
                  </span>
                </div>
              )}
            </div>

            <div className="modal-footer px-6 py-4 flex justify-end">
              <button
                onClick={handleCancelUpload}
                className="btn-secondary px-4 py-2 font-medium border border-gray-300 rounded-md bg-transparent hover:bg-gray-100 focus:bg-gray-100 focus:outline-none">
                Cancel
              </button>
              <button
                // onClick={handleOnClick}
                className="btn-primary ml-4 px-4 py-2 font-medium bg-green-500 text-white rounded-md hover:bg-green-600 focus:bg-green-600 focus:outline-none">
                Upload File
              </button>
            </div>
          </div>
        </div>
      )}
    </>
  );
}

export default ImageUploadModal;
