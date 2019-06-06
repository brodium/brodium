import {findCompany} from './utils';

test('should return array with Podiums info', () => {
	expect(findCompany('Podium', 'lehi')).resolves.toBe([])
})