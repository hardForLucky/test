(function  (angular) {
	angular.module('todoSrv',[])
	.service('Todo',['$window',function  ($window) {
		//从浏览器中获取数据
		var tasks = JSON.parse($window.localStorage.getItem('todo')) || [];

		//向外暴露tasks的特权方法
		this.getData = function  () {
			return tasks;
		}

		//保存数据的方法
		this.saveData = function  () {
			$window.localStorage.setItem('todo',JSON.stringify(tasks));
		}

		//提供添加数据的方法
		this.addData = function  (data) {
			tasks.push(data);
		}

		//提供根据id删除数据的方法
		this.removeData = function  (id) {
			for (var i = 0; i < tasks.length; i++) {
				if(tasks[i].id === id ){
					tasks.splice(i,1);
					break;
				}
			};
		}

		//提供全选修改已完成状态的方法
		this.selectAll = function  (flag) {
			tasks.forEach(function  (value) {
				value.completed = flag;	
			});
		}

		//提供清除所有已完成状态的方法
		this.clearCompleted = function  () {
			for (var i = 0; i < tasks.length; i++) {
				if(tasks[i].completed){
					tasks.splice(i,1);
					i--;
				}
			};
		}


	}]);
})(angular);