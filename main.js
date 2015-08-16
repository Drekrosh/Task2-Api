/**
 * Реализация API, не изменяйте ее
 * @param {string} url
 * @param {function} callback
 */
function getData(url, callback) {
	var RESPONSES = {
		'/countries': [
			{name: 'Cameroon', continent: 'Africa'},
			{name :'Fiji Islands', continent: 'Oceania'},
			{name: 'Guatemala', continent: 'North America'},
			{name: 'Japan', continent: 'Asia'},
			{name: 'Yugoslavia', continent: 'Europe'},
			{name: 'Tanzania', continent: 'Africa'}
		],
		'/cities': [
			{name: 'Bamenda', country: 'Cameroon'},
			{name: 'Suva', country: 'Fiji Islands'},
			{name: 'Quetzaltenango', country: 'Guatemala'},
			{name: 'Osaka', country: 'Japan'},
			{name: 'Subotica', country: 'Yugoslavia'},
			{name: 'Zanzibar', country: 'Tanzania'},
		],
		'/populations': [
			{count: 138000, name: 'Bamenda'},
			{count: 77366, name: 'Suva'},
			{count: 90801, name: 'Quetzaltenango'},
			{count: 2595674, name: 'Osaka'},
			{count: 100386, name: 'Subotica'},
			{count: 157634, name: 'Zanzibar'}
		]
	};

	setTimeout(function () {
		var result = RESPONSES[url];
		if (!result) {
			return callback('Unknown url');
		}

		callback(null, result);
	}, Math.round(Math.random * 1000));
}

/**
 *  По поводу кода, хотелось бы добавать следущее:
 *
 *  Желательно переменным дописывать атрибут var , конечно это работет, но в формате 'use strict' выдаст ошибку.
 *
 *  В цикл можно было бы подставить вместо 3  length от массива и закешировать его,
 *  чтобы он при каждой итерации не запрашивал кол-во элементов в этом самом массиве.
 *
 *  Данный запрос через prompt , выводить численость население в стране.
 */

var requests = ['/countries', '/cities', '/populations'];
var responses = {};

var name = window.prompt('Введите название  страны');

for (i = 0; i < 3; i++) (function() {

	var request = requests[i];

	var callback = function (error, result) {

		responses[request] = result;
		var l = [];

		for (K in responses)
			l.push(K);

		if (l.length == 3) {
			var c = [], cc = [], p = 0;
			for (i = 0; i < responses['/countries'].length; i++) {
				if (responses['/countries'][i].name === name) {
					c.push(responses['/countries'][i].name);
				}
			}

			for (i = 0; i < responses['/cities'].length; i++) {
				for (j = 0; j < c.length; j++) {
					if (responses['/cities'][i].country === c[j]) {
						cc.push(responses['/cities'][i].name);
					}
				}
			}

			for (i = 0; i < responses['/populations'].length; i++) {
				for (j = 0; j < cc.length; j++) {
					if (responses['/populations'][i].name === cc[j]) {
						p += responses['/populations'][i].count;
					}
				}
			}

			//console.log('Total population in African cities: ' + p);

			alert('Total population in ' + name + ' country: ' + p);
		}
	};
	getData(request, callback);
})();

