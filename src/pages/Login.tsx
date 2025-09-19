import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { signInWithEmailAndPassword } from 'firebase/auth';
import { auth } from '../firebase';
import { Container, Title, TextInput, PasswordInput, Button, Group, Alert } from '@mantine/core';

export default function Login() {
  const navigate = useNavigate();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState<string | null>(null);

  const handleLogin = async () => {
    try {
      await signInWithEmailAndPassword(auth, email, password);
      navigate('/dashboard');
    } catch (err) {
      if (err instanceof Error) {
        setError(err.message);
      } else {
        setError('Ocurrió un error inesperado.');
      }
    }
  };

  return (
    <Container size="xs">
      <Title order={2}>Iniciar Sesión</Title>
      {error && <Alert color="red">{error}</Alert>}
      <TextInput
        label="Email"
        placeholder="tu@email.com"
        value={email}
        onChange={(e) => setEmail(e.currentTarget.value)}
      />
      <PasswordInput
        label="Contraseña"
        placeholder="Tu contraseña"
        value={password}
        onChange={(e) => setPassword(e.currentTarget.value)}
      />
      <Group >
        <Button onClick={handleLogin}>Iniciar Sesión</Button>
      </Group>
    </Container>
  );
}
