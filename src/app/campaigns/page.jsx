import React from 'react'
import CampaignCard from '../../components/CampaignCard'

const Campaign = ({ campaigns }) => {
  return (
    <div className="flex justify-center items-center flex-col mt-5">
      <h1 className="text-2xl font-bold mb-6">Campaigns</h1>
      <div className="flex justify-center items-center m-4 flex-wrap">
        {campaigns?.map((camp) => {
          return (
            <div key={camp.id}>
              <CampaignCard camp={camp} />
            </div>
          )
        })}
      </div>
    </div>
  )
}

export default Campaign
