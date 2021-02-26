import * as React from 'react';
import { Renderer, Tester } from '../interfaces';
import WithHeader from './wrappers/withHeader';
const input = require('antd');
const { TextArea } = input.Input;
import WithSeeMore from './wrappers/withSeeMore';
// CSivYv4k8WV33E290IZG WMudfZUR5G - test story to be used for making some great optimizations

export const renderer: Renderer = ({ story, action, config }) => {
    const { width, height, storyStyles } = config;
    let computedStyles = {
        ...styles.storyContent,
        ...(storyStyles || {})
    }

    // const imageLoaded = () => {
    //     setLoaded(true);
        // action('play');
    // }

    React.useEffect( () => action('play'),[story])
    return <WithHeader story={story} globalHeader={config.header}>
        <WithSeeMore story={story} action={action}>
            <div style={{...computedStyles,width:'100%', height:'100%', backgroundColor: story.backgroundColor}}>
                <div
                style={{
                     width:'100%',
                     height:'100%',
                    backgroundColor: story.backgroundColor || 'black'
                }}
                ></div>
                <div style={{position:'relative'}}>
                    <TextArea
                    style={{
                        position:'absolute',
                        top:'-70vh',
                        left:'0px',
                        fontSize:'30px',
                        bordered: false,
                        fontColor:'white',
                        border:'0px',
                       backgroundColor:'transparent',
                       textAlign:'center',
                       width:'100%',
                       height:'100%',
                       color:'white',
                       }}
                       autoSize="true" 
                       value={story.status}
                       />
                </div>
             </div>
            {
                <div
                    style={{
                        width: width,
                        height: height,
                        position: "absolute",
                        left: 0,
                        top: 0,
                        background: "rgba(0, 0, 0, 0.9)",
                        zIndex: 9,
                        display: "flex",
                        justifyContent: "center",
                        alignItems: "center",
                        color: "#ccc"
                    }}
                >
                  {/* /  {loader || <div className={globalStyle.spinner} />} */}
                </div>
            }
        </WithSeeMore>
    </WithHeader>
}

const styles = {
    story: {
        display: "flex",
        position: "relative",
        overflow: "hidden"
    },
    storyContent: {
        width: "auto",
        maxWidth: "100%",
        maxHeight: "100%",
        margin: "auto"
    }
};

export const tester: Tester = (story) => {
    return {
        condition: story.type === 'text',
        priority: 2
    }
}

export default {
    renderer,
    tester
}