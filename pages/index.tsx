import { getSectionsWithEvents } from '../utils/eventsApi';
import Head from 'next/head';
import Image from 'next/image';

const Home = ({ sectionsWithEvents }: any) => {
	return (
		<>
			<Head>
				<title>Discotech</title>
				<meta name='description' content='Nextjs Challenge' />
				<meta
					name='viewport'
					content='width=device-width, initial-scale=1'
				/>
				<link rel='icon' href='/favicon.ico' />
			</Head>
			<main style={{ padding: '0 1rem' }}>
				{sectionsWithEvents.map((section: any) => {
					return (
						<div key={section.display_name}>
							<h2
								style={{
									margin: '.5rem 0',
								}}
							>
								{section.display_name}
							</h2>
							<div
								style={{
									display: 'flex',
									overflowX: 'auto',
								}}
							>
								{section.events.map(
									(event: any, idx: number) => {
										return (
											<div
												key={`${event.name}${idx}`}
												style={{
													border: '1px solid black',
													borderRadius: '.25rem',
													padding: '0.5rem',
													marginRight: '1rem',
													height: 'auto',
													display: 'flex',
													flexDirection: 'column',
												}}
											>
												<div
													style={{
														position: 'relative',
														width: '12rem',
														height: '12rem',
														marginBottom: '.5rem',
													}}
												>
													<Image
														src={
															event.image_url
																? event.image_url
																: event
																		.image_urls[0]
														}
														alt={event.name}
														fill
														sizes='12rem'
														style={{
															borderRadius:
																'.25rem',
															objectFit: 'cover',
														}}
													/>
												</div>
												<div
													style={{
														width: '12rem',
													}}
												>
													<h3
														style={{
															width: '100%',
															whiteSpace:
																'nowrap',
															overflow: 'hidden',
															textOverflow:
																'ellipsis',
														}}
													>
														{event.name}
													</h3>
													<h5 style={{}}>
														Venue: {event.venue_id}
													</h5>
												</div>
											</div>
										);
									}
								)}
							</div>
						</div>
					);
				})}
			</main>
		</>
	);
};

export const getServerSideProps = async () => {
	const sectionsWithEvents = await getSectionsWithEvents();
	return { props: { sectionsWithEvents } };
};

export default Home;
