import { useEffect, useState } from "react";

type User = {
    id: number;
    name: string;
    email: string;
};

export default function ManagementUser() {
    const [users, setUsers] = useState<User[]>([]);
    const [isClient, setIsClient] = useState(false);

    const viewUser = async () => {
        try {
            const response = await fetch('api/getUser', {
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
            setUsers(data);
        } catch (error) {
            console.error('Desculpe, algo deu errado', error);
        }
    };

    useEffect(() => {
        setIsClient(true);
        viewUser();
    }, []);

    return (
        <div className="flex flex-col items-center space-y-6 align-center">
            <h1 className="text-2xl font-semibold mb-4">Usuários</h1>

            <div className="w-full max-w-4xl">
                <table className="min-w-full bg-white border border-gray-200">
                    <thead>
                        <tr className="bg-gray-100">
                            <th className="py-3 px-6 border-b border-gray-200 text-left text-gray-700 font-medium">Nome</th>
                            <th className="py-3 px-6 border-b border-gray-200 text-left text-gray-700 font-medium">Email</th>
                        </tr>
                    </thead>
                    <tbody>
                        {users.map((user) => (
                            <tr key={user.id} className="hover:bg-gray-50">
                                <td className="py-4 px-6 border-b border-gray-200 text-red-500">{user.name}</td>
                                <td className="py-4 px-6 border-b border-gray-200 text-red-500">{user.email}</td>
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
