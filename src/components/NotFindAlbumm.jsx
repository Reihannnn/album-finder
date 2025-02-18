import { Alert } from "react-bootstrap"

const NotFindAlbum = () =>{
  
  return (
    <div className="d-flex justify-content-center mt-4">
      <Alert variant="info" className="w-75 text-center">
        <h4>Oops!</h4>
        <p><span className="font-bold italic">Album tidak ditemukan.</span> Mungkin pencarian kamu perlu sedikit penyesuaian.</p>
        <p>Coba cari dengan nama album lain atau periksa ejaan nama album.</p>
      </Alert>
    </div>
  );
}

export default NotFindAlbum