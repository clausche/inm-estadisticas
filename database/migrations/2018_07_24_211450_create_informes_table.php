<?php

use Illuminate\Support\Facades\Schema;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Database\Migrations\Migration;

class CreateInformesTable extends Migration
{
    /**
     * Run the migrations.
     *
     * @return void
     */
    public function up()
    {
        Schema::create('informes', function (Blueprint $table) {
            $table->increments('id');
            $table->integer('user_id');
            $table->string('actor');
            $table->string('abogado');
            $table->string('demandada');
            $table->string('tribunal');
            $table->string('expediente');
            $table->string('etapa');
            $table->string('estrategia');
            $table->float('monto',5,2);
            $table->string('propuesta');
            $table->date('fecha_arreglo');
            $table->timestamps();
        });
    }

    /**
     * Reverse the migrations.
     *
     * @return void
     */
    public function down()
    {
        Schema::dropIfExists('informes');
    }
}
