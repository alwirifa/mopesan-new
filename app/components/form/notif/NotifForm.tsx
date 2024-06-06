"use client";

import { createFee } from "@/app/api/fee";
import React, { useState } from "react";

const NotifForm: React.FC = () => {
  const [description, setDescription] = useState("");
  const [promotion, setPromotion] = useState<string>("fixed");
  const [timeBlast, setTimeBlast] = useState<string>("Now");
  const [notifName, setNotifName] = useState("");

  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    // createFee(event, {
    //   configuration_name: feeName,
    //   value_type: potonganType,
    //   description: description,
    // });
  };

  return (
    <div className="p rounded-lg bg-white">
      <form onSubmit={handleSubmit} className="flex flex-col gap-6">
        <div className="flex gap-6 w-full border-t border-b border-primary py-6 ">
          <div className="flex flex-1 flex-col gap-6">
            {/* ======================== NOTIFICATION TITLE ============================= */}
            <div className="flex flex-col gap-2">
              <label
                htmlFor="fee_name"
                className="block font-medium leading-6 text-gray-900"
              >
                Notification Title <span className="text-primary">*</span>
              </label>
              <input
                type="text"
                id="fee_name"
                placeholder="Notification Title (ex. Get 1 Item Free, etc ...)"
                value={notifName}
                onChange={(e) => setNotifName(e.target.value)}
                className="block w-full rounded-md border-0 px-4 py-2 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-primary  focus:outline-none sm:leading-6 placeholder:italic"
              />
            </div>
            <div className="flex flex-col gap-2">
              <label
                htmlFor="description"
                className="block font-medium leading-6 text-gray-900"
              >
                Notification Description
              </label>
              <textarea
                id="description"
                placeholder="Notification Description ..."
                value={description}
                onChange={(e) => setDescription(e.target.value)}
                className="block w-full rounded-md border-0 px-4 py-2 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-primary focus:outline-none sm:leading-6 placeholder:italic"
              />
            </div>
            {/* ========================PROMOTION & TIME BLAST ============================= */}
            <div className="flex gap-64">
              <div className="flex flex-col gap-2">
                <label
                  htmlFor="potongan"
                  className="block font-medium leading-6 text-gray-900"
                >
                  Promotion Type <span className="text-primary">*</span>
                </label>
                <div className="space-x-2">
                  <input
                    type="radio"
                    id="oneTime"
                    name="promotionType"
                    value="oneTime"
                    checked={promotion === "One Time"}
                    onChange={(e) => setPromotion(e.target.value)}
                  />
                  <label htmlFor="fixed">Fixed</label>
                </div>
                <div className="space-x-2">
                  <input
                    type="radio"
                    id="every1day"
                    name="promotionType"
                    value="every 1 day"
                    checked={promotion === "Every 1 Day"}
                    onChange={(e) => setPromotion(e.target.value)}
                  />
                  <label htmlFor="every1day">Every 1 Day</label>
                </div>
                <div className="space-x-2">
                  <input
                    type="radio"
                    id="every1week"
                    name="promotionType"
                    value="every 1 week"
                    checked={promotion === "Every 1 Week"}
                    onChange={(e) => setPromotion(e.target.value)}
                  />
                  <label htmlFor="every1week">Every 1 Week</label>
                </div>
                <div className="space-x-2">
                  <input
                    type="radio"
                    id="every1month"
                    name="promotionType"
                    value="every 1 month"
                    checked={promotion === "Every 1 Month"}
                    onChange={(e) => setPromotion(e.target.value)}
                  />
                  <label htmlFor="every1month">Every 1 Month</label>
                </div>
              </div>
              <div className="flex flex-col gap-2">
                <label
                  htmlFor="potongan"
                  className="block font-medium leading-6 text-gray-900"
                >
                  Time Blast <span className="text-primary">*</span>
                </label>
                <div className="space-x-2">
                  <input
                    type="radio"
                    id="now"
                    name="promotionType"
                    value="now"
                    checked={timeBlast === "Now"}
                    onChange={(e) => setTimeBlast(e.target.value)}
                  />
                  <label htmlFor="every1day">Now</label>
                </div>
                <div className="space-x-2">
                  <input
                    type="radio"
                    id="setdate&time"
                    name="promotionType"
                    value="set date & time"
                    checked={timeBlast === "Set Date & Time"}
                    onChange={(e) => setTimeBlast(e.target.value)}
                  />
                  <label htmlFor="every1week">Set Date & Time</label>
                </div>
              </div>
            </div>
          </div>
        </div>
      </form>
    </div>
  );
};

export default NotifForm;
