import React from 'react'
import { getCampaignById } from '../../../utils/campaign-functions';
import { FcGoogle } from "react-icons/fc";
import { FaMeta } from "react-icons/fa6";
import { FaLinkedin } from "react-icons/fa";
import { FaCircle } from "react-icons/fa";

const CampaignDetails = async ({ params }) => {
  const { id } = await params
  let campDetails = {}

  try {
    const response = await getCampaignById(id);
    campDetails = response?.campaign
  } catch (error) {
    console.alert("Failed to fetch campaigns:", error);
  }

  const platforms = campDetails?.platforms.map((p, index) => (
    <span key={p} className="flex items-center gap-1">
      {p.charAt(0).toUpperCase() + p.slice(1)}
      {p === "google" ? <FcGoogle /> : p === "meta" ? <FaMeta color="navy" />
        : p === "linkedin" ? <FaLinkedin color="navy" />
          : ""
      }
    </span>
  ));

  return (
    <div className='bg-gray-100 h-screen flex flex-col justify-center items-center'>
      <p className='font-bold text-xl mb-2'>Campaign Details:</p>
      <div className='bg-white p-4 rounded-xl shadow-md'>
        <div className='flex gap-10 justify-center items-center'>
          <p className='font-bold text-xl'>{campDetails?.name}</p>
          <p className='flex items-center gap-2'>
            <FaCircle color={campDetails?.status == "active" ? "green" : campDetails?.status == "paused" ? "yellow" : "gray"} />{campDetails?.status.charAt(0).toUpperCase() + campDetails?.status.slice(1)}
          </p>
        </div>
        <div className='my-2'>
          <p className="flex items-center gap-2"><span className='font-bold'>Platforms: </span>{platforms}</p>
          <p><span className='font-bold'>Budget: </span>₹{campDetails?.budget}</p>
          <p><span className='font-bold'>Daily Budget: </span>₹{campDetails?.daily_budget}/day</p>
        </div>
      </div>
    </div>
  )
}

export default CampaignDetails
