const ImageUI = ({ settings }) => {

    const {
        url,
        objectFit,
        width,
        height,
        hUnit,
        wUnit,
        marginY,
    } = settings

    return (<>
        <img style={{
            objectFit,
            width: width + wUnit,
            height: height + hUnit,
            marginTop: marginY + 'px',
            marginBottom: marginY + 'px',
            marginRight: 'auto',
            marginLeft: 'auto'
        }} src={url} />
    </>)
}

export default ImageUI