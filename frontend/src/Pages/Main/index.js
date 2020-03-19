import React, { useEffect, useState } from 'react';
import QRCode from 'qrcode.react';

// Bootstrap
import { Button, Col, Modal, Row, Table } from 'react-bootstrap';

// Components
import AddRoom from '../../Components/AddRoom';
import EditRoom from '../../Components/EditRoom';
import ShowRoom from '../../Components/ShowRoom';

// Font Awesome
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

// Services
import api from '../../services/api';

import './styles.css';

const Main = () => {
    const [ rooms, setRooms ] = useState([]);
    const [ selectedRoom, setSelectedRoom ] = useState(undefined);
    const [ addRoom, setAddRoom ] = useState(false);
    const [ editRoom, setEditRoom ] = useState(false);
    const [ shareRoom, setShareRoom ] = useState(false);
    const [ showRoom, setShowRoom ] = useState(false);
    const [ confirmDeletion, setConfirmDeletion ] = useState(false);
    const [ showQrCode, setShowQrCode ] = useState(true);
    const standardLink = "exp://192.168.0.107:19000";

    useEffect(() => {
        const getRooms = async () => {
            const response = await api.get('/rooms');

            if(response.error){
                console.error(response.error);
                return;
            }

            setRooms(response.data)
        }
        getRooms();
    }, []);

    const showConfirmDeletion = (id) => {
        setSelectedRoom(id);
        setConfirmDeletion(true);
    }

    const showEditPanel = (id) => {
        setSelectedRoom(id);
        setEditRoom(true);
    }

    const showRoomDetails = (id) => {
        setSelectedRoom(id);
        setShowRoom(true);
    }

    const showShareRoom = (id) => {
        setSelectedRoom(id);
        setShowQrCode(true);
        setShareRoom(true);
    }

    const hideEditPanel = () => {
        setEditRoom(false);
        setSelectedRoom(undefined)
    }

    const hideRoomDetails = () => {
        setShowRoom(false);
        setSelectedRoom(undefined)
    }

    const hideShareRoom = () => {
        setShareRoom(false);
        setSelectedRoom(undefined);
        setShowQrCode(false);
    }

    const deleteRoom = async () => {
        await api.delete(`/room/${selectedRoom}`);

        setSelectedRoom(undefined);
        setRooms(rooms.filter(room => room._id !== selectedRoom));
        setConfirmDeletion(false);
    }

    const updateRooms = (newRoom) => {
        setRooms([ ...rooms, newRoom]);
    }

    return (
    <section className="main-section bg-dark text-light">
        <header>
            <div>
                <h1>EJEC Quiz</h1>
            </div>
            <Button variant="outline-primary" onClick={() => setAddRoom(true)}><FontAwesomeIcon icon="plus" /> Adicionar Sala</Button>
        </header>
        <Table size="sm" variant="dark" hover>
            <thead >
                <tr>
                    <Col as="th" md="8">Sala</Col>
                    <Col as="th" md="2">Respostas</Col>
                    <Col as="th" md="2">Opções</Col>
                </tr>
            </thead>
            <tbody>
                {rooms.map(room => (
                    <tr key={room._id}>
                        <Col as="td" md="8" onClick={() => showRoomDetails(room._id)}>{room.name}</Col>
                        <Col as="td" md="2">{room.answerList.length}</Col>
                        <Col as="td" md="2" className="option-icons">
                            <div>
                                <Button variant="outline-info" size="sm" onClick={() => showEditPanel(room._id)}><FontAwesomeIcon icon={[ "far", "edit" ]} /></Button>
                                <Button variant="outline-danger" size="sm" onClick={() => showConfirmDeletion(room._id)}><FontAwesomeIcon icon={[ "far", "trash-alt" ]} /></Button>
                                <Button variant="outline-success" size="sm" onClick={() => showShareRoom(room._id)}><FontAwesomeIcon icon="share-alt" /></Button>
                            </div>
                        </Col>
                    </tr>
                ))}
            </tbody>
        </Table>

        <Modal size="md" show={addRoom} onHide={() => setAddRoom(false)}>
            <AddRoom closeModal={() => setAddRoom(false)} updateRooms={updateRooms} />
        </Modal>

        <Modal size="md" show={editRoom} onHide={hideEditPanel}>
            <EditRoom closeModal={hideEditPanel} id={selectedRoom} />
        </Modal>

        <Modal size="md" show={showRoom} onHide={hideRoomDetails}>
            <ShowRoom closeModal={hideRoomDetails} id={selectedRoom} />
        </Modal>

        <Modal size="sm" centered show={confirmDeletion} onHide={() => setConfirmDeletion(false)}>
            <Modal.Header>Deseja mesmo excluir esta sala?</Modal.Header>
            <Modal.Footer>
                <Button onClick={deleteRoom}>Sim</Button>
                <Button variant="outline-dark" onClick={() => setConfirmDeletion(false)}>Cancelar</Button>
            </Modal.Footer>
        </Modal>

        <Modal size="sm" centered show={shareRoom} onHide={hideShareRoom}>
            <Modal.Header closeButton>Compartilhe a Sala</Modal.Header>
            <Modal.Body>
                <Row className="justify-content-center">
                    {showQrCode && <QRCode value={`${standardLink}/--/room/${selectedRoom}`} />}
                </Row>
            </Modal.Body>
        </Modal>
    </section>
    );
}

export default Main;