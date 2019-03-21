<?php

namespace App;

use Illuminate\Database\Eloquent\Model;

class Ingresos extends Model
{
    protected $fillable = [
        'fingreso',
        'nombre',
        'apellidos',
        'fnacimiento',
        'genero',
        'nacionalidad',
        'documento',
        'nodocumento',
        'noacta',
        'nointernaciones',
        'fretorno',
        'fvigencia',
        'doccancelacion',
        'familia',
        'acreditacionv',
        'salud',
        'observaciones',
        'usafamiliares',
        'quienesperausa',
        'quienesperamx',
        'proximacita','image'
    ];

    protected $dataformat='d/m/Y';

    public function formatvalue($value){
        return \Carbon\Carbon::parse($value)->format('d/m/Y');
    }

    public function getFullNameAttribute(){
        return $this->nombre .' '. $this->apellidos;
        
    }    
    
}
