import React from 'react';
import { FilePond, registerPlugin } from 'react-filepond';
import 'filepond/dist/filepond.min.css';
import FilePondPluginImagePreview from 'filepond-plugin-image-preview';
import 'filepond-plugin-image-preview/dist/filepond-plugin-image-preview.min.css';

registerPlugin(FilePondPluginImagePreview);
const styles = {
    filePondWrapper: {
        width: '100%',
        border: '1px solid #ccc',
        borderRadius: '4px',
        padding: '20px',
        boxSizing: 'border-box',
        textAlign: 'center',
    },
    filePond: {
        display: 'block',
        margin: '0 auto',
    },
};

const Main = () => {
    const handleInit = (filePond) => {
        // 可以在这里初始化一些状态或监听器
    };

    return (
        <div style={styles.filePondWrapper}>
            <FilePond
                name="image"
                allowMultiple={true}
                maxFiles={10}
                acceptedFileTypes={['image/*']}
                oninit={handleInit}
                labelIdle='<span class="filepond--label-action">Browse</span>'
                stylePanelLayout={{ padding: '1em' }}
                styleButtonRemoveItemPosition={'relative'}
                styleButtonProcessPosition={'relative'}
                styleLoadIndicatorPosition={'relative'}
                styleProgressIndicatorPosition={'absolute'}
                stylePanelAspectRatio={'1'}
                styleRootMargin={'0 auto'}
                styleDropZoneBackgroundColor={'#f8f8f8'}
                styleDropZoneColor={'#666'}
                styleDropZoneFontFamily={'Arial, sans-serif'}
                styleDropZoneFontSize={'14px'}
                styleDropZonePadding={'1em'}
                styleDropZoneBorderWidth={'2px'}
                styleDropZoneBorderColor={'#ddd'}
                styleDropZoneBorderRadius={'4px'}
                styleDropZoneBorderStyle={'dashed'}
            />
        </div>
    );
};

export default Main;