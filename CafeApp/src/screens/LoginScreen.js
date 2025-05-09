import { StyleSheet, Text, View, TouchableOpacity, Image, TextInput, Alert } from 'react-native'
import React, { useState, useEffect } from 'react'
import Icon from '@react-native-vector-icons/ionicons';
import axios from 'axios';
import { useAuth } from '../context/AuthContext';
import AsyncStorage from '@react-native-async-storage/async-storage';

const LoginScreen = ({ navigation }) => {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [rememberMe, setRememberMe] = useState(false);

    const { login } = useAuth();

    const handleLogin = async () => {
        try {
            const response = await axios.get(
                `http://10.0.2.2:3000/users/?email=${email}&password=${password}`
            );

            if (response.status === 200 && response.data.length > 0) {
                const user = response.data[0];

                await AsyncStorage.setItem('user', JSON.stringify(user));
                login(user);
                Alert.alert('Login Successful', 'Welcome!');
                navigation.navigate('HomeTab');
            } else {
                Alert.alert('Login Failed', 'Invalid credentials');
            }
        } catch (error) {
            console.error('Error logging in:', error);
        }
    }

    useEffect(() => {
        const checkUserSession = async () => {
            try {
                const storedUser = await AsyncStorage.getItem('user');

                if (storedUser) {
                    const user = JSON.parse(storedUser);
                    login(user);
                    navigation.navigate('HomeTab');
                }
            } catch (error) {
                console.error('Error loading user from AsyncStorage:', error);
            }
        };

        checkUserSession();
    }, [login, navigation]);

    const navigationtoRegister = () => {
        navigation.navigate('Register');
    }

    const handleForgotPassword = () => {
        console.log("Navigating to Forgot Password Screen...");
    };

    return (
        <View style={styles.container}>
            <View style={styles.logo}>
                <Icon name="cafe-outline" size={60} color="white" />
                <Text style={styles.logoText}>MyCoffeeApp</Text>
            </View>

            <View style={styles.form}>
                <Text style={styles.title}>Welcome Back!</Text>
                <View style={{ flexDirection: 'row', justifyContent: 'center' }}>
                    <Text style={{ color: 'grey', fontSize: 16 }}>Don't have an account? </Text>
                    <TouchableOpacity onPress={navigationtoRegister}>
                        <Text style={{ fontSize: 16 }}>Register</Text>
                    </TouchableOpacity>
                </View>
                <View style={styles.formLogin}>
                    <TextInput
                        style={styles.input}
                        onChangeText={setEmail}
                        value={email}
                        placeholder="Email"
                        placeholderTextColor="#B0B0B0"
                        keyboardType="email-address"
                    />
                    <TextInput
                        style={styles.input}
                        onChangeText={setPassword}
                        value={password}
                        placeholder="Password"
                        placeholderTextColor="#B0B0B0"
                        secureTextEntry={true}
                    />
                    <View style={styles.rememberSection}>
                        <View style={styles.rememberCheckbox}>
                            <TouchableOpacity
                                style={styles.customCheckbox}
                                onPress={() => setRememberMe(!rememberMe)}
                            >
                                <Icon
                                    name={rememberMe ? 'checkbox' : 'square-outline'}
                                    size={24}
                                    color="#C7A17A"
                                />
                                <Text style={{ marginLeft: 8, fontSize: 16 }}>Remember Me</Text>
                            </TouchableOpacity>
                        </View>
                        <View style={{ alignItems: 'flex-end', paddingRight: 20 }}>
                            <TouchableOpacity onPress={handleForgotPassword}>
                                <Text style={{ fontSize: 16, color: '#FF7043' }}>Forgot Password?</Text>
                            </TouchableOpacity>
                        </View>
                    </View>
                    <TouchableOpacity onPress={handleLogin} style={styles.loginButton}>
                        <Text style={styles.loginButtonText}>Login</Text>
                    </TouchableOpacity>
                </View>
                <View style={styles.orStyle}>
                    <View style={styles.line}></View>
                    <Text style={styles.orText}>OR</Text>
                    <View style={styles.line}></View>
                </View>

                <View style={styles.loginWith}>
                    <TouchableOpacity style={styles.logingg} onPress={() => console.log('Login with Google')}>
                        <Icon name='logo-google' size={30} style={styles.icon} />
                        <Text> E-mail</Text>
                    </TouchableOpacity>
                    <TouchableOpacity style={styles.logingg} onPress={() => console.log('Login with Facebook')}>
                        <Icon name='logo-facebook' size={30} style={styles.icon} />
                        <Text> Facebook</Text>
                    </TouchableOpacity>
                </View>

            </View>
        </View>
    )
}

export default LoginScreen

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#C7A17A',
    },
    logo: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        paddingTop: 20
    },
    logoText: {
        marginTop: 10,
        fontSize: 24,
        fontWeight: 'bold',
        color: 'white',
    },
    form: {
        flex: 3,
        backgroundColor: 'white',
        borderTopLeftRadius: 30,
        borderTopRightRadius: 30,
        padding: 20,
        paddingTop: 40
    },
    title: {
        textAlign: "center",
        fontSize: 22,
        fontWeight: 'bold',
        color: '#614419FF',
    },
    formLogin: {
        paddingTop: 40
    },
    input: {
        height: 50,
        margin: 12,
        paddingHorizontal: 15,
        borderRadius: 15,
        backgroundColor: '#F5F5F5',
        fontSize: 16,
        color: '#333',
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.1,
        shadowRadius: 4,
        elevation: 3,
    },
    rememberSection: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        marginTop: 10,
    },
    rememberCheckbox: {
        flexDirection: 'row',
        alignItems: 'center',
        paddingLeft: 15
    },
    customCheckbox: {
        flexDirection: 'row',
        alignItems: 'center',
        paddingLeft: 2,
    },
    loginButton: {
        backgroundColor: '#C7A17A',
        paddingVertical: 15,
        borderRadius: 15,
        marginTop: 40,
        alignItems: 'center',
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.2,
        shadowRadius: 5,
        elevation: 3,
    },
    loginButtonText: {
        fontSize: 18,
        color: 'white',
        fontWeight: 'bold',
    },
    orStyle: {
        flexDirection: 'row',
        justifyContent: 'center',
        alignItems: 'center',
        paddingTop: 30,
        marginVertical: 20,
    },
    line: {
        flex: 1,
        height: 1,
        backgroundColor: '#333',
        marginHorizontal: 10
    },
    orText: {
        fontSize: 16,
    },
    loginWith: {
        flexDirection: 'row',
        justifyContent: 'space-around',

    },
    logingg: {
        flexDirection: 'row',
        alignItems: 'center',
        padding: 10,
        paddingHorizontal: 40,
        borderRadius: 10,
        backgroundColor: '#F5F5F5',
    },
    icon: {
        marginRight: 10,
        color: '#555',
    },
})