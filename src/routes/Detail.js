import { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import styles from './Detail.module.css';

function Detail() {
	const { id } = useParams();
	const [movie, setMoive] = useState({});
	const getMovie = async () => {
		const json = await (
			await fetch(`https://yts.mx/api/v2/movie_details.json?movie_id=${id}`)
		).json();
		setMoive(json.data.movie);
		console.log(json.data.movie);
	};
	{
		movie.genres.map(g => <li key={g}>{g}</li>);
	}
	useEffect(() => {
		getMovie();
	}, []);

	return (
		<div>
			<div className={styles.movie}>
				<div>
					<img className={styles.movie__img} alt={movie.id} src={movie.medium_cover_image} />
				</div>
				<div>
					<h1 className={styles.movie__title}>{movie.title}</h1>
					<h4 className={styles.moive__year}>{movie.year}</h4>
					<ul className={styles.movie__genres}>
						{movie.genres.map(v => (
							<li key={v}>{v}</li>
						))}
					</ul>
					<p>{movie.description_full}</p>
				</div>
			</div>
		</div>
	);
}

export default Detail;
