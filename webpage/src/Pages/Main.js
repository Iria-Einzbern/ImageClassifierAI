import React, { useState, useEffect } from 'react';
import { Card } from "antd";
import Upload from '../Pages/Components/upload';

const styles = {
    container: {
        display: 'flex',
        flexDirection: 'column',
        width: '70%',
        minWidth: '370px',
        margin: 'auto',
        height: '100%',
    },
    top: {
        display: 'flex',
        flexDirection: 'row',
        fontSize: 'calc(16px + 0.5vw)',
        fontWeight: 'bold',
        margin: 'calc(20px + 0.5vw) 0 calc(10px + 0.5vw) 0',
    },
    card: {
        width: '100%',
        height: '100%',
        marginBottom: '40px',
    },
    main: {
        width: '100%',
        height: '100%',
        display: 'flex',
        flexDirection: 'row', // 默认水平排布
    },
    mainVertical: {
        flexDirection: 'column', // 垂直排布
    },
    mainLeft: {
        flex: 1, // 默认左侧占据剩余空间
    },
    mainLeftMobile: {
        flex: 'none', // 移动设备上左侧不占据剩余空间，宽度自适应
        width: '100%',
        marginBottom: '20px', // 添加间距以适应垂直布局
    },
};

const Main = () => {
    const [isMobile, setIsMobile] = useState(false);

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
            <div style={styles.top}>图像预测平台</div>
            <Card style={styles.card}>
                <div style={isMobile ? {...styles.main, ...styles.mainVertical} : styles.main}>
                    <Upload isMobile={isMobile}/>
                    <div style={{...isMobile ? styles.mainLeftMobile : styles.mainLeft}}>
                        
                    </div>
                </div>
            </Card>
        </div>
    );
};

export default Main;
