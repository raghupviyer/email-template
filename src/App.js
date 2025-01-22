
import { useEffect, useRef, useState } from "react"
import TextBoxUI from "./components/TextBoxUI"
import TextBoxOptions from "./components/TextBoxOptions"
import ButtonOptions from "./components/ButtonOptions"
import ButtonUI from "./components/ButtonUI"
import ImageUI from "./components/ImageUI"
import ImageOptions from "./components/ImageOptions"

export default function App() {
  const [currentSettings, setCurrentSettings] = useState({})
  // const [currentComponent, setCurrentComponent] = useState({})
  const [compList, setCompList] = useState([])

  const [fonts, setFonts] = useState([])
  const [uniqueFonts, setUniqueFonts] = useState([])

  const [color, setColor] = useState('')

  const tempRef = useRef(null)

  const weights = [
    100, 200, 300, 400, 500, 600, 700, 800, 900
  ]

  const defaultTextSettings = {
    compType: 'textBox',
    innerText: 'HI',
    textColor: '',
    bgColor: '',
    textSize: 12,
    font: '',
    fontStyle: '',
    marginY: '',
    marginX: '',
    textAlignment: 'center'
  }

  const defaultButtonSettings = {
    compType: 'button',
    innerText: 'HI...',
    textColor: '',
    bgColor: '',
    textSize: 15,
    font: '',
    fontStyle: '',
    borderWidth: '',
    borderColor: '',
    paddingY: '',
    width: '',
    marginY: '',
    borderRadius: '',
    redirectUrl: ''
  }

  const defaultImageSettings = {
    compType: 'image',
    url: '',
    width: '10',
    height: '10',
    hUnit: 'px',
    wUnit: 'px',
    marginY: '',
  }


  useEffect(() => {
    window.queryLocalFonts().then(data => {
      setFonts(data)
      // Use a Set to store unique font families
      const uniqueFontFamilies = new Set();

      // Iterate through fonts and collect family names
      data.forEach(font => uniqueFontFamilies.add(font.family));

      // Convert the Set back to an array
      setUniqueFonts(Array.from(uniqueFontFamilies));
    }
    )
  }, [])

  useEffect(() => {
    compList.splice(currentSettings.id, 1, currentSettings)
  }, [currentSettings])

  // useEffect(() => {
  //   const familyList = fonts.filter((font) => {
  //     return font.family === settings.font
  //   })
  //   console.log(familyList)
  //   setStyles(familyList)
  // }, [font])

  return (<>
    <div className="flex ">
      <div className="flex-1">
        {currentSettings?.compType === 'textBox' ? (
          <TextBoxOptions settings={currentSettings} setSettings={setCurrentSettings} fonts={fonts} uniqueFonts={uniqueFonts} weights={weights} />
        ) : currentSettings?.compType === 'button' ? (
          <ButtonOptions settings={currentSettings} setSettings={setCurrentSettings} fonts={fonts} uniqueFonts={uniqueFonts} weights={weights} />
        ) : currentSettings?.compType === 'image' ? (
          <ImageOptions settings={currentSettings} setSettings={setCurrentSettings} />
        ) : null}
        <div className="mt-5 mb-5">
          Template Background Color:
          <input type="color" placeholder="Template Background Color" value={color} className="border" onChange={(e) => setColor(e.target.value)} />
        </div>
        <button onClick={() => {
          let def = defaultTextSettings
          def.id = compList.length
          setCompList(state => [...state, def])
          setCurrentSettings(def)
        }}>+ Text</button>
        <button onClick={() => {
          let def = defaultButtonSettings
          def.id = compList.length
          setCompList(state => [...state, def])
          setCurrentSettings(def)
        }}>+ Button</button>
        <button onClick={() => {
          let def = defaultImageSettings
          def.id = compList.length
          setCompList(state => [...state, def])
          setCurrentSettings(def)
        }}>+ Image</button>

        <button onClick={() => {
          const section = tempRef.current.outerHTML
          const blob = new Blob([section], { type: "text/html" });
          const a = document.createElement("a");
          a.href = URL.createObjectURL(blob);
          a.download = "section.html";
          a.click();
          URL.revokeObjectURL(a.href);

        }}>Download</button>

        <button onClick={(async () => {
          try {
            //upload all images
            let images = new FormData()
            const arr = []
            compList.forEach(compEl => {
              if(compEl.compType === 'image'){
                console.log(compEl)
                arr.push(compEl.file)
              }
            })
            images.append('image', arr)
            for (var pair of images.entries()) {
              console.log(pair[0]+ ', ' + pair[1]); 
          }

          const res = await fetch("http://localhost:3080/uploadImages", {
              method: "POST",
              contentType: 'multipart/form-data; boundary=ExampleBoundaryString',
              body: images
            })
            // const response = await fetch("http://localhost:3080/uploadImages", {
            // // const response = await fetch("https://email-template-backend-9ia8.onrender.com/uploadImages", {
            //   method: "POST",
            //   body: images,
            // });

            // if (!response.ok) {
            //   throw new Error("Failed to upload files.");
            // }

            const result = await res.json();
            console.log(result);
          }catch(e){
            console.error(e)
          }

          // after upload is completed, the url should be changed to hosted url and not data url
          // upload tempplateConfiguratoin
        })}>Save</button>
      </div>
      <div className="flex-1" style={{ backgroundColor: color, display: 'flex', flexDirection: 'column', alignContent: 'flex-start', height: 'min-content' }} ref={tempRef}>
        {compList.map((comp, i) => {
          return (<>
            <div key={i} onClick={() => setCurrentSettings(comp)} style={{ padding: 0, margin: 0, width: '100%', display: "grid" }}>
              {comp?.compType === 'textBox' ? (
                <TextBoxUI settings={currentSettings.id === comp.id ? currentSettings : comp} setSettings={setCurrentSettings} />
              ) : comp?.compType === 'button' ? (
                <ButtonUI settings={currentSettings.id === comp.id ? currentSettings : comp} setSettings={setCurrentSettings} />
              ) : comp?.compType === 'image' ? (
                <ImageUI settings={currentSettings.id === i ? currentSettings : comp} setSettings={setCurrentSettings} />
              ) : null}
            </div>
          </>)
        })}
      </div>
    </div>
  </>)
}