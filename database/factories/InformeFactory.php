<?php

use Faker\Generator as Faker;

$factory->define(App\informe::class, function (Faker $faker) {
    return [
        'actor'=>$faker->name,
        'abogado'=>$faker->name,
        'demandada'=>$faker->name,
        'tribunal'=>$faker->address,
        'expediente'=>$faker->sentence,
        'etapa'=>$faker->sentence,
        'estrategia'=>$faker->sentence,
        'monto'=>$faker->randomDigit,
        'propuesta'=>$faker->sentence,
        'fecha_arreglo'=>$faker->date,
       
    ];
});
