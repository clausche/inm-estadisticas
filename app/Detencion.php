<?php

namespace App;

use Illuminate\Database\Eloquent\Model;

class Detencion extends Model
{
    protected $fillable = [
        'lugar', 'ciudad','estado',
    ];

    protected $table = 'detencion';
}
