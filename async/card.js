const baseURL = 'https://deckofcardsapi.com/api/deck';

// 1.
async function getCard() {
	try {
		let deck = await axios.get(`${baseURL}/new/shuffle/?deck_count=1`);
		let deck_id = deck.data.deck_id;
		let res = await axios.get(`${baseURL}/${deck_id}/draw/?count=1`);
		let card = res.data.cards[0];
		console.log(`${card.value} of ${card.suit}`);
	} catch (e) {
		console.log(e);
	}
}

getCard();

// 2.
async function getDeck() {
	try {
		let deck = await axios.get(`${baseURL}/new/shuffle/?deck_count=1`);
		id = deck.data.deck_id;
		return id;
	} catch (e) {
		console.log(e);
	}
}

async function draw2Cards() {
	let id = await getDeck();
	try {
		let cards = await Promise.all([
			axios.get(`${baseURL}/${id}/draw/?count=1`),
			axios.get(`${baseURL}/${id}/draw/?count=1`)
		]);

		console.log(cards);
		let c1 = cards[0].data.cards[0];
		let c2 = cards[1].data.cards[0];

		console.log(`${c1.value} of ${c1.suit}`);
		console.log(`${c2.value} of ${c2.suit}`);
	} catch (e) {
		console.log(e);
	}
}

draw2Cards();

// 3.
const deck = {
	async getDeck() {
		try {
			let res = await axios.get(`${baseURL}/new/shuffle/?deck_count=1`);
			this.id = res.data.deck_id;
			this.count = res.data.remaining;
		} catch (e) {
			console.log(e);
		}
	},
	async draw() {
		try {
			let res = await axios.get(`${baseURL}/${this.id}/draw/?count=1`);
			let card = res.data.cards[0];
			this.count = res.data.remaining;
			return card;
		} catch (e) {
			console.log(e);
		}
	}
};

deck.getDeck();
$('button').on('click', async () => {
	let card = await deck.draw();
	if (deck.count === 0) {
		$('button').remove();
	}
	$('#cards').html(`<img src="${card.image}" alt="${card.value} of ${card.suit}">`);
});
