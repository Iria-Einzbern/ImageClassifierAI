import React, { useState, useEffect } from 'react';
import { Card,Divider } from "antd";
import Upload from '../Pages/Components/upload';
import { DotChartOutlined,CaretUpFilled,CaretLeftFilled } from '@ant-design/icons';

const styles = {
    container: {
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        minWidth: '370px',
        margin: 'auto',
        height: '100%',
    },
    top: {
        display: 'flex',
        position: 'fixed',
        flexDirection: 'row',
        fontWeight: 'bold',
        backgroundColor: 'white',
        width: '100%',
        alignItems: 'center',
        boxShadow: '0 2px 5px rgba(0, 0, 0, 0.15)',
    },
    topMobile: {
        height: '60px',
        margin: '0 0 10px 0',
        fontSize: 'calc(16px + 0.5vw)',
        padding: '0 5%',
    },
    topDesktop: {
        height: '80px',
        margin: '0 0 calc(10px + 0.5vw) 0',
        fontSize: 'calc(20px + 0.6vw)',
        padding: '0 15%',
    },
    main: {
        height: '100%',
        display: 'flex',
        flexDirection: 'row', // 默认水平排布
        backgroundColor: 'white',
        padding: '15px',
        borderRadius: '10px',
        border: '1px solid #e8e8e8',
        boxShadow: '0 2px 8px rgba(0, 0, 0, 0.15)',
        width: '70%',
        marginBottom: '40px',
    },
    mainVertical: {
        flexDirection: 'column', // 垂直排布
        width: '90%',
    },
    mainLeft: {
        flex: 1, // 默认左侧占据剩余空间
    },
    mainLeftMobile: {
        flex: 'none', // 移动设备上左侧不占据剩余空间，宽度自适应
        width: '100%',
        margin: '20px 0', // 添加间距以适应垂直布局

    },
    upload: {
        borderRadius: '10px',
        boxShadow: '5px 5px 5px rgba(0, 0, 0, 0.05)',
        padding: '10px',
        backgroundColor: 'rgb(250, 250, 250)',
    },
    mainSpace: {
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        fontSize: 'calc(16px + 0.5vw)',
        fontWeight: 'bold',
        marginBottom: '10px',
        width: '100%',
        //border: '1px solid #e8e8e8',
        height: '100%',
    },
    mainWelcomeTitle: {
        fontSize: 'calc(20px + 1vw)',
        fontWeight: 'bold',
        color: 'var(--color_primary)',
    },
    mainWelcomeSubtitle: {
        fontSize: 'calc(16px + 0.5vw)',
        fontWeight: '350',
    },
};

const Main = () => {
    const [isMobile, setIsMobile] = useState(false);
    const [uploadList, setUploadList] = useState([]);

    useEffect(() => {
        console.log(uploadList)
    },[uploadList])
    
    useEffect(() => {
        const handleResize = () => {
            const mobile = window.innerWidth <= 768;
            setIsMobile(mobile);
        };
        // 初始加载和窗口大小变化时监听
        handleResize();
        window.addEventListener('resize', handleResize);
        // 组件卸载时清除监听
        return () => {
            window.removeEventListener('resize', handleResize);
        };
    }, []);

    return (
        <div style={styles.container}>
            <div style={isMobile ? {height:'60px',width:'100%',margin: '10px 0',} : {height:'80px',width:'100%',margin: 'calc(20px + 0.5vw) 0 calc(10px + 0.5vw) 0',}}></div>
            <div style={isMobile ? {...styles.top,...styles.topMobile} : {...styles.top,...styles.topDesktop}}>
                <DotChartOutlined style={{marginRight: '10px',fontSize: '120%',color: 'var(--color_primary)'}}/>
                AI图像预测平台
            </div>

            
            <div style={isMobile ? {...styles.main, ...styles.mainVertical} : styles.main}>
                <div className='ripple-effect' style={styles.upload}>
                    <Upload isMobile={isMobile} setUploadList={setUploadList}/>
                </div>

                <div style={{...isMobile ? styles.mainLeftMobile : styles.mainLeft}}>
                    <div style={{ ...styles.mainSpace, flexDirection: isMobile ? 'column' : 'row' }}>
                        <div className='breathing-text' style={{fontSize: 'calc(25px + 2vw)',fontWeight: 'bold',color: 'var(--color_primary)'}}>{isMobile ? <CaretUpFilled /> : <CaretLeftFilled />}</div>
                        <div className='breathing-text'>
                            <div style={styles.mainWelcomeTitle}>欢迎使用</div>
                            <div style={styles.mainWelcomeSubtitle}>请在{isMobile ? '上方' : '左侧'}上传一些图片以开始 =)</div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Main;
