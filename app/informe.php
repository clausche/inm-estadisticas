<?php

namespace App;

use Illuminate\Database\Eloquent\Model;
use Carbon\Carbon;

class informe extends Model
{
     /**
     * The attributes that are mass assignable.
     *
     * @var array
     */
    protected $fillable = [
        'user_id','actor', 'abogado', 'demandada', 'tribunal', 'expediente', 'etapa', 'estrategia', 'monto', 'propuesta', 'fecha_arreglo'
    ];

    protected $dataformat='d/m/Y';

    public function formatvalue($value){
        return \Carbon\Carbon::parse($value)->format('d/m/Y');
    }
}
