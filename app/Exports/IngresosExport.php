<?php

namespace App\Exports;

use App\Ingresos;
use Maatwebsite\Excel\Concerns\FromCollection;
use Maatwebsite\Excel\Concerns\FromQuery;
use Maatwebsite\Excel\Concerns\Exportable;

class IngresosExport implements FromCollection
{
    use Exportable;
    /**
    * @return \Illuminate\Support\Collection
    */
    public function query()
    {
        return Ingresos::query();
    }
}
