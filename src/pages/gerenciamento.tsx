import { useEffect, useState } from "react";
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faTrash, faEdit } from "@fortawesome/free-solid-svg-icons";
import { format } from "date-fns";

type User = {
    id: number;
    name: string;
    email: string;
    createdAt: string;
};

export default function ManagementUser() {
    const [users, setUsers] = useState<User[]>([]);
    const [isClient, setIsClient] = useState(false);
    const [editingUser, setEditingUser] = useState<User | null>(null);
    const [showEditCard, setShowEditCard] = useState(false);

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

            const styleCreatedAt = data.map((user: User) => ({
                ...user,
                createdAt: format(new Date(user.createdAt), 'dd/MM/yyyy')
            }))
            setUsers(styleCreatedAt);

        } catch (error) {
            console.error('Desculpe, algo deu errado', error);
        }
    };

    const deleteUser = async (id: number) => {
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
            toast.success("Usuário excluído com sucesso!");
        } catch (error) {
            console.error('Erro ao excluir o usuário', error);
        }
    };


    const updateUser = async () => {
        if (!editingUser) return;
        try {
            const response = await fetch(`/api/updateUser?id=${editingUser.id}`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({
                    name: editingUser.name,
                    email: editingUser.email
                })
            });
            if (!response.ok) {
                toast.error("Erro ao editar o usuário!");
                return;
            }

            const updatedUser = await response.json();
            setUsers(users.map(user => user.id === editingUser.id ? updatedUser : user));
            setShowEditCard(false);
            toast.success("Usuário editado com sucesso!");
            window.location.reload();
        } catch (error) {
            console.log("Desculpe, algo deu errado", error);
        }
    };

    const handleEditClick = (user: User) => {
        setEditingUser(user);
        setShowEditCard(true);
    };

    useEffect(() => {
        setIsClient(true);
        viewUser();
    }, []);

    return (
        <div className="flex bg-gray-700 min-h-screen flex-col items-center space-y-6 align-center">
            <ToastContainer />
            <h1 className="text-2xl font-semibold mb-4 mt-24">Usuários</h1>

            <div className="w-full max-w-4xl rounded-xl overflow-hidden">
                <table className="min-w-full rounded-xl bg-white border border-gray-200">
                    <thead>
                        <tr className="bg-gray-100">
                            <th className="py-3 px-6 text-left text-gray-700 font-medium">Nome</th>
                            <th className="py-3 px-6 border-b border-gray-200 text-left text-gray-700 font-medium">Email</th>
                            <th className="py-3 px-6 border-b border-gray-200 text-left text-gray-700 font-medium">Criado em:</th>
                            <th className="py-3 px-6 border-b border-gray-200 text-left text-gray-700 font-medium">Excluir Usuário</th>
                            <th className="py-3 px-6 border-b border-gray-200 text-left text-gray-700 font-medium">Editar Usuário</th>
                        </tr>
                    </thead>
                    <tbody>
                        {users.map((user) => (
                            <tr key={user.id}>
                                <td className="py-4 px-6 border-b border-gray-200 text-gray-700">{user.name}</td>
                                <td className="py-4 px-6 border-b border-gray-200 text-gray-700">{user.email}</td>
                                <td className="py-4 px-6 border-b border-gray-200 text-gray-700">{user.createdAt}</td>
                                <td className="py-4 px-6 border-b border-gray-200 text-left">
                                    <button
                                        className="px-4 py-2 bg-red-500 text-white rounded-lg align-center"
                                        onClick={() => deleteUser(user.id)}
                                    >
                                        <FontAwesomeIcon icon={faTrash} />
                                    </button>
                                </td>
                                <td className="py-4 px-6 border-b border-gray-200 text-left">
                                    <button
                                        className="px-4 py-2 bg-blue-500 text-white rounded-lg align-center"
                                        onClick={() => handleEditClick(user)}
                                    >
                                        <FontAwesomeIcon icon={faEdit} /> Editar
                                    </button>
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
                <a href="/" className="flex justify-center items-center w-full">
                    <div className="flex justify-center mt-6 w-1/3 h-16  rounded-xl">
                        <button className="w-full h-full bg-blue-500 text-white text-lg font-semibold rounded-lg">
                            Tela de Cadastro
                        </button>
                    </div>
                </a>

            </div>

            {showEditCard && editingUser && (
                <div className="fixed top-0 left-0 w-full h-full flex items-center justify-center bg-black bg-opacity-50">
                    <div className="bg-white p-6 rounded-lg w-full max-w-md">
                        <h2 className="text-lg font-semibold mb-4 text-gray-700">Editar Usuário</h2>
                        <label className="block mb-2 text-gray-700">Nome</label>
                        <input
                            type="text"
                            value={editingUser.name}
                            onChange={(e) => setEditingUser({ ...editingUser, name: e.target.value })}
                            className="border rounded w-full p-2 mb-4 text-gray-700"
                        />
                        <label className="block mb-2 text-gray-700">Email</label>
                        <input
                            type="email"
                            value={editingUser.email}
                            onChange={(e) => setEditingUser({ ...editingUser, email: e.target.value })}
                            className="border rounded w-full p-2 mb-4 text-gray-700"
                        />
                        <div className="flex justify-end">
                            <button
                                className="px-4 py-2 bg-gray-500 text-white rounded-lg mr-2"
                                onClick={() => setShowEditCard(false)}
                            >
                                Cancelar
                            </button>
                            <button
                                className="px-4 py-2 bg-blue-500 text-white rounded-lg"
                                onClick={updateUser}
                            >
                                Salvar
                            </button>
                        </div>
                    </div>
                </div>
            )}
        </div>
    );
}
