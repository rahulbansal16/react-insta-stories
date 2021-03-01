import * as React from 'react';
import { Renderer, Tester } from './../interfaces';
import globalStyle from './../styles.css'
import WithHeader from './wrappers/withHeader';
import WithSeeMore from './wrappers/withSeeMore';
const input = require('antd');
const { TextArea } = input.Input;

export const renderer: Renderer = ({ story, action, isPaused, config }) => {
    const [loaded, setLoaded] = React.useState(false);
    const { width, height, loader, storyStyles } = config;
    let computedStyles = {
        ...styles.storyContent,
        ...(storyStyles || {})
    }

    const imageLoaded = () => {
        setLoaded(true);
        action('play');
    }
 
    return <WithHeader story={story} globalHeader={config.header}>
        <WithSeeMore story={story} action={action}>
            <img style={computedStyles} src={story.url} onLoad={imageLoaded} />
            { story.status && (<div style={{position:'relative', width:'100%'}}>
                    <TextArea
                    style={{
                        position:'absolute',
                        top:'-70vh',
                        left:'0px',
                        fontSize:'30px',
                        bordered: false,
                        border:'0px',
                        backgroundColor:'hsla(0, 0%, 0%, 0.5)',
                        textAlign:'center',
                       width:'100%',
                       height:'100%',
                       color: story.fontColor || 'white'
                    }}  
                       autoSize="true" 
                       value={story.status}
                       />
                </div>)}
            {!loaded && (
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
                    {loader || <div className={globalStyle.spinner} />}
                </div>
            )}
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
        condition: !story.content && (story.type === 'image'),
        priority: 2
    }
}

export default {
    renderer,
    tester
}