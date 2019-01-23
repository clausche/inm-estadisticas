<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use Validator;
use App\User;
use Hash;
use Auth;

use Caffeinated\Shinobi\Models\Role; 



class UserController extends Controller
{
    /**
     * Display a listing of the resource.
     *
     * @return \Illuminate\Http\Response
     */
    public function index()
    {
        $users = User::paginate();
        return view('users.index', compact('users'));
    }

    /**
     * Show the form for creating a new resource.
     *
     * @return \Illuminate\Http\Response
     */
    public function create()
    {
        //
    }

    /**
     * Store a newly created resource in storage.
     *
     * @param  \Illuminate\Http\Request  $request
     * @return \Illuminate\Http\Response
     */
    public function store(Request $request)
    {
        //
    }

    /**
     * Display the specified resource.
     *
     * @param  int  $id
     * @return \Illuminate\Http\Response
     */
    public function show(User $user)
    {
        return view('users.show', compact('user'));
    }

    /**
     * Show the form for editing the specified resource.
     *
     * @param  int  $id
     * @return \Illuminate\Http\Response
     */
    public function edit(User $user)
    {
        $roles= Role::get();
        return view('users.edit', compact('user','roles'));
    }

    /**
     * Update the specified resource in storage.
     *
     * @param  \Illuminate\Http\Request  $request
     * @param  int  $id
     * @return \Illuminate\Http\Response
     */
    public function update(Request $request, User $user)
    {
        //actualizacion de usuario
        $user->update($request->all());
        //actualizacion de role
        $user->roles()->sync($request->get('roles'));

        return redirect()->route('users.edit',$user->id)
        ->with('message-success','Usuario actualizado Correctamente');
    }

    /**
     * Remove the specified resource from storage.
     *
     * @param  int  $id
     * @return \Illuminate\Http\Response
     */
    public function destroy(User $user)
    {
        $user->delete();
        return back()->with('message-success', 'Eliminado Correctamente');
    }

    public function contrasena(){
        return view('users.cambiarpass');
    }

    public function changepass(Request $request)
    {
        $rules = [
            'clave_actual'=>'required',
            'clave'=>'required|confirmed|min:6|max:18',
        ];

        $messages =[
            'clave_actual.required'=>'El campo es requerido',
            'clave.required'=>'El campo es requerido',
            'clave.confirmed'=>'Los password no coinciden',
            'clave.min'=>'El minimo permitido son 6 caracteres',
            'clave.max'=>'EL maximo permitido son 18 carateres',
        ];

        $validator = Validator::make($request->all(), $rules, $messages);
        if($validator->fails()){
            return redirect()->route('users.pass')->withErrors($validator);
        }else{
            if(Hash::check($request->clave_actual, Auth::user()->password)){
                $user = new User;
                $user->where('email','=',Auth::user()->email)
                ->update([
                    'password'=>bcrypt($request->clave)
                ]);
                return redirect()->route('users.pass')
        ->with('message-success','Se cambiado Corretamente');
            }else{
                return redirect()->route('users.pass')
                ->with('message-success','Credenciales Incorrectas');
            }
        }

        
    }


}
