export const formatDate = (date: string) =>
	new Intl.DateTimeFormat('en', {
		day: 'numeric',
		month: 'long',
		year: 'numeric',
		weekday: 'long',
	}).format(new Date(date));

const FLAG_OFFSET = 127397;

export function convertToEmoji(countryCode: string) {
	countryCode = countryCode.trim().toUpperCase();
	
	if (countryCode.length === 2) {
		return String.fromCodePoint(
			...countryCode.split('').map(char => char.charCodeAt(0) + FLAG_OFFSET)
		);
	} else if (countryCode.length === 3) {
		const codePoints = countryCode.split('').map(char => char.charCodeAt(0));
		codePoints.push(0x200D);
		codePoints.push(...codePoints);
		return String.fromCodePoint(...codePoints);
	} else {
		return '';
	}
}