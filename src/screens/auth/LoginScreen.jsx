import { StyleSheet, Text, View, TextInput, Pressable, Dimensions, Switch, ActivityIndicator } from 'react-native';
import { colors } from '../../global/theme';
import { useEffect, useState, useCallback } from 'react';
import { useLoginMutation } from '../../services/user/userApi';
import { setUser } from '../../features/user/userSlice';
import { useDispatch } from 'react-redux';
import AsyncStorage from '@react-native-async-storage/async-storage';

const saveSession = async (localId, email) => {
  try {
    await AsyncStorage.setItem('userSession', JSON.stringify({ localId, email }));
  } catch (error) {
    console.log('Error guardando sesión:', error);
  }
};

const clearSession = async () => {
  try {
    await AsyncStorage.removeItem('userSession');
  } catch (error) {
    console.log('Error limpiando sesión:', error);
  }
};

const textInputWidth = Dimensions.get('window').width * 0.7;

const LoginScreen = ({ navigation }) => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [persistSession, setPersistSession] = useState(false);
  const [errorMsg, setErrorMsg] = useState('');
  
  const dispatch = useDispatch();
  const [triggerLogin, { data, error, isLoading, isSuccess, isError }] = useLoginMutation();

  useEffect(() => {
    const handleLoginResult = async () => {
      if (isSuccess && data) {
        setErrorMsg('');
        const { localId, email: userEmail } = data;
        
        //Guardar la sesión
        if (persistSession) {
          await saveSession(localId, userEmail);
        } else {
          await clearSession();
        }
        
        dispatch(setUser({ localId, email: userEmail }));
      } else if (isError) {
        setErrorMsg('Credenciales incorrectas, intenta de nuevo.');
        console.log('Login error:', error);
      }
    };

    handleLoginResult();
  }, [isSuccess, isError, data, error, persistSession, dispatch]);

  //Recuperar la sesion guardada al reiniciar la app
  useEffect(() => {
    const checkSession = async () => {
      const userSession = await AsyncStorage.getItem('userSession');
      if (userSession) {
        const { localId, email } = JSON.parse(userSession);
        dispatch(setUser({ localId, email }));
      }
    };
    checkSession();
  }, [dispatch]);

  const handleSubmit = useCallback(() => {
    setErrorMsg('');
    
    if (!email.trim() || !password.trim()) {
      setErrorMsg('Por favor completa todos los campos.');
      return;
    }

    triggerLogin({ email, password });
  }, [email, password, triggerLogin]);

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Iniciar sesión</Text>
      
      <View style={styles.formContainer}>
        <TextInput
          value={email}
          onChangeText={setEmail}
          placeholderTextColor={colors.darkGray}
          placeholder="Email"
          style={styles.textInput}
          keyboardType="email-address"
          autoCapitalize="none"
        />
        <TextInput
          value={password}
          onChangeText={setPassword}
          placeholderTextColor={colors.darkGray}
          placeholder="Password"
          style={styles.textInput}
          secureTextEntry
        />
        {errorMsg ? <Text style={styles.error}>{errorMsg}</Text> : null}

        <Pressable style={styles.btn} onPress={handleSubmit} disabled={isLoading}>
          {isLoading ? (
            <ActivityIndicator color={colors.black} />
          ) : (
            <Text style={styles.btnText}>Iniciar sesión</Text>
          )}
        </Pressable>
      </View>

      <View style={styles.footTextContainer}>
        <Text style={styles.blackText}>¿No tienes una cuenta?</Text>
        <Pressable onPress={() => navigation.navigate('Signup')}>
          <Text style={[styles.blackText, styles.underLineText]}>Crea una</Text>
        </Pressable>
      </View>

      <View style={styles.rememberMe}>
        <Text style={styles.blackText}>¿Mantener sesión iniciada?</Text>
        <Switch
          onValueChange={() => setPersistSession((prev) => !prev)}
          value={persistSession}
          trackColor={{ false: '#767577', true: '#81b0ff' }}
          thumbColor={persistSession ? colors.neonGreen : '#f4f3f4'}
        />
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: colors.purple,
    padding: 20,
  },
  title: {
    color: colors.neonGreen,
    fontFamily: 'PressStart2P',
    fontSize: 24,
    marginBottom: 30,
  },
  formContainer: {
    width: '100%',
    alignItems: 'center',
    marginBottom: 24,
  },
  inputContainer: {
    gap: 16,
    width: '100%',
    alignItems: 'center',
  },
  textInput: {
    padding: 12,
    paddingLeft: 16,
    borderRadius: 16,
    backgroundColor: 'rgba(0,0,0,0.2)',
    width: textInputWidth,
    color: colors.black,
    fontSize: 16,
    marginBottom: 16,
  },
  btn: {
    paddingVertical: 16,
    paddingHorizontal: 32,
    backgroundColor: colors.black,
    borderRadius: 16,
    marginTop: 10,
    minWidth: textInputWidth,
    alignItems: 'center',
  },
  btnText: {
    color: colors.white,
    fontSize: 16,
    fontWeight: '700',
  },
  error: {
    color: colors.red,
    marginTop: 10,
    marginBottom: 10,
    fontWeight: '600',
    textAlign: 'center',
  },
  footTextContainer: {
    flexDirection: 'row',
    gap: 8,
    marginBottom: 24,
  },
  whiteText: {
    color: colors.black,
    fontSize: 14,
  },
  underLineText: {
    textDecorationLine: 'underline',
  },
  rememberMe: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    width: textInputWidth,
    marginTop: 10,
    gap: 8,
  },
});

export default LoginScreen;
