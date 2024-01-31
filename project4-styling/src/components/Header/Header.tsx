import logo from "@/assets/logo.png"

export function HeaderContent() {
  return (
    <>
      <img src={logo} alt="A canvas" />
      <h1 className="text-2xl md:text-4xl">ReactArt</h1>
      <p>A community of artists and art-lovers.</p>
    </>
  )
}
