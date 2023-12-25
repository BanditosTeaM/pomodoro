export const sortedById = history => {
	if (!Array.isArray(history)) {
		return []
	}

	return history.sort((a, b) => Number(b.id) - Number(a.id))
}
