let baseURL = 'http://numbersapi.com';

// 1.
axios
	.get(`${baseURL}/24?json`)
	.then((fact) => {
		console.log(fact.data.text);
	})
	.catch((err) => {
		console.log(`Oops, there was a problem :( ${err}`);
	});

// 2.
axios
	.get(`${baseURL}/1..4?json`)
	.then((fact) => {
		facts = fact.data;
		for (num in facts) {
			$('#num-facts').append(`<p>${facts[num]}</p>`);
		}
	})
	.catch((err) => {
		console.log(`Oops, there was a problem :( ${err}`);
	});

// 3.
let favNumPromises = [];

for (let i = 0; i < 4; i++) {
	favNumPromises.push(axios.get(`${baseURL}/5?json`));
}

Promise.all(favNumPromises).then((favNumFacts) =>
	favNumFacts.forEach((f) => $('#fav-facts').append(`<p>${f.data.text}</p>`))
);
