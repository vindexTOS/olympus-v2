import React, { useEffect, useState } from 'react'
import { useParams } from 'react-router-dom'
import { GetSinglePropert } from '../../Redux/Property/property-thunk'
import { useDispatch, useSelector } from 'react-redux'
import { ThunkDispatch } from '@reduxjs/toolkit'
import LoadingSkeletonPage from './LoadingSkeletonPage'

export default function SingePage() {
  const { id } = useParams()
  const dispatch = useDispatch<ThunkDispatch<any, any, any>>()
  const { singleProperty, loading, error } = useSelector(
    (state: any) => state.propertyReducer,
  )

  const {
    buildYear,
    description,
    featureType,
    location,
    mainPicture,
    pictures,
    price,
    propertyName,
    propertyType,
    sqArea,
    status,
    uploadetAt,
  } = singleProperty
  const [zoomedImage, setZoomedImage] = useState(null)

  const openZoomedImage = (imagePath: any) => {
    setZoomedImage(imagePath)
  }

  const closeZoomedImage = () => {
    setZoomedImage(null)
  }
  useEffect(() => {
    window.scrollTo({ top: 0, behavior: 'smooth' })

    if (id) {
      dispatch(GetSinglePropert(id))
    }
  }, [id])

  if (loading) {
    return <LoadingSkeletonPage />
  }
  return (
    <div className="container mx-auto p-8 mt-10 bg-brand-green/50 backdrop-blur-xl rounded-md shadow-lg  max_xml:flex  max_xml:flex-col">
      {/* Main Content Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
        {/* Image Section */}
        <div className="flex flex-col items-center md:items-start">
          <img
            src={`data:image/jpeg;base64,${mainPicture}`}
            alt={propertyName}
            className="w-full h-auto rounded-lg mb-4 cursor-pointer"
            onClick={() =>
              openZoomedImage(`data:image/jpeg;base64,${mainPicture}`)
            }
          />

          {/* Thumbnail Images */}
          <div className="flex gap-2">
            {pictures?.map((pic: any, index: any) => (
              <img
                key={pic.id}
                src={`data:image/jpeg;base64,${pic.picturePath}`}
                alt={propertyName}
                className="w-[120px] h-[120px] mb-2 cursor-pointer rounded-lg"
                onClick={() =>
                  openZoomedImage(`data:image/jpeg;base64,${pic.picturePath}`)
                }
              />
            ))}
          </div>
        </div>

        {/* Property Details Section */}
        <div className="flex flex-col justify-between bg-brand-white shadow-md rounded-[5px] p-2">
          {/* Title */}
          <h1 className="text-4xl font-bold mb-4 text-gray-600">
            {propertyName}
          </h1>

          {/* Description Section */}
          <div className="mb-6">
            <p className="text-gray-600 font-bold mb-2">Description:</p>
            <p className="text-gray-700">{description}</p>
          </div>

          {/* Information Section */}
          <div className="grid grid-cols-2 gap-4 ">
            <div className="text-gray-600">
              <div className="flex justify-between items-center border-b border-gray-600 pb-2">
                <p className="font-bold">Location:</p>
                <p>{location}</p>
              </div>
              <div className="flex justify-between items-center border-b border-gray-600 pb-2">
                <p className="font-bold">Build Year:</p>
                <p>{buildYear}</p>
              </div>
              <div className="flex justify-between items-center border-b border-gray-600 pb-2">
                <p className="font-bold">Property Type:</p>
                <p>{propertyType}</p>
              </div>
            </div>

            <div className="text-gray-600 gap-2">
              <div className="flex justify-between items-center border-b border-gray-600 pb-2">
                <p className="font-bold">Square Area:</p>
                <p>{sqArea} sq. meters</p>
              </div>
              <div className="flex justify-between items-center border-b border-gray-600 pb-2">
                <p className="font-bold">Price:</p>
                <p>${price}</p>
              </div>
              <div className="flex justify-between items-center border-b border-gray-600 pb-2">
                <p className="font-bold">Status:</p>
                <p>{status}</p>
              </div>
            </div>
          </div>

          {/* Additional Information */}
          <div>
            <p className="text-gray-600 font-bold mb-2">Uploaded At:</p>
            <p>{uploadetAt?.slice(0, 10)}</p>
            <p className="text-gray-600 font-bold mb-2">Feature Type:</p>
            <p>{featureType}</p>
          </div>
        </div>
      </div>

      {/* Zoomed Image Section */}
      {zoomedImage && (
        <div className="fixed inset-0 flex items-center justify-center z-50 bg-black bg-opacity-75">
          <img
            src={zoomedImage}
            alt="Zoomed In"
            className="w-full md:w-[90%] h-[90vh] cursor-pointer rounded-lg"
            onClick={closeZoomedImage}
          />
        </div>
      )}
    </div>
  )
}
