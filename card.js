const baseURL = 'https://deckofcardsapi.com/api/deck';

// 1.
axios
	.get(`${baseURL}/new/shuffle/?deck_count=1`)
	.then((deck) => {
		const deck_id = deck.data.deck_id;
		console.log(deck_id);
		return axios.get(`${baseURL}/${deck_id}/draw/?count=1`);
	})
	.then((res) => {
		const card = res.data.cards[0];
		console.log(`${card.value} of ${card.suit}`);
	})
	.catch((err) => {
		console.log(`Oops, there was a problem :( ${err}`);
	});

// 2.
let cards = [];
axios
	.get(`${baseURL}/new/shuffle/?deck_count=1`)
	.then((deck) => {
		const deck_id = deck.data.deck_id;
		return axios.get(`${baseURL}/${deck_id}/draw/?count=1`);
	})
	.then((res) => {
		const deck_id = res.data.deck_id;
		const card = res.data.cards[0];
		cards.push(card);
		return axios.get(`${baseURL}/${deck_id}/draw/?count=1`);
	})
	.then((res) => {
		const card = res.data.cards[0];
		cards.push(card);
		for (c of cards) {
			console.log(`${c.value} of ${c.suit}`);
		}
	})
	.catch((err) => {
		console.log(`Oops, there was a problem :( ${err}`);
	});

// 3.
let deck_id;
axios
	.get(`${baseURL}/new/shuffle/?deck_count=1`)
	.then((res) => {
		deck_id = res.data.deck_id;
	})
	.catch((err) => {
		console.log(`Oops, there was a problem :( ${err}`);
	});

$('button').on('click', function getCard() {
	axios
		.get(`${baseURL}/${deck_id}/draw/?count=1`)
		.then((res) => {
			let count = res.data.remaining;
			if (count === 0) {
				$('button').remove();
			}
			let card = res.data.cards[0];
			$('#cards').html(`<img src="${card.image}" alt="${card.value} of ${card.suit}">`);
		})
		.catch((err) => {
			console.log(`Oops, there was a problem :( ${err}`);
		});
});
