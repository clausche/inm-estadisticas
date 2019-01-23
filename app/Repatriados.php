<?php

namespace App;

use Illuminate\Database\Eloquent\Model;
use Carbon\Carbon;

class Repatriados extends Model
{
    protected $fillable = [
        'nombre', 'apellidos','fechanac','menor','fecharep','sexo','lugarnac','lugarorig','delito','banda','class','user_id','sitio','oficial','detencion_id',
    ];
    public function formatvalue($value){
        return \Carbon\Carbon::parse($value)->format('d/m/Y');
    }

}
