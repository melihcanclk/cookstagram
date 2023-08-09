import { useEffect, useState } from 'react'
import { useDropzone, DropzoneProps, Accept } from 'react-dropzone';
import '../styles/dropzone.css'
const Dropzone = () => {

    const [file, setFile] = useState<any>(null);

    const { getRootProps, getInputProps, open } = useDropzone({
        multiple: false,
        accept: {
            'image/png': ['.png'],
            'image/jpeg': ['.jpeg'],
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

    useEffect(
        () => () => {
            // Make sure to revoke the data uris to avoid memory leaks
            URL.revokeObjectURL(
                file?.preview
            );
        },
        [file]
    );


    return (
        <section className="dropzone-container">
            <div
                {...getRootProps({ className: "dropzone" })}
                onClick={(e) => e.stopPropagation}
            >
                <input {...getInputProps()} />
                <p>Drag 'n' drop some files here, or click to select files (only jpg, jpeg and png allowed)</p>
                <div className='dropzone-button-wrapper'>
                    {
                        file ? thumbs(file) : (
                            <button type="button" className={'js-form-btn'} onClick={open}>
                                Choose File
                            </button>
                        )
                    }

                </div>
            </div>

        </section>
    )
}

export default Dropzone