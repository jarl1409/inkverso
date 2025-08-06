import UsersList from "../../components/layout/UserList";

export default function UsuariosPage() {
  return (
    <div className="p-6">
      <h1 className="text-2xl font-bold mb-4">Gestión de Usuarios</h1>
      <UsersList />
    </div>
  );
}
