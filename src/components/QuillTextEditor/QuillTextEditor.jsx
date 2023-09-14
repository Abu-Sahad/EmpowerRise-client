import React,{useState} from 'react';
import ReactQuill from 'react-quill';
import 'react-quill/dist/quill.snow.css';
const QuillTextEditor = ({setDescription}) => {
    const [field,setField] = useState('');

    const addField = (value)=>{
        console.log(value)
        setDescription(value);
    }
    return (
        <div>
                <ReactQuill theme="snow" value={field} onBlur={addField} className='h-64 mb-12 w-full bg-white'/>
        </div>
    );
};

export default QuillTextEditor;