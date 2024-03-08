
```javascript
装饰器分为以下五种：
1.类装饰器：类装饰器用于装饰类，它接受一个 target 参数；target 参数表示被装饰的类的构造函数，在类装饰器中，可以通过修改这个参数来扩展或修改类本身。
2.方法装饰器：方法装饰器用于装饰类的方法，它接受三个参数：target 、methodName 、descriptor；target 参数如果装饰的是静态方法，那么target就是类的构造函数；如果装饰的是实例方法，那么target就是类的原型对象；methodName 参数表示被装饰的方法的名称；descriptor参数表示被装饰的方法的属性描述符（PropertyDescriptor）。可以通过修改这个参数来扩展或修改方法的行为。
3.访问器装饰器：访问器装饰器用于装饰类的访问器（getter和setter），它接受三个参数：target 、propertyName 、descriptor ；target参数如果装饰的是静态访问器，那么target就是类的构造函数；如果装饰的是实例访问器，那么target就是类的原型对象；propertyName参数表示被装饰的访问器的名称；descriptor参数表示被装饰的访问器的属性描述符（PropertyDescriptor）。可以通过修改这个参数来扩展或修改访问器的行为。
4.属性装饰器：属性装饰器用于装饰类的属性，它接受两个参数：target 、propertyName ；target参数如果装饰的是静态属性，那么target就是类的构造函数；如果装饰的是实例属性，那么target就是类的原型对象 ；propertyName参数表示被装饰的属性的名称。
5.参数装饰器：参数装饰器用于装饰函数或方法的参数，它接受三个参数：target 、methodName 、parameterIndex ；target参数如果装饰的是静态方法，那么target就是类的构造函数；如果装饰的是实例方法，那么target就是类的原型对象；methodName参数表示被装饰的方法的名称；parameterIndex参数表示被装饰的参数在方法参数列表中的索引。```