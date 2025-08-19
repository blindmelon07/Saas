import { useSession } from '@/context/AuthContext';
import { useTheme } from '@/context/ThemeContext';
import axios from 'axios';
import { Link, router } from 'expo-router';
import React, { useState } from 'react';
import { ActivityIndicator, Alert, Image, Text, View } from 'react-native';
import Button from './components/core/Button';
import Input from './components/core/Input';
import axiosInstance from './config/axiosConfig';



const Login = () =>{
  const { signIn } = useSession();
  const {currentTheme} = useTheme();
  const [loading, setLoading] = useState(false);
  const [data, setData] = useState({
    email: "",
    password: "",
  });
  const [errors, setErrors] = useState({
  
    email: '',
    password: '',
 
  });
  const handleChange = (key:string, value: string) => {
    setData({...data, [key]: value});
    setErrors({...errors, [key]: ""});
  };
  const handleSignup = async () => {
    setLoading(true);
    setErrors({
     
      email: '',
      password: '',
    });
    try {
      const response = await axiosInstance.post('/api/login', data);
      await signIn(response.data.token, response.data.user);
      router.replace("/(app)/home");
    } catch (error) {
      if (axios.isAxiosError(error)){
        const responseData = error.response?.data;
        if(responseData?.errors) {
          setErrors(responseData.errors);
        }else if (responseData?.message) {
          Alert.alert("Error", responseData.message);
        }else {
          Alert.alert("Error", "An unexpected error occured");
        }
      }else {
        console.error("Error:", error);
        Alert.alert("Error", "An unexpected error occured");
      }
    }finally {
      setLoading(false);
    }
  }
  return(
    <View className={`flex-1 justify-center items-center p-5 ${currentTheme === 'dark' ?
      'bg-gray-900' : 'bg-gray-50'}`}>
 <View className='items-center mb-8'>
 <Image
        source={require('../assets/images/school.png')}
        className="w-32 h-32"
        resizeMode="contain"/>
           <Text className={'text-2xl font-bold mt-4'}>
          HairCutApp
        </Text>
 </View>
 <Text className={`text-3xl font-bold mb-5 ${currentTheme === 'dark' ? 'text-white': 'text-gray-900'}`}
      >Login</Text>
      <Input
      placeholder="Email"
      value={data.email}
      onChangeText={(value) => handleChange("email", value)}
    keyboardType="email-address"
    error={errors.email}
      />
 <Input
      placeholder="Password"
      value={data.password}
      onChangeText={(value) => handleChange("password", value)}
   secureTextEntry
    error={errors.password}
      />
 <Button className="w-full bg-primary mb-4"
        onPress={handleSignup}
        disabled={loading}
        loading = {loading}
        >
          <View className="flex-row items-center justify-center">
            {loading && <ActivityIndicator size="small" color= "#ffffff" className="mr-3"/>}
            <Text className="text-white text-center">Login</Text>
          </View>
      </Button>
      <Text className={`text-lg ${currentTheme === 'dark' ? 'text-gray-400' : 
        'text-gray-600'} mt-5`}>
          <Link href="/signup">
          <Text className="text-primary">Sign Up</Text>
          
          </Link>
        </Text>
      </View>

  );
}
export default Login;