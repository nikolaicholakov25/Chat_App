import { useRouter } from "next/router";
import React, { RefObject, useEffect, useState } from "react";
import { firebaseApi } from "services";
import { CurrentUserProfile } from "collections";

interface SidebarProps {
  ref?: RefObject<HTMLDivElement>;
}

export const Sidebar: React.FC<SidebarProps> = ({ ...props }) => {
  const [rooms, setRooms] = useState<string[]>([]);
  const router = useRouter();

  const slug = router.query.slug ? router.query.slug[0] : "";

  console.log(slug);

  useEffect(() => {
    firebaseApi.GET.allRooms(setRooms);
  }, []);

  const handleGoToRoom = (path: string) => () => {
    if (router.pathname === "/chats") {
      router.push(`chats/${path}`);
    } else {
      router.push(path);
    }
  };

  return (
    <div
      className="flex-col justify-between flex w-[20%] h-[-webkit-fill-available] bg-darkGrey"
      {...props}
    >
      <div className="flex w-full flex-col justify-between ml-[15px]">
        <div className="w-[46px]">
          {rooms.map((room, i) => (
            <div
              key={i}
              className={
                slug === room
                  ? "active-room room-img-tail room-img"
                  : "room-img-tail room-img"
              }
              onClick={handleGoToRoom(room)}
            >
              {room.slice(0, 1).toUpperCase()}s
            </div>
          ))}
        </div>
      </div>
      <CurrentUserProfile />
    </div>
  );
};
