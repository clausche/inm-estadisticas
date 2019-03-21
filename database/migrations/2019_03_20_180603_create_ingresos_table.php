<?php

use Illuminate\Support\Facades\Schema;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Database\Migrations\Migration;

class CreateIngresosTable extends Migration
{
    /**
     * Run the migrations.
     *
     * @return void
     */
    public function up()
    {
        Schema::create('ingresos', function (Blueprint $table) {
            $table->increments('id');
            $table->date('fingreso');
            $table->string('nombre');
            $table->string('apellidos');
            $table->string('fnacimiento');
            $table->string('genero');
            $table->string('nacionalidad');
            $table->string('documento');
            $table->string('nodocumento');
            $table->string('noacta');
            $table->string('nointernaciones');
            $table->string('fretorno');
            $table->string('fvigencia');
            $table->string('doccancelacion');
            $table->string('familia');
            $table->string('acreditacionv');
            $table->string('salud');
            $table->string('observaciones');
            $table->string('usafamiliares');
            $table->string('quienesperausa');
            $table->string('quienesperamx');
            $table->string('proximacita');
            $table->string('image');
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
        Schema::dropIfExists('ingresos');
    }
}
