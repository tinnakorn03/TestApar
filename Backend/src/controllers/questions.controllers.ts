import {Question} from '../models/Question'

export const getQuestions = async (ctx:any) => {
    const questions: Question[] = [ 
        {
            id: 1,
            questionText: "What is the capital of France?",
            answers: ["New York", "London", "Paris", "Berlin"],
            correctAnswer: "Paris"
        },
        {
            id: 2,
            questionText: "What is 2 + 2?",
            answers: ["3", "4", "5", "6"],
            correctAnswer: "4"
        },
        {
            id: 3,
            questionText: "Who wrote 'Hamlet'?",
            answers: ["Charles Dickens", "William Shakespeare", "Jane Austen", "Leo Tolstoy"],
            correctAnswer: "William Shakespeare"
        },
        {
            id: 4,
            questionText: "What gas do plants absorb from the atmosphere?",
            answers: ["Oxygen", "Carbon Dioxide", "Nitrogen", "Hydrogen"],
            correctAnswer: "Carbon Dioxide"
        },
        {
            id: 5,
            questionText: "What is the largest planet in our Solar System?",
            answers: ["Earth", "Mars", "Jupiter", "Saturn"],
            correctAnswer: "Jupiter"
        },
        {
            id: 6,
            questionText: "Which element has the chemical symbol 'O'?",
            answers: ["Gold", "Oxygen", "Silver", "Zinc"],
            correctAnswer: "Oxygen"
        },
        {
            id: 7,
            questionText: "What year did the Titanic sink?",
            answers: ["1912", "1905", "1898", "1923"],
            correctAnswer: "1912"
        },
        {
            id: 8,
            questionText: "What is the hardest natural substance on Earth?",
            answers: ["Gold", "Iron", "Diamond", "Quartz"],
            correctAnswer: "Diamond"
        },
        {
            id: 9,
            questionText: "What is the currency of Japan?",
            answers: ["Yuan", "Dollar", "Euro", "Yen"],
            correctAnswer: "Yen"
        },
        {
            id: 10,
            questionText: "What is the chemical formula for water?",
            answers: ["H2O2", "H2O", "HO2", "H3O"],
            correctAnswer: "H2O"
        },
        {
            id: 11,
            questionText: "Who painted the Mona Lisa?",
            answers: ["Vincent Van Gogh", "Pablo Picasso", "Leonardo da Vinci", "Claude Monet"],
            correctAnswer: "Leonardo da Vinci"
        },
        {
            id: 12,
            questionText: "In what country would you find the Eiffel Tower?",
            answers: ["Italy", "Belgium", "France", "Germany"],
            correctAnswer: "France"
        },
        {
            id: 13,
            questionText: "What is the main ingredient in guacamole?",
            answers: ["Tomato", "Avocado", "Onion", "Pepper"],
            correctAnswer: "Avocado"
        },
        {
            id: 14,
            questionText: "What is the largest continent on Earth?",
            answers: ["Africa", "Europe", "Asia", "Antarctica"],
            correctAnswer: "Asia"
        },
        {
            id: 15,
            questionText: "Which animal is known as the 'King of the Jungle'?",
            answers: ["Elephant", "Lion", "Tiger", "Giraffe"],
            correctAnswer: "Lion"
        },
        {
            id: 16,
            questionText: "What temperature does water boil at?",
            answers: ["100°C", "90°C", "80°C", "110°C"],
            correctAnswer: "100°C"
        },
        {
            id: 17,
            questionText: "Who invented the telephone?",
            answers: ["Thomas Edison", "Alexander Graham Bell", "Nikola Tesla", "Marie Curie"],
            correctAnswer: "Alexander Graham Bell"
        },
        {
            id: 18,
            questionText: "Which planet is closest to the sun?",
            answers: ["Venus", "Earth", "Mercury", "Mars"],
            correctAnswer: "Mercury"
        },
        {
            id: 19,
            questionText: "What is the smallest country in the world?",
            answers: ["Vatican City", "Monaco", "Nauru", "Liechtenstein"],
            correctAnswer: "Vatican City"
        },
        {
            id: 20,
            questionText: "What is the longest river in the world?",
            answers: ["Amazon River", "Nile River", "Yangtze River", "Mississippi River"],
            correctAnswer: "Nile River"
        }
    ];
     
    ctx.status = 200;
    ctx.body = questions;
    return ctx;
} 

export const getLeaderBoard = async (ctx:any) => {
    const scores = [
        { name: 'Alice', score: 200 },
        { name: 'Bob', score: 180 },
        { name: 'Charlie', score: 160 },
        { name: 'David', score: 150 },
        { name: 'Eve', score: 140 }
    ];
    ctx.status = 200;
    ctx.body = scores;
    return ctx;
} 

