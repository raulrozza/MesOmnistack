import React, { useEffect, useState } from 'react';
import { AsyncStorage, Picker, StyleSheet, Text, TextInput, TouchableOpacity, View } from 'react-native';

// Services
import api from '../services/api';

const Questions = ({ route, navigation }) => {
    const { id } = route.params;
    const [room, setRoom] = useState(undefined);
    const [answers, setAnswers] = useState(undefined);
    const [alreadyAnswered, setAlreadyAnswered] = useState(false);

    useEffect(() => {
        if(!id)
            return;

        (async () => {
            const answeredArray = JSON.parse(await AsyncStorage.getItem("answeredRooms"));
            if(answeredArray){
                if(answeredArray.find(element => element === id)){
                    setAlreadyAnswered(true);
                    return;
                }
            }

            const response = await api.get(`/room/${id}`);

            setRoom(response.data);
            setAnswers(response.data.questionList.map(question => {
                if(question.type === "text")
                    return "";
                if(question.type === "selection")
                    return 0;
                return null;
            }));
            navigation.setOptions({ title: response.data.name });
        })();
    }, [id])

    const changeValue = (index, value) => {
        setAnswers([ ...answers.slice(0, index), value, ...answers.slice(index+1, answers.length) ]);
    }

    const submitAnswer = async () => {
        await api.post('/answer', {
            id,
            answers
        });

        let answeredArray = JSON.parse(await AsyncStorage.getItem('answeredRooms'));
        if(answeredArray)
            answeredArray.push(id);
        else
            answeredArray = [ id ];

        await AsyncStorage.setItem('answeredRooms', JSON.stringify(answeredArray));

        setAlreadyAnswered(true);
    }

    if(alreadyAnswered) return (
        <View style={styles.container}>
            <Text style={styles.answeredText}>Você respondeu as perguntas desta sala! Obrigado.</Text>
        </View>
    )

    return(
        <View style={styles.container}>
            {room && answers && room.questionList.map((question, idx) => {
                return (
                    <View key={`question-${idx}`} style={styles.questionContainer}>
                        <Text style={[ styles.questionText, question.type === "selection" ? styles.textPurple : styles.textGreen ]}>{question.question}</Text>
                        {
                            question.type === "selection" ? (
                                <Picker
                                    selectedValue={question.options[answers[idx]]}
                                    onValueChange={(value, optionIndex) => changeValue(idx, optionIndex)}
                                    style={[ styles.textPurple, styles.answerSelect ]}
                                >
                                    {question.options.map(option => (
                                        <Picker.Item
                                            key={`question-${idx}-${option}`}
                                            label={option}
                                            value={option}
                                        />
                                    ))}
                                </Picker>
                            ) : (
                                <TextInput
                                    multiline={true}
                                    value={answers[idx]}
                                    style={[ styles.textGreen, styles.answerText ]}
                                    onChangeText={(text) => changeValue(idx, text)}
                                />
                            )
                        }
                    </View>
                )
            })}
            <TouchableOpacity style={styles.button} activeOpacity={0.6} onPress={submitAnswer}>
                <Text style={styles.buttonText}>Enviar</Text>
            </TouchableOpacity>
        </View>
    )
};

export default Questions;

const styles = StyleSheet.create({
    container: {
        backgroundColor: '#343a40',
        height: "100%",
    },
    questionContainer: {
        width: "100%",
        paddingHorizontal: 10,
        paddingVertical: 10,
    },
    questionText: {
        fontSize: 24,
        borderBottomWidth: 1,
        borderBottomColor: "#0064cf",
    },
    answerText: {
        backgroundColor: "#EEEEEE",
        padding: 10,
        minHeight: 36,
        borderRadius: 5,
    },
    answerSelect: {
        backgroundColor: "#EEEEEE",
    },
    textGreen: {
        color: "#17993e",
    },
    textPurple: {
        color: "#b50edf",
    },
    button: {
        backgroundColor: "transparent",
        width: "80%",
        alignSelf: "center",
        borderWidth: 1,
        borderColor: "#007bff",
        borderRadius: 4,
        paddingHorizontal: 6,
        paddingVertical: 12,
        marginVertical: 10,
    },
    buttonText: {
        color: "#007bff",
        textAlign: "center",
        fontSize: 16,
        lineHeight: 24,
    },
    answeredText: {
        color: "#70acec",
        height: "100%",
        width: "100%",
        textAlign: "center",
        textAlignVertical: "center",
        fontSize: 24,
    }
})