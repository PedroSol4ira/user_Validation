import { useEffect, useState } from "react";
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

type User = {
    id: number;
    name: string;
    email: string;
};

export default function ManagementUser() {
    const [users, setUsers] = useState<User[]>([]);
    const [isClient, setIsClient] = useState(false);

    // Função para buscar os usuários
    const viewUser = async () => {
        try {
            const response = await fetch('/api/getUser', {
                method: 'GET',
                headers: {
                    'Content-Type': 'application/json',
                },
            });
            if (!response.ok) {
                console.error("Erro ao puxar os dados dos usuários");
                return;
            }
            const data = await response.json();
            console.log('dadosssss', data)
            setUsers(data);
        } catch (error) {
            console.error('Desculpe, algo deu errado', error);
        }
    };

    // Função para excluir um usuário
    const deleteUser = async (id: number) => {
        console.log("id é este: ", id)
        try {
            const response = await fetch(`/api/deleteUser?id=${id}`, {
                method: 'DELETE',
                headers: {
                    'Content-Type': 'application/json',
                },
            });

            if (!response.ok) {
                console.error("Erro ao excluir o usuário");
                return;
            }

            setUsers(users.filter(user => user.id !== id));
            toast.success("usuario exluido com sucesso!")
        } catch (error) {
            console.error('Erro ao excluir o usuário', error);
        }
    };

    useEffect(() => {
        setIsClient(true);
        viewUser();
    }, []);

    return (
        
        <div className="flex bg-gray-700 min-h-screen flex-col items-center space-y-6 align-center ">
                <ToastContainer />
            <h1 className="text-2xl font-semibold mb-4 mt-24">Usuários</h1>

            <div className="w-full max-w-4xl rounded-xl overflow-hidden ">
                <table className="min-w-full rounded-xl  bg-white border border-gray-200 ">
                    <thead>
                        <tr className="bg-gray-100 " >
                            <th className="py-3 px-6 text-left text-gray-700 font-medium">Nome</th>
                            <th className="py-3 px-6 border-b border-gray-200 text-left text-gray-700 font-medium">Email</th>
                            <th className="py-3 px-6 border-b border-gray-200 text-left text-gray-700 font-medium">Excluir Usuário</th>
                        </tr>
                    </thead>
                    <tbody>
                        {users.map((user) => (
                            <tr key={user.id} className=""> 
                                <td className="py-4 px-6 border-b border-gray-200 text-red-500">{user.name}</td>
                                <td className="py-4 px-6 border-b border-gray-200 text-red-500">{user.email}</td>
                                <td className="py-4 px-6 border-b border-gray-200 text-left">
                                    {/* Botão para excluir o usuário */}
                                    <button
                                        className="px-4 py-2 bg-red-500 text-white rounded-lg"
                                        onClick={() => deleteUser(user.id)}
                                    >
                                        Excluir
                                    </button>
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>

            <button className="mt-6 px-4 py-2 bg-blue-500 text-white font-semibold rounded-lg shadow-md hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-400 focus:ring-opacity-75">
                <a href="/">Tela de Cadastro</a>
            </button>
        
        </div>
    );
}
