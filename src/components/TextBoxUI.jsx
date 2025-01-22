const TextBoxUI = ({settings}) => {

    const {
        innerText,
        textColor,
        bgColor,
        textSize,
        font,
        fontStyle,
        marginY,
        marginX,
        textAlignment
    } = settings

    return (<>
        <div style={{
            fontWeight: fontStyle,
            color: textColor,
            fontSize: textSize,
            fontFamily: font,
            backgroundColor: bgColor,
            marginTop: marginY,
            marginBottom: marginY,
            marginLeft: marginX,
            marginRight: marginX,
            textAlign: textAlignment,
        }} className="p-0">
            {innerText.split('\n').map(para => {
                return <><span>{para}</span><br/></>
            })}
        </div>
    </>)
}

export default TextBoxUI