<?php

namespace App\Http\Controllers;

use App\Models\User;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Hash;

class UserController extends Controller
{
    public function index()
    {
        $users = User::all();
        return response()->json($users);
    }

    public function updateProfile(Request $request)
    {
        $user = auth()->user(); // Assume que o usuário está autenticado via token
        if (!$user) {
            return response()->json(['message' => 'Não autenticado'], 401);
        }

        $user->update([
            'name' => $request->name,
            'email' => $request->email,
            'phone' => $request->phone,
            'password' => $request->password ? Hash::make($request->password) : $user->password,
        ]);

        return response()->json($user);
    }


    // Visualizar um usuário específico
    public function show($id) {
        $user = User::findOrFail($id);
        return response()->json($user);
    }

    // Atualizar um usuário (ex.: mudar role)
    public function update(Request $request, $id) {
        $user = User::findOrFail($id);
        $user->update($request->only(['name', 'email', 'phone', 'role']));
        return response()->json($user);
    }

    // Deletar um usuário
    public function destroy($id) {
        $user = User::findOrFail($id);
        $user->delete();
        return response()->json(['message' => 'Usuário deletado com sucesso']);
    }
}