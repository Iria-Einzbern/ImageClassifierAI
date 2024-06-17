
const styles = {
    container: {
        margin: '10px',
    },
    modelChoose: {
        width: '100%',
        height: '100%',
        display: 'flex',
        flexDirection: 'row',
        fontSize: 'calc(13px + 0.5vw)',
        fontWeight: '350',
    },
}

const Prediction = (props) => {



    return (
        <div style={styles.container}>
            <div style={styles.modelChoose}>
                选择一个模型：
                
            </div>
        </div>
    )
}

export default Prediction