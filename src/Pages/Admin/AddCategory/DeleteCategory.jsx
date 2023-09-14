import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faDeleteLeft } from '@fortawesome/free-solid-svg-icons';
import axios from 'axios';
import  { useEffect, useState } from 'react';
import Swal from 'sweetalert2';

const DeleteCategory = () => {

    const [allCategory, setAllCategory] = useState([]);

    useEffect(() => {
        axios.get("http://localhost:5000/getAllCategory")
            .then((res) => {
                setAllCategory(res.data);
            })
            .then((err) => {
                console.log(err);
            })
    }, [])

    const deleteCategory = async (id, category) => {
        const { value } = await Swal.fire({
            title: 'Enter Category Name',
            input: 'text',
            inputLabel: 'Enter value must be same as category name !!',
            inputPlaceholder: ''
        })

        if (value === category) {

            const afterDelete = allCategory.filter(cat => cat._id !== id);
            setAllCategory(afterDelete);
            axios.post("https://localhost:5000/deleteCategory", { id })
                .then(res => {
                    console.log(res.data);
                })
                .then(err => {
                    console.log(err);
                })
            Swal.fire(`"${value}" category is Deleted`);
        } else {
            Swal.fire(` "${value}" is not same as "${category}"`)
        }
    }

    return (
        <div className="flex flex-col">
            <h2 className="text-xl text-center font-poppins">Category List</h2>
            <ul className='text-center font-poppins mt-3'>
                {
                    allCategory.map((cat, index) =>
                        <li key={index} className='p-2 border-2 flex flex-row justify-between px-10 border-x-cDarkBlue w-[400px]'><p>{cat.category}  </p><button type="button" onClick={() => { deleteCategory(cat._id, cat.category) }}>
                            <FontAwesomeIcon icon={faDeleteLeft} /> </button></li>
                    )
                }
            </ul>
        </div>
    );
};

export default DeleteCategory;
