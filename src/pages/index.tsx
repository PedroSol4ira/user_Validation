import { useState } from 'react';

export default function Home() {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [message, setMessage] = useState('');
  const [error, setError] = useState('');

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    try {
      const response = await fetch('/api/createUser', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ name, email, password }),
      });

      if (!response.ok) {
        throw new Error('Erro ao criar o usuário');
      }

      const newUser = await response.json();
      setMessage(`Usuário criado com sucesso: ${newUser.name}`);
      setName('');
      setEmail('');
      setPassword('');
    } catch (err) {
      setError('Erro ao criar o usuário');
    }
  };

  return (
    <div className="max-w-lg mx-auto p-4">
      <h1 className="text-2xl font-bold mb-4">Cadastro de Usuário</h1>
      {message && <div className="text-green-500 mb-4">{message}</div>}
      {error && <div className="text-red-500 mb-4">{error}</div>}
      <form onSubmit={handleSubmit} className="space-y-4">
        <div>
          <label htmlFor="name" className="block text-sm font-semibold">Nome</label>
          <input
            type="text"
            id="name"
            value={name}
            onChange={(e) => setName(e.target.value)}
            required
            className="w-full p-2 border rounded text-black"
          />
        </div>
        <div>
          <label htmlFor="email" className="block text-sm font-semibold">Email</label>
          <input
            type="email"
            id="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
            className="w-full p-2 border rounded text-black"
          />
        </div>
        <div>
          <label htmlFor="password" className="block text-sm font-semibold">Senha</label>
          <input
            type="password"
            id="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
            className="w-full p-2 border rounded text-black"
          />
        </div>
        <button
          type="submit"
          className="w-full bg-blue-500 text-white p-2 rounded"
        >
          Criar Conta
        </button>

        <button

        >
          <a href="/gerenciamento">Gerenciamento de Contas </a>
        </button>
      </form>
    </div>
  );
}
