let baseURL = 'http://numbersapi.com';

// 1.
async function numFact(num) {
	try {
		let fact = await axios.get(`${baseURL}/${num}?json`);
		console.log(fact.data.text);
	} catch (e) {
		console.log(e);
	}
}

// 2.
async function getFacts(min, max) {
	try {
		let res = await axios.get(`${baseURL}/${min}..${max}?json`);
		let facts = res.data;
		for (num in facts) {
			$('#num-facts').append(`<p>${facts[num]}</p>`);
		}
	} catch (e) {
		console.log(e);
	}
}

getFacts(5, 9);

// 3.
async function favNumFacts(num) {
	try {
		let numFacts = [];
		for (let i = 0; i < 4; i++) {
			numFacts.push(axios.get(`${baseURL}/${num}?json`));
		}
		let res = await Promise.all(numFacts);
		res.forEach((f) => $('#fav-facts').append(`<p>${f.data.text}</p>`));
	} catch (e) {
		console.log(e);
	}
}

favNumFacts(13);
