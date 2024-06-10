"use client";

import { createNotification } from "@/app/api/notif";
import { useNotifModal } from "@/app/hooks/notif/useNotifModal";
import React, { useState } from "react";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import { format } from "date-fns";

const NotifForm: React.FC = () => {
  const [description, setDescription] = useState("");
  const [isActive, setIsActive] = useState<boolean>(true);
  const [timeBlast, setTimeBlast] = useState<string>("Now");
  const [notifName, setNotifName] = useState("");
  const [selectedDate, setSelectedDate] = useState<Date | null>(new Date());
  const [daysInMonth, setDaysInMonth] = useState<string>("1");

  const notifModal = useNotifModal();

  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    const form = event.currentTarget;

    if (form.reportValidity()) {
      await createNotification(event, {
        name: notifName,
        description: description,
        day_in_month: daysInMonth,
        time: timeBlast === "Now"
          ? format(new Date(), "yyyy-MM-dd HH:mm:ss")
          : selectedDate
          ? format(selectedDate, "yyyy-MM-dd HH:mm:ss")
          : "",
        is_active: isActive,
      });
      notifModal.onClose();
    }
  };

  const handleTimeBlastChange = (value: string) => {
    setTimeBlast(value);
    if (value === "Now") {
      setSelectedDate(new Date());
    }
  };

  const handlePromotionTypeChange = (value: string) => {
    switch (value) {
      case "fixed":
        setIsActive(true);
        setDaysInMonth("1");
        break;
      case "every 1 day":
        setIsActive(false);
        setDaysInMonth("1");
        break;
      case "every 1 week":
        setIsActive(false);
        setDaysInMonth("7");
        break;
      case "every 1 month":
        setIsActive(false);
        setDaysInMonth("30");
        break;
    }
  };

  return (
    <div className="p rounded-lg bg-white">
      <form onSubmit={handleSubmit} className="flex flex-col gap-6">
        <div className="flex gap-6 w-full border-t border-b border-primary py-6 ">
          <div className="flex flex-1 flex-col gap-6">
            {/* ======================== NOTIFICATION TITLE ============================= */}
            <div className="flex flex-col gap-2">
              <label
                htmlFor="notif_name"
                className="block font-medium leading-6 text-gray-900"
              >
                Notification Title <span className="text-primary">*</span>
              </label>
              <input
                type="text"
                id="notif_name"
                placeholder="Notification Title (ex. Get 1 Item Free, etc ...)"
                value={notifName}
                onChange={(e) => setNotifName(e.target.value)}
                className="block w-full rounded-md border-0 px-4 py-2 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-primary focus:outline-none sm:leading-6 placeholder:italic"
                required
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
            <div className="flex flex-col gap-2">
              <label
                htmlFor="notification_type"
                className="block font-medium leading-6 text-gray-900"
              >
                Notification Type
              </label>
              <textarea
                id="notification_type"
                placeholder="Notification Type ..."
                className="block w-full rounded-md border-0 px-4 py-2 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-primary focus:outline-none sm:leading-6 placeholder:italic"
              />
            </div>
            {/* ========================PROMOTION & TIME BLAST ============================= */}
            <div className="flex gap-64">
              <div className="flex flex-col gap-2">
                <label
                  htmlFor="promotion_type"
                  className="block font-medium leading-6 text-gray-900"
                >
                  Promotion Type <span className="text-primary">*</span>
                </label>
                <div className="space-x-2">
                  <input
                    type="radio"
                    id="fixed"
                    name="promotionType"
                    value="fixed"
                    onChange={(e) => handlePromotionTypeChange(e.target.value)}
                  />
                  <label htmlFor="fixed">One Time</label>
                </div>
                <div className="space-x-2">
                  <input
                    type="radio"
                    id="every1day"
                    name="promotionType"
                    value="every 1 day"
                    onChange={(e) => handlePromotionTypeChange(e.target.value)}
                  />
                  <label htmlFor="every1day">Every 1 Day</label>
                </div>
                <div className="space-x-2">
                  <input
                    type="radio"
                    id="every1week"
                    name="promotionType"
                    value="every 1 week"
                    onChange={(e) => handlePromotionTypeChange(e.target.value)}
                  />
                  <label htmlFor="every1week">Every 1 Week</label>
                </div>
                <div className="space-x-2">
                  <input
                    type="radio"
                    id="every1month"
                    name="promotionType"
                    value="every 1 month"
                    onChange={(e) => handlePromotionTypeChange(e.target.value)}
                  />
                  <label htmlFor="every1month">Every 1 Month</label>
                </div>
              </div>
              <div className="flex flex-col gap-2">
                <label
                  htmlFor="time_blast"
                  className="block font-medium leading-6 text-gray-900"
                >
                  Time Blast <span className="text-primary">*</span>
                </label>
                <div className="space-x-2">
                  <input
                    type="radio"
                    id="now"
                    name="timeBlast"
                    value="now"
                    checked={timeBlast === "Now"}
                    onChange={() => handleTimeBlastChange("Now")}
                  />
                  <label htmlFor="now">Now</label>
                </div>
                <div className="space-x-2">
                  <input
                    type="radio"
                    id="setdate&time"
                    name="timeBlast"
                    value="set date & time"
                    checked={timeBlast === "Set Date & Time"}
                    onChange={() => handleTimeBlastChange("Set Date & Time")}
                  />
                  <label htmlFor="setdate&time">Set Date & Time</label>
                </div>
                {timeBlast === "Set Date & Time" && (
                  <DatePicker
                    selected={selectedDate}
                    onChange={(date) => setSelectedDate(date)}
                    showTimeSelect
                    dateFormat="Pp"
                    className="mt-2 block w-full rounded-md border-0 px-4 py-2 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-primary focus:outline-none sm:leading-6 placeholder:italic"
                  />
                )}
              </div>
            </div>
          </div>
        </div>
      </form>
    </div>
  );
};

export default NotifForm;
