import React, { useEffect, useState } from 'react';
import { getRoomById, updateRoom } from '../utils/ApiFunctions';
import { Link, useParams } from 'react-router-dom';

const EditRoom = () => {
    const [room, setRoom] = useState({
        photo: null,
        roomType: "",
        roomPrice: ""
    });

    const [imagePreview, setImagePreview] = useState("");
    const [successMessage, setSuccessMessage] = useState("");
    const [errorMessage, setErrorMessage] = useState("");
    
    const { roomId } = useParams();

    const handleImageChange = (e) => {
        const selectedImage = e.target.files[0];
        setRoom({ ...room, photo: selectedImage });
        setImagePreview(URL.createObjectURL(selectedImage));
    };

    const handleInputChange = (event) => {
        const { name, value } = event.target;
        setRoom({ ...room, [name]: value });
    };

    useEffect(() => {
        const fetchRoom = async () => {
            try {
                const roomData = await getRoomById(roomId);
                setRoom(roomData);
                setImagePreview(roomData.photo.startsWith('data:image') ? roomData.photo : `data:image/jpeg;base64,${roomData.photo}`);
            } catch (error) {
                console.error(error);
                setErrorMessage(`Error fetching room: ${error.message}`);
            }
        };
        if (roomId) {
            fetchRoom();
        }
    }, [roomId]);

    const handleSubmit = async (event) => {
        event.preventDefault();
        try {
            const response = await updateRoom(roomId, room);
            if (response.status === 200) {
                setSuccessMessage("Room updated successfully");
                const updatedRoomData = await getRoomById(roomId);
                setRoom(updatedRoomData);
                setImagePreview(updatedRoomData.photo.startsWith('data:image') ? updatedRoomData.photo : `data:image/jpeg;base64,${updatedRoomData.photo}`);
                setErrorMessage("");
            } else {
                setErrorMessage("Error updating room");
            }
        } catch (error) {
            console.error(error);
            setErrorMessage(`Error updating room: ${error.message}`);
        }
    };

    return (
        <div className='container mt-5 mb-5'>
            <h3 className='text-center mb-5 mt-5'>Edit Room</h3>
            <div className='row justify-content-center'>
                <div className='col-md-8 col-lg-6'>
                    {successMessage && (
                        <div className='alert alert-success' role='alert'>{successMessage}</div>
                    )}
                    {errorMessage && (
                        <div className='alert alert-danger' role='alert'>{errorMessage}</div>
                    )}
                    <form onSubmit={handleSubmit}>
                        <div className='mb-3'>
                            <label htmlFor='roomType' className='form-label hotel-color'>
                                Room Type
                            </label>
                            <input type='text' className='form-control' id='roomType' name='roomType' value={room.roomType} onChange={handleInputChange} />
                        </div>
                        <div className='mb-3'>
                            <label htmlFor='roomPrice' className='form-label hotel-color'>Room Price</label>
                            <input className='form-control' required id='roomPrice' name='roomPrice' onChange={handleInputChange} type='number' value={room.roomPrice} />
                        </div>
                        <div className='mb-3'>
                            <label htmlFor='photo' className='form-label hotel-color'>Room Photo</label>
                            <input id='photo' name='photo' type='file' className='form-control' onChange={handleImageChange} />
                            {imagePreview && (
                                <img src={imagePreview} alt='Room Preview' style={{ maxWidth: "400px", maxHeight: "400px" }} className='mt-3' />
                            )}
                        </div>
                        <div>
                            <Link to={"/existing-rooms"} className='btn btn-outline-info ml-5'>Back</Link>
                            <button type='submit' className='btn btn-outline-warning'>Edit Room</button>
                        </div>
                    </form>
                </div>
            </div>
        </div>
    );
};

export default EditRoom;