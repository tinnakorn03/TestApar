// src/api/questions.ts
import axios from 'axios';
import { Question } from '../models/Question';
import { Leaderboard, Player } from '../models/Leaderboard';

const API_URL = 'http://localhost:2999';

export const fetchQuestions = async (): Promise<Question[]> => {
    return new Promise<Question[]>((resolve, reject) => {
        axios({
            method: 'GET',
            url: `${API_URL}/question/getAll`
        })
        .then(response => {
            if (response.status === 200) {
                resolve(response.data as Question[]);  // Assure TypeScript about the type
            } else {
                throw new Error('Failed to fetch with status code: ' + response.status);
            }
        })
        .catch(error => {
            console.error('Failed to fetch questions:', error);
            reject(error);
        });
    });
}

export const fetchLeaderBoard = async (): Promise<Leaderboard> => {
   
    return new Promise(async (resolve, reject) => {
       axios({ 
          method: 'GET',
          url: `${API_URL}/question/getLeaderBoard`
       })
       .then((response:any) => {
          if(response?.status === 200) resolve(response.data);    
       })
       .catch((error:any) => {
          reject(error)
       });
    })
} 