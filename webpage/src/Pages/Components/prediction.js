import React, { useState, useEffect } from 'react';
import { Select, Space } from 'antd';



const Prediction = (props) => {
    const styles = {
        container: {
            margin: '10px',
            height: props.isMobile ? 'auto' : '100%',
        },
        lineUpSpace:{
            margin: '5px 0 10px 0',
            fontSize: 'calc(10px + 0.1vw)',
            fontWeight: '350',
            color: 'gray',
        },
        modelChoose: {
            width: '100%',
            height: props.isMobile ? '40px' : '40px',
            display: 'flex',
            flexDirection: 'row',
            alignItems: 'center',
            fontSize: 'calc(13px + 0.5vw)',
            fontWeight: '350',

            //border: '1px solid #e8e8e8',
        },
        predictionSpace: {
            width: '100%',
            minHeight: props.uploaded ? `${props.isMobile? '800px' : '500px'}` : '100%',
            //border: '1px solid #e8e8e8',
        },
    }

    const modelList = [
        {
          value: 'jack',
          label: 'Jack',
        },
        {
          value: 'lucy',
          label: 'Lucy',
        },
        {
          value: 'Yiminghe',
          label: 'yiminghe',
        },
        {
          value: 'disabled',
          label: 'Disabled',
          disabled: true,
        },
      ]

    return (
        <div style={styles.container}>
            <div style={styles.lineUpSpace}>当前有xx人正在预测，预计等待xx分钟</div>
            <div style={styles.modelChoose}>
                <div style={{lineHeight: '40px'}}>选择一个模型：</div>
                <Select
                    defaultValue="lucy"
                    style={{
                        flex: 1,
                        maxWidth: '200px',
                    }}
                    options={modelList}
                />
            </div>
            <div style={styles.predictionSpace}>
                
            </div>
        </div>
    )
}

export default Prediction