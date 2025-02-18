import { FormControl, InputGroup, Container, Button } from "react-bootstrap";
import { useState, useEffect } from "react";
import PlaylistCard from "./PlayListCard";

const clientId = import.meta.env.VITE_CLIENT_ID;
const clientSecret = import.meta.env.VITE_CLIENT_SECRET;

function App() {
  const [searchInput, setSearchInput] = useState("");
  const [accessToken, setAccessToken] = useState("");
  const [albums, setAlbums] = useState([]);
  const [artist, setArtist] = useState("");

  useEffect(() => {
    let authParams = {
      method: "POST",
      headers: {
        "Content-Type": "application/x-www-form-urlencoded",
      },
      body:
        "grant_type=client_credentials&client_id=" +
        clientId +
        "&client_secret=" +
        clientSecret,
    };
    fetch("https://accounts.spotify.com/api/token", authParams)
      .then((result) => result.json())
      .then((data) => {
        setAccessToken(data.access_token);
      });
  }, []);

  async function search() {
    let artistParams = {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        Authorization: "Bearer " + accessToken,
      },
    };

    // Get Artist
    const artistID = await fetch(
      "https://api.spotify.com/v1/search?q=" + searchInput + "&type=artist",
      artistParams
    )
      .then((result) => result.json())
      .then((data) => {
        return data.artists.items[0].id;
      });

    await fetch(
      "https://api.spotify.com/v1/artists/" +
        artistID +
        "/albums?include_groups=album&market=US&limit=50",
      artistParams
    )
      .then((result) => result.json())
      .then((data) => {
        setAlbums(data.items);
      });
    console.log("Search Input: " + searchInput);
    console.log("Artist ID: " + artistID);

    // localStorage.setItem("album", JSON.stringify(albums))
    localStorage.setItem("artist", JSON.stringify(searchInput)); // set LOcalStorage for artisname
  }

  // get artistName from localStorage
  useEffect(() => {
    const getArtisName = JSON.parse(localStorage.getItem("artist"));
    setArtist(getArtisName);
  }, [albums]);

  function clearStorage() {
    localStorage.removeItem("album");
    localStorage.removeItem("artist");
    setAlbums([]);
    setArtist("");
  }

  return (
    <>
      <Container>
        <InputGroup>
          <FormControl
            className="p-4"
            placeholder="Search For Artist"
            type="input"
            aria-label="Search for an Artist"
            onKeyDown={(event) => {
              if (event.key === "Enter") {
                search();
              }
            }}
            onChange={(event) => setSearchInput(event.target.value)}
            style={{
              width: "300px",
              height: "35px",
              borderWidth: "2px",
              borderStyle: "solid",
              borderRadius: "5px",
              marginRight: "10px",
              paddingLeft: "10px",
            }}
          />

          <Button onClick={() => search()} className="rounded ">
            Search
          </Button>
        </InputGroup>
      </Container>

      {artist  == "" ? (
        <div className="w-full flex justify-center mt-3 items-center gap-4">
          <Button variant="dark">
            <span className="font-bold">{artist} </span>
          </Button>
          <span
            className="bg-black text-white px-3 font-bold py-[0.44rem] rounded"
            onClick={() => clearStorage()}
          >
            X
          </span>
        </div>
      ) : (
        ""
      )}

      <div
        className={`w-5/6 m-auto flex gap-3  ${albums.length > 0 ? "" : ""}`}
      >
        <PlaylistCard data={albums}></PlaylistCard>
      </div>
    </>
  );
}

export default App;
