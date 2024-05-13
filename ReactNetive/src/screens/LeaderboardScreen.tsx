//LeaderboardScreen.tsx
import React, { useEffect, useState, useCallback } from 'react';
import { View, Text, StyleSheet, ScrollView, RefreshControl } from 'react-native';
import { fetchLeaderBoard } from '../api/questions';
import { Leaderboard, Player } from '../models/Leaderboard';

const LeaderboardScreen = () => {    
    const [refreshing, setRefreshing] = useState<boolean>(false);
    const [scores, setScores] = useState<Leaderboard>([]); 
    useEffect(() => {
        loadLeaderboards();
    }, []);

    const onRefresh = useCallback(() => {
        setRefreshing(true);
        loadLeaderboards().then(() => setRefreshing(false));
    }, []);


    const loadLeaderboards = async () => { 
        try {
            const res:Leaderboard = await fetchLeaderBoard(); 
            setScores(res); 
        } catch (error) {
            console.error('Error fetching leader boards:', error);
        }
    };

    return (
        <ScrollView style={styles.container}
            refreshControl={
                <RefreshControl refreshing={refreshing} onRefresh={onRefresh} />
            }>
            {scores.map((entry:Player, index:number) => (
                <View key={index} style={styles.entry}>
                    <Text style={styles.name}>{entry.name}</Text>
                    <Text style={styles.score}>{entry.score}</Text>
                </View>
            ))}
        </ScrollView>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        padding: 10,
        backgroundColor: '#fff'
    },
    entry: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        padding: 10,
        borderBottomWidth: 1,
        borderBottomColor: '#ccc'
    },
    name: {
        fontSize: 18,
        color: '#333'
    },
    score: {
        fontSize: 18,
        color: '#333'
    }
});

export default LeaderboardScreen;
