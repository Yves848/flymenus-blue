import * as React from 'react';
import { Component } from 'react';

export interface Props {
    images: Array<any>
    
}

export interface State {
    
    images: Array<any>
}



class ImageGrid extends Component<Props, State> {
    constructor(props: Props){
        super(props)
        this.state={
            images: []
        }
    }

    componentWillUpdate(nextProps: Props, nextState: State) {
        if (nextProps.images !== this.props.images) {
            
            this.setState({
                
                images: nextProps.images
            })
        
        }
    }

    render() {
        //const isVisible = this.state.isVisible ? 'block' : 'hidden';
        const {images} = this.state;
        console.log('ImageGrid',images)
        return(
        <div >
            <h3>Images</h3>
            {images.map(image=>{
                return (<p>{image.url}</p>)
            })}
        </div> 
        );
    }
}

export default ImageGrid;