import { Image, StyleSheet, View } from 'react-native';
import React, { useEffect } from 'react';
import AsyncStorage from '@react-native-async-storage/async-storage';


const SplashScreen = ({ navigation }) => {
    useEffect(() => {
        const checkUserSession = async () => {
            try {
                const storedUser = await AsyncStorage.getItem('user');

                if (storedUser) {
                    navigation.replace('HomeTab');
                } else {
                    navigation.replace('Login');
                }
            } catch (error) {
                console.error('Error checking user session:', error);
                navigation.replace('Login');
            }
        };
        const timeout = setTimeout(() => {
            checkUserSession();
        }, 5000);

        return () => clearTimeout(timeout);
    }, [navigation]);

    return (
        <View style={styles.container}>
            <Image
                source={require('../assets/bg.png')}
                style={styles.backgroundImage}
            />
            <Image
                width="250"
                height="250"
                source={require('../assets/logo.png')}
                style={styles.logo}
            />
        </View>
    );
};

export default SplashScreen;

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: 'transparent',
    },
    backgroundImage: {
        flex: 1,
        width: '100%',
        height: '100%',
        resizeMode: 'cover',
    },
    logo: {
        position: 'absolute',
        width: 250,
        height: 250,
        resizeMode: 'contain',
    },
});
