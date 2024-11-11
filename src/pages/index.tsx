import { useState } from 'react';
import { toast, ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { faUser } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faEnvelope } from '@fortawesome/free-solid-svg-icons';
import { faLock } from '@fortawesome/free-solid-svg-icons';

export default function Home() {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [message, setMessage] = useState('');
  const [error, setError] = useState('');


  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (password !== confirmPassword) {
      toast.error("As senhas não coincidem!")
      return
    }

    try {
      const response = await fetch('/api/createUser', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ name, email, password }),
      });

      if (!response.ok) {
        console.log('o erro foi: ', error)
        throw new Error('Erro ao criar o usuário');

      }

      const newUser = await response.json();
      toast.success("Usuário cadastrado com sucesso!")
      setName('');
      setConfirmPassword('')
      setEmail('');
      setPassword('');
    } catch (err) {
      setError('Erro ao criar o usuário');
    }
  };

  return (
    <div className='bg-gray-700 min-h-screen flex items-center justify-center'>
      <ToastContainer />
      <div className="align-center rounded-xl max-w-lg mx-auto p-4 bg-white p-6 ">
        <h1 className="flex justify-center text-2xl font-bold text-gray-700 mb-4">Cadastro de Usuário</h1>
        {message && <div className="text-green-500 mb-4">{message}</div>}
        {error && <div className="text-red-500 mb-4">{error}</div>}
        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label htmlFor="name" className="block text-sm font-semibold text-black">Nome:</label>
            <div className='relative'>
              <FontAwesomeIcon
                icon={faUser}
                className='absolute text-gray-700 top-1/2 left-3 transform -translate-y-1/2'
              />
              <input
                type="text"
                id="name"
                value={name}
                onChange={(e) => setName(e.target.value)}
                required
                className="w-full pl-10 p-2 border rounded text-black"
                placeholder='Insira seu nome:'
              />
            </div>
          </div>
          <div>
            <label htmlFor="email" className="block text-sm font-semibold text-black">Email:</label>
            <div className='relative'>
              <FontAwesomeIcon icon={faEnvelope}
                className='absolute text-gray-700 top-1/2 left-3 transform -translate-y-1/2' />
              <input
                type="email"
                id="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
                className="w-full pl-10 p-2 border rounded text-black"
                placeholder='SeuEmail@email.com:'
              />
            </div>
          </div>
          <div>
            <label htmlFor="password" className="block text-sm font-semibold text-black">Senha:</label>
            <div className='relative'>
              <FontAwesomeIcon icon={faLock}
                className='absolute text-gray-700 top-1/2 left-3 transform -translate-y-1/2' />
              <input
                type="password"
                id="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
                className="w-full pl-10 p-2 border rounded text-black"
                placeholder='Crie uma senha segura:'
              />
            </div>
          </div>
          <div>
            <label htmlFor="password" className="block text-sm font-semibold text-black">Confirme sua senha:</label>
            <div className='relative'>
              <FontAwesomeIcon icon={faLock}
                className='absolute text-gray-700 top-1/2 left-3 transform -translate-y-1/2' />
              <input
                type="password"
                id="confirmPassword"
                value={confirmPassword}
                onChange={(e) => setConfirmPassword(e.target.value)}
                required
                className="w-full pl-10 p-2 border rounded text-black"
                placeholder='Crie uma senha segura:'
              />
            </div>
          </div>
          <button
            type="submit"
            className="w-full bg-green-700 text-white p-2 rounded"
          >
            Criar Conta
          </button>


        </form>
        <div className='p-4'>
          <button
            className='flex justify-center bg-blue-500 rounded w-full p-2'
          >
            <a href="/gerenciamento">Gerenciamento de Contas </a>
          </button>
        </div>

      </div>

    </div>
  );
}
