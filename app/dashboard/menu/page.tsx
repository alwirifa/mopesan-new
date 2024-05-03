import React from "react";

type Props = {};

const Menu = (props: Props) => {
  const dataImage = [
    {
      name: "Dosirak Dakgalbi",
      description: "Baso Description",
      imageUrl: "/images/baso.svg",
    },
    {
      name: "Dosirak Dakgalbi",
      description: "Sate Description",
      imageUrl: "/images/sate.svg",
    },
    {
      name: "Dosirak Dakgalbi",
      description: "Tumpeng Description",
      imageUrl: "/images/tumpeng.svg",
    },
  ];

  const dataMenu = [
    {
      title: "All",
    },
    {
      title: "Dosirak",
    },
    {
      title: "Rice Bowl",
    },
    {
      title: "Rice & Noodle",
    },
    {
      title: "Teopoki",
    },
    {
      title: "Scnak & Sharing",
    },
    {
      title: "Drinks",
    },
    {
      title: "Ready to Cook",
    },
    {
      title: "Extra",
    },
  ];

  return (
    <div className="h-screen w-full pl-4">
      <div className="bg-gray h-full w-full ">
        <div className="flex flex-col gap-4">
          <h1 className="text-4xl font-semibold text-maroon">Menus</h1>
          <p className="text-sm">List of all menu</p>
        </div>

        <div className="mt-8 flex gap-4 max-w-max">
        {dataMenu.map((menu, index) => (
            <div
              key={index}
              className="px-4 py-2 rounded-md border border-maroon text-maroon"
            >
              {menu.title}
            </div>
        ))}
        </div>

        <div className="mt-8 grid grid-cols-5 gap-4">
          {dataImage.map((imageData, index) => (
            <div
              key={index}
              className="p-6 rounded-md flex flex-col gap-2  bg-white shadow-md"
            >
              <div className="w-full flex justify-center">
                <img
                  src={imageData.imageUrl}
                  alt={imageData.description}
                  className="h-56 w-56"
                />
              </div>
              <div className="flex justify-between">
                <div>
                  <p className="font-semibold">{imageData.name}</p>
                  {/* Menampilkan deskripsi jika ada */}
                  {imageData.description && (
                    <p className="text-[10px] italic text-textGray">
                      {imageData.description}
                    </p>
                  )}
                </div>
                <p className="text-maroon font-semibold">Rp. 45.000</p>
              </div>
              <p className="mt-2 text-sm text-textGray">
                Fried Chicken with spicy gojuchang sauce. Tender and sweet!
              </p>
              <div className="mt-2 w-full flex justify-end">
                <div className="px-6 py-2 rounded-md text-sm text-white bg-maroon">
                  Details
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Menu;
