import homePhoto from "@assets/homePhoto.png";
import Button from "@components/Button";

function Home() {
  const unirseMesa = () => {
    console.log("Unirse a mesa clicked");

      // prueba husky
          console.log("prueba")
  };

  return (
    <div className="bg-fondo min-h-screen">
      <img src={homePhoto} alt="not found" className="w-120 h-120" />
      <Button onClick={unirseMesa}>CREAR MESA</Button>
      <Button onClick={unirseMesa} circular />
      <Button onClick={unirseMesa}>UNIRSE A MESA</Button>
      <Button onClick={unirseMesa}>TUTORIAL</Button>
    </div>
  );
}

export default Home;
