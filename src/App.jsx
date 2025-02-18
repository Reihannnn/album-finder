import SearchBar from "./components/SearchBar";
import PlaylistCard from "./components/PlayListCard";
import { Button } from "react-bootstrap";

function App() {
  // console.log(" client_id : "  + clientId ,  "== client secret :"  + clientSecret)

  return (
    <>
      <h1 className="text-center mt-5 text-3xl font-bold italic">
        Spotify Arts'bum Finder
      </h1>

      <div className="w-full flex justify-center"></div>

      <SearchBar></SearchBar>
    </>
  );
}

export default App;
