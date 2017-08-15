var LY={}

LY.Interface.ensureImplements = function(object){
					// 如果检测方法接受的参数小于2个 参数传递失败!
					if(arguments.length < 2 ){
						throw new Error('Interface.ensureImplements method constructor arguments must be  >= 2!');
					}
					
					// 获得接口实例对象 
					for(var i = 1 , len = arguments.length; i<len; i++ ){
						var instanceInterface = arguments[i];
						// 判断参数是否是接口类的类型
						if(instanceInterface.constructor !== LY.Interface){
							throw new Error('the arguments constructor not be Interface Class');
						}
						// 循环接口实例对象里面的每一个方法
						for(var j = 0 ; j < instanceInterface.methods.length; j++){
							// 用一个临时变量 接受每一个方法的名字(注意是字符串)
							var methodName = instanceInterface.methods[j];
							// object[key] 就是方法
							if( !object[methodName] || typeof object[methodName] !== 'function' ){
								throw new Error("the method name '" + methodName + "' is not found !");
							}
						}
					}
				}
				

LY.Interface = function(name,methods){
					//判断接口的参数个数
					if(arguments.length != 2){
						throw new Error('this instance interface constructor arguments must be 2 length!');
					}
					this.name = name ; 
					this.methods = [] ; //定义一个内置的空数组对象 等待接受methods里的元素(方法名字)
					for(var i = 0,len = methods.length ; i <len ; i++){
						 if( typeof methods[i] !== 'string'){
						 		throw new Error('the Interface method name is error!');
						 }
						 this.methods.push(methods[i]);
					}
				}




LY.extend=function (sub ,sup){
				 // 目的： 实现只继承父类的原型对象
				 var F = new Function();	// 1 创建一个空函数    目的：空函数进行中转
				 F.prototype = sup.prototype; // 2 实现空函数的原型对象和超类的原型对象转换
				 sub.prototype = new F(); 	// 3 原型继承 
				 sub.prototype.constructor = sub ; // 4还原子类的构造器
				 //保存一下父类的原型对象: 一方面方便解耦  另一方面方便获得父类的原型对象
				 sub.superClass = sup.prototype; //自定义一个子类的静态属性 接受父类的原型对象
				 //判断父类的原型对象的构造器 (加保险)
				 if(sup.prototype.constructor == Object.prototype.constructor){
				 	sup.prototype.constructor = sup ; //手动欢迎父类原型对象的构造器
				 }
			}
