import { useState } from 'react'
import './App.css'
import "@fontsource/exo-2";

function App() {
  const [promt, setPromt] = useState("");
  const [imageSrc, setImageSrc] = useState("");
  const [loading, setLoading] = useState(false)

  
const handleSubmit = async(e) =>{
    e.preventDefault()

    if(promt === "") return
    setLoading(true)

    const form = new FormData()
    form.append('prompt', promt)

    console.log(import.meta.env.VITE_API_KEY)

    const data = await fetch(`https://clipdrop-api.co/text-to-image/v1`,{
     method:"POST",
    headers: {
          'x-api-key': import.meta.env.VITE_API_KEY,
    },
    body: form,
})
.then(response => response.arrayBuffer())
  .then(buffer => {
    // buffer here is a binary representation of the returned image
      console.log(buffer)
     // Convert buffer to a base64 string
     const base64Image = `data:image/png;base64,${btoa(
      new Uint8Array(buffer).reduce(
        (data, byte) => data + String.fromCharCode(byte),
        ''
      )
    )}`;
    setImageSrc(base64Image); // Set the base64 string as the image source

  }).catch((error) => {
    alert("An Error Occured. Please check console.")
    console.error('Error:', error);
  }).finally(()=>{
    setLoading(false)
  })

  }

  return (
    <div className="main-box">
    <div className='container' >
      <h1>Generate image from text</h1>
      
      <form onSubmit={handleSubmit} >
      <input required value={promt} onChange={(e)=>setPromt(e.target.value)} type="text" />
      <button type='submit'>Submit</button>
      </form>


       {/* Display Image */}
       <div className="flex">
       {
         !imageSrc ? <ImageSkeleton loading={loading} /> : <img  src={imageSrc} alt="Generated result" />
       }
       </div>


       <div className="flex-button">
      <a download={"Your-Imagination-Image"} href={imageSrc}><button type='button' disabled={imageSrc==""}  >Download</button></a> 
       </div>

    </div>
    </div>
   
  )
}

export default App




const ImageSkeleton = ({loading}) => {
 
console.log("loading" , loading)

  return (
    <div className='skeleton' >
     <h3>
      {
        loading ? "Generating...." : "Image of your imagination!"
      }
      </h3> 
    </div>
  )
}

