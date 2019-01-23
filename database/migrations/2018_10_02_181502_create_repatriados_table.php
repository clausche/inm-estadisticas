<?php

use Illuminate\Support\Facades\Schema;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Database\Migrations\Migration;

class CreateRepatriadosTable extends Migration
{
    /**
     * Run the migrations.
     *
     * @return void
     */
    public function up()
    {
        Schema::create('repatriados', function (Blueprint $table) {
            $table->increments('id');
            $table->string('folio');
            $table->string('nombre');
            $table->string('apellidos');
            $table->date('fechanac');
            $table->string('menor');
            $table->date('fecharep');
            $table->string('sexo');
            $table->string('lugarnac');
            $table->string('lugarorig');
            $table->string('delito');
            $table->string('banda');
            $table->string('class');
            $table->string('user_id');
            $table->string('sitio');
            $table->string('oficial');
            $table->integer('detencion');

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
        Schema::dropIfExists('repatriados');
    }
}
