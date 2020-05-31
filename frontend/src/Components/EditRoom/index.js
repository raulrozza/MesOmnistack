import React, { useState, useEffect } from 'react';

// Bootstrap
import { Button, Form, Modal } from 'react-bootstrap';

// Font Awesome
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

// Services
import api from '../../services/api';

// Utils
import { addItemToArray, removeItemFromArray, updateItemInArray } from '../../utils/array';

import './styles.css';

const EditRoom = ({ closeModal, id }) => {
    const [ name, setName ] = useState("");
    const [ questionList, setQuestionList ] = useState([]);

    useEffect(() => {
        const loadRoom = async () => {
            const response = await api.get(`/room/${id}`);

            console.log(response.data)

            setName(response.data.name);
            setQuestionList(response.data.questionList);
        }
        if(id)
            loadRoom();
        else{
            setName("");
            setQuestionList([]);
        }
    }, [id])

    const addQuestion = () => {
        const question = {
            question: "",
            type: "text"
        }

        setQuestionList(addItemToArray(questionList, question))
    }

    const addOption = (index) => {
        let changedQuestion = {
            ...questionList[index],
            options: addItemToArray(questionList[index].options, ""),
        };

        setQuestionList(updateItemInArray(questionList, changedQuestion, index));
    }

    const changeText = (value, index) => {
        let changedQuestion = {
            ...questionList[index],
            question: value
        };

        setQuestionList(updateItemInArray(questionList, changedQuestion, index));
    }

    const changeOptionText = (value, index, optionIndex) => {
        const question = questionList[index];
        let changedQuestion = {
            ...question,
            options: updateItemInArray(question.options, value, optionIndex)
        };

        setQuestionList(updateItemInArray(questionList, changedQuestion, index));
    }

    const changeType = (value, index) => {
        let changedQuestion = {
            ...questionList[index],
            type: value,
            options: (value !== "text") ? [] : undefined,
        };

        setQuestionList(updateItemInArray(questionList, changedQuestion, index));
    }

    const removeQuestion = (index) => {
        setQuestionList(removeItemFromArray(questionList, index));
    }

    const handleSubmit = async () => {
        await api.put(`/room/${id}`, {
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
                                    <Form.Control as="select" value={question.type} onChange={(event) => changeType(event.target.value, questionIndex)}>
                                        <option value="text">Texto</option>
                                        <option value="selection">Seleção</option>
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