<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\Repatriados;
use Carbon\Carbon;
use DB;

class HomeController extends Controller
{
    /**
     * Create a new controller instance.
     *
     * @return void
     */
    public function __construct()
    {
        $this->middleware('auth');
    }

    /**
     * Show the application dashboard.
     *
     * @return \Illuminate\Http\Response
     */
    public function index()
    {   
        $repatriadosdia= Repatriados::where('fecharep',Carbon::now()->format('Y-m-d'))->get()->count();
        $repatriadosmesj= Repatriados::where('sitio','Juarez')->whereMonth('fecharep',Carbon::now()->format('m'))->get()->count();
        $repatriadosmesO= Repatriados::where('sitio','Ojinaga')->whereMonth('fecharep',Carbon::now()->format('m'))->get()->count();
        $charjs = app()->chartjs
                    ->name('barchattest')
                    ->type('bar')
                    ->size(['width'=>400, 'height'=>200])
                    ->labels(['Repatriacion Juarez', 'Repatriacion Ojinaga'])
                    ->datasets([
                        [
                            "label" => "Repatriados",
                            'backgroundColor' => ['#FF6384', '#36A2EB'],
                            'hoverBackgroundColor' => ['#FF6384', '#36A2EB'],
                            'data'=>[$repatriadosmesj,$repatriadosmesO]
                        
                        ]
                                              
                       
                    ])
                    ->optionsRaw([
                        'legend' => [
                            'display' => true,
                            'labels' => [
                                'fontColor' => '#000'
                            ]
                        ],
                        'scales' => [
                            'xAxes' => [
                                [
                                    'stacked' => true,

                                    'gridLines' => [
                                        'display' => true
                                    ]
                                ]
                                    ],
                                    'yAxes' => [
                                        [
                                            'ticks' => [
                                                'beginAtZero'=>true
                                            ]
                                        ]
                                    ]
                        ]
                    ]);
        return view('home',compact('repatriadosdia','charjs'));
    }

    public function char(){
        $result = Repatriados::orderBy('fecharep','ASC')->pluck('fecharep');
        $result=json_decode($result);
        return $result;
    }
}
