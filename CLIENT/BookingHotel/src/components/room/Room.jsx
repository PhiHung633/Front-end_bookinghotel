import React, { useEffect, useState } from 'react';
import { getAllRooms } from '../utils/ApiFunctions';
import RoomCard from './RoomCard';
import { Col, Container, Row } from 'react-bootstrap';
import RoomFilter from '../common/RoomFilter';
import RoomPaginator from '../common/RoomPaginator';

const Room = () => {
  const [data, setData] = useState([]);
  const [error, setError] = useState(null);
  const [isLoading, setIsLoading] = useState(false);
  const [currentPage, setCurrentPage] = useState(1);
  const [roomPerPage] = useState(6);
  const [filteredData, setFilteredData] = useState([]);

  useEffect(() => {
    setIsLoading(true);
    getAllRooms().then((data) => {
      setData(data);
      setFilteredData(data);
      setIsLoading(false);
    }).catch((error) => {
      setError(error.message);
      setIsLoading(false);
    });
  }, []);

  if (isLoading) {
    return <div>Loading room......</div>;
  }

  if (error) {
    return <div className='text-danger'>Error: {error}</div>;
  }

  const handlePageChange = (pageNumber) => {
    setCurrentPage(pageNumber);
  }

  const totalPage = Math.ceil(filteredData.length / roomPerPage);
  
  const renderRoom = () => {
    const startIndex = (currentPage - 1) * roomPerPage;
    const endIndex = startIndex + roomPerPage;
    return filteredData.slice(startIndex, endIndex).map((room) => <RoomCard key={room.id} room={room} />);
  }

  return (
    <Container>
      <Row>
        <Col md={6} className='mb-3 mb-md-0'>
          <RoomFilter data={data} setFilteredData={setFilteredData} />
        </Col>
        <Col md={6} className='d-flex align-items-center justify-content-end'>
          <RoomPaginator currentPage={currentPage} totalPages={totalPage} onPageChange={handlePageChange} />
        </Col>
      </Row>
      <Row>
        {renderRoom()}
      </Row>
      <Row>
        <Col md={6} className='d-flex align-items-center justify-content-end'>
          <RoomPaginator currentPage={currentPage} totalPages={totalPage} onPageChange={handlePageChange} />
        </Col>
      </Row>
    </Container>
  )
}

export default Room;
