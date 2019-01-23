<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\Http\Requests\PermissionStoreRequest;
use App\Http\Requests\PermissionUpdateRequest;
use Caffeinated\Shinobi\Models\Permission; 

class PermissionController extends Controller
{
    public function __construct()
    {
        $this->middleware('permission:permissions.create')->only(['create','store']);
        $this->middleware('permission:permissions.index')->only(['index']);
        $this->middleware('permission:permissions.edit')->only(['edit','update']);
        $this->middleware('permission:permissions.show')->only(['show']);
        $this->middleware('permission:permissions.destroy')->only(['destroy']);
    }

     /**
     * Display a listing of the resource.
     *
     * @return \Illuminate\Http\Response
     */
    public function index()
    {
        $permissions = Permission::paginate();
        return view('permissions.index', compact('permissions'));
    }

    /**
     * Show the form for creating a new resource.
     *
     * @return \Illuminate\Http\Response
     */
    public function create()
    {
       
        return view('permissions.create');
    }

    /**
     * Store a newly created resource in storage.
     *
     * @param  \Illuminate\Http\Request  $request
     * @return \Illuminate\Http\Response
     */
    public function store(PermissionStoreRequest $request)
    {
          $permission=Permission::create($request->all());
              

        return redirect()->route('permissions.index')
        ->with('message-success','Permission guardado con Exito');
    }

    /**
     * Display the specified resource.
     *
     * @param  int  $id
     * @return \Illuminate\Http\Response
     */
    public function show(Permission $permission)
    {
        return view('permissions.show', compact('permission'));
    }

    /**
     * Show the form for editing the specified resource.
     *
     * @param  int  $id
     * @return \Illuminate\Http\Response
     */
    public function edit(Permission $permission)
    {
         
       
        return view('permissions.edit', compact('permission'));
    }

    /**
     * Update the specified resource in storage.
     *
     * @param  \Illuminate\Http\Request  $request
     * @param  int  $id
     * @return \Illuminate\Http\Response
     */
    public function update(PermissionUpdateRequest $request, Permission $permission)
    {
        //actualizacion de role
        $permission->update($request->all());
             

        return redirect()->route('permissions.edit',$permission->id)
        ->with('message-info','Permission actualizado Correctamente');
    }

    /**
     * Remove the specified resource from storage.
     *
     * @param  int  $id
     * @return \Illuminate\Http\Response
     */
    public function destroy(Permission $permission)
    {
       $role->delete();
        return back()->with('message-info', 'Permission Eliminado Correctamente');
    }
}
