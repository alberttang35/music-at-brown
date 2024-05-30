import { useNavigate } from "react-router-dom";
import { Displayable } from "../types/Displayable";
import { Artist, Event } from "../types/types";
import { NavigationButton } from "../utilities/NavigationButton";

interface SublistProps {
  header: string;
  toMap: Artist[] | Event[];
  redirect?: string;
}

export default function Sublist({ header, toMap, redirect }: SublistProps) {
  const navigate = useNavigate();

  function isArtistArr(arr: Artist[] | Event[]): arr is Artist[] {
    if (arr.length == 0) {
      return true;
    }
    return (arr[0] as Artist).bio !== undefined;
  }

  return (
    <>
      <div className="px-10 mx-auto grid grid-cols-6">
        <p className="text-lg font-medium text-left">{header}</p>
        {redirect ? <NavigationButton to={redirect} label="Show All" /> : <></>}
      </div>
      <ul className="divide-y divide-gray-200 pt-2 px-10 mx-auto grid gap-2 lg:grid-cols-6 md:grid-cols-4 sm:grid-cols-3 2xl:grid-cols-8 pb-2">
        {isArtistArr(toMap)
          ? toMap.map((artist, index) => (
              <>
                <li
                  key={artist.spotifyId}
                  className="pt-3 h-fit rounded-xl bg-slate-100 transition ease-in-out hover:bg-slate-50 cursor-pointer" // shadow-xl
                  onClick={() => {
                    navigate("/artist/" + artist.spotifyId);
                  }}
                >
                  <img
                    className="object-cover h-28 w-28 rounded-full mr-auto ml-auto"
                    src={artist.image}
                    alt={artist.name}
                  />
                  <div className="pt-1 h-16 grid grid-cols-1">
                    <p className="text-sm font-medium text-gray-900 justify-self-center place-self-start pt-1">
                      {artist.name}
                    </p>
                    <p className="text-sm text-gray-500 justify-self-center place-self-end pb-3">
                      {artist.bio}
                    </p>
                  </div>
                </li>
              </>
            ))
          : toMap.map((event, index) => (
              <li
                key={index}
                className="h-fit shadow-xl rounded-xl bg-slate-200 transition ease-in-out hover:bg-slate-100 cursor-pointer"
                onClick={() => {
                  navigate("/event/" + event.docId);
                }}
              >
                <img
                  className="aspect-video w-fit h-40 object-cover object-center rounded-t-xl"
                  src={event.image}
                  alt=""
                />
                <div className="pt-1 h-fit">
                  <p className="text-sm font-medium text-gray-900">
                    {event.venue}
                  </p>
                  <p className="text-sm text-gray-500">{event.date}</p>
                </div>
              </li>
            ))}
      </ul>
    </>
  );
}
