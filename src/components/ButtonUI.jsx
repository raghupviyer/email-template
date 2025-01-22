const ButtonUI = ({ settings }) => {

    const {
        innerText,
        textColor,
        bgColor,
        textSize,
        font,
        fontStyle,
        borderWidth,
        borderColor,
        paddingY,
        marginY,
        width,
        borderRadius,
        redirectUrl
    } = settings

    return (<>
        <button style={{
            fontWeight: fontStyle,
            color: textColor,
            fontSize: textSize,
            fontFamily: font,
            backgroundColor: bgColor,
            borderWidth: borderWidth + 'px',
            borderColor,
            paddingTop: paddingY + 'px',
            paddingBottom: paddingY + 'px',
            marginTop: marginY + 'px',
            marginBottom: marginY + 'px',
            width: width + '%',
            borderRadius: borderRadius + 'px',
            justifySelf: 'center'
        }}  onClick={() => window.open(redirectUrl, '_blank').focus()}>
            {innerText}
        </button>
    </>)
}

export default ButtonUI