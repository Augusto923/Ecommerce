import { StyleSheet, Text, View, TextInput, Pressable, Dimensions, ActivityIndicator } from 'react-native';
import { colors } from '../../global/theme';
import { useState, useCallback, useEffect } from 'react';
import { useSignupMutation } from '../../services/user/userApi';

const textInputWidth = Dimensions.get('window').width * 0.7;

// --- Funciones de Validación ---
const validateForm = ({ email, password, confirmPassword }) => {
  const emailRegex = /^\S+@\S+\.\S+$/;
  if (!email.trim() || !password.trim() || !confirmPassword.trim()) {
    return 'Por favor completa todos los campos.';
  }
  if (!emailRegex.test(email)) {
    return 'El email no tiene un formato válido.';
  }
  if (password.length < 6) {
    return 'La contraseña debe tener al menos 6 caracteres.';
  }
  if (password !== confirmPassword) {
    return 'Las contraseñas no coinciden.';
  }
  return null; // Si no hay errores, retorna null
};

// --- Componente Principal: SignupScreen ---
const SignupScreen = ({ navigation }) => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [errorMsg, setErrorMsg] = useState('');

  const [triggerSignup, { isLoading, isSuccess, isError, error }] = useSignupMutation();

  useEffect(() => {
    if (isSuccess) {
      navigation.navigate('Login'); // Navegar al Login tras registro exitoso
    }
  }, [isSuccess, navigation]);

  useEffect(() => {
    if (isError) {
      setErrorMsg('El email ya se encuentra registrado.');
      console.log('Signup error:', error);
    }
  }, [isError, error]);

  const handleSignup = useCallback(() => {
    const validationError = validateForm({ email, password, confirmPassword });

    if (validationError) {
      setErrorMsg(validationError);
      return;
    }

    setErrorMsg('');
    triggerSignup({ email, password });
  }, [email, password, confirmPassword, triggerSignup]);

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Registrate</Text>

      <View style={styles.formContainer}>
        <TextInput
          value={email}
          onChangeText={setEmail}
          placeholder="Email"
          placeholderTextColor={colors.white}
          style={styles.textInput}
          keyboardType="email-address"
          autoCapitalize="none"
        />
        <TextInput
          value={password}
          onChangeText={setPassword}
          placeholder="Password"
          placeholderTextColor={colors.white}
          style={styles.textInput}
          secureTextEntry
        />
        <TextInput
          value={confirmPassword}
          onChangeText={setConfirmPassword}
          placeholder="Repetir password"
          placeholderTextColor={colors.white}
          style={styles.textInput}
          secureTextEntry
        />

        {errorMsg ? <Text style={styles.error}>{errorMsg}</Text> : null}

        <Pressable style={styles.btn} onPress={handleSignup} disabled={isLoading}>
          {isLoading ? (
            <ActivityIndicator color={colors.white} />
          ) : (
            <Text style={styles.btnText}>Crear cuenta</Text>
          )}
        </Pressable>
      </View>

      <View style={styles.footTextContainer}>
        <Text style={styles.whiteText}>¿Ya tienes una cuenta?</Text>
        <Pressable onPress={() => navigation.navigate('Login')}>
          <Text style={[styles.whiteText, styles.underLineText]}>Iniciar sesión</Text>
        </Pressable>
      </View>
    </View>
  );
};

export default SignupScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: colors.white,
    padding: 20,
  },
  title: {
    color: colors.black,
    fontSize: 22,
    fontWeight: '700',
    textAlign: 'center',
    marginBottom: 24,
  },
  formContainer: {
    width: '100%',
    alignItems: 'center',
    marginTop: 12,
  },
  textInput: {
    padding: 12,
    borderRadius: 10,
    backgroundColor: colors.jet,
    width: textInputWidth,
    color: colors.black,
    fontSize: 15,
    marginBottom: 12,
  },
  error: {
    color: colors.red,
    marginVertical: 8,
    fontWeight: '500',
    textAlign: 'center',
    fontSize: 13,
    minHeight: 18,
  },
  btn: {
    paddingVertical: 14,
    backgroundColor: colors.black,
    borderRadius: 10,
    marginTop: 12,
    width: textInputWidth,
    alignItems: 'center',
  },
  btnText: {
    color: colors.white,
    fontSize: 15,
    fontWeight: '600',
  },
  footTextContainer: {
    flexDirection: 'row',
    justifyContent: 'center',
    marginTop: 20,
  },
  whiteText: {
    color: colors.black,
    fontSize: 13,
  },
  underLineText: {
    textDecorationLine: 'underline',
    fontWeight: '500',
    marginLeft: 6,
  },
});