const TextBoxOptions = (props) => {
  const { settings, setSettings, uniqueFonts, weights } = props


  return (<div className="flex flex-col">
    <textarea
      className="border"
      placeholder="Text"
      value={settings.innerText}
      onChange={(e) => setSettings(settings => {
        return {
          ...settings,
          innerText: e.target.value
        }
      })}
    />
    <input type="number" placeholder="Text Size" value={settings.textSize} className="border" onChange={(e) => setSettings(settings => {
      if (parseInt(e.target.value) !== NaN) {
        return {
          ...settings,
          textSize: parseInt(e.target.value)
        }
      }
    })} />
    <div>
      <label htmlFor=""> Text Color </label>
      <input type="color" placeholder="Text Color" value={settings.textColor} className="border" onChange={(e) => setSettings(settings => {
        // console.log(e.target.value)
        // if(e.target.value !== NaN){
        return {
          ...settings,
          textColor: e.target.value
        }
        // }
      })} />
    </div>
    <div>
      <label htmlFor=""> Text Background Color </label>
      <input type="color" placeholder="Text Background Color" value={settings.bgColor} className="border" onChange={(e) => setSettings(settings => {
        // console.log(e.target.value)
        // if(e.target.value !== NaN){
        return {
          ...settings,
          bgColor: e.target.value
        }
        // }
      })} />
    </div>


    <select name="pets" id="pet-select" value={settings.font} className="border" onChange={(e) => setSettings(settings => {
      // console.log(e.target.value)
      return {
        ...settings,
        font: e.target.value
      }
    })}>
      <option value="">Choose a Font:</option>
      {uniqueFonts.map((font, i) => {
        // console.log(font)     
        return (
          <option value={font} key={i} >{font}</option>
        )
      })}
    </select>

    <select name="pets" id="pet-select" value={settings.fontStyle} className="border" onChange={(e) => setSettings(settings => {
      // console.log(e.target.value)
      return {
        ...settings,
        fontStyle: e.target.value
      }
    })}>
      <option value="">Choose Font Thinkness:</option>
      {weights.map((font, i) => {
        // console.log(font)     
        return (
          <option value={font} key={i}>{font}</option>
        )
      })}
    </select>

    <input type="number" placeholder="Margin Y Size" value={settings.marginY} className="border" onChange={(e) => setSettings(settings => {
      if (parseInt(e.target.value) !== NaN) {
        return {
          ...settings,
          marginY: parseInt(e.target.value)
        }
      }
    })} />
    <input type="number" placeholder="Margin X Size" value={settings.marginX} className="border" onChange={(e) => setSettings(settings => {
      if (parseInt(e.target.value) !== NaN) {
        return {
          ...settings,
          marginX: parseInt(e.target.value)
        }
      }
    })} />

    <select placeholder="" value={settings.textAlignment} className="border" onChange={(e) => setSettings(settings => {
      // if (parseInt(e.target.value) !== NaN) {
        return {
          ...settings,
          textAlignment: e.target.value
        }
      // }
    })} >

      <option value="">Choose Text Alignment</option>
      <option value="center">center</option>
      <option value="right">right</option>
      <option value="left">left</option>
    </select>


  </div>)
}

export default TextBoxOptions