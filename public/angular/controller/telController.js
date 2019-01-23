app.controller('telcontroller',['$scope','$http', function($scope,$http){
	$scope.telefonos={};
	$scope.Titulo='Nuevo Dispositivo';
	$scope.btnTitulo = 'Guardar'

	$http.get('api/telefonos/getTel')
	.success(function(data, status, header, config){
		$scope.telefonos = data;
		//console.log(data);
	})

	socket.on('actualizacion_table_tel',function(){
		   $scope.cargartablaTelefonos();
	});

	$scope.cargartablaTelefonos=function(){
		$http.get('api/telefonos/getTel')
	.success(function(data, status, header, config){
		$scope.telefonos = data;
		//console.log(data);
	})
	}

	$scope.btnSave = function(){

		$http.post('api/telefonos/addTel',$scope.newtelefono)
		.success(function(data){

			if(data.success){
		$scope.telefonos.push($scope.newtelefono);

		 new PNotify({
                title: 'Notificacion',
                text: data.msg,
                type: 'success',
                styling: 'bootstrap3'
                });	
		$scope.newtelefono="";
		socket.emit('actualizacion_table_tel');

	}else{
		 new PNotify({
                title: 'Notificacion',
                text: data.msg,
                type: 'info',
                styling: 'bootstrap3'
                });	
	}
		})
		.error(function(data){
			console.log(data);
		})
		
		
	}

	$scope.teledit= function(id){
		$scope.Titulo = 'Editar Item';
		$scope.btnTitulo = 'Actualizar';

		$('#mymodal').modal('show');
		$http.post('api/telefonos/getTelid/'+id)
		.success(function(data){
			$scope.newtelefono=data;
			
			console.log(data)
		})	
	}

	$scope.btnEdit= function(id) {
		 $http.post('api/telefonos/edit/'+id,$scope.newtelefono)
		.success(function(data){
			new PNotify({
                title: 'Notificacion',
                text: data.msg,
                type: 'success',
                styling: 'bootstrap3'
                });	
			$scope.cargartablaTelefonos();
			socket.emit('actualizacion_table_tel');
		})
	}

	$scope.teleDelete= function(id) {
		 $http.post('api/telefonos/delete/'+id)
		.success(function(data){
			new PNotify({
                title: 'Notificacion',
                text: data.msg,
                type: 'success',
                styling: 'bootstrap3'
                });	
			$scope.cargartablaTelefonos();
			socket.emit('actualizacion_table_tel');
		})
	}


	
}])
	