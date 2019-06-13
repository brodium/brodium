import {findCompany, getTeamMember, getCompany} from './utils';

test('should return array with Podiums info', () => {
	expect(findCompany('Podium', 'lehi')).resolves.toBe([])
})

test('should return error message', () => {
	expect(findCompany()).rejects.toThrow('Unable to find company')
})

test('should return object', () => {
	expect(getTeamMember(29)).resolves.toBe({})
})

test('should return object', () => {
	expect(getTeamMember()).rejects.toThrow('unable to get team-member')
})

test('should return object', () => {
	expect(getCompany(27)).resolves.toBe({})
})