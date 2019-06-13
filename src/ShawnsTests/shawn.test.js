import {findCompany, getTeamMember} from './utils';

test('should return array with Podiums info', () => {
	expect(findCompany('Podium', 'lehi')).resolves.toBe([])
})

test('should return error message', () => {
	expect(findCompany()).resolves.toEqual('Unable to find company')
})

test('should return object', () => {
	expect(getTeamMember(29)).resolves.toBe({})
})

test('should return object', () => {
	expect(getTeamMember()).resolves.toEqual('unable to get team-member')
})

