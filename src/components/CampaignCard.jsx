import Link from 'next/link';
import React from 'react'
import { FaCircle } from "react-icons/fa";

const CampaignCard = ({ camp }) => {
  const platforms = camp.platforms
    .map(p => p.charAt(0).toUpperCase() + p.slice(1))
    .join(", ");

  return (
    <div className='text-sm bg-white px-6 py-3 m-2 rounded-xl shadow-md'>
      <div className='flex justify-between items-center' >
        <p className='font-bold text-xl mr-10'>{camp.name}</p>
        <p className='flex items-center gap-2'>
          <FaCircle color={camp.status == "active" ? "green" : camp.status == "paused" ? "yellow" : "gray"} />{camp.status.charAt(0).toUpperCase() + camp.status.slice(1)}
        </p>
      </div >
      <div className='my-2'>
        <p><span className='font-bold'>Platform: </span>{platforms}</p>
        <p><span className='font-bold'>Budget: </span>₹{camp.budget}</p>
        <p><span className='font-bold'>Daily Budget: </span>₹{camp.daily_budget}/day</p>
      </div>
      <div className='flex items-center justify-between gap-2'>
        <Link href={`/campaigns/${camp.id}`} className='px-3 py-1.5 bg-blue-900 rounded-md text-white'
        >Show Details</Link>
        <Link href={`/campaign/insights/${camp.id}`} className='px-3 py-1.5 bg-green-700 rounded-md text-white'
        >View Insights</Link>
        <Link href={`/campaign/${camp.id}/insights/stream`} className='px-3 py-1.5 bg-cyan-900 rounded-md text-white'
        >View stream</Link>
      </div>

    </div>
  )
}

export default CampaignCard