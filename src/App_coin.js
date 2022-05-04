import { useState, useEffect } from 'react';
function App() {
	const [loading, setLoading] = useState(true);
	const [coins, setCoins] = useState([]);
	const [coin, setCoin] = useState('');
	const [money, setMoney] = useState(0);
	const [amount, setAmount] = useState(0);

	const onChangeMoney = event => setMoney(event.target.value);
	const onChange = event => setCoin(event.target.value);

	useEffect(() => {
		if (coin === '' || money === 0) {
			return;
		}
		const selected = coins.filter(v => v.id === coin)[0];
		setAmount(money / selected.quotes.USD.price);
	}, [money, coin]);

	useEffect(() => {
		fetch('https://api.coinpaprika.com/v1/tickers')
			.then(response => response.json())
			.then(json => {
				setCoins(json);
				setLoading(false);
			});
	}, []);
	return (
		<div>
			<h1>The Coins ! - ({coins.length})</h1>

			{loading ? (
				<strong>loading...</strong>
			) : (
				<div>
					<input type="number" onChange={onChangeMoney} value={money} />
					<select onChange={onChange} value={coin}>
						<option value="">Select option</option>
						{coins.map((coin, index) => (
							<option value={coin.id} key={index}>
								{coin.name} ({coin.symbol}) : {coin.quotes.USD.price}
							</option>
						))}
					</select>
					<hr />
					<h3>you can buy..... {amount}</h3>
				</div>
			)}
		</div>
	);
}

export default App;
