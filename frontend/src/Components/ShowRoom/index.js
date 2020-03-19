import React, { useEffect, useState } from 'react';

// Bootstrap
import { Button, Modal } from 'react-bootstrap';

// Services
import api from '../../services/api';

import './styles.css';

const ShowRoom = ({ closeModal, id }) => {
    const [ room, setRoom ] = useState(undefined);

    useEffect(() => {
        if(id){
            (async () => {
                const response = await api.get(`/room/${id}`);

                setRoom(response.data)
            })();
        }
        else
            setRoom(undefined);
    }, [id]);

    if(!room)
        return(
            <Modal.Body>
                <h2>Carregando...</h2>
            </Modal.Body>
        )
    return (
        <>
            <Modal.Header>
                <Modal.Title>{room.name}</Modal.Title>
            </Modal.Header>
            <Modal.Body>
                {room.questionList.map((question, questionIndex) => (
                    <div className="question-container" key={`question-${questionIndex}`}>
                        <p className="question-title">{question.question}</p>
                        <div className="question-answers">
                            {room.answerList.map((answers, answerIndex) => (
                                <p key={`question-${questionIndex}-answer-${answerIndex}`}>{
                                    question.type === "selection" ?
                                        question.options[answers[questionIndex]]
                                    :
                                        answers[questionIndex]
                                }</p>
                            ))}
                        </div>
                    </div>
                ))}
            </Modal.Body>
            <Modal.Footer>
                <Button variant="outline-dark" onClick={closeModal}>Fechar</Button>
            </Modal.Footer>
        </>
    )
};

export default ShowRoom;