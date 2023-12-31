import { useDropzone } from 'react-dropzone';
import '../styles/dropzone.css'
import { useEffect } from 'react';
import { Button, Typography } from '@mui/material';

const Dropzone = (props: IDropzoneProps) => {
    const { file, setFile, children } = props;
    const { getRootProps, getInputProps, open } = useDropzone({
        multiple: false,
        accept: {
            'image/jpeg': ['.jpeg'],
            'image/png': ['.png'],
            'image/jpg': ['.jpg']
        },
        onDrop: (acceptedFiles) => {
            setFile(
                Object.assign(acceptedFiles[0], {
                    preview: URL.createObjectURL(acceptedFiles[0])
                })
            );
        }
    });

    const removeFile = () => {
        setFile(null);
    };

    const thumbs = (file: any) => (
        <div className='thumb-container'>
            <button onClick={removeFile}>Remove File</button>
            <div className='thumb-outer'>
                <div className='thumb' key={file.name}>
                    <div className='thumb-inner'>
                        <img src={file.preview} className="thumb-img" alt={file.name} />
                    </div>
                </div>
            </div>
        </div>
    );

    useEffect(() =>
        () => {
            if (file) {
                URL.revokeObjectURL(file.preview);
            }
        },
        [file]
    );


    return (
        <section className="dropzone-container">
            <div
                {...getRootProps({ className: "dropzone" })}
                onClick={(e) => e.stopPropagation}
                style={{
                    display: 'flex',
                    justifyContent: 'center',
                }}
            >
                <Button
                    sx={{
                        width: '100%',
                        height: '100%',
                    }}
                    type="button" onClick={open}>
                    <input {...getInputProps()} />
                    {
                        children ? children :
                            (<Typography
                                variant='body1'
                                sx={{
                                    color: 'text.secondary',
                                    fontWeight: 'bold'
                                }}
                            >Drag 'n' drop some files here, or click to select files (only jpg, jpeg and png allowed)</Typography>)
                    }

                </Button>
            </div>
            <div className='dropzone-button-wrapper'>
                {
                    file && thumbs(file)
                }

            </div>
        </section>
    )
}

export default Dropzone