export const getSectionsWithEvents = async () => {
	try {
		const sectionResponse: any = await fetch(
			'https://api.discotech.me/v2/cities/4/discover'
		);
		const sectionTypes = await sectionResponse.json();

		const eventPromises = sectionTypes.map(async (section: any) => {
			const queryParams = Object.entries(section.filters)
				.map(([key, value]) => `${key}=${value}`)
				.join('&');
			const response = await fetch(
				`${section.data_url}${!!queryParams ? `?${queryParams}` : ''}`
			);
			const { data } = await response.json();
			section['events'] = data;
			return section;
		});

		const updatedSections = await Promise.all(eventPromises);
		const sectionsWithEvents = updatedSections
			.filter(section => section.events)
			.map((section: any) => {
				return section;
			});
		return sectionsWithEvents;
	} catch (error) {
		console.error(error);
	}
};
