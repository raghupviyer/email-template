const ImageOptions = (props) => {
    const { settings, setSettings } = props


    return (<div className="flex flex-col">
        <input type="file" placeholder="url" className="border" defaultValue={''} onChange={(e) => {
            const file = e.target.files[0];
            const reader = new FileReader();
            if (file !== undefined) {
                const allowedFileTypes = new Set(['image/jpg', 'image/jpeg', 'image/bmp', 'image/png', 'image/tif', 'image/webp', 'image/apng', 'image/avif'])
                if (allowedFileTypes.has(file.type)) {
                    reader.readAsDataURL(file)
                } else {
                    alert('This file is not allowed. The file must be of type .jpg, .jpeg, .png, .webp, .apng, .bmp, .tif, .avif')
                }
            } else {
                alert(`No Choosen Picture. Please Choose File. `)
            }
            reader.addEventListener('load', () => {

                setSettings(settings => {
                    return {
                        ...settings,
                        url: reader.result,
                        file
                    }
                })
            })

        }} />
        <div className="flex">
            <input type="number" min={0} placeholder="Width" value={settings.width} className="border" onChange={(e) => setSettings(settings => {
                if (parseInt(e.target.value) !== NaN) {
                    return {
                        ...settings,
                        width: parseInt(e.target.value)
                    }
                }
            })} />
            <select value={settings.wUnit} className="width unit" onChange={(e) => setSettings(settings => {
                // console.log(e.target.value)
                return {
                    ...settings,
                    wUnit: e.target.value
                }
            })}>
                <option value="">Choose unit:</option>
                <option value="%">%</option>
                <option value="px">px</option>
            </select>
        </div>
        <div className="flex">
            <input type="number" min={0} placeholder="Height" value={settings.height} className="border" onChange={(e) => setSettings(settings => {
                if (parseInt(e.target.value) !== NaN) {
                    return {
                        ...settings,
                        height: parseInt(e.target.value)
                    }
                }
            })} />

            <select value={settings.hUnit} className="height unit" onChange={(e) => setSettings(settings => {
                // console.log(e.target.value)
                return {
                    ...settings,
                    hUnit: e.target.value
                }
            })}>
                <option value="">Choose unit:</option>
                <option value="%">%</option>
                <option value="px">px</option>
            </select>
        </div>

        <input type="number" placeholder="Margin Y Size" value={settings.marginY} className="border" onChange={(e) => setSettings(settings => {
            if (parseInt(e.target.value) !== NaN) {
                return {
                    ...settings,
                    marginY: parseInt(e.target.value)
                }
            }
        })} />


        <select name="pets" id="pet-select" value={settings.objectFit} className="border" onChange={(e) => setSettings(settings => {
            // console.log(e.target.value)
            return {
                ...settings,
                objectFit: e.target.value
            }
        })}>
            <option value="">Choose Object Fit:</option>
            <option value="contain">Contain</option>
            <option value="cover">Cover</option>
            <option value="fill">Fill</option>
            <option value="none">None</option>
            <option value="scale-down">Scale Down</option>

        </select>



    </div>)
}

export default ImageOptions