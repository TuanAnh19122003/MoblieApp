import { StyleSheet, Text, TouchableOpacity, View, ImageBackground, Image, ScrollView } from 'react-native';
import React from 'react';
import { useAuth } from '../context/AuthContext';
import Icon from '@react-native-vector-icons/feather';
import Icon2 from '@react-native-vector-icons/ionicons';
import AsyncStorage from '@react-native-async-storage/async-storage';

const ProfileScreen = ({ navigation }) => {
    const { user, logout } = useAuth();

    const handleLogout = async () => {
        try {
            await AsyncStorage.removeItem('user');
            logout();
            navigation.navigate('Login');
        } catch (error) {
            Alert.alert('Thông báo', 'Đăng xuất thất bại');
            console.log(error);
        }
    };

    return (
        <ImageBackground
            source={require('../assets/bg.png')}
            style={styles.container}
            resizeMode="cover"
        >
            <View style={styles.header}></View>
            <View style={styles.image}>
                {user ? (
                    <Image
                        source={user?.avatar ? { uri: user.avatar } : require('../assets/user.jpg')}
                        style={styles.avatar}
                    />
                ) : (
                    <Text> Đang tải ảnh ..... </Text>
                )}
            </View>

            <View style={styles.fullname}>
                {user ? (
                    <Text style={styles.textName}>
                        {user.name}
                    </Text>
                ) : (
                    <Text>Đang tải thông tin người dùng...</Text>
                )}
            </View>

            <View style={styles.info}>
                <ScrollView style={{ padding: 5, marginTop: 10 }}>
                    <View style={styles.profile}>
                        <View style={styles.userInfo}>
                            <View style={styles.infoRow}>
                                <Icon name='mail' size={20} color="#C7A17A" style={styles.iconStyle} />
                                <Text style={styles.textField}>Email: </Text>
                            </View>
                            <Text style={styles.text}>{user?.email || 'Chưa có'}</Text>
                        </View>

                        <View style={styles.userInfo}>
                            <View style={styles.infoRow}>
                                <Icon name='phone' size={20} color="#C7A17A" style={styles.iconStyle} />
                                <Text style={styles.textField}>Điện thoại: </Text>
                            </View>
                            <Text style={styles.text}>{user?.phone || 'Chưa có'}</Text>
                        </View>

                        <View style={styles.userInfo}>
                            <View style={styles.infoRow}>
                                <Icon name='map-pin' size={20} color="#C7A17A" style={styles.iconStyle} />
                                <Text style={styles.textField}>Địa chỉ: </Text>
                            </View>
                            <Text style={styles.text}>{user?.address || 'Không có'}</Text>
                        </View>
                    </View>
                    <View style={styles.profile}>
                        <TouchableOpacity style={styles.languageRow}>
                            <View style={styles.languageLeft}>
                                <Icon name='info' size={28} color="#C7A17A" style={styles.languageIcon} />
                                <View>
                                    <Text style={styles.languageTitle}>Infomation</Text>
                                    <Text style={styles.languageSubtitle}>Version, Terms, Support</Text>
                                </View>
                            </View>
                            <Icon name='chevron-right' size={28} color="#666" />
                        </TouchableOpacity>
                    </View>

                    <View style={{ padding: 10 }}>
                        <Text style={{ fontSize: 18, color: '#3ae0ba' }}>Settings</Text>
                    </View>

                    <View style={styles.profile}>
                        <TouchableOpacity style={styles.languageRow}>
                            <View style={styles.languageLeft}>
                                <Icon2 name='shield-checkmark-outline' size={28} color="#C7A17A" style={styles.languageIcon} />
                                <Text style={styles.languageTitle}>Privarcy</Text>
                            </View>
                            <Icon name='chevron-right' size={28} color="#666" />
                        </TouchableOpacity>
                    </View>

                    <View style={styles.profile}>
                        <TouchableOpacity style={styles.languageRow} onPress={handleLogout}>
                            <View style={styles.languageLeft}>
                                <Icon name='log-out' size={28} color="#C7A17A" style={styles.languageIcon} />
                                <Text style={styles.languageTitle}>Đăng xuất</Text>
                            </View>
                        </TouchableOpacity>
                    </View>
                </ScrollView>
            </View>
        </ImageBackground>
    );
};

export default ProfileScreen;

const styles = StyleSheet.create({
    container: {
        flex: 1,
    },
    header: {
        flex: 1,
    },
    info: {
        flex: 2,
        backgroundColor: '#fff',
        borderTopLeftRadius: 30,
        borderTopRightRadius: 30,
        padding: 15,
        elevation: 10,
        paddingTop: 140,
    },
    avatar: {
        width: 150,
        height: 150,
        borderRadius: 100,
        borderWidth: 3,
        borderColor: '#fff',
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 3 },
        shadowOpacity: 0.1,
        shadowRadius: 4,
        elevation: 5,
    },
    image: {
        position: 'absolute',
        top: 160,
        marginHorizontal: 130,
        zIndex: 10,
        elevation: 10,
    },
    fullname: {
        position: 'absolute',
        top: 330,
        left: 50,
        right: 50,
        alignItems: 'center',
        zIndex: 10,
        paddingBottom: 20,
    },
    textName: {
        fontSize: 22,
        fontWeight: 'bold',
    },
    textField: {
        fontSize: 16,
        fontWeight: 'bold',
        color: '#333',
    },
    text: {
        fontSize: 16,
        color: '#666',
        flexWrap: 'wrap',
        width: '70%',
        overflow: 'hidden',
    },
    profile: {
        backgroundColor: '#fff',
        padding: 15,
        elevation: 3,
        borderRadius: 10,
        marginBottom: 15,
    },
    userInfo: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        paddingBottom: 10,
    },
    infoRow: {
        flexDirection: 'row',
        alignItems: 'center',
        flexWrap: 'wrap',
    },
    iconStyle: {
        paddingRight: 8,
    },
    languageRow: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
    },
    languageLeft: {
        flexDirection: 'row',
        alignItems: 'center',
    },
    languageIcon: {
        marginRight: 10,
    },
    languageTitle: {
        fontSize: 18,
        fontWeight: 'bold',
        color: '#333',
    },
});
