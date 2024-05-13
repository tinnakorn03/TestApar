import React, { useEffect, useState, useCallback } from 'react';
import { View, Text, StyleSheet, ScrollView, RefreshControl, Alert, TouchableOpacity } from 'react-native';
import { shuffle } from '../utils/shuffle_questions.util';
import { Question } from '../models/Question';
import { fetchQuestions } from '../api/questions';

const HomeScreen = () => {
    const [questions, setQuestions] = useState<Question[]>([]);
    const [refreshing, setRefreshing] = useState<boolean>(false);
    const [userAnswers, setUserAnswers] = useState<{ [key: number]: string }>({});
    const [submitted, setSubmitted] = useState<boolean>(false);
    const [isAtBottom, setIsAtBottom] = useState<boolean>(false);


    useEffect(() => {
        loadQuestions();
    }, []);

    const loadQuestions = async () => {
        setSubmitted(false);  
        try {
            const fetchedQuestions = await fetchQuestions();
            const shuffledQuestions = shuffle(fetchedQuestions).slice(0, 20).map(q => ({
                ...q,
                answers: shuffle([...q.answers])
            }));
            setQuestions(shuffledQuestions);
            setUserAnswers({}); 
        } catch (error) {
            console.error('Error fetching questions:', error);
        }
    };

    const onRefresh = useCallback(() => {
        setRefreshing(true);
        loadQuestions().then(() => setRefreshing(false));
    }, []);

    const handleAnswer = useCallback((questionId: number, answer: string) => {
        setUserAnswers(prev => ({
            ...prev,
            [questionId]: answer
        }));
    }, []);

    const handleSubmit = useCallback(() => {
        // if (Object.keys(userAnswers).length === questions.length) {
            const correctCount = questions.reduce((acc, question) => {
                return acc + (userAnswers[question.id] === question.correctAnswer ? 1 : 0);
            }, 0);
            const incorrectCount = questions.length - correctCount;
            
            setSubmitted(true);
            Alert.alert("Submission Complete", `Correct answers: ${correctCount}\nIncorrect answers: ${incorrectCount}`);
        // } else {
        //     Alert.alert("Incomplete", "Please answer all questions before submitting.");
        // }
    }, [userAnswers, questions]);
    
    const handleScroll = (event:any) => { 
        const y = event.nativeEvent.contentOffset.y;
        const height = event.nativeEvent.layoutMeasurement.height;
        const contentHeight = event.nativeEvent.contentSize.height;
        setIsAtBottom(y >= contentHeight - height - 20); // Adjust threshold as needed
    };
     

    return (
        <>
            <ScrollView
                style={styles.container}
                refreshControl={
                    <RefreshControl refreshing={refreshing} onRefresh={onRefresh} />
                }
                onScroll={handleScroll}
                scrollEventThrottle={16}  
                // onMomentumScrollEnd={()=>Alert.alert('onMomentumScrollEnd')}
            >
                {questions.map((question, index) => (
                    <View key={index} style={styles.questionContainer}>
                        <Text style={styles.questionText}>{`${index+1}. ${question.questionText}`}</Text>
                        {question.answers.map((answer, idx) => (
                            <TouchableOpacity 
                                key={idx} 
                                style={[
                                    styles.answerButton, 
                                    userAnswers[question.id] === answer && styles.selectedAnswer
                                ]}
                                onPress={() => handleAnswer(question.id, answer)}
                            >
                                <Text style={styles.answerText}>{`${idx+1}. ${answer}`}</Text>
                            </TouchableOpacity>
                        ))}
                        {submitted && (
                            <Text style={styles.correctAnswer}>
                                Correct Answer: {question.correctAnswer}
                            </Text>
                        )}
                    </View>
                ))}
                
                <View style={{height:100}}/>        
            </ScrollView>
            <TouchableOpacity style={[styles.btn,{backgroundColor: isAtBottom ? 'lightgreen' : 'white'}]} onPress={handleSubmit}> 
                <Text style={{fontWeight:'bold', fontSize:18,}} children="Submit Answers" /> 
            </TouchableOpacity>
        </>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        padding: 20,
    },
    btn:{
        position:'absolute',
        bottom:0,
        paddingVertical:30,
        width:'100%',
        alignItems:'center',
        borderTopLeftRadius:15,
        borderTopRightRadius:15,
    },
    questionContainer: {
        marginBottom: 20,

        alignItems:'flex-start'
    },
    questionText: {
        marginBottom: 10,
        fontWeight:'bold',
        fontSize:18
    },
    answerButton: {
        width:'100%',
        backgroundColor: '#f0f0f0',
        padding: 10,
        marginTop: 4,
        borderRadius: 5,
        alignItems: 'flex-start',
        justifyContent: 'center'
    },
    selectedAnswer: {
        backgroundColor: '#c0e0ff',
    },
    correctAnswer: {
        marginTop: 10,
        fontWeight: 'bold',
        color: 'green',
    },
    answerText: {
        fontSize: 16,
    }
});


export default HomeScreen;
