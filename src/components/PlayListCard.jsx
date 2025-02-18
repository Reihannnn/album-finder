import { Button } from "react-bootstrap";
import NotFindAlbum from "./notFIndAlbum";
import { useState, useEffect } from "react";

const PlaylistCard = ({ data }) => {
  const [items, setItems] = useState([]);


  useEffect(() => {
    if (data.length > 0) {
      setItems(data);
      localStorage.setItem("album", JSON.stringify(data));
    } else {
      const storedItemsAlbum = JSON.parse(localStorage.getItem("album"));
      const storedItemsArtist = JSON.parse(localStorage.getItem("artist"));
      if (storedItemsAlbum ) {
        setItems(storedItemsAlbum);
      ;
      }
    }
  }, [data]);

  console.log(items);
  return (
    <>
      <div
        className={`w-full flex flex-wrap  justify-around ${
          data.length > 0 ? "h-screen" : ""
        }`}
      >
        {items && items.length > 0 ? (
          items.map((album) => (
            <div className="bg-[url('https://images.unsplash.com/photo-1529753253655-470be9a42781?q=80&w=1974&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D')] w-[400px] rounded-lg shadow-md p-4 flex mt-5">
              {/* Foto */}
              <div className="w-[55%] relative">
                <img
                  src={album.images[1].url}
                  alt="Gaia Repossi"
                  className="w-full h-full object-cover rounded-md border-1"
                />
              </div>

              {/* Detail */}
              <div className="w-[60%] pl-4 flex flex-col justify-between text-white">
                <div>
                  <h3 className="text-black font-bold tracking-tight leading-none">
                    <span className="text-white">{album.name}</span>
                  </h3>
                  <p className=" text-sm mt-4">
                    <span className="font-bold">Total Track </span> <br />
                    {album.total_tracks}
                  </p>
                  <p className="text-sm mt-2">
                    <span className="font-bold">Release Date</span> <br />{" "}
                    {album.release_date}
                  </p>
                </div>
                <a href={album.external_urls.spotify}>
                  <Button variant="light" className="font-bold">
                    <span className="font-bold">Album Link</span>
                  </Button>
                </a>
              </div>
            </div>
          ))
        ) : (
          <NotFindAlbum />
        )}
      </div>
    </>
  );
};

export default PlaylistCard;
