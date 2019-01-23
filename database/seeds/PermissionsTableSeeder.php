<?php

use Illuminate\Database\Seeder;
use Caffeinated\Shinobi\Models\Permission;

class PermissionsTableSeeder extends Seeder
{
    /**
     * Run the database seeds.
     *
     * @return void
     */
    public function run()
    {
        //users
        Permission::create([
            'name' => 'Navegar usuarios',
            'slug' => 'users.index',
            'description'=>'Lista y navega todo los usuarios del sistema',
        ]);
        
         Permission::create([
            'name'=>'ver detalles de usuario',
            'slug'=>'users.show',
            'description'=>'ver en detalle cada usuarios del sistema',
        ]);

        Permission::create([
            'name'=>'Creacion de un usuario',
            'slug'=>'users.create',
            'description'=>'Crear cualquier usuario del sistema',
        ]);
         
         Permission::create([
            'name'=>'Edicion de usuarios',
            'slug'=>'users.edit',
            'description'=>'Editar cualquier dato de un usuarios del sistema',
        ]);
        
         Permission::create([
            'name'=>'Eliminiar usuario',
            'slug'=>'users.destroy',
            'description'=>'Eliminar cuaquier usuario del sistema',
        ]);

        //Roles
        Permission::create([
            'name'=>'Navegar roles',
            'slug'=>'roles.index',
            'description'=>'Lista y navega todo los roles del sistema',
        ]);
        
         Permission::create([
            'name'=>'ver detalles de rol',
            'slug'=>'roles.show',
            'description'=>'ver en detalle cada rol del sistema',
        ]);

        Permission::create([
            'name'=>'Creacion de roles',
            'slug'=>'roles.create',
            'description'=>'Editar cualquier dato de un rol del sistema',
        ]);
         
         Permission::create([
            'name'=>'Edicion de roles',
            'slug'=>'roles.edit',
            'description'=>'Editar cualquier dato de un rol del sistema',
        ]);
        
         Permission::create([
            'name'=>'Eliminiar rol',
            'slug'=>'roles.destroy',
            'description'=>'Eliminar cuaquier rol del sistema',
        ]);

        //informe
        Permission::create([
            'name'=>'Navegar informes',
            'slug'=>'informes.index',
            'description'=>'Lista y navega todo los informes del sistema',
        ]);
        
         Permission::create([
            'name'=>'ver detalles de informe',
            'slug'=>'informes.show',
            'description'=>'ver en detalle cada informe del sistema',
        ]);

        Permission::create([
            'name'=>'Creacion de informes',
            'slug'=>'informes.create',
            'description'=>'Editar cualquier dato de un informes del sistema',
        ]);
         
         Permission::create([
            'name'=>'Edicion de informe',
            'slug'=>'informes.edit',
            'description'=>'Editar cualquier dato de un informe del sistema',
        ]);
        
         Permission::create([
            'name'=>'Eliminiar informe',
            'slug'=>'informes.destroy',
            'description'=>'Eliminar cuaquier informe del sistema',
        ]);
    }
}


