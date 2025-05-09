import {
    FlatList,
    Image,
    ImageBackground,
    StyleSheet,
    Text,
    TextInput,
    TouchableOpacity,
    View,
} from 'react-native';
import React, { useEffect, useState } from 'react';
import { useAuth } from '../context/AuthContext';
import Icon from '@react-native-vector-icons/ionicons';
import axios from 'axios';

const BASE_URL = 'http://10.0.2.2:3000';

const HomeScreen = () => {
    const [categories, setCategories] = useState([]);
    const [selectedCategory, setSelectedCategory] = useState(null);
    const [products, setProducts] = useState([]);
    const [searchQuery, setSearchQuery] = useState('');
    const { user, logout } = useAuth();

    useEffect(() => {
        fetchCategories();
        fetchProducts();
    }, []);

    useEffect(() => {
        if (selectedCategory === null) {
            fetchProducts();
        } else {
            fetchProductsByCategory(selectedCategory);
        }
    }, [selectedCategory]);

    const fetchCategories = async () => {
        try {
            const res = await axios.get(`${BASE_URL}/categories`);
            const allCategory = { id: null, name: 'Tất cả' };
            const allCategories = [allCategory, ...res.data];
            setCategories(allCategories);
            setSelectedCategory(null);
        } catch (error) {
            console.error('Lỗi khi fetch danh mục:', error);
        }
    };

    const fetchProducts = async () => {
        try {
            const res = await axios.get(`${BASE_URL}/products`);
            setProducts(res.data);
        } catch (error) {
            console.error('Lỗi khi fetch sản phẩm:', error);
        }
    };

    const fetchProductsByCategory = async (categoryId) => {
        try {
            const res = await axios.get(`${BASE_URL}/products?category_id=${categoryId}`);
            setProducts(res.data);
        } catch (error) {
            console.error('Lỗi khi fetch sản phẩm theo category:', error);
        }
    };

    const renderItemCategory = ({ item }) => {
        const isSelected = selectedCategory === item.id;
        return (
            <TouchableOpacity
                style={[styles.categoryItem, isSelected && styles.selectedCategory]}
                onPress={() => setSelectedCategory(item.id)}
            >
                <Text style={[styles.categoryName, isSelected && styles.selectedText]}>
                    {item.name}
                </Text>
            </TouchableOpacity>
        );
    };

    const renderItemProduct = ({ item }) => (
        <View style={styles.productItem}>
            <Image source={{ uri: item.image }} style={styles.productImage} />
            <Text style={styles.productName}>{item.name}</Text>
            <View style={styles.priceAndAdd}>
                <Text style={styles.price}>{item.price}₫</Text>
                <TouchableOpacity style={styles.addButton}>
                    <Icon name="add" size={20} color="white" />
                </TouchableOpacity>
            </View>
        </View>
    );

    return (
        <View style={styles.container}>
            <ImageBackground
                source={require('../assets/header.png')}
                style={styles.appbar}
                resizeMode="cover"
            >
                <View style={styles.userInfo}>
                    {/* Check if user exists */}
                    {user ? (
                        <>
                            <Text style={styles.greetingText}>Xin chào, {user.name}</Text>
                            <Image
                                source={user.avatar ? { uri: user.avatar } : require('../assets/user.jpg')}
                                style={styles.avatar}
                            />
                        </>
                    ) : (
                        <Text>Loading user info...</Text>
                    )}
                </View>
            </ImageBackground>

            <View style={styles.searchBar}>
                <TextInput
                    placeholder="Tìm kiếm sản phẩm..."
                    placeholderTextColor="#888"
                    value={searchQuery}
                    onChangeText={setSearchQuery}
                    style={styles.search}
                />
                <Icon name="search" size={30} style={styles.icon} />
            </View>

            <FlatList
                data={categories}
                renderItem={renderItemCategory}
                keyExtractor={(item) => item.id?.toString() ?? 'all'}
                horizontal
                showsHorizontalScrollIndicator={false}
                style={{ marginTop: 20, marginLeft: 10, height: 50 }}
            />

            <FlatList
                data={products}
                renderItem={renderItemProduct}
                keyExtractor={(item) => item.id.toString()}
                numColumns={2}
                contentContainerStyle={[
                    styles.productList,
                    products.length === 0 && { flex: 1, justifyContent: 'center', alignItems: 'center' },
                ]}
                ListEmptyComponent={
                    <Text style={{ fontSize: 16, color: '#888' }}>Không có sản phẩm nào</Text>
                }
            />
        </View>
    );
};

export default HomeScreen;

const styles = StyleSheet.create({
    container: {
        flex: 1,
    },
    appbar: {
        height: 180,
        justifyContent: 'flex-end',
    },
    userInfo: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        padding: 15,
        paddingBottom: 50,
        alignItems: 'center',
    },
    greetingText: {
        color: '#C7A17A',
        fontSize: 20,
        fontWeight: 'bold',
    },
    avatar: {
        width: 60,
        height: 60,
        borderRadius: 50,
    },
    searchBar: {
        marginHorizontal: 20,
        marginTop: -30,
        backgroundColor: 'white',
        borderRadius: 10,
        paddingHorizontal: 15,
        paddingVertical: 10,
        elevation: 5,
        flexDirection: 'row',
        alignItems: 'center',
    },
    search: {
        flex: 1,
        fontSize: 16,
    },
    icon: {
        marginLeft: 10,
        color: '#888',
    },
    categoryItem: {
        marginRight: 10,
        paddingHorizontal: 15,
        paddingVertical: 8,
        borderRadius: 20,
        backgroundColor: '#fff',
        borderWidth: 1,
        borderColor: '#ccc',
    },
    selectedCategory: {
        backgroundColor: '#FF7043',
        borderColor: '#FF7043',
    },
    categoryName: {
        color: '#333',
    },
    selectedText: {
        color: '#fff',
    },
    productList: {
        padding: 10,
    },
    productItem: {
        backgroundColor: '#fff',
        borderRadius: 12,
        padding: 10,
        margin: 10,
        width: '45%',
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.1,
        shadowRadius: 4,
        elevation: 3,
        alignItems: 'center',
    },
    productImage: {
        width: '100%',
        height: 140,
        borderRadius: 10,
        resizeMode: 'cover',
    },
    productName: {
        marginTop: 8,
        fontSize: 16,
        fontWeight: '600',
        textAlign: 'center',
        color: '#4E342E',
    },
    priceAndAdd: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        width: '100%',
        alignItems: 'center',
        marginTop: 10,
    },
    price: {
        fontSize: 16,
        fontWeight: 'bold',
        color: '#FF7043',
    },
    addButton: {
        backgroundColor: '#FF7043',
        borderRadius: 8,
        padding: 6,
    },
});
