import React, {Component} from 'react';
import {CSVReader} from 'react-papaparse';
import classes from './CSVFile.module.css';



class CSVFile extends Component {
    constructor(props) {
        super(props);
        this.buttonRef=React.createRef();
        this.state={
            fName: ''
        }
    }

    handleOpenDialog = (e) => {
        // Note that the ref is set async, so it might be null at some point 
        if (this.buttonRef.current) {
            this.buttonRef.current.open(e)
        }
      }
      
    handleOnFileLoad = data => {
        // console.log("file selected");
        this.props.fileHandler(this.fileSelected, data)
    }

    handleOnError = (err, file, inputElem, reason) => {
        console.log(err)
    }
    
    handleOnRemoveFile = (data) => {
        // console.log('---------------------------')
        console.log(data)
        // console.log('---------------------------')
    }
    
    handleRemoveFile = (e) => {
        // Note that the ref is set async, so it might be null at some point
        if (this.buttonRef.current) {
            this.buttonRef.current.removeFile(e)
        }
    }

    // fileName=f=>{
    //     this.fileSelected=f;
    // }

    render () {
        return (
            <CSVReader
                ref={this.buttonRef}
                onFileLoad={this.handleOnFileLoad}
                onError={this.handleOnError}
                noClick
                noDrag
                onRemoveFile={this.handleOnRemoveFile}
            >
                {({ file }) => {
                    this.fileSelected=file;
                    return (
                        <div className={classes['aside']} >
                            <button className={classes['btn-browse']} type='button' onClick={this.handleOpenDialog} >
                                Browse file
                            </button>
                            <div className={classes['filename']} >
                                {/* {file && file.name ? this.fileName(file.name) : null } */}
                                {
                                file && file.name }
                            </div>
                            <button className={classes['btn-remove']} onClick={this.handleRemoveFile}>
                                Remove
                            </button>
                        </div>
                    )
                }}
            </CSVReader>
        )
    }
}

export default CSVFile;