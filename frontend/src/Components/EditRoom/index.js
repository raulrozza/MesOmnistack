import React, { useState, useEffect } from 'react';

// Bootstrap
import { Button, Form, Modal } from 'react-bootstrap'

// Font Awesome
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

// Services
import api from '../../services/api';

import './styles.css';

const EditRoom = ({ closeModal, room }) => {
    const [ name, setName ] = useState("");
    const [ questionList, setQuestionList ] = useState([]);

    useEffect(() => {
        const loadRoom = async () => {
            const response = await api.get(`/room/${room}`);

            setName(response.data.name);
            setQuestionList(response.data.questionList);
        }
        if(room)
            loadRoom();
        else{
            setName("");
            setQuestionList([]);
        }
    }, [room])

    const addQuestion = () => {
        const question = {
            question: "",
            type: "text"
        }

        setQuestionList([ ...questionList, question ])
    }

    const addOption = (questionIndex) => {
        let changedQuestion = {
            ...questionList[questionIndex],
            options: [ ...questionList[questionIndex].options, "" ],
        };

        setQuestionList([ ...questionList.slice(0, questionIndex), changedQuestion, ...questionList.slice(questionIndex+1, questionList.length) ]);
    }

    const changeText = (value, index) => {
        let changedQuestion = {
            ...questionList[index],
            question: value
        };

        setQuestionList([ ...questionList.slice(0, index), changedQuestion, ...questionList.slice(index+1, questionList.length) ]);
    }

    const changeOptionText = (value, questionIndex, optionIndex) => {
        const question = questionList[questionIndex];
        let changedQuestion = {
            ...question,
            options: [
                ...question.options.slice(0, optionIndex),
                value,
                ...question.options.slice(optionIndex+1, question.options.length)
            ]
        };

        setQuestionList([ ...questionList.slice(0, questionIndex), changedQuestion, ...questionList.slice(questionIndex+1, questionList.length) ]);
    }

    const changeType = (value, index) => {
        let changedQuestion = {
            ...questionList[index],
            type: value,
            options: (value !== "text") ? [] : undefined,
        };

        setQuestionList([ ...questionList.slice(0, index), changedQuestion, ...questionList.slice(index+1, questionList.length) ]);
    }

    const removeQuestion = (index) => {
        setQuestionList([ ...questionList.slice(0, index), ...questionList.slice(index+1, questionList.length) ]);
    }

    const handleSubmit = async () => {

        await api.put(`/room/${room}`, {
            name,
            questionList,
        });

        closeModal();
    }

    return (
        <>
            <Modal.Header>
                <Modal.Title>Editar Sala</Modal.Title>
            </Modal.Header>
            <Modal.Body>
                <Form>
                    <Form.Group>
                        <Form.Control placeholder="Nome da sala" value={name} onChange={(event) => setName(event.target.value)} />
                    </Form.Group>
                    <div className="question-list">
                        <Form.Label>Perguntas</Form.Label>
                        {questionList.map((question, questionIndex) => (
                            <div key={`question-${questionIndex}`} className="question-prompt">
                                <div>
                                    <Form.Control as="select" onChange={(event) => changeType(event.target.value, questionIndex)}>
                                        <option value="text">Texto</option>
                                        <option value="selection">Seleção</option>
                                        <option value="options">Múltipla Escolha</option>
                                    </Form.Control>
                                    <Button size="sm" variant="danger" onClick={() => removeQuestion(questionIndex)}><FontAwesomeIcon icon="times" /></Button>
                                </div>
                                <textarea placeholder="Texto da Pergunta" value={question.question} onChange={event => changeText(event.target.value, questionIndex)} />
                                
                                {question.options && (
                                    <div className="question-options">
                                        <div>
                                            <div>Opções:</div>
                                            <Button size="sm" onClick={() => addOption(questionIndex)}><FontAwesomeIcon icon="plus" /></Button>
                                        </div>
                                        {question.options.map((option, optionIndex) => (
                                            <input type="text" key={`question-${questionIndex}-option-${optionIndex}`} value={option} onChange={event => changeOptionText(event.target.value, questionIndex, optionIndex)} />
                                        ))}
                                    </div>
                                )}
                            </div>
                        ))}
                        <Button onClick={addQuestion}><FontAwesomeIcon icon="plus" /> Adicionar Pergunta</Button>
                    </div>
                </Form>
            </Modal.Body>
            <Modal.Footer>
                <Button variant="dark" onClick={handleSubmit}>Salvar</Button>
                <Button variant="outline-dark" onClick={closeModal}>Cancelar</Button>
            </Modal.Footer>
        </>
    )
};

export default EditRoom;