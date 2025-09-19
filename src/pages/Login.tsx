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
    } catch (err: any) {
      setError(err.message);
    }
  };

  return (
    <Container size="xs">
      <Title order={2}>Login</Title>
      {error && <Alert color="red">{error}</Alert>}
      <TextInput
        label="Email"
        placeholder="your@email.com"
        value={email}
        onChange={(e) => setEmail(e.currentTarget.value)}
      />
      <PasswordInput
        label="Password"
        placeholder="Your password"
        value={password}
        onChange={(e) => setPassword(e.currentTarget.value)}
      />
      <Group >
        <Button onClick={handleLogin}>Login</Button>
      </Group>
    </Container>
  );
}
