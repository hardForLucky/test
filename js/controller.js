(function  (angular) {
	angular.module('todoCrl',['ngRoute'])
	.config(['$routeProvider',function  ($routeProvider) {
		$routeProvider.when('/:status?',{
			templateUrl : 'todoId',
			controller : 'MyController'
		})
	}])
	.controller('MyController',['$scope','Todo','$routeParams',
		function  ($scope,Todo,$routeParams) {
		//1 实现展示和数据的功能
		$scope.tasks = Todo.getData();
		var tasks = $scope.tasks;

		//2 实现添加数据的功能
		$scope.newTask = '';
		$scope.add = function  () {
			if($scope.newTask === ''){return;}

			tasks.push({
				id : tasks.length === 0? 0 : tasks[tasks.length - 1].id + 1,
				name : $scope.newTask,
				completed : false
			});
			$scope.newTask = '';
		}

		//3 实现删除数据的功能
		$scope.remove = function  (id) {
			Todo.removeData(id);
		}

		//4 实现修改数据的功能
		//暴露一个数据用来控制样式
		$scope.updateId = -1;
		$scope.update = function  (id) {
			$scope.updateId = id;
		}
		$scope.save = function  () {
			$scope.updateId = -1;
		}

		//5 全选已完成
		//暴露一个数据用来控制是否全选
		$scope.isAllCompleted = false;
		$scope.selectAll = function  () {
			Todo.selectAll($scope.isAllCompleted);
		}

		//6 清除已完成的任务
		$scope.clearCompleted = function  () {
			Todo.clearCompleted();
		}
		//6.1 有已完成任务的时候才显示清除按钮
		$scope.hasCompleted = function  () {
			for (var i = 0; i < tasks.length; i++) {
				if(tasks[i].completed){
					return true;
				}
			};
			return false;
		}

		//7 显示未完成的任务数
		$scope.getCount = function  () {
			var count = 0;
			tasks.forEach(function  (value) {
				if(!value.completed){
					count++;
				}
			});
			return count;
		}

		//8 根据配置的路由参数的不同显示不同的状态
		//利用过滤器把status中属性对应的显示出来
		$scope.status = {};
		switch($routeParams.status){
			case 'active':
				$scope.status = {completed:false};
				break;
			case 'completed':
				$scope.status = {completed:true};
				break;
			default :
				$scope.status = {};
				break;
		}

		//9 监听数据变化，然后保存
		$scope.$watch('tasks',function  (n,l) {
			//10 监听任务是否全部完成，全选按钮高亮显示
			if($scope.getCount()){
				$scope.isAllCompleted = false;
			}else {
				$scope.isAllCompleted = true;
			}
			if(n === l){return;}
			Todo.saveData();
		},true);
	}]);
})(angular)